import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';

// Carregar variáveis de ambiente
dotenv.config();

// Importar rotas
import toursRoutes from './routes/tours.routes';
import authRoutes from './routes/auth.routes';
import bookingsRoutes from './routes/bookings.routes';

// Configurações
const app: Application = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Conectar ao MongoDB
const connectToDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('MONGODB_URI não está definida no arquivo .env');
    }

    await mongoose.connect(mongoURI);
    console.log('✅ Conectado ao MongoDB Atlas com sucesso!');

    // Configurações do Mongoose
    mongoose.set('debug', NODE_ENV === 'development');

  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

// Middleware de segurança e parsing
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging em desenvolvimento
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  message: 'Muitas requisições deste IP, tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Rotas de saúde da API
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Rotas principais da API
app.use('/api/tours', toursRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingsRoutes);

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Erro:', err);

  const statusCode = (err as any).statusCode || 500;
  const message = NODE_ENV === 'development'
    ? err.message
    : 'Erro interno do servidor';

  res.status(statusCode).json({
    error: {
      message,
      ...(NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
});

// Rota para 404
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: {
      message: 'Rota não encontrada',
    },
  });
});

// Iniciar servidor
const startServer = async () => {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT} em modo ${NODE_ENV}`);
      console.log(`📡 API disponível em http://localhost:${PORT}`);
      console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Falha ao iniciar servidor:', error);
    process.exit(1);
  }
};

// Tratamento de sinais de desligamento
process.on('SIGINT', async () => {
  console.log('🔻 Recebido SIGINT, encerrando servidor...');
  await mongoose.connection.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🔻 Recebido SIGTERM, encerrando servidor...');
  await mongoose.connection.close();
  process.exit(0);
});

// Iniciar aplicação
startServer();

export default app;