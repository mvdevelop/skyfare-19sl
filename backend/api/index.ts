import mongoose from 'mongoose';
import app from '../src/app';

// Conectar ao MongoDB (com cache para serverless)
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) return;

  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    throw new Error('MONGODB_URI não está definida');
  }

  await mongoose.connect(mongoURI);
  isConnected = true;
  console.log('✅ Conectado ao MongoDB Atlas');
};

// Handler serverless do Vercel
export default async function handler(req: any, res: any) {
  await connectToDatabase();
  return app(req, res);
}
