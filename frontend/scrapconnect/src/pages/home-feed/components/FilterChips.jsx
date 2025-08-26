import React from 'react';
import Icon from '../../../components/AppIcon';

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

export default FilterChips;