import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MapPin, Clock, Users, Star, Heart, Calendar, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

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
}

export interface TourCardProps extends Tour {
  layout?: 'grid' | 'list';
}

export function TourCard({
  id,
  title,
  location,
  price,
  image,
  mainImage,
  category,
  difficulty,
  duration,
  rating = 4.5,
  reviewsCount = 128,
  description,
  startDate,
  isFeatured = false,
  isFavorited = false,
  maxGuests,
  layout = 'grid',
}: TourCardProps) {
  // Parse price from string like "$ 400" to number
  const priceNumber = React.useMemo(() => {
    const match = price.match(/\$(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }, [price]);

  return (
    <Card
      className={cn(
        "group hover:shadow-lg transition-all duration-300",
        layout === 'list' && "flex md:flex-row flex-col"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          layout === 'grid' ? "aspect-video" : "md:w-64 w-full"
        )}
      >
        <img
          src={mainImage || image}
          alt={title}
          className={cn(
            "w-full h-full object-cover",
            "group-hover:scale-105 transition-transform duration-300"
          )}
        />

        {isFeatured && (
          <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
            Featured
          </Badge>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-white/20"
        >
          <Heart
            className={cn(
              "h-4 w-4",
              isFavorited ? "fill-red-500 text-red-500" : "text-gray-400"
            )}
          />
        </Button>
      </div>

      <CardContent
        className={cn(
          "p-4",
          layout === 'list' && "flex-1 md:p-6"
        )}
      >
        <div className="space-y-3">
          {/* Header */}
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
              {title}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-3 w-3 mr-1" />
              {location}
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            {difficulty && (
              <div className="flex items-center">
                <span className="capitalize">{difficulty}</span>
              </div>
            )}

            {duration && (
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {duration}
              </div>
            )}

            {maxGuests && (
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {maxGuests} guests
              </div>
            )}

            <div className="flex items-center">
              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
              {rating} ({reviewsCount} reviews)
            </div>
          </div>

          {/* Description */}
          {description && layout === 'grid' && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {description}
            </p>
          )}

          {/* Price and Calendar */}
          <div
            className={cn(
              "flex justify-between items-end",
              layout === 'list' && "pt-4 border-t"
            )}
          >
            <div>
              <div className="text-xs text-gray-500">Starting from</div>
              <div className="text-xl font-bold text-blue-600">
                ${priceNumber.toLocaleString()}
              </div>
            </div>

            {startDate && (
              <div className="text-right">
                <div className="text-xs text-gray-500">Starts</div>
                <div className="text-sm font-medium">
                  {new Date(startDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" size="sm">
              View Details
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-3 w-3 mr-1" />
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}