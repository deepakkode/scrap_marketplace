import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import ListingCard from '../../../components/ui/ListingCard';

/* ---------------- ActiveFilters ---------------- */
export const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }) => {
  const getActiveFilters = () => {
    const active = [];

    if (filters?.material) {
      active.push({
        key: 'material',
        label: `Material: ${filters?.material}`,
        value: filters?.material
      });
    }

    if (filters?.priceMin || filters?.priceMax) {
      const priceLabel = `Price: $${filters?.priceMin || '0'} - $${filters?.priceMax || '∞'}`;
      active.push({
        key: 'price',
        label: priceLabel,
        value: 'price'
      });
    }

    if (filters?.location) {
      active.push({
        key: 'location',
        label: `Location: ${filters?.location}`,
        value: filters?.location
      });
    }

    if (filters?.condition && filters?.condition?.length > 0) {
      active.push({
        key: 'condition',
        label: `Condition: ${filters?.condition?.join(', ')}`,
        value: filters?.condition
      });
    }

    if (filters?.quantity) {
      active.push({
        key: 'quantity',
        label: `Min Quantity: ${filters?.quantity} kg`,
        value: filters?.quantity
      });
    }

    if (filters?.seller) {
      active.push({
        key: 'seller',
        label: `Seller: ${filters?.seller}`,
        value: filters?.seller
      });
    }

    if (filters?.dateRange) {
      const dateLabels = {
        today: 'Today',
        week: 'This week',
        month: 'This month',
        '3months': 'Last 3 months'
      };
      active.push({
        key: 'dateRange',
        label: `Posted: ${dateLabels?.[filters?.dateRange] || filters?.dateRange}`,
        value: filters?.dateRange
      });
    }

    return active;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters?.length === 0) {
    return null;
  }

  return (
    <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">Active Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          iconName="X"
          iconPosition="left"
          className="text-xs"
        >
          Clear All
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {activeFilters?.map((filter) => (
          <div
            key={filter?.key}
            className="flex items-center space-x-2 bg-card border border-border rounded-full px-3 py-1 text-sm"
          >
            <span className="text-foreground">{filter?.label}</span>
            <button
              onClick={() => onRemoveFilter(filter?.key)}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------- Pagination ---------------- */
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
  resultsPerPage
}) => {
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages();

  return (
    <div className="bg-card border border-border rounded-lg p-4 mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{startResult}</span> to{' '}
          <span className="font-medium text-foreground">{endResult}</span> of{' '}
          <span className="font-medium text-foreground">{totalResults?.toLocaleString()}</span> results
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconPosition="left"
            className="px-3"
          >
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="flex items-center space-x-1">
            {visiblePages?.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-muted-foreground">...</span>
                ) : (
                  <Button
                    variant={currentPage === page ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onPageChange(page)}
                    className="w-10 h-10 p-0"
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
            className="px-3"
          >
            <span className="hidden sm:inline">Next</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- ResultsGrid ---------------- */
export const ResultsGrid = ({
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

  const gridClasses = viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4';

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

/* ---------------- SearchBar ---------------- */
export const SearchBar = ({ onSearch, searchQuery, onSearchChange }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery || '');

  const handleSearch = (e) => {
    e?.preventDefault();
    if (onSearch) {
      onSearch(localQuery);
    }
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setLocalQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const clearSearch = () => {
    setLocalQuery('');
    if (onSearchChange) {
      onSearchChange('');
    }
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <form onSubmit={handleSearch} className="flex space-x-3">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={20} color="var(--color-muted-foreground)" />
          </div>
          <Input
            type="text"
            placeholder="Search scrap materials, sellers, locations..."
            value={localQuery}
            onChange={handleInputChange}
            className="pl-10 pr-10"
          />
          {localQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <Icon name="X" size={16} color="var(--color-muted-foreground)" />
            </button>
          )}
        </div>
        <Button
          type="submit"
          variant="default"
          iconName="Search"
          iconPosition="left"
          className="px-6"
        >
          Search
        </Button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Popular searches:</span>
        {['Steel scrap', 'Aluminum cans', 'Copper wire', 'Plastic bottles']?.map((term) => (
          <button
            key={term}
            onClick={() => {
              setLocalQuery(term);
              if (onSearch) onSearch(term);
            }}
            className="text-sm text-accent hover:text-accent/80 underline transition-smooth"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ---------------- SortControls ---------------- */
export const SortControls = ({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  resultsCount,
  onToggleFilters,
  showMobileFilters
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'quantity-high', label: 'Quantity: High to Low' },
    { value: 'quantity-low', label: 'Quantity: Low to High' },
    { value: 'date-new', label: 'Newest First' },
    { value: 'date-old', label: 'Oldest First' },
    { value: 'location', label: 'Nearest First' }
  ];

  const viewModeOptions = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center justify-between sm:justify-start space-x-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {resultsCount?.toLocaleString()}
            </span> results found
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFilters}
            iconName="Filter"
            iconPosition="left"
            className="lg:hidden"
          >
            {showMobileFilters ? 'Hide' : 'Show'} Filters
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground hidden sm:block">Sort by:</span>
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              className="min-w-[160px]"
            />
          </div>

          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            {viewModeOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => onViewModeChange(option?.value)}
                className={`px-3 py-2 flex items-center space-x-1 text-sm transition-smooth ${
                  viewMode === option?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={option?.label}
              >
                <Icon name={option?.icon} size={16} />
                <span className="hidden sm:inline">{option?.label?.split(' ')?.[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
