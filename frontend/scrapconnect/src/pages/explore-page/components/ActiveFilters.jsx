import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }) => {
  const getActiveFilters = () => {
    const active = [];
    
    if (filters?.material) {
      active?.push({
        key: 'material',
        label: `Material: ${filters?.material}`,
        value: filters?.material
      });
    }
    
    if (filters?.priceMin || filters?.priceMax) {
      const priceLabel = `Price: $${filters?.priceMin || '0'} - $${filters?.priceMax || '∞'}`;
      active?.push({
        key: 'price',
        label: priceLabel,
        value: 'price'
      });
    }
    
    if (filters?.location) {
      active?.push({
        key: 'location',
        label: `Location: ${filters?.location}`,
        value: filters?.location
      });
    }
    
    if (filters?.condition && filters?.condition?.length > 0) {
      active?.push({
        key: 'condition',
        label: `Condition: ${filters?.condition?.join(', ')}`,
        value: filters?.condition
      });
    }
    
    if (filters?.quantity) {
      active?.push({
        key: 'quantity',
        label: `Min Quantity: ${filters?.quantity} kg`,
        value: filters?.quantity
      });
    }
    
    if (filters?.seller) {
      active?.push({
        key: 'seller',
        label: `Seller: ${filters?.seller}`,
        value: filters?.seller
      });
    }
    
    if (filters?.dateRange) {
      const dateLabels = {
        'today': 'Today',
        'week': 'This week',
        'month': 'This month',
        '3months': 'Last 3 months'
      };
      active?.push({
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

export default ActiveFilters;