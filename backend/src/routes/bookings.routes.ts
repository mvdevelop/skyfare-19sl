import express, { Router, Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';

import Booking, { IBooking } from '../models/Booking.model';
import Tour from '../models/Tour.model';
import User from '../models/User.model';
import { protect, authorize, checkOwnership, sanitizeInput } from '../middleware/auth.middleware';

const router: Router = express.Router();

// Validações
const createBookingValidation = [
  body('tourId')
    .isMongoId()
    .withMessage('ID do tour inválido'),
  body('participants.adults')
    .isInt({ min: 1, max: 20 })
    .withMessage('Número de adultos deve ser entre 1 e 20'),
  body('participants.children')
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage('Número de crianças deve ser entre 0 e 10'),
  body('participants.infants')
    .optional()
    .isInt({ min: 0, max: 5 })
    .withMessage('Número de bebês deve ser entre 0 e 5'),
  body('contactInfo.fullName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome completo deve ter entre 2 e 100 caracteres'),
  body('contactInfo.email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Por favor, forneça um email válido'),
  body('contactInfo.phone')
    .trim()
    .notEmpty()
    .withMessage('O telefone é obrigatório'),
  body('contactInfo.country')
    .trim()
    .notEmpty()
    .withMessage('O país é obrigatório'),
  body('dates.startDate')
    .isISO8601()
    .withMessage('Data de início inválida')
    .custom((value) => {
      const date = new Date(value);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return date >= now;
    })
    .withMessage('Data de início deve ser no futuro'),
  body('dates.endDate')
    .isISO8601()
    .withMessage('Data de término inválida')
    .custom((value, { req }) => {
      const startDate = new Date(req.body.dates.startDate);
      const endDate = new Date(value);
      return endDate > startDate;
    })
    .withMessage('Data de término deve ser após a data de início'),
  body('payment.method')
    .isIn(['credit_card', 'paypal', 'bank_transfer'])
    .withMessage('Método de pagamento inválido'),
];

// @desc    Criar nova reserva
// @route   POST /api/bookings
// @access  Private
router.post('/', [
  protect,
  sanitizeInput(['contactInfo.fullName', 'contactInfo.specialRequests', 'notes']),
  ...createBookingValidation,
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const {
      tourId,
      participants,
      contactInfo,
      dates,
      payment,
      notes,
    } = req.body;

    const user = req.user!;

    // Verificar se o tour existe e está ativo
    const tour = await Tour.findById(tourId);
    if (!tour || !tour.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Tour não encontrado ou não está disponível',
      });
    }

    // Verificar disponibilidade de datas (implementação básica)
    // Em uma aplicação real, verificaríamos conflitos de reservas
    const existingBookings = await Booking.find({
      tour: tourId,
      'dates.startDate': { $lte: new Date(dates.endDate) },
      'dates.endDate': { $gte: new Date(dates.startDate) },
      status: { $in: ['confirmed', 'pending'] },
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Tour não disponível nas datas selecionadas',
        availableDates: [], // Em uma implementação real, sugeriríamos datas alternativas
      });
    }

    // Calcular preço base
    const basePrice = tour.price * participants.adults;
    const childrenPrice = (tour.price * 0.7) * (participants.children || 0);
    const infantsPrice = 0; // Bebês geralmente são gratuitos

    const totalPrice = basePrice + childrenPrice + infantsPrice;

    // Criar reserva
    const booking = await Booking.create({
      tour: tourId,
      user: user._id,
      participants,
      contactInfo,
      dates: {
        startDate: new Date(dates.startDate),
        endDate: new Date(dates.endDate),
      },
      pricing: {
        basePrice: totalPrice,
        extras: [], // Poderia adicionar extras opcionais
        total: totalPrice,
        currency: 'USD',
      },
      payment,
      status: 'pending',
      notes,
    });

    // Enviar email de confirmação (simulado)
    // Em produção, implementar serviço de email
    console.log(`📧 Email de confirmação enviado para ${contactInfo.email}`);
    console.log(`📋 Detalhes da reserva: ${booking.bookingReference}`);

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Reserva criada com sucesso. Aguardando confirmação de pagamento.',
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Obter todas as reservas do usuário
// @route   GET /api/bookings/my-bookings
// @access  Private
router.get('/my-bookings', [
  protect,
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Página deve ser um número positivo'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limite deve ser entre 1 e 50'),
  query('status')
    .optional()
    .isIn(['confirmed', 'pending', 'cancelled', 'completed', 'all'])
    .withMessage('Status inválido'),
  query('sort')
    .optional()
    .isIn(['date', '-date', 'price', '-price'])
    .withMessage('Ordenação inválida'),
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const {
      page = 1,
      limit = 10,
      status = 'all',
      sort = '-date',
    } = req.query;

    const user = req.user!;

    // Construir filtros
    const filter: any = { user: user._id };

    if (status !== 'all') {
      filter.status = status;
    }

    // Paginação
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    // Buscar reservas
    let query = Booking.find(filter)
      .skip(skip)
      .limit(parseInt(limit as string));

    // Ordenação
    switch (sort) {
      case 'date':
        query = query.sort({ 'dates.startDate': 1 });
        break;
      case '-date':
        query = query.sort({ 'dates.startDate': -1 });
        break;
      case 'price':
        query = query.sort({ 'pricing.total': 1 });
        break;
      case '-price':
        query = query.sort({ 'pricing.total': -1 });
        break;
    }

    const bookings = await query;

    // Contar total
    const total = await Booking.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit as string));

    res.status(200).json({
      success: true,
      data: bookings,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages,
        hasNextPage: parseInt(page as string) < totalPages,
        hasPrevPage: parseInt(page as string) > 1,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Obter reserva por ID
// @route   GET /api/bookings/:id
// @access  Private
router.get('/:id', [
  protect,
  param('id')
    .isMongoId()
    .withMessage('ID da reserva inválido'),
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const user = req.user!;

    const booking = await Booking.findOne({
      _id: id,
      user: user._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Reserva não encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Cancelar reserva
// @route   PUT /api/bookings/:id/cancel
// @access  Private
router.put('/:id/cancel', [
  protect,
  param('id')
    .isMongoId()
    .withMessage('ID da reserva inválido'),
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const user = req.user!;

    const booking = await Booking.findOne({
      _id: id,
      user: user._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Reserva não encontrada',
      });
    }

    // Verificar se pode ser cancelada
    if (!(booking as any).canCancel()) {
      return res.status(400).json({
        success: false,
        message: 'Esta reserva não pode ser cancelada',
        details: 'Cancelamentos devem ser feitos com pelo menos 48 horas de antecedência',
      });
    }

    // Cancelar reserva
    booking.status = 'cancelled';
    booking.payment.status = 'cancelled';
    await booking.save();

    // Enviar email de cancelamento (simulado)
    console.log(`📧 Email de cancelamento enviado para ${booking.contactInfo.email}`);

    res.status(200).json({
      success: true,
      data: booking,
      message: 'Reserva cancelada com sucesso',
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Confirmar pagamento
// @route   PUT /api/bookings/:id/confirm-payment
// @access  Private/Admin
router.put('/:id/confirm-payment', [
  protect,
  authorize('admin'),
  param('id')
    .isMongoId()
    .withMessage('ID da reserva inválido'),
  body('transactionId')
    .optional()
    .trim(),
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const { transactionId } = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Reserva não encontrada',
      });
    }

    // Confirmar pagamento
    booking.payment.status = 'paid';
    booking.payment.paidAt = new Date();
    booking.status = 'confirmed';

    if (transactionId) {
      booking.payment.transactionId = transactionId;
    }

    await booking.save();

    // Enviar email de confirmação de pagamento (simulado)
    console.log(`📧 Email de confirmação de pagamento enviado para ${booking.contactInfo.email}`);

    res.status(200).json({
      success: true,
      data: booking,
      message: 'Pagamento confirmado com sucesso',
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Obter todas as reservas (admin)
// @route   GET /api/bookings
// @access  Private/Admin
router.get('/', [
  protect,
  authorize('admin'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Página deve ser um número positivo'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limite deve ser entre 1 e 100'),
  query('status')
    .optional()
    .isIn(['confirmed', 'pending', 'cancelled', 'completed', 'all'])
    .withMessage('Status inválido'),
  query('tourId')
    .optional()
    .isMongoId()
    .withMessage('ID do tour inválido'),
  query('userId')
    .optional()
    .isMongoId()
    .withMessage('ID do usuário inválido'),
  query('dateFrom')
    .optional()
    .isISO8601()
    .withMessage('Data de início inválida'),
  query('dateTo')
    .optional()
    .isISO8601()
    .withMessage('Data de término inválida'),
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const {
      page = 1,
      limit = 20,
      status = 'all',
      tourId,
      userId,
      dateFrom,
      dateTo,
    } = req.query;

    // Construir filtros
    const filter: any = {};

    if (status !== 'all') {
      filter.status = status;
    }

    if (tourId) {
      filter.tour = tourId;
    }

    if (userId) {
      filter.user = userId;
    }

    if (dateFrom || dateTo) {
      filter['dates.startDate'] = {};
      if (dateFrom) {
        filter['dates.startDate'].$gte = new Date(dateFrom as string);
      }
      if (dateTo) {
        filter['dates.startDate'].$lte = new Date(dateTo as string);
      }
    }

    // Paginação
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    // Buscar reservas
    const bookings = await Booking.find(filter)
      .skip(skip)
      .limit(parseInt(limit as string))
      .sort({ 'dates.startDate': -1 });

    // Contar total
    const total = await Booking.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit as string));

    res.status(200).json({
      success: true,
      data: bookings,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages,
        hasNextPage: parseInt(page as string) < totalPages,
        hasPrevPage: parseInt(page as string) > 1,
      },
      filters: {
        status,
        tourId,
        userId,
        dateFrom,
        dateTo,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Obter estatísticas de reservas (admin)
// @route   GET /api/bookings/stats/summary
// @access  Private/Admin
router.get('/stats/summary', [
  protect,
  authorize('admin'),
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await Booking.aggregate([
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: '$pricing.total' },
          confirmedBookings: {
            $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] },
          },
          pendingBookings: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] },
          },
          cancelledBookings: {
            $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] },
          },
          completedBookings: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] },
          },
          totalParticipants: {
            $sum: {
              $add: [
                '$participants.adults',
                { $ifNull: ['$participants.children', 0] },
                { $ifNull: ['$participants.infants', 0] },
              ],
            },
          },
        },
      },
    ]);

    // Estatísticas por mês
    const monthlyStats = await Booking.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$dates.startDate' },
            month: { $month: '$dates.startDate' },
          },
          bookings: { $sum: 1 },
          revenue: { $sum: '$pricing.total' },
          participants: {
            $sum: {
              $add: [
                '$participants.adults',
                { $ifNull: ['$participants.children', 0] },
                { $ifNull: ['$participants.infants', 0] },
              ],
            },
          },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }, // Últimos 12 meses
    ]);

    res.status(200).json({
      success: true,
      data: {
        summary: stats[0] || {},
        monthly: monthlyStats,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;