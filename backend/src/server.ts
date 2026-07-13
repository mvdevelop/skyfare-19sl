import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

// Carregar variáveis de ambiente
dotenv.config();

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
    console.error('⚠️  MongoDB não disponível:', (error as Error).message);
    console.log('🔧 Servidor será iniciado sem banco de dados.');
  }
};

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