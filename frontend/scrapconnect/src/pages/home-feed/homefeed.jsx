import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';
import { useAuth } from '../../../components/ui/AuthenticationGuard';


// --- ContactModal.jsx ---
const ContactModal = ({ isOpen, onClose, listing, user }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message?.trim()) return;
    
    setIsLoading(true);
    
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create mailto link with pre-filled content
    const subject = `Inquiry about ${listing?.title}`;
    const body = `Hi ${listing?.seller?.name || 'there'},\n\nI'm interested in your ${listing?.material} listing:\n\nTitle: ${listing?.title}\nQuantity: ${listing?.quantity} ${listing?.unit}\nPrice: ${listing?.price} per ${listing?.unit}\n\nMessage:\n${message}\n\nBest regards,\n${user?.name || 'Buyer'}`;
    
    const mailtoLink = `mailto:${listing?.seller?.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
    
    setIsLoading(false);
    setMessage('');
    onClose();
  };

  const handleDirectEmail = () => {
    const subject = `Inquiry about ${listing?.title}`;
    const mailtoLink = `mailto:${listing?.seller?.email}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoLink, '_blank');
  };

  const handleDirectCall = () => {
    if (listing?.seller?.phone) {
      window.open(`tel:${listing?.seller?.phone}`, '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            Contact Seller
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Listing Info */}
          <div className="p-3 bg-muted rounded-lg">
            <h3 className="font-medium text-foreground mb-1">{listing?.title}</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <div className="flex items-center space-x-2">
                <Icon name="Package" size={14} />
                <span>{listing?.quantity} {listing?.unit} of {listing?.material}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={14} />
                <span className="font-mono">{listing?.price} per {listing?.unit}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={14} />
                <span>{listing?.location}</span>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="var(--color-muted-foreground)" />
              </div>
              <div>
                <div className="font-medium text-foreground">
                  {listing?.seller?.name || 'Anonymous Seller'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {listing?.seller?.email}
                </div>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDirectEmail}
                iconName="Mail"
                iconPosition="left"
                className="flex-1"
              >
                Email
              </Button>
              
              {listing?.seller?.phone && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDirectCall}
                  iconName="Phone"
                  iconPosition="left"
                  className="flex-1"
                >
                  Call
                </Button>
              )}
            </div>
          </div>

          {/* Message Form */}
          <div className="space-y-3">
            <Input
              label="Your Message"
              type="text"
              placeholder="Write your inquiry message..."
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              description="This will be included in the email to the seller"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSendMessage}
              loading={isLoading}
              disabled={!message?.trim()}
              iconName="Send"
              iconPosition="left"
              className="flex-1"
            >
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- EmptyFeedState.jsx ---
const EmptyFeedState = ({ hasFilters, onClearFilters }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCreateListing = () => {
    if (user?.role === 'Seller') {
      navigate('/upload-page');
    } else {
      navigate('/register-screen');
    }
  };

  const handleExplore = () => {
    navigate('/explore-page');
  };

  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No materials found
        </h3>
        
        <p className="text-muted-foreground text-center mb-6 max-w-md">
          We couldn't find any scrap materials matching your current filters. Try adjusting your search criteria or browse all available materials.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            onClick={onClearFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Clear Filters
          </Button>
          
          <Button
            variant="outline"
            onClick={handleExplore}
            iconName="Search"
            iconPosition="left"
          >
            Browse All Materials
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="Package" size={32} color="var(--color-muted-foreground)" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Welcome to ScrapConnect
      </h3>
      
      <p className="text-muted-foreground text-center mb-6 max-w-md">
        No scrap material listings available yet. Be the first to start trading on our platform by creating a listing or exploring what others have to offer.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {user?.role === 'Seller' ? (
          <Button
            variant="default"
            onClick={handleCreateListing}
            iconName="Plus"
            iconPosition="left"
          >
            Create First Listing
          </Button>
        ) : (
          <Button
            variant="default"
            onClick={() => navigate('/register-screen')}
            iconName="UserPlus"
            iconPosition="left"
          >
            Join as Seller
          </Button>
        )}
        
        <Button
          variant="outline"
          onClick={handleExplore}
          iconName="Search"
          iconPosition="left"
        >
          Explore Materials
        </Button>
      </div>
      
      <div className="mt-8 p-4 bg-muted rounded-lg max-w-md">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} color="var(--color-accent)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              Getting Started
            </h4>
            <p className="text-xs text-muted-foreground">
              Sellers can upload scrap materials with photos, quantities, and pricing. Buyers can browse, filter, and contact sellers directly via email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- FeedCard.jsx ---
