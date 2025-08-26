import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WelcomeSection = () => {
  const features = [
    {
      icon: 'Recycle',
      title: 'Connect with Verified Sellers',
      description: 'Access a network of trusted scrap material suppliers across the industry'
    },
    {
      icon: 'Search',
      title: 'Advanced Search & Filtering',
      description: 'Find exactly what you need with powerful search and location-based filtering'
    },
    {
      icon: 'MessageCircle',
      title: 'Direct Communication',
      description: 'Contact sellers directly through our secure messaging system'
    },
    {
      icon: 'TrendingUp',
      title: 'Real-time Market Data',
      description: 'Stay updated with current market prices and material availability'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Icon name="Recycle" size={28} color="white" />
          </div>
          <h1 className="text-3xl font-bold text-primary">ScrapConnect</h1>
        </div>
        
        <h2 className="text-2xl font-semibold text-foreground">
          Welcome Back to Your B2B Marketplace
        </h2>
        
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Connect with verified sellers and buyers in the recycling industry. 
          Streamline your scrap materials trading process.
        </p>
      </div>
      {/* Hero Image */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop"
          alt="Industrial recycling facility with organized scrap materials"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-sm font-medium">Trusted by Industry Leaders</div>
          <div className="text-xs opacity-90">Join thousands of successful traders</div>
        </div>
      </div>
      {/* Key Features */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground text-center">
          Why Choose ScrapConnect?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-card border border-border rounded-lg hover:shadow-subtle transition-smooth">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon 
                  name={feature?.icon} 
                  size={20} 
                  color="var(--color-accent)" 
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {feature?.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Current Date */}
      <div className="text-center text-xs text-muted-foreground">
        Today is {new Date()?.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>
    </div>
  );
};

export default WelcomeSection;