export interface Tour {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  mainImage?: string;
  category?: string;
  difficulty?: string;
  duration?: string;
  rating?: number;
  reviewsCount?: number;
  description?: string;
  startDate?: string;
  isFeatured?: boolean;
  isFavorited?: boolean;
  maxGuests?: number;
  // For compatibility with existing data structure
  tours?: Tour[];
}

export type TourDifficulty = 'easy' | 'moderate' | 'difficult';
export type TourCategory = 'beach' | 'mountain' | 'city' | 'island' | 'adventure';
export type TourDuration = '1-day' | '3-day' | '5-day' | '7-day' | '10-day';

export interface TourFilters {
  searchTerm: string;
  category: string;
  difficulty: string;
  priceRange: { min: number; max: number };
  duration: string;
  rating: number;
  isFavoritedOnly: boolean;
  sortBy: 'featured' | 'price' | 'price-desc' | 'rating' | 'rating-desc' | 'reviews' | 'reviews-desc' | 'newest' | 'newest-desc';
  sortOrder: 'asc' | 'desc';
  currentPage: number;
}