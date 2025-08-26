import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

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

export default FeedCard;