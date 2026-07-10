import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
  tour: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  participants: {
    adults: number;
    children?: number;
    infants?: number;
  };
  contactInfo: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    specialRequests?: string;
  };
  dates: {
    startDate: Date;
    endDate: Date;
  };
  pricing: {
    basePrice: number;
    extras: {
      name: string;
      price: number;
    }[];
    discount?: {
      code: string;
      amount: number;
      percentage: number;
    };
    total: number;
    currency: string;
  };
  payment: {
    status: 'pending' | 'paid' | 'cancelled' | 'refunded';
    method: 'credit_card' | 'paypal' | 'bank_transfer';
    transactionId?: string;
    paidAt?: Date;
  };
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  bookingReference: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema<IBooking> = new Schema(
  {
    tour: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'O tour é obrigatório'],
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'O usuário é obrigatório'],
      index: true,
    },
    participants: {
      adults: {
        type: Number,
        required: [true, 'O número de adultos é obrigatório'],
        min: [1, 'Deve haver pelo menos 1 adulto'],
      },
      children: {
        type: Number,
        default: 0,
        min: [0, 'O número de crianças não pode ser negativo'],
      },
      infants: {
        type: Number,
        default: 0,
        min: [0, 'O número de bebês não pode ser negativo'],
      },
    },
    contactInfo: {
      fullName: {
        type: String,
        required: [true, 'O nome completo é obrigatório'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'O email é obrigatório'],
        lowercase: true,
        trim: true,
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          'Por favor, forneça um email válido',
        ],
      },
      phone: {
        type: String,
        required: [true, 'O telefone é obrigatório'],
        trim: true,
      },
      country: {
        type: String,
        required: [true, 'O país é obrigatório'],
      },
      specialRequests: {
        type: String,
        maxlength: [1000, 'Pedidos especiais não podem exceder 1000 caracteres'],
      },
    },
    dates: {
      startDate: {
        type: Date,
        required: [true, 'A data de início é obrigatória'],
      },
      endDate: {
        type: Date,
        required: [true, 'A data de término é obrigatória'],
      },
    },
    pricing: {
      basePrice: {
        type: Number,
        required: [true, 'O preço base é obrigatório'],
        min: [0, 'O preço não pode ser negativo'],
      },
      extras: [
        {
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
            min: [0, 'O preço extra não pode ser negativo'],
          },
        },
      ],
      discount: {
        code: String,
        amount: {
          type: Number,
          min: [0, 'O desconto não pode ser negativo'],
        },
        percentage: {
          type: Number,
          min: [0, 'A porcentagem não pode ser negativa'],
          max: [100, 'A porcentagem não pode exceder 100%'],
        },
      },
      total: {
        type: Number,
        required: [true, 'O total é obrigatório'],
        min: [0, 'O total não pode ser negativo'],
      },
      currency: {
        type: String,
        default: 'USD',
        uppercase: true,
      },
    },
    payment: {
      status: {
        type: String,
        enum: ['pending', 'paid', 'cancelled', 'refunded'],
        default: 'pending',
      },
      method: {
        type: String,
        enum: ['credit_card', 'paypal', 'bank_transfer'],
        required: [true, 'O método de pagamento é obrigatório'],
      },
      transactionId: {
        type: String,
        unique: true,
        sparse: true, // Permite valores null duplicados
      },
      paidAt: {
        type: Date,
      },
    },
    status: {
      type: String,
      enum: ['confirmed', 'pending', 'cancelled', 'completed'],
      default: 'pending',
    },
    bookingReference: {
      type: String,
      required: [true, 'A referência da reserva é obrigatória'],
      unique: true,
      uppercase: true,
    },
    notes: {
      type: String,
      maxlength: [2000, 'Notas não podem exceder 2000 caracteres'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Índices para otimização de busca
BookingSchema.index({ tour: 1, user: 1 });
BookingSchema.index({ 'contactInfo.email': 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ 'payment.status': 1 });
BookingSchema.index({ bookingReference: 1 });
BookingSchema.index({ createdAt: -1 });
BookingSchema.index({ 'dates.startDate': 1 });

// Virtual para calcular total de participantes
BookingSchema.virtual('participants.total').get(function (this: IBooking) {
  return this.participants.adults + (this.participants.children || 0) + (this.participants.infants || 0);
});

// Middleware para gerar referência da reserva antes de salvar
BookingSchema.pre<IBooking>('save', async function (next) {
  if (!this.isNew) return next();

  try {
    const generateReference = () => {
      const prefix = 'SKY';
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `${prefix}${timestamp}${random}`;
    };

    let reference = generateReference();

    // Verificar se a referência já existe (muito improvável, mas preventivo)
    const existingBooking = await mongoose.models.Booking.findOne({ bookingReference: reference });
    if (existingBooking) {
      reference = generateReference(); // Gerar novamente
    }

    this.bookingReference = reference;
    next();
  } catch (error: any) {
    next(error);
  }
});

// Middleware para calcular total do preço
BookingSchema.pre<IBooking>('save', function (next) {
  if (!this.isModified('pricing.basePrice') && !this.isModified('pricing.extras') && !this.isModified('pricing.discount')) {
    return next();
  }

  // Calcular total dos extras
  const extrasTotal = this.pricing.extras.reduce((sum, extra) => sum + extra.price, 0);

  // Aplicar desconto
  let discountAmount = 0;
  if (this.pricing.discount) {
    if (this.pricing.discount.amount) {
      discountAmount = this.pricing.discount.amount;
    } else if (this.pricing.discount.percentage) {
      discountAmount = (this.pricing.basePrice + extrasTotal) * (this.pricing.discount.percentage / 100);
    }
  }

  // Calcular total
  this.pricing.total = this.pricing.basePrice + extrasTotal - discountAmount;

  // Garantir que o total não seja negativo
  if (this.pricing.total < 0) {
    this.pricing.total = 0;
  }

  next();
});

// Método para verificar se a reserva pode ser cancelada
BookingSchema.methods.canCancel = function (): boolean {
  const booking = this as IBooking;
  const now = new Date();
  const startDate = new Date(booking.dates.startDate);

  // Não pode cancelar se a reserva já começou ou já está cancelada/completa
  if (now >= startDate || booking.status === 'cancelled' || booking.status === 'completed') {
    return false;
  }

  // Verificar política de cancelamento (exemplo: 48 horas antes)
  const hoursBeforeStart = (startDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  return hoursBeforeStart >= 48;
};

// Query middleware para popular referências
BookingSchema.pre<IBooking>(/^find/, function (next) {
  (this as any)
    .populate({
      path: 'tour',
      select: 'title image location duration price',
    })
    .populate({
      path: 'user',
      select: 'name email avatar',
    });

  next();
});

const Booking: Model<IBooking> = mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;