import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Search, Grid, List, Filter, SortAsc, Calendar, MapPin, Clock, Users, Star, Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Slider } from '@/components/ui/Slider';
import { TourCard } from './TourCard';
import { Tour } from '@/types/tour';

export interface TourListProps {
  tours: Tour[];
  title?: string;
  description?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  showSorting?: boolean;
  showViewToggle?: boolean;
  initialLayout?: 'grid' | 'list';
  itemsPerPage?: number;
  className?: string;
}

export function TourList({
  tours,
  title = 'Discover Amazing Tours',
  description = 'Find your perfect travel experience with our curated collection of tours',
  showSearch = true,
  showFilters = true,
  showSorting = true,
  showViewToggle = true,
  initialLayout = 'grid',
  itemsPerPage = 12,
  className = ''
}: TourListProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 5000 });
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [isFavoritedOnly, setIsFavoritedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [layout, setLayout] = useState<'grid' | 'list'>(initialLayout);

  // Filter and Sort Functions
  const categories = ['all', ...Array.from(new Set(tours.map(tour => tour.category)))];
  const difficulties = ['all', ...Array.from(new Set(tours.map(tour => tour.difficulty)))];
  const durations = ['all', ...Array.from(new Set(tours.map(tour => tour.duration)))];

  const filteredTours = useMemo(() => {
    let filtered = tours.filter(tour => {
      if (searchTerm && !tour.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !tour.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !tour.location.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      if (selectedCategory !== 'all' && tour.category !== selectedCategory) {
        return false;
      }

      if (selectedDifficulty !== 'all' && tour.difficulty !== selectedDifficulty) {
        return false;
      }

      if (tour.price < priceRange.min || tour.price > priceRange.max) {
        return false;
      }

      if (selectedDuration !== 'all' && tour.duration !== selectedDuration) {
        return false;
      }

      if (selectedRating > 0 && tour.rating < selectedRating) {
        return false;
      }

      if (isFavoritedOnly && !tour.isFavorited) {
        return false;
      }

      return true;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'price-desc':
          aValue = b.price;
          bValue = a.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'rating-desc':
          aValue = b.rating;
          bValue = a.rating;
          break;
        case 'reviews':
          aValue = a.reviewsCount;
          bValue = b.reviewsCount;
          break;
        case 'reviews-desc':
          aValue = b.reviewsCount;
          bValue = a.reviewsCount;
          break;
        case 'newest':
          aValue = new Date(a.startDate).getTime();
          bValue = new Date(b.startDate).getTime();
          break;
        case 'newest-desc':
          aValue = new Date(b.startDate).getTime();
          bValue = new Date(a.startDate).getTime();
          break;
        case 'featured':
          aValue = a.isFeatured ? 1 : 0;
          bValue = b.isFeatured ? 1 : 0;
          break;
        default:
          aValue = a.title;
          bValue = b.title;
      }

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [
    tours,
    searchTerm,
    selectedCategory,
    selectedDifficulty,
    priceRange,
    selectedDuration,
    selectedRating,
    isFavoritedOnly,
    sortBy,
    sortOrder,
  ]);

  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);

  const paginatedTours = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTours.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTours, currentPage, itemsPerPage]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    set currentPage(1);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange({ min: value[0], max: value[1] });
    setCurrentPage(1);
  };

  return (
    <div classUnderStyled={cn('w-full max-w-7xl mx-auto px-4 py-8', className)}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Search and Controls Bar */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          {showSearch && (
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search tours, destinations...
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          )}

          {/* Filters Toggle */}
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              {/* Categories */}
              <Select
                value={selectedCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Difficulty */}
              <Select
                value={selectedDifficulty}
                onValueChange={(value) => {
                  setSelectedDifficulty(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty === 'all' ? 'All Difficulties' : difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Duration */}
              <Select
                value={selectedDuration}
                onValueChange={(value) => {
                  setSelectedDuration(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration === 'all' ? 'All Durations' : duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price Range */}
              <div className="w-64">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range</label>
                <Slider
                  value={[priceRange.min, priceRange.max]}
                  onValueChange={handlePriceChange}
                  max={5000}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
              </div>

              {/* Rating */}
              <Select
                value={selectedRating.toString()}
                onValueChange={(value) => {
                  setSelectedRating(parseInt(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Min Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any Rating</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                </SelectContent>
              </Select>

              {/* Favorites */}
              {showViewToggle && (
                <div className="flex items-center space-x-2 ml-auto">
                  <Checkbox
                    id="favorites-only"
                    checked={isFavoritedOnly}
                    onCheckedChange={(checked) => {
                      setIsFavoritedOnly(checked as boolean);
                      setCurrentPage(1);
                    }}
                  />
                  <label htmlFor="favorites-only" className="text-sm font-medium text-gray-700">
                    <Heart className="inline h-4 w-4 mr-1 text-red-500" />
                    Favorites only
                  </label>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sort Bar */}
      {showSorting && (
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            {filteredTours.length} tours found
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select
              value={sortBy}
              onValueChange={(value) => {
                setSortBy(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="newest-desc">Oldest First</SelectItem>
                <SelectItem value="price">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating: Low to High</SelectItem>
                <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
                <SelectItem value="reviews">Reviews: Low to High</SelectItem>
                <SelectItem value="reviews-desc">Reviews: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              <SortAsc className="h-4 w-4 mr-1" />
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </Button>

{/* View Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={layout === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLayout('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={layout === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLayout('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Tours Display */}
      <div className="mb-8">
        {paginatedTours.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h3>
            <p className="text-gray-600">Try adjusting your filters to find more tours.</p>
          </div>
        ) : (
          layout === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedTours.map((tour) => (
                <TourCard key={tour.id} {...tour} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedTours.map((tour) => (
                <TourCard key={tour.id} {...tour} layout="list" />
              ))}
            </div>
          )
        )
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber = i + 1;
              if (pageNumber > totalPages) return null;

              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            })}

            {totalPages > 5 && (
              <>
                <span className="text-gray-500">...</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}