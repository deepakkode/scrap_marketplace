import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FormActions = ({ 
  onSaveDraft, 
  onPublish, 
  isLoading, 
  isDraftSaving, 
  canPublish 
}) => {
  return (
    <div className="space-y-6">
      {/* Publishing Guidelines */}
      <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-accent)" className="mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-foreground mb-2">
              Before Publishing
            </h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={12} color="var(--color-success)" />
                <span>Ensure all required fields are completed</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={12} color="var(--color-success)" />
                <span>Upload clear, well-lit photos of your materials</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={12} color="var(--color-success)" />
                <span>Double-check pricing and quantity information</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={12} color="var(--color-success)" />
                <span>Verify your contact email is correct</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          onClick={onSaveDraft}
          loading={isDraftSaving}
          disabled={isLoading}
          iconName="Save"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Save as Draft
        </Button>
        
        <Button
          variant="default"
          onClick={onPublish}
          loading={isLoading && !isDraftSaving}
          disabled={!canPublish || isDraftSaving}
          iconName="Upload"
          iconPosition="left"
          className="flex-1"
        >
          Publish Listing
        </Button>
      </div>

      {/* Help Text */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Drafts are saved privately and can be edited later. Published listings are immediately visible to buyers.
        </p>
      </div>
    </div>
  );
};

export default FormActions;