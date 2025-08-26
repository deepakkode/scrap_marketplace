import React, { useState } from 'react';
import Image from '../AppImage';
import Icon from '../AppIcon';
import Button from './Button';

const ListingCard = ({ 
  listing, 
  onContact, 
  onFavorite, 
  isFavorited = false,
  showContactInfo = true,
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    id,
    title,
    material,
    price,
    quantity,
    unit,
    location,
    seller,
    images = [],
    description,
    condition,
    postedDate,
    specifications = {}
  } = listing;

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `$${price?.toLocaleString()}`;
    }
    return price;
  };

  const formatDate = (date) => {
    if (!date) return '';
    const now = new Date();
    const postDate = new Date(date);
    const diffTime = Math.abs(now - postDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return postDate?.toLocaleDateString();
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
    <div className={`bg-card rounded-lg border border-border shadow-subtle hover:shadow-card transition-smooth ${className}`}>
      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        <Image
          src={images?.[0] || '/assets/images/no_image.png'}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-smooth"
        >
          <Icon 
            name={isFavorited ? 'Heart' : 'Heart'} 
            size={16} 
            color={isFavorited ? '#E53E3E' : '#718096'}
            className={isFavorited ? 'fill-current' : ''}
          />
        </button>

        {/* Condition Badge */}
        {condition && (
          <div className="absolute top-3 left-3">
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
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {material}
            </p>
          </div>
          <div className="text-right ml-3">
            <div className="text-lg font-bold text-foreground font-mono">
              {formatPrice(price)}
            </div>
            <div className="text-sm text-muted-foreground">
              per {unit}
            </div>
          </div>
        </div>

        {/* Quantity and Location */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="Package" size={14} />
            <span className="font-mono">{quantity} {unit} available</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span>{location}</span>
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="mb-3">
            <p className={`text-sm text-muted-foreground ${
              !isExpanded ? 'line-clamp-2' : ''
            }`}>
              {description}
            </p>
            {description?.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-accent hover:text-accent/80 mt-1 transition-smooth"
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        )}

        {/* Specifications */}
        {Object.keys(specifications)?.length > 0 && (
          <div className="mb-3 p-2 bg-muted rounded-lg">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(specifications)?.slice(0, 4)?.map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-muted-foreground capitalize">{key}:</span>
                  <span className="font-medium font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Seller Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Icon name="User" size={14} color="var(--color-muted-foreground)" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">
                {seller?.name || 'Anonymous Seller'}
              </div>
              <div className="text-xs text-muted-foreground">
                {seller?.rating && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} color="#D69E2E" className="fill-current" />
                    <span>{seller?.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDate(postedDate)}
          </div>
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
            Contact Seller
          </Button>
          
          {showContactInfo && seller?.email && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`mailto:${seller?.email}`, '_blank')}
              iconName="Mail"
              iconPosition="left"
            >
              Email
            </Button>
          )}
          
          {seller?.phone && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`tel:${seller?.phone}`, '_blank')}
              iconName="Phone"
              iconPosition="left"
            >
              Call
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;