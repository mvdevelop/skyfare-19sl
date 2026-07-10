import express, { Router, Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';

import Tour, { ITour } from '../models/Tour.model';
import { protect, authorize, sanitizeInput } from '../middleware/auth.middleware';

const router: Router = express.Router();

// Validações
const createTourValidation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('O título deve ter entre 5 e 200 caracteres'),
  body('description')
    .trim()
    .isLength({ min: 100 })
    .withMessage('A descrição deve ter pelo menos 100 caracteres'),
  body('shortDescription')
    .trim()
    .isLength({ max: 500 })
    .withMessage('A descrição curta não pode exceder 500 caracteres'),
  body('location')
    .trim()
    .notEmpty()
    .withMessage('A localização é obrigatória'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('O preço deve ser um número positivo'),
  body('duration')
    .isIn(['1-3 days', '4-7 days', '8-14 days', '15+ days'])
    .withMessage('Duração inválida'),
  body('groupSize')
    .isInt({ min: 1, max: 50 })
    .withMessage('Tamanho do grupo deve ser entre 1 e 50'),
  body('difficulty')
    .isIn(['Easy', 'Moderate', 'Difficult'])
    .withMessage('Dificuldade inválida'),
  body('image')
    .trim()
    .notEmpty()
    .withMessage('A imagem principal é obrigatória'),
  body('category')
    .isIn(['Adventure', 'Cultural', 'Beach', 'Mountain', 'City'])
    .withMessage('Categoria inválida'),
  body('highlights')
    .isArray({ min: 1 })
    .withMessage('Pelo menos um destaque é necessário'),
  body('includes')
    .optional()
    .isArray(),
  body('excludes')
    .optional()
    .isArray(),
  body('itinerary')
    .optional()
    .isArray(),
];

const updateTourValidation = [
  param('id')
    .isMongoId()
    .withMessage('ID do tour inválido'),
  ...createTourValidation.map(validation => validation.optional()),
];

// @desc    Obter todos os tours (com filtros)
// @route   GET /api/tours
// @access  Public
router.get('/', [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Página deve ser um número positivo'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limite deve ser entre 1 e 100'),
  query('category')
    .optional()
    .isIn(['Adventure', 'Cultural', 'Beach', 'Mountain', 'City', 'all'])
    .withMessage('Categoria inválida'),
  query('difficulty')
    .optional()
    .isIn(['Easy', 'Moderate', 'Difficult', 'all'])
    .withMessage('Dificuldade inválida'),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Preço mínimo inválido'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Preço máximo inválido'),
  query('duration')
    .optional()
    .isIn(['1-3 days', '4-7 days', '8-14 days', '15+ days', 'all'])
    .withMessage('Duração inválida'),
  query('search')
    .optional()
    .trim(),
  query('featured')
    .optional()
    .isBoolean()
    .withMessage('Parâmetro featured deve ser booleano'),
  query('sort')
    .optional()
    .isIn(['price', '-price', 'rating', '-rating', 'createdAt', '-createdAt'])
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
      limit = 12,
      category,
      difficulty,
      minPrice,
      maxPrice,
      duration,
      search,
      featured,
      sort = '-createdAt',
    } = req.query;

    // Construir filtros
    const filter: any = {};

    // Filtro por categoria
    if (category && category !== 'all') {
      filter.category = category;
    }

    // Filtro por dificuldade
    if (difficulty && difficulty !== 'all') {
      filter.difficulty = difficulty;
    }

    // Filtro por duração
    if (duration && duration !== 'all') {
      filter.duration = duration;
    }

    // Filtro por preço
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice as string);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice as string);
    }

    // Filtro por destaque
    if (featured !== undefined) {
      filter.isFeatured = featured === 'true';
    }

    // Busca por texto
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    // Paginação
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    // Buscar tours
    let query = Tour.find(filter)
      .skip(skip)
      .limit(parseInt(limit as string));

    // Ordenação
    switch (sort) {
      case 'price':
        query = query.sort({ price: 1 });
        break;
      case '-price':
        query = query.sort({ price: -1 });
        break;
      case 'rating':
        query = query.sort({ 'ratings.average': 1 });
        break;
      case '-rating':
        query = query.sort({ 'ratings.average': -1 });
        break;
      case 'createdAt':
        query = query.sort({ createdAt: 1 });
        break;
      case '-createdAt':
      default:
        query = query.sort({ createdAt: -1 });
        break;
    }

    const tours = await query;

    // Contar total
    const total = await Tour.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit as string));

    res.status(200).json({
      success: true,
      data: tours,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages,
        hasNextPage: parseInt(page as string) < totalPages,
        hasPrevPage: parseInt(page as string) > 1,
      },
      filters: {
        category,
        difficulty,
        duration,
        minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
        search,
        featured,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Obter tour por ID
// @route   GET /api/tours/:id
// @access  Public
router.get('/:id', [
  param('id')
    .isMongoId()
    .withMessage('ID do tour inválido'),
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

    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour não encontrado',
      });
    }

    // Incrementar visualizações (se necessário)
    // await Tour.findByIdAndUpdate(id, { $inc: { views: 1 } });

    res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Obter tours destacados
// @route   GET /api/tours/featured
// @access  Public
router.get('/featured/random', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string) || 4;

    const tours = await Tour.aggregate([
      { $match: { isFeatured: true, isActive: true } },
      { $sample: { size: limit } },
    ]);

    res.status(200).json({
      success: true,
      data: tours,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Criar novo tour
// @route   POST /api/tours
// @access  Private/Admin
router.post('/', [
  protect,
  authorize('admin', 'guide'),
  sanitizeInput(['title', 'description', 'shortDescription', 'location']),
  ...createTourValidation,
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const tourData = req.body;

    // Adicionar criador
    const user = req.user!;
    // Se precisarmos do criador, podemos adicionar: tourData.createdBy = user._id;

    const tour = await Tour.create(tourData);

    res.status(201).json({
      success: true,
      data: tour,
      message: 'Tour criado com sucesso',
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Atualizar tour
// @route   PUT /api/tours/:id
// @access  Private/Admin
router.put('/:id', [
  protect,
  authorize('admin', 'guide'),
  sanitizeInput(['title', 'description', 'shortDescription', 'location']),
  ...updateTourValidation,
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
    const updateData = req.body;

    const tour = await Tour.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour não encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: tour,
      message: 'Tour atualizado com sucesso',
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Deletar tour (soft delete)
// @route   DELETE /api/tours/:id
// @access  Private/Admin
router.delete('/:id', [
  protect,
  authorize('admin'),
  param('id')
    .isMongoId()
    .withMessage('ID do tour inválido'),
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

    const tour = await Tour.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour não encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tour desativado com sucesso',
      data: tour,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Adicionar avaliação ao tour
// @route   POST /api/tours/:id/reviews
// @access  Private
router.post('/:id/reviews', [
  protect,
  param('id')
    .isMongoId()
    .withMessage('ID do tour inválido'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Avaliação deve ser entre 1 e 5'),
  body('comment')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('O comentário deve ter entre 10 e 1000 caracteres'),
  sanitizeInput(['comment']),
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
    const { rating, comment } = req.body;
    const user = req.user!;

    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour não encontrado',
      });
    }

    // Verificar se usuário já avaliou este tour
    const existingReview = tour.ratings.reviews.find(
      (review) => review.user.toString() === user._id.toString()
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'Você já avaliou este tour',
      });
    }

    // Adicionar avaliação
    tour.addReview(user._id.toString(), rating, comment);
    await tour.save();

    res.status(201).json({
      success: true,
      data: {
        review: {
          user: user._id,
          rating,
          comment,
          createdAt: new Date(),
        },
        averageRating: tour.ratings.average,
        totalReviews: tour.ratings.count,
      },
      message: 'Avaliação adicionada com sucesso',
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Obter categorias disponíveis
// @route   GET /api/tours/categories/list
// @access  Public
router.get('/categories/list', async (req: Request, res: Response) => {
  try {
    const categories = await Tour.distinct('category');

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar categorias',
    });
  }
});

// @desc    Obter estatísticas dos tours
// @route   GET /api/tours/stats/summary
// @access  Private/Admin
router.get('/stats/summary', [
  protect,
  authorize('admin'),
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await Tour.aggregate([
      {
        $group: {
          _id: null,
          totalTours: { $sum: 1 },
          activeTours: {
            $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] },
          },
          featuredTours: {
            $sum: { $cond: [{ $eq: ['$isFeatured', true] }, 1, 0] },
          },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          byCategory: {
            $push: {
              category: '$category',
              count: 1,
            },
          },
          byDifficulty: {
            $push: {
              difficulty: '$difficulty',
              count: 1,
            },
          },
        },
      },
      {
        $project: {
          totalTours: 1,
          activeTours: 1,
          featuredTours: 1,
          avgPrice: { $round: ['$avgPrice', 2] },
          minPrice: 1,
          maxPrice: 1,
          categories: {
            $arrayToObject: {
              $map: {
                input: '$byCategory',
                as: 'cat',
                in: {
                  k: '$$cat.category',
                  v: {
                    $sum: {
                      $cond: [{ $eq: ['$$cat.category', '$category'] }, 1, 0],
                    },
                  },
                },
              },
            },
          },
          difficulties: {
            $arrayToObject: {
              $map: {
                input: '$byDifficulty',
                as: 'diff',
                in: {
                  k: '$$diff.difficulty',
                  v: {
                    $sum: {
                      $cond: [{ $eq: ['$$diff.difficulty', '$difficulty'] }, 1, 0],
                    },
                  },
                },
              },
            },
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: stats[0] || {},
    });
  } catch (error) {
    next(error);
  }
});

export default router;