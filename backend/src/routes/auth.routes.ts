import express, { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import User, { IUser } from '../models/User.model';
import { protect, authorize } from '../middleware/auth.middleware';

const router: Router = express.Router();

// Validações
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('O nome deve ter entre 2 e 100 caracteres'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Por favor, forneça um email válido'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('A senha deve ter pelo menos 8 caracteres')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .withMessage('A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'),
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Por favor, forneça um email válido'),
  body('password')
    .notEmpty()
    .withMessage('A senha é obrigatória'),
];

// Helper para gerar token JWT
const generateToken = (id: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não está configurado');
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// @desc    Registrar novo usuário
// @route   POST /api/auth/register
// @access  Public
router.post('/register', registerValidation, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Este email já está em uso',
      });
    }

    // Criar usuário
    const user = await User.create({
      name,
      email,
      password,
    });

    // Gerar token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: user.getPublicProfile(),
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Login do usuário
// @route   POST /api/auth/login
// @access  Public
router.post('/login', loginValidation, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Buscar usuário pelo email com senha
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas',
      });
    }

    // Verificar senha
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas',
      });
    }

    // Atualizar lastLogin
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Gerar token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: user.getPublicProfile(),
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Obter perfil do usuário atual
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IUser;
    res.status(200).json({
      success: true,
      user: user.getPublicProfile(),
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Atualizar perfil do usuário
// @route   PUT /api/auth/me
// @access  Private
router.put(
  '/me',
  protect,
  [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('O nome deve ter entre 2 e 100 caracteres'),
    body('email')
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage('Por favor, forneça um email válido'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const user = req.user as IUser;
      const { name, email } = req.body;

      // Verificar se o novo email já está em uso (se for alterado)
      if (email && email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: 'Este email já está em uso',
          });
        }
      }

      // Atualizar campos permitidos
      const allowedUpdates = ['name', 'email', 'avatar'];
      const updateData: any = {};

      allowedUpdates.forEach((field) => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      });

      // Aplicar atualizações
      Object.assign(user, updateData);
      await user.save();

      res.status(200).json({
        success: true,
        user: user.getPublicProfile(),
      });
    } catch (error) {
      next(error);
    }
  }
);

// @desc    Solicitar redefinição de senha
// @route   POST /api/auth/forgot-password
// @access  Public
router.post(
  '/forgot-password',
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Por favor, forneça um email válido'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        // Por segurança, não revelar que o usuário não existe
        return res.status(200).json({
          success: true,
          message: 'Se o email existir, um link de redefinição será enviado',
        });
      }

      // Gerar token de redefinição
      const resetToken = crypto.randomBytes(32).toString('hex');

      // Hash do token e salvar no banco
      const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

      await user.save({ validateBeforeSave: false });

      // TODO: Implementar envio de email
      // Aqui seria o lugar para enviar o email com o link de redefinição
      // que incluiria o token não-hash (resetToken)

      res.status(200).json({
        success: true,
        message: 'Link de redefinição gerado com sucesso',
        // Em produção, remover essa linha e implementar email
        resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @desc    Redefinir senha
// @route   PUT /api/auth/reset-password/:token
// @access  Public
router.put(
  '/reset-password/:token',
  [
    body('password')
      .isLength({ min: 8 })
      .withMessage('A senha deve ter pelo menos 8 caracteres')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .withMessage('A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { token } = req.params;
      const { password } = req.body;

      // Hash do token recebido
      const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      // Buscar usuário pelo token não expirado
      const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: new Date() },
      }).select('+password +resetPasswordToken +resetPasswordExpire');

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Token inválido ou expirado',
        });
      }

      // Atualizar senha
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      res.status(200).json({
        success: true,
        message: 'Senha redefinida com sucesso',
      });
    } catch (error) {
      next(error);
    }
  }
);

// @desc    Alterar senha (usuário logado)
// @route   PUT /api/auth/change-password
// @access  Private
router.put(
  '/change-password',
  protect,
  [
    body('currentPassword')
      .notEmpty()
      .withMessage('A senha atual é obrigatória'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('A nova senha deve ter pelo menos 8 caracteres')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .withMessage('A nova senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const user = req.user as IUser;
      const { currentPassword, newPassword } = req.body;

      // Buscar usuário com senha
      const userWithPassword = await User.findById(user._id).select('+password');

      if (!userWithPassword) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado',
        });
      }

      // Verificar senha atual
      const isPasswordValid = await userWithPassword.comparePassword(currentPassword);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Senha atual incorreta',
        });
      }

      // Atualizar senha
      userWithPassword.password = newPassword;
      await userWithPassword.save();

      res.status(200).json({
        success: true,
        message: 'Senha alterada com sucesso',
      });
    } catch (error) {
      next(error);
    }
  }
);

// @desc    Logout (no JWT, este endpoint é apenas informativo)
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', protect, (req: Request, res: Response) => {
  // Com JWT, o logout é feito no client removendo o token
  res.status(200).json({
    success: true,
    message: 'Logout realizado com sucesso',
  });
});

export default router;