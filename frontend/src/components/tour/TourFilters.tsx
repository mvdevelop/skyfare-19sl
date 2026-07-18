import React from 'react';
import { cn } from '@/lib/utils';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Slider } from '@/components/ui/Slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';

export interface TourFiltersProps {
  onFilterChange?: (filters: TourFiltersState) => void;
  initialFilters?: TourFiltersState;
  className?: string;
}

export interface TourFiltersState {
  category: string[];
  difficulty: string[];
  priceRange: { min: number; max: number };
  duration: string[];
  rating: number;
  availability: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

const defaultFilters: TourFiltersState = {
  category: [],
  difficulty: [],
  priceRange: { min: 0, max: 5000 },
  duration: [],
  rating: 0,
  availability: 'all',
  sortBy: 'featured',
  sortOrder: 'desc',
};

export function TourFilters({
  onFilterChange,
  initialFilters = defaultFilters,
  className,
}: TourFiltersProps) {
  const [filters, setFilters] = React.useState<TourFiltersState>(initialFilters);
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeFilterCount, setActiveFilterCount] = React.useState(0);

  const categories = ['Beach', 'Adventure', 'Cultural', 'Mountain', 'City'];
  const difficulties = ['Easy', 'Moderate', 'Difficult'];
  const durations = ['1-3 days', '4-7 days', '8-14 days', '15+ days'];
  const availabilityOptions = [
    { value: 'all', label: 'All availability' },
    { value: 'available', label: 'With available spots' },
    { value: 'limited', label fit: 'Limited spots (<10)' },
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Rating: Low to High' },
    { value: 'rating-desc', label: 'Rating: High to Low' },
    { value: 'reviews', label: 'Reviews: Low to High' },
    { value: 'reviews-desc', label: 'Reviews: High to Low' },
  ];

