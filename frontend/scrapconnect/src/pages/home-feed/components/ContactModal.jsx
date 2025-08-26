import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactModal = ({ isOpen, onClose, listing, user }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message?.trim()) return;
    
    setIsLoading(true);
    
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create mailto link with pre-filled content
    const subject = `Inquiry about ${listing?.title}`;
    const body = `Hi ${listing?.seller?.name || 'there'},\n\nI'm interested in your ${listing?.material} listing:\n\nTitle: ${listing?.title}\nQuantity: ${listing?.quantity} ${listing?.unit}\nPrice: ${listing?.price} per ${listing?.unit}\n\nMessage:\n${message}\n\nBest regards,\n${user?.name || 'Buyer'}`;
    
    const mailtoLink = `mailto:${listing?.seller?.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
    
    setIsLoading(false);
    setMessage('');
    onClose();
  };

  const handleDirectEmail = () => {
    const subject = `Inquiry about ${listing?.title}`;
    const mailtoLink = `mailto:${listing?.seller?.email}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoLink, '_blank');
  };

  const handleDirectCall = () => {
    if (listing?.seller?.phone) {
      window.open(`tel:${listing?.seller?.phone}`, '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            Contact Seller
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Listing Info */}
          <div className="p-3 bg-muted rounded-lg">
            <h3 className="font-medium text-foreground mb-1">{listing?.title}</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <div className="flex items-center space-x-2">
                <Icon name="Package" size={14} />
                <span>{listing?.quantity} {listing?.unit} of {listing?.material}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={14} />
                <span className="font-mono">{listing?.price} per {listing?.unit}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={14} />
                <span>{listing?.location}</span>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="var(--color-muted-foreground)" />
              </div>
              <div>
                <div className="font-medium text-foreground">
                  {listing?.seller?.name || 'Anonymous Seller'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {listing?.seller?.email}
                </div>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDirectEmail}
                iconName="Mail"
                iconPosition="left"
                className="flex-1"
              >
                Email
              </Button>
              
              {listing?.seller?.phone && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDirectCall}
                  iconName="Phone"
                  iconPosition="left"
                  className="flex-1"
                >
                  Call
                </Button>
              )}
            </div>
          </div>

          {/* Message Form */}
          <div className="space-y-3">
            <Input
              label="Your Message"
              type="text"
              placeholder="Write your inquiry message..."
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              description="This will be included in the email to the seller"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSendMessage}
              loading={isLoading}
              disabled={!message?.trim()}
              iconName="Send"
              iconPosition="left"
              className="flex-1"
            >
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;