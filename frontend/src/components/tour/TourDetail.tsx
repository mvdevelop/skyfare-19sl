import React from 'react';
import { useParams } from 'next/navigation';
import { MapPin, Clock, Users, Star, Heart, Calendar, Check, Phone, Mail, Share2, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/Carousel';
import { StarRating } from '@/components/ui/StarRating';
import { Tour } from '@/types/tour';

interface TourDetailProps {
  tour?: Tour;
  onBack?: () => void;
}

export function TourDetail({ tour, onBack }: TourDetailProps) {
  const [isFavorited, setIsFavorited] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [showBookingForm, setShowBookingForm] = React.useState(false);

  // Mock tour data (replace with API call)
  const mockTour: Tour = tour || {
    id: 'tour-1',
    title: 'Maldives Paradise Escape',
    description: 'Experience the ultimate luxury getaway in the pristine waters of the Maldives. This all-inclusive resort package offers unlimited access to water sports, gourmet dining, and exclusive spa treatments.',
    price: 1899,
    currency: 'USD',
    rating: 4.8,
    reviewsCount: 234,
    location: 'Maldives',
    duration: '7 Days',
    startDate: '2024-03-15',
    endDate: '2024-03-22',
    category: 'Beach',
    difficulty: 'Easy',
    maxGuests: 10,
    availableSpots: 4,
    imageUrl: 'https://images.unsplash.com/photo-1518595555555-9e1776e33e5c?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1518595555555-9e1776e33e5c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503551026092-4001b0a03a01?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507525428074-02c5e442a936?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1510414442959-f0052f4dfc3b?w=800&h=600&fit=crop',
    ],
    inclusions: [
      'All meals and beverages (room service)',
      'Round-trip airport transfers',
      'Welcome cocktail party',
      'Daily water sports activities',
      'Unlimited diving lessons',
      'Safari tours and activities',
      'Photography workshops',
      'Wellness center access with spa treatments',
    ],

    schedule: [
      {
        day: 1,
        title: 'Arrival & Welcome',
        description: 'Transfer from airport to resort, check-in, welcome cocktail, evening relax',
      },
      {
        day: 2,
        title: 'Arrival & Welcome',
        description: 'Full day of poolside relaxation and welcome dinner',
      },
    ],

    locationHighlights: [
      {
        id: 'beach',
        title: 'Private White Sand Beaches',
        description: '300 meters of pristine white sand beach facing the Indian Ocean',
        image: 'https://images.unsplash.com/photo-1507525428074-02c5e442a936?w=400&h=300&fit=crop',
      },
      {
        id: 'water-sports',
        title: 'Water Sports Paradise',
        description: 'Unlimited access to snorkeling, kayaking, paddleboarding, and jet skiing',
        image: 'https://images.unsplash.com/photo-1518595555555-9e1776e33e5c?w=400&h=300&fit=crop',
      },
      {
        id: 'spa-wellness',
        title: 'Wellness & Spa',
        description: 'Nakupenda Spa offering traditional massages, therapies, and wellness treatments',
        image: 'https://images.unsplash.com/photo-1510414442959-f0052f4dfc3b?w=400&h=300&fit=crop',
      },
    ],

    reviews: [
      {
        id: 'review-1',
        userName: 'Sarah Johnson',
        userAvatar: 'https://api.dicebear.com/72x72/micra.svg?seed=sarah',
        rating: 5,
        date: '2024-02-15',
        title: 'Absolute Paradise!',
        content: 'The Maldives exceeded all my expectations. The staff was incredibly attentive, the food was gourmet, and the water activities were amazing. A truly unforgettable experience!',
      },
      {
        id: 'review-2',
        userName: 'Michael Chen',
        userAvatar: 'https://api.dicebear.com/72x72/micra.svg?seed=michael',
        rating: 4,
        date: '2024-01-20',
        title: 'Great vacation but slightly expensive',
        content: 'Beautiful resort and amazing service. The price was high but worth it for the luxury experience. Would recommend for couples or families looking for premium service.',
      },
    ],

    isFeatured: true,
    isTrending: true,
    isFavorited: false,
  };

  const currentTour = tour || mockTour;

  const getCategoryColor = (category: string) => {
    const colors = {
      Beach: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      Adventure: 'bg-orange-100 text-orange-800 border-orange-300',
      Cultural: 'bg-purple-100 text-purple-800 border-purple-300',
      Mountain: 'bg-slate-100 text-slate-800 border-slate-300',
      City: 'bg-blue-100 text-blue-800 border-blue-300',
    };
    return colors[category as keyof typeof colors] || colors.City;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Easy: 'bg-green-100 text-green-800',
      Moderate: 'bg-yellow-100 text-yellow-800',
      Difficult: 'bg-red-100 text-red-800',
    };
    return colors[difficulty as keyof typeof colors] || colors.Easy;
  };

  const handleBookNow = () => {
    setShowBookingForm(true);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Tours
        </button>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
        <span>Home</span>
        <span>/</span>
        <span>Tours</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">{currentTour.title}</span>
      </div>

      {/* Hero Section */}
      <div className="relative mb-8">
        <Carousel className="w-full">
          <CarouselContent>
            {currentTour.images.map((image, index) => (
              <CarouselItem key={index} className="aspect-video">
                <img
                  src={image}
                  alt={`${currentTour.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {currentTour.isFeatured && (
            <Badge className="bg-yellow-500 text-white font-semibold">
              Featured
            </Badge>
          )}
          {currentTour.isTrending && (
            <Badge className="bg-red-500 text-white font-semibold">
              Trending
            </Badge>
          )}
          <Badge className={getCategoryColor(currentTour.category)}>
            {currentTour.category}
          </Badge>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart
            className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {currentTour.title}
          </h1>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <StarRating rating={currentTour.rating} />{
              <span className="font-semibold text-gray-900 ml-2">
                {currentTour.rating}
              </span>
              }
            </div>
            <span className="text-gray-500">
              ({currentTour.reviewsCount} reviews)
            </span>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-xs text-gray-500">Location</div>
                <div className="font-semibold">{currentTour.location}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-xs text-gray-500">Duration</div>
                <div className="font-semibold">{currentTour.duration}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-xs text-gray-500">Guests</div>
                <div className="font-semibold">Max {currentTour.maxGuests}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-xs text-gray-500">Available</div>
                <div className="font-semibold">{currentTour.availableSpots} spots left</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">About This Tour</h2>
            <p className="text-gray-700 leading-relaxed">
              {currentTour.description}
            </p>
          </div>

          {/* Inclusions */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentTour.inclusions.map((inclusion, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">{inclusion}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Highlights */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Location Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentTour.locationHighlights.map((highlight) => (
                <div key={highlight.id} className="text-center">
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tour Schedule */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Tour Schedule</h2>
            <div className="space-y-4">
              {currentTour.schedule.map((day) => (
                <Card key={day.day} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 text-blue-800 font-semibold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        Day {day.day}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {day.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {day.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            <div className="space-y-4">
              {currentTour.reviews.map((review) => (
                <Card key={review.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">
                            {review.userName}
                          </h4>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <StarRating rating={review.rating} />
                          <span className="font-medium text-gray-700">
                            {review.rating}.0
                          </span>
                        </div>
                        <h5 className="font-medium text-gray-900 mb-2">
                          {review.title}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {review.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Book This Tour</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-gray-900">
                ${currentTour.price}
                <span className="text-lg font-normal text-gray-600 ml-1">
                  {currentTour.currency}
                </span>
              </div>

              {currentTour.originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  ${currentTour.originalPrice} {currentTour.currency}
                </div>
              )}

              <div className="text-sm text-green-600 font-medium">
                Save ${currentTour.originalPrice ? currentTour.originalPrice - currentTour.price : 0} on this tour!
              </div>

              <Button
                onClick={handleBookNow}
                className="w-full"
                size="lg"
              >
                Book Now
              </Button>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Tour Includes</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Accommodation & Meals</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Airport Transfers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Activities & Excursions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Guide Services</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>info@tourcompany.com</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Tour Booking</CardTitle>
              <button
                onClick={() => setShowBookingForm(false)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent>
              <p>Booking form will be implemented here...</p>
            </CardContent>
          </Card>

        </div>
      )}

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <ChevronLeft className="h-5 w-5 rotate-90" />
      </button>
    </div>
  );

  export default TourDetail;