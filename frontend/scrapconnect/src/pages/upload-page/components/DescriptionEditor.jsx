import React, { useState } from 'react';
import Input from '../../../components/ui/Input';

const DescriptionEditor = ({ 
  description, 
  onDescriptionChange, 
  contactEmail, 
  onContactEmailChange, 
  descriptionError, 
  emailError 
}) => {
  const [charCount, setCharCount] = useState(description?.length || 0);
  const maxChars = 1000;

  const handleDescriptionChange = (e) => {
    const value = e?.target?.value;
    if (value?.length <= maxChars) {
      setCharCount(value?.length);
      onDescriptionChange(value);
    }
  };

  const descriptionTips = [
    "Describe the condition and quality of your materials",
    "Mention any processing or cleaning already done",
    "Include specifications like dimensions, purity, or grade",
    "Note any special handling or pickup requirements"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Description & Contact</h3>
        <p className="text-sm text-muted-foreground">
          Provide detailed information to help buyers understand your materials
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Material Description *
          </label>
          <textarea
            className="w-full min-h-[120px] p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
            placeholder="Describe your scrap materials in detail..."
            value={description}
            onChange={handleDescriptionChange}
            maxLength={maxChars}
          />
          <div className="flex justify-between items-center mt-2">
            <span className={`text-xs ${
              charCount > maxChars * 0.9 ? 'text-warning' : 'text-muted-foreground'
            }`}>
              {charCount}/{maxChars} characters
            </span>
            {descriptionError && (
              <span className="text-xs text-destructive">{descriptionError}</span>
            )}
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">💡 Description Tips</h4>
          <ul className="space-y-1">
            {descriptionTips?.map((tip, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-start">
                <span className="text-primary mr-2">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <Input
          label="Contact Email"
          type="email"
          placeholder="your.email@example.com"
          value={contactEmail}
          onChange={(e) => onContactEmailChange(e?.target?.value)}
          error={emailError}
          required
          description="Buyers will use this email to contact you directly"
        />
      </div>
    </div>
  );
};

export default DescriptionEditor;