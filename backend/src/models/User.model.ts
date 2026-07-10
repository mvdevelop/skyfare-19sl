import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: 'user' | 'admin' | 'guide';
  isActive: boolean;
  lastLogin?: Date;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
  updatedAt: Date;

  // Métodos
  comparePassword(candidatePassword: string): Promise<boolean>;
  getPublicProfile(): Partial<IUser>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'O nome é obrigatório'],
      trim: true,
      minlength: [2, 'O nome deve ter pelo menos 2 caracteres'],
      maxlength: [100, 'O nome não pode exceder 100 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'O email é obrigatório'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Por favor, forneça um email válido',
      ],
    },
    password: {
      type: String,
      required: [true, 'A senha é obrigatória'],
      minlength: [8, 'A senha deve ter pelo menos 8 caracteres'],
      select: false, // Não retornar senha por padrão
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'guide'],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpire: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Índices para otimização de busca
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });
UserSchema.index({ createdAt: -1 });

// Virtual para nome completo
UserSchema.virtual('fullName').get(function (this: IUser) {
  return this.name;
});

// Middleware para hash da senha antes de salvar
UserSchema.pre<IUser>('save', async function (next) {
  // Apenas hash se a senha foi modificada
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS || '12'));
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Middleware para atualizar lastLogin
UserSchema.pre<IUser>('save', function (next) {
  if (this.isNew) {
    this.lastLogin = new Date();
  }
  next();
});

// Método para comparar senhas
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// Método para retornar perfil público (sem senha)
UserSchema.methods.getPublicProfile = function (): Partial<IUser> {
  const user = this.toObject();
  delete user.password;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpire;
  delete user.__v;

  return user;
};

// Query middleware para excluir usuários inativos (se necessário)
UserSchema.pre<IUser>(/^find/, function (next) {
  // Podemos filtrar apenas usuários ativos dependendo do uso
  // (this as any).where({ isActive: true });
  next();
});

// Static methods
UserSchema.statics.findByEmail = async function (email: string) {
  return await this.findOne({ email }).select('+password');
};

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;