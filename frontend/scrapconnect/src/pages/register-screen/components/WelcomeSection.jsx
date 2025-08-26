import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeSection = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: 'Recycle',
      title: 'Sustainable Trading',
      description: 'Connect with verified traders in the recycling industry'
    },
    {
      icon: 'TrendingUp',
      title: 'Market Insights',
      description: 'Access real-time pricing and market trends'
    },
    {
      icon: 'MapPin',
      title: 'Local Network',
      description: 'Find trading partners in your area'
    },
    {
      icon: 'MessageCircle',
      title: 'Direct Communication',
      description: 'Connect directly with buyers and sellers'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Icon name="Recycle" size={24} color="white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">ScrapConnect</h1>
        </div>
        <h2 className="text-xl font-semibold text-foreground">Join the Future of Scrap Trading</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Create your account to start connecting with verified scrap material traders in your area.
        </p>
      </div>
      {/* Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {benefits?.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-3 p-4 bg-card rounded-lg border border-border">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={benefit?.icon} size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground mb-1">{benefit?.title}</h3>
              <p className="text-xs text-muted-foreground">{benefit?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Statistics */}
      <div className="bg-primary/5 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Trusted by Industry Leaders
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">10K+</div>
            <div className="text-xs text-muted-foreground">Active Traders</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">$2M+</div>
            <div className="text-xs text-muted-foreground">Monthly Volume</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">500+</div>
            <div className="text-xs text-muted-foreground">Cities Covered</div>
          </div>
        </div>
      </div>
      {/* Login Link */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground mb-3">
          Already have an account?
        </p>
        <Button
          variant="outline"
          onClick={() => navigate('/login-screen')}
          iconName="LogIn"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Sign In Here
        </Button>
      </div>
    </div>
  );
};

export default WelcomeSection;