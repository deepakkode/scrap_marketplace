import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';

const MaterialTypeSelector = ({ selectedMaterial, onMaterialChange, error }) => {
  const materialOptions = [
    { 
      value: 'plastic', 
      label: 'Plastic',
      description: 'PET bottles, containers, packaging materials'
    },
    { 
      value: 'cotton', 
      label: 'Cotton',
      description: 'Textile waste, fabric scraps, cotton fibers'
    },
    { 
      value: 'iron', 
      label: 'Iron',
      description: 'Scrap metal, iron sheets, construction waste'
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Material Type</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select the type of scrap material you're listing
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {materialOptions?.map((material) => (
          <div
            key={material?.value}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-smooth ${
              selectedMaterial === material?.value
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => onMaterialChange(material?.value)}
          >
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={selectedMaterial === material?.value}
                onChange={() => onMaterialChange(material?.value)}
                className="mt-1"
              />
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{material?.label}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {material?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-sm text-destructive mt-2">{error}</p>
      )}
    </div>
  );
};

export default MaterialTypeSelector;