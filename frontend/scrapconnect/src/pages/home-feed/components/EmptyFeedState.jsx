import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../components/ui/AuthenticationGuard';

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

export default EmptyFeedState;