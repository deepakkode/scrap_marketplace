import React from 'react';
import ListingCard from '../../../components/ui/ListingCard';

const ResultsGrid = ({ 
  listings, 
  viewMode, 
  onContact, 
  onFavorite, 
  favoriteListings = [],
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-4 animate-pulse">
            <div className="aspect-video bg-muted rounded-lg mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
              <div className="flex justify-between">
                <div className="h-3 bg-muted rounded w-1/4"></div>
                <div className="h-3 bg-muted rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (listings?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 bg-muted-foreground/20 rounded"></div>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
        <p className="text-muted-foreground mb-4">
          Try adjusting your search criteria or filters to find what you're looking for.
        </p>
        <div className="text-sm text-muted-foreground">
          <p>Suggestions:</p>
          <ul className="mt-2 space-y-1">
            <li>• Check your spelling</li>
            <li>• Use more general terms</li>
            <li>• Remove some filters</li>
            <li>• Try different material types</li>
          </ul>
        </div>
      </div>
    );
  }

  const gridClasses = viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' :'space-y-4';

  return (
    <div className={gridClasses}>
      {listings?.map((listing) => (
        <ListingCard
          key={listing?.id}
          listing={listing}
          onContact={onContact}
          onFavorite={onFavorite}
          isFavorited={favoriteListings?.includes(listing?.id)}
          className={viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''}
        />
      ))}
    </div>
  );
};

export default ResultsGrid;