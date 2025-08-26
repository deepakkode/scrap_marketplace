import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Storage',
      description: 'All personal information is securely stored and protected'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'Trusted by thousands of scrap material traders'
    }
  ];

  return (
    <div className="bg-muted/50 rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Shield" size={20} color="var(--color-success)" />
        <h3 className="text-lg font-semibold text-foreground">Your Security Matters</h3>
      </div>
      <div className="space-y-3">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mt-0.5">
              <Icon name={feature?.icon} size={16} color="var(--color-success)" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground">{feature?.title}</h4>
              <p className="text-xs text-muted-foreground">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} color="var(--color-muted-foreground)" />
            <span className="text-xs text-muted-foreground">10,000+ Active Users</span>
          </div>
          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} color="var(--color-warning)" className="fill-current" />
            <span className="text-xs text-muted-foreground">4.8/5 Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;