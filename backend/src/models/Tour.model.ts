import mongoose, { Schema, Document, Model } from 'mongoose';
import slugify from 'slugify';

export interface ITour extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  location: string;
  price: number;
  duration: string;
  groupSize: number;
  difficulty: 'Easy' | 'Moderate' | 'Difficult';
  image: string;
  images: string[];
  category: 'Adventure' | 'Cultural' | 'Beach' | 'Mountain' | 'City';
  highlights: string[];
  includes: string[];
  excludes: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  ratings: {
    average: number;
    count: number;
    reviews: {
      user: mongoose.Types.ObjectId;
      rating: number;
      comment: string;
      createdAt: Date;
    }[];
  };
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TourSchema: Schema<ITour> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'O título é obrigatório'],
      trim: true,
      maxlength: [200, 'O título não pode exceder 200 caracteres'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'A descrição é obrigatória'],
      minlength: [100, 'A descrição deve ter pelo menos 100 caracteres'],
    },
    shortDescription: {
      type: String,
      required: [true, 'A descrição curta é obrigatória'],
      maxlength: [500, 'A descrição curta não pode exceder 500 caracteres'],
    },
    location: {
      type: String,
      required: [true, 'A localização é obrigatória'],
    },
    price: {
      type: Number,
      required: [true, 'O preço é obrigatório'],
      min: [0, 'O preço deve ser maior que 0'],
    },
    duration: {
      type: String,
      required: [true, 'A duração é obrigatória'],
      enum: ['1-3 days', '4-7 days', '8-14 days', '15+ days'],
    },
    groupSize: {
      type: Number,
      required: [true, 'O tamanho do grupo é obrigatório'],
      min: [1, 'O tamanho do grupo deve ser pelo menos 1'],
      max: [50, 'O tamanho do grupo não pode exceder 50'],
    },
    difficulty: {
      type: String,
      required: [true, 'A dificuldade é obrigatória'],
      enum: ['Easy', 'Moderate', 'Difficult'],
    },
    image: {
      type: String,
      required: [true, 'A imagem principal é obrigatória'],
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (images: string[]) => images.length <= 10,
        message: 'Não pode exceder 10 imagens',
      },
    },
    category: {
      type: String,
      required: [true, 'A categoria é obrigatória'],
      enum: ['Adventure', 'Cultural', 'Beach', 'Mountain', 'City'],
    },
    highlights: {
      type: [String],
      required: [true, 'Os destaques são obrigatórios'],
      validate: {
        validator: (highlights: string[]) => highlights.length > 0,
        message: 'Pelo menos um destaque é necessário',
      },
    },
    includes: {
      type: [String],
      default: [],
    },
    excludes: {
      type: [String],
      default: [],
    },
    itinerary: [
      {
        day: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: [0, 'A avaliação não pode ser menor que 0'],
        max: [5, 'A avaliação não pode ser maior que 5'],
      },
      count: {
        type: Number,
        default: 0,
      },
      reviews: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
          rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
          },
          comment: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Índices para otimização de busca
TourSchema.index({ title: 'text', description: 'text', location: 'text' });
TourSchema.index({ price: 1 });
TourSchema.index({ category: 1 });
TourSchema.index({ difficulty: 1 });
TourSchema.index({ isFeatured: 1 });
TourSchema.index({ isActive: 1 });
TourSchema.index({ 'ratings.average': -1 });

// Middleware para gerar slug antes de salvar
TourSchema.pre<ITour>('save', function (next) {
  if (!this.isModified('title')) return next();

  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });

  next();
});

// Método para calcular a média das avaliações
TourSchema.methods.calculateAverageRating = function (): void {
  const tour = this as any;
  const reviews = tour.ratings.reviews;

  if (reviews.length === 0) {
    tour.ratings.average = 0;
    tour.ratings.count = 0;
  } else {
    const total = reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
    tour.ratings.average = total / reviews.length;
    tour.ratings.count = reviews.length;
  }
};

// Método para adicionar uma avaliação
TourSchema.methods.addReview = function (
  userId: string,
  rating: number,
  comment: string
): void {
  const tour = this as any;

  tour.ratings.reviews.push({
    user: userId,
    rating,
    comment,
    createdAt: new Date(),
  });

  tour.calculateAverageRating();
};

// Query middleware para filtrar tours ativos por padrão
TourSchema.pre<ITour>(/^find/, function (next) {
  (this as any).where({ isActive: true });
  next();
});

const Tour: Model<ITour> = mongoose.model<ITour>('Tour', TourSchema);

export default Tour;