const FeedCard = ({ listing, onContact, onFavorite, isFavorited = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    id,
    title,
    material,
    price,
    quantity,
    unit = 'kg',
    location,
    seller,
    images = [],
    description,
    condition,
    postedDate
  } = listing;

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `$${price?.toFixed(2)}`;
    }
    return price;
  };

  const formatDate = (date) => {
    if (!date) return '';
    const now = new Date();
    const postDate = new Date(date);
    const diffTime = Math.abs(now - postDate);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return postDate?.toLocaleDateString();
  };

  const getMaterialColor = (material) => {
    const colors = {
      plastic: 'bg-blue-100 text-blue-800',
      cotton: 'bg-green-100 text-green-800',
      iron: 'bg-gray-100 text-gray-800',
      steel: 'bg-slate-100 text-slate-800',
      aluminum: 'bg-purple-100 text-purple-800',
      copper: 'bg-orange-100 text-orange-800'
    };
    return colors?.[material?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const handleContact = () => {
    if (onContact) {
      onContact(listing);
    }
  };

  const handleFavorite = () => {
    if (onFavorite) {
      onFavorite(listing);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={images?.[0] || '/assets/images/no_image.png'}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 shadow-sm"
        >
          <Icon 
            name="Heart" 
            size={16} 
            color={isFavorited ? '#E53E3E' : '#718096'}
            className={isFavorited ? 'fill-current' : ''}
          />
        </button>

        {/* Material Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMaterialColor(material)}`}>
            {material}
          </span>
        </div>

        {/* Condition Badge */}
        {condition && (
          <div className="absolute bottom-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              condition === 'Excellent' ? 'bg-success text-success-foreground' :
              condition === 'Good' ? 'bg-accent text-accent-foreground' :
              condition === 'Fair' ? 'bg-warning text-warning-foreground' :
              'bg-muted text-muted-foreground'
            }`}>
              {condition}
            </span>
          </div>
        )}
      </div>
      {/* Content Section */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate mb-1">
              {title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Package" size={14} />
              <span className="font-mono">{quantity} {unit} available</span>
            </div>
          </div>
          <div className="text-right ml-3">
            <div className="text-xl font-bold text-foreground font-mono">
              {formatPrice(price)}
            </div>
            <div className="text-sm text-muted-foreground">
              per {unit}
            </div>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Location and Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span>{location}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDate(postedDate)}
          </div>
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between mb-4 p-2 bg-muted rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center">
              <Icon name="User" size={14} color="var(--color-muted-foreground)" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">
                {seller?.name || 'Anonymous Seller'}
              </div>
              <div className="text-xs text-muted-foreground">
                {seller?.email}
              </div>
            </div>
          </div>
          {seller?.rating && (
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} color="#D69E2E" className="fill-current" />
              <span className="text-xs font-medium">{seller?.rating}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={handleContact}
            iconName="MessageCircle"
            iconPosition="left"
            className="flex-1"
          >
            Contact
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`mailto:${seller?.email}`, '_blank')}
            iconName="Mail"
            iconPosition="left"
          >
            Email
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- FeedSkeleton.jsx ---
const FeedSkeleton = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count })?.map((_, index) => (
        <div key={index} className="bg-card rounded-lg border border-border shadow-subtle overflow-hidden animate-pulse">
          {/* Image Skeleton */}
          <div className="aspect-video bg-muted"></div>
          
          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
              <div className="space-y-1 text-right">
                <div className="h-6 bg-muted rounded w-16"></div>
                <div className="h-3 bg-muted rounded w-12"></div>
              </div>
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
            
            {/* Location and Date */}
            <div className="flex items-center justify-between">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-3 bg-muted rounded w-16"></div>
            </div>
            
            {/* Seller Info */}
            <div className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-background rounded-full"></div>
              <div className="flex-1 space-y-1">
                <div className="h-4 bg-background rounded w-20"></div>
                <div className="h-3 bg-background rounded w-32"></div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-2">
              <div className="h-8 bg-muted rounded flex-1"></div>
              <div className="h-8 bg-muted rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

// --- FilterChips.jsx ---
const FilterChips = ({ activeFilters, onFilterChange, onClearAll }) => {
  const materialTypes = [
    { value: 'all', label: 'All Materials', icon: 'Package' },
    { value: 'plastic', label: 'Plastic', icon: 'Recycle' },
    { value: 'cotton', label: 'Cotton', icon: 'Shirt' },
    { value: 'iron', label: 'Iron', icon: 'Wrench' },
    { value: 'steel', label: 'Steel', icon: 'HardHat' },
    { value: 'aluminum', label: 'Aluminum', icon: 'Zap' },
    { value: 'copper', label: 'Copper', icon: 'Cable' }
  ];

  const handleChipClick = (value) => {
    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  const isActive = (value) => {
    return activeFilters?.includes(value) || (value === 'all' && activeFilters?.length === 0);
  };

  const hasActiveFilters = activeFilters?.length > 0;

  return (
    <div className="bg-card border-b border-border sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-muted-foreground">
            Filter by Material
          </h2>
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="text-xs text-accent hover:text-accent/80 transition-smooth"
            >
              Clear all
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
          {materialTypes?.map((material) => (
            <button
              key={material?.value}
              onClick={() => handleChipClick(material?.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isActive(material?.value)
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              <Icon 
                name={material?.icon} 
                size={14} 
                color={isActive(material?.value) ? 'currentColor' : 'var(--color-muted-foreground)'}
              />
              <span>{material?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


export { ContactModal, EmptyFeedState, FeedCard, FeedSkeleton, FilterChips };