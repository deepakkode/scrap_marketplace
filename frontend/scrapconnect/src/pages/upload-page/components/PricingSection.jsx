import React from 'react';
import Input from '../../../components/ui/Input';

const PricingSection = ({ 
  quantity, 
  onQuantityChange, 
  pricePerKg, 
  onPriceChange, 
  quantityError, 
  priceError 
}) => {
  const calculateTotalValue = () => {
    const qty = parseFloat(quantity) || 0;
    const price = parseFloat(pricePerKg) || 0;
    return (qty * price)?.toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Quantity & Pricing</h3>
        <p className="text-sm text-muted-foreground">
          Specify the available quantity and your asking price
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Input
            label="Quantity Available"
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => onQuantityChange(e?.target?.value)}
            error={quantityError}
            required
            min="0.1"
            step="0.1"
          />
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Unit: Kilograms (kg)</span>
          </div>
        </div>

        <div className="space-y-2">
          <Input
            label="Price per Kilogram"
            type="number"
            placeholder="Enter price"
            value={pricePerKg}
            onChange={(e) => onPriceChange(e?.target?.value)}
            error={priceError}
            required
            min="0.01"
            step="0.01"
          />
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Currency: USD ($)</span>
          </div>
        </div>
      </div>
      {quantity && pricePerKg && (
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">
              Total Estimated Value:
            </span>
            <span className="text-lg font-bold text-primary font-mono">
              ${calculateTotalValue()}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Based on {quantity} kg × ${pricePerKg}/kg
          </p>
        </div>
      )}
    </div>
  );
};

export default PricingSection;