import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'Your data is encrypted and protected'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'Trusted by 10,000+ businesses'
    },
    {
      icon: 'Lock',
      title: 'Secure Authentication',
      description: 'JWT-based secure login system'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Active Users' },
    { value: '50,000+', label: 'Successful Trades' },
    { value: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="space-y-8">
      {/* Security Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Secure & Trusted Platform
        </h3>
        <div className="space-y-3">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon 
                  name={feature?.icon} 
                  size={16} 
                  color="var(--color-success)" 
                />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {feature?.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {feature?.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Platform Stats */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Platform Statistics
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary font-mono">
                {stat?.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* SSL Badge */}
      <div className="flex items-center justify-center space-x-2 p-3 bg-success/5 border border-success/20 rounded-lg">
        <Icon name="Shield" size={20} color="var(--color-success)" />
        <span className="text-sm font-medium text-success">
          256-bit SSL Encryption
        </span>
      </div>
    </div>
  );
};

export default TrustIndicators;