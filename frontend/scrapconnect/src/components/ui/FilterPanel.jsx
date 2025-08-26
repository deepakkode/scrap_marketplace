import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import { Checkbox } from './Checkbox';

const FilterPanel = ({ 
  isOpen = false, 
  onClose, 
  onFiltersChange, 
  initialFilters = {},
  resultsCount = 0,
  className = '' 
}) => {
  const [filters, setFilters] = useState({
    material: '',
    priceMin: '',
    priceMax: '',
    location: '',
    condition: [],
    quantity: '',
    seller: '',
    dateRange: '',
    ...initialFilters
  });

  const [isExpanded, setIsExpanded] = useState({
    material: true,
    price: true,
    location: true,
    condition: true,
    other: false
  });

  const materialOptions = [
    { value: '', label: 'All Materials' },
    { value: 'steel', label: 'Steel' },
    { value: 'aluminum', label: 'Aluminum' },
    { value: 'copper', label: 'Copper' },
    { value: 'brass', label: 'Brass' },
    { value: 'iron', label: 'Iron' },
    { value: 'plastic', label: 'Plastic' },
    { value: 'paper', label: 'Paper' },
    { value: 'cardboard', label: 'Cardboard' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'batteries', label: 'Batteries' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'within-5', label: 'Within 5 miles' },
    { value: 'within-10', label: 'Within 10 miles' },
    { value: 'within-25', label: 'Within 25 miles' },
    { value: 'within-50', label: 'Within 50 miles' },
    { value: 'within-100', label: 'Within 100 miles' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'Any time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This week' },
    { value: 'month', label: 'This month' },
    { value: '3months', label: 'Last 3 months' }
  ];

  const conditionOptions = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' }
  ];

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleConditionChange = (condition, checked) => {
    setFilters(prev => ({
      ...prev,
      condition: checked 
        ? [...prev?.condition, condition]
        : prev?.condition?.filter(c => c !== condition)
    }));
  };

  const clearFilters = () => {
    const clearedFilters = {
      material: '',
      priceMin: '',
      priceMax: '',
      location: '',
      condition: [],
      quantity: '',
      seller: '',
      dateRange: ''
    };
    setFilters(clearedFilters);
  };

  const hasActiveFilters = () => {
    return Object.values(filters)?.some(value => 
      Array.isArray(value) ? value?.length > 0 : value !== ''
    );
  };

  const toggleSection = (section) => {
    setIsExpanded(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-border pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <Icon 
          name={isExpanded?.[sectionKey] ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          color="var(--color-muted-foreground)"
        />
      </button>
      {isExpanded?.[sectionKey] && (
        <div className="space-y-3">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Filter Panel */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        w-80 lg:w-full bg-card border-r lg:border-r-0 lg:border border-border
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${className}
      `}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
            />
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block p-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              {hasActiveFilters() && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs"
                >
                  Clear all
                </Button>
              )}
            </div>
            {resultsCount > 0 && (
              <p className="text-sm text-muted-foreground">
                {resultsCount?.toLocaleString()} results found
              </p>
            )}
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Material Type */}
            <FilterSection title="Material Type" sectionKey="material">
              <Select
                options={materialOptions}
                value={filters?.material}
                onChange={(value) => handleFilterChange('material', value)}
                placeholder="Select material"
                searchable
              />
            </FilterSection>

            {/* Price Range */}
            <FilterSection title="Price Range" sectionKey="price">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min price"
                  value={filters?.priceMin}
                  onChange={(e) => handleFilterChange('priceMin', e?.target?.value)}
                />
                <Input
                  type="number"
                  placeholder="Max price"
                  value={filters?.priceMax}
                  onChange={(e) => handleFilterChange('priceMax', e?.target?.value)}
                />
              </div>
            </FilterSection>

            {/* Location */}
            <FilterSection title="Location" sectionKey="location">
              <Select
                options={locationOptions}
                value={filters?.location}
                onChange={(value) => handleFilterChange('location', value)}
                placeholder="Select distance"
              />
            </FilterSection>

            {/* Condition */}
            <FilterSection title="Condition" sectionKey="condition">
              <div className="space-y-2">
                {conditionOptions?.map((option) => (
                  <Checkbox
                    key={option?.value}
                    label={option?.label}
                    checked={filters?.condition?.includes(option?.value)}
                    onChange={(e) => handleConditionChange(option?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            </FilterSection>

            {/* Other Filters */}
            <FilterSection title="Other Filters" sectionKey="other">
              <div className="space-y-3">
                <Input
                  type="number"
                  label="Minimum Quantity"
                  placeholder="Enter minimum quantity"
                  value={filters?.quantity}
                  onChange={(e) => handleFilterChange('quantity', e?.target?.value)}
                />
                
                <Input
                  type="text"
                  label="Seller Name"
                  placeholder="Search by seller"
                  value={filters?.seller}
                  onChange={(e) => handleFilterChange('seller', e?.target?.value)}
                />
                
                <Select
                  label="Date Posted"
                  options={dateRangeOptions}
                  value={filters?.dateRange}
                  onChange={(value) => handleFilterChange('dateRange', value)}
                  placeholder="Select time range"
                />
              </div>
            </FilterSection>
          </div>

          {/* Mobile Footer */}
          <div className="p-4 border-t border-border lg:hidden">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={clearFilters}
                disabled={!hasActiveFilters()}
                className="flex-1"
              >
                Clear
              </Button>
              <Button
                variant="default"
                onClick={onClose}
                className="flex-1"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;