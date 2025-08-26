import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SortControls = ({ 
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
        {/* Results Count and Mobile Filter Toggle */}
        <div className="flex items-center justify-between sm:justify-start space-x-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {resultsCount?.toLocaleString()}
            </span> results found
          </div>
          
          {/* Mobile Filter Toggle */}
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

        {/* Sort and View Controls */}
        <div className="flex items-center space-x-3">
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground hidden sm:block">Sort by:</span>
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              className="min-w-[160px]"
            />
          </div>

          {/* View Mode Toggle */}
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

export default SortControls;