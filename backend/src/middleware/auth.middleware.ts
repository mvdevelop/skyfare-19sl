import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { IUser } from '../models/User.model';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// Interface para o token decodificado
interface DecodedToken extends JwtPayload {
  id: string;
}

/**
 * Middleware para proteger rotas - verifica token JWT
 */
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // 1) Obter token do header Authorization
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 2) Verificar se token existe
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Não autorizado - nenhum token fornecido',
      });
      return;
    }

    // 3) Verificar JWT_SECRET
    if (!process.env.JWT_SECRET) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor - JWT_SECRET não configurado',
      });
      return;
    }

    // 4) Verificar token
    let decoded: DecodedToken;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({
          success: false,
          message: 'Token expirado',
        });
        return;
      } else if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({
          success: false,
          message: 'Token inválido',
        });
        return;
      } else {
        res.status(401).json({
          success: false,
          message: 'Não autorizado',
        });
        return;
      }
    }

    // 5) Buscar usuário pelo ID do token
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Usuário não encontrado',
      });
      return;
    }

    // 6) Verificar se o usuário está ativo
    if (!user.isActive) {
      res.status(401).json({
        success: false,
        message: 'Usuário inativo',
      });
      return;
    }

    // 7) Adicionar usuário ao request
    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Erro no middleware protect:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
    });
  }
};

/**
 * Middleware para verificar roles/autorização
 */
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Não autorizado',
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Acesso negado - requer role: ${roles.join(', ')}`,
      });
      return;
    }

    next();
  };
};

/**
 * Middleware para verificar propriedade do recurso
 * (Ex: usuário só pode editar suas próprias reservas)
 */
export const checkOwnership = (
  model: any,
  paramName: string = 'id',
  ownerField: string = 'user'
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Não autorizado',
        });
        return;
      }

      const resourceId = req.params[paramName];

      if (!resourceId) {
        res.status(400).json({
          success: false,
          message: 'ID do recurso não fornecido',
        });
        return;
      }

      // Buscar recurso
      const resource = await model.findById(resourceId);

      if (!resource) {
        res.status(404).json({
          success: false,
          message: 'Recurso não encontrado',
        });
        return;
      }

      // Verificar se o usuário é o proprietário
      const ownerId = (resource as any)[ownerField].toString();
      const userId = req.user._id.toString();

      if (ownerId !== userId && req.user.role !== 'admin') {
        res.status(403).json({
          success: false,
          message: 'Acesso negado - você não é o proprietário deste recurso',
        });
        return;
      }

      // Adicionar recurso ao request para evitar nova busca
      (req as any).resource = resource;
      next();
    } catch (error) {
      console.error('❌ Erro no middleware checkOwnership:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };
};

/**
 * Middleware para logging de requisições protegidas
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.user ? `Usuário: ${req.user.email}` : 'Anônimo';
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.socket.remoteAddress;

  console.log(`🔐 [${new Date().toISOString()}] ${method} ${url} - ${user} - IP: ${ip}`);

  next();
};

/**
 * Middleware para sanitizar dados de entrada
 */
export const sanitizeInput = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const sanitize = (value: any): any => {
        if (typeof value === 'string') {
          // Remover scripts e tags HTML
          return value
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<[^>]*>/g, '')
            .trim();
        }
        return value;
      };

      // Sanitizar body
      if (req.body) {
        fields.forEach(field => {
          if (req.body[field] !== undefined) {
            req.body[field] = sanitize(req.body[field]);
          }
        });
      }

      // Sanitizar query params
      if (req.query) {
        fields.forEach(field => {
          if (req.query[field] !== undefined && typeof req.query[field] === 'string') {
            req.query[field] = sanitize(req.query[field] as string);
          }
        });
      }

      next();
    } catch (error) {
      console.error('❌ Erro no middleware sanitizeInput:', error);
      next(error);
    }
  };
};

/**
 * Função utilitária para criar token de acesso
 */
export const createAccessToken = (userId: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não configurado');
  }

  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    }
  );
};

/**
 * Função utilitária para verificar token
 */
export const verifyToken = (token: string): DecodedToken | null => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não configurado');
    }

    return jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
  } catch (error) {
    return null;
  }
};

export default {
  protect,
  authorize,
  checkOwnership,
  requestLogger,
  sanitizeInput,
  createAccessToken,
  verifyToken,
};