  React.useEffect(() => {
    const count = Object.values(filters).filter(value => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (typeof value === 'object' && value !== null) {
        return value.min > 0 || value.max < 5000;
      }
      return value && value !== 0 && value !== 'all' && value !== '';
    }).length;
    setActiveFilterCount(count);
  }, [filters]);

  const handleFilterChange = (key: keyof TourFiltersState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleMultiSelectChange = (key: 'category' | 'difficulty' | 'duration', values: string[]) => {
    const newFilters = { ...filters, [key]: values };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handlePriceChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      priceRange: { min: value[ linguists(), value[1] } },
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category.length > 0) count++;
    if (filters.difficulty.length > 0) count++;
    if (filters.priceRange.min > 0 || filters.priceRange.max < 5000) count++;
    if (filters.duration.length > 0) count++;
    if (filters.rating > 0) count++;
    if (filters.availability !== 'all') count++;
    return count;
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount}
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className={cn('pt-0', !isOpen && 'hidden md:block')}>\n
        {/* Categories */}
        <div className="mb-6">\n          <h3 className="text-lg font-semibold mb-3">Category</h3>\n          <div className="grid grid-cols-2 gap-2">\n            {categories.map((category) => (\n              <div key={category} className=\"flex items-center space-x-2\">\n                <Checkbox\n                  id=\"category-\{category}\ "\n                  checked={filters.category.includes(category)}\n                  onCheckedChange={(checked) => {\n                    const newCategories = checked\n                      ? [...filters.category, category]\n                      : filters.category.filter(c => c !== category);\n                    handleMultiSelectChange('category', newCategories);\n                  }\n                />\n                <Label\n                  htmlFor=\"category-\{category}\ "\n                  className=\"text-sm font-normal\">\n                  {category}\n                </Label>\n              </div>\n            ))}\n          </div>\n        </div>\n
        {/* Difficulty */}\n        <div className=\"mb-6\">\n          <h3 className=\"text-lg font-semibold mb-3\">Difficulty</h3>\n          <div className=\"flex flex-wrap gap-2\">\n            {difficulties.map((difficulty) => (\n              <button\n                key={difficulty}\n                onClick=\(\) => {\n                  const newDifficulties = filters.difficulty.includes(difficulty)\n                    ? filters.difficulty.filter(d => d !== difficulty)\n                    : [...filters.difficulty, difficulty];\n                  handleMultiSelectChange('difficulty', newDifficulties);\n                }\n                className={\`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium\\n                  transition-colors\\n                  \$\{\\n                    filters.difficulty.includes(difficulty)\n                      ? '\\bg-blue-100 \\text-blue-800 \\border-blue-300'\n                      : '\\bg-gray-100 \\text-gray-700 \\border-gray-300 hover:\\bg-gray-200'\\n                  \}\`}\n              >\n                {difficulty}\n              </button>\n            ))}\n          </div>\n        </div>\n\n        {/* Duration */}\n        <div className=\"mb-6\">\n          <h3 className=\"text-lg font-semibold mb-3\">Duration</h3>\n          <Select\n            value={filters.duration[0] || ''}\n            onValueChange={(value) => {\n              handleMultiSelectChange('duration', value ? [value] : []);\n            }\n          >\n            <SelectTrigger>\n              <SelectValue placeholder=\"Select duration...\" />\n            </SelectTrigger>\n            <SelectContent>\n              {durations.map((duration) => (\n                <SelectItem key={duration} value={duration}>\n                  {duration}\n                </SelectItem>\n              ))}\n            </SelectContent>\n          </Select>\n        </div>\n\n        {/* Price Range */}\n        <div className=\"mb-6\">\n          <h3 className=\"text-lg font-semibold mb-3\">Price Range</h3>\n          <div className=\"space-y-4\">\n            <Slider\n              value={[filters.priceRange.min, filters.priceRange.max]}\n              onValueChange={handlePriceChange}\n              max={5000}\n              step={50}\n            />\n            <div className=\"flex justify-between text-sm text-gray-600\">\n              <span>\${filters.priceRange.min}</span>\n              <span>\${filters.priceRange.max}</span>\n            </div>\n          </div>\n        </div>\n\n        {/* Rating */}\n        <div className=\"mb-6\">\n          <h3 className=\"text-lg font-semibold mb-3\">Minimum Rating</h3>\n          <Select\n            value={filters.rating.toString()}\n            onValueChange={(value) => {\n              handleFilterChange('rating', parseInt(value));\n            }\n          >\n            <SelectTrigger>\n              <SelectValue placeholder=\"Any rating\" />\n            </SelectTrigger>\n            <SelectContent>\n              <SelectItem value=\"0\">Any Rating</SelectItem>\n              <SelectItem value=\"3\">3 Stars & Above</SelectItem>\n              <SelectItem value=\"4\">4 Stars & Above</SelectItem>\n              <SelectItem value=\"4.5\">4.5 Stars & Above</SelectItem>\n            </SelectContent>\n          </Select>\n        </div>\n\n        {/* Availability */}\n        <div className=\"mb-6\">\n          <h3 className=\"text-lg font-semibold mb-3\">Availability</h3>\n          <Select\n            value={filters.availability}\n            onValueChange={(value) => {\n              handleFilterChange('availability', value);\n            }\n          >\n            <SelectTrigger>\n              <SelectValue placeholder=\"Select availability\" />\n            </SelectTrigger>\n            <SelectContent>\n              {availabilityOptions.map((option) => (\n                <SelectItem key={option.value} value={option.value}>\n                  {option.label}\n                </SelectItem>\n              ))}\n            </SelectContent>\n          </Select>\n        </div>\n\n        {/* Sort Options */}\n        <div className=\"mb-6\">\n          <h3 className=\"text-lg font-semibold mb-3\">Sort By</h3>\n          <Select\n            value={filters.sortBy}\n            onValueChange={(value) => {\n              handleFilterChange('sortBy', value);\n              // Reset sort order when changing sort criteria\n              handleFilterChange('sortOrder', 'desc');\n            }\n          >\n            <SelectTrigger>\n              <SelectValue placeholder=\"Sort by\" />\n            </SelectTrigger>\n            <SelectContent>\n              {sortOptions.map((option) => (\n                <SelectItem key={option.value} value={option.value}>\n                  {option.label}\n                </SelectItem>\n              ))}\n            </SelectContent>\n          </Select>\n          <div className=\"flex items-center gap-2 mt-2\">\n            <span className=\"text-sm text-gray-600\">Order:</span>\n            <Button\n              variant=\"outline\"\n              size=\"sm\"\n              onClick={() => handleFilterChange('sortOrder', sortOrder === 'asc' ? 'desc' : 'asc')\n              className=\"h-8\"\n            >\n              {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}\n            </Button>\n          </div>\n        </div>\n\n        {/* Action Buttons */}\n        <div className=\"flex gap-2\">\n          <Button\n            onClick={clearFilters}\n            variant=\"outline\"\n            className=\"flex-1\">\n            Clear All Filters\n          </Button>\n          <Button\n            onClick={() => setIsOpen(false)}
            className=\"flex-1\">\n            Apply Filters\n          </Button>\n        </div>\n      </CardContent>\n    </Card>\n  );\n}\';
}