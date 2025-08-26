import React from 'react';
import { Helmet } from 'react-helmet';
import RegistrationForm from './components/RegistrationForm';
import SecurityBadges from './components/SecurityBadges';
import WelcomeSection from './components/WelcomeSection';

const RegisterScreen = () => {
  return (
    <>
      <Helmet>
        <title>Create Account - ScrapConnect</title>
        <meta name="description" content="Join ScrapConnect - Create your account to start trading scrap materials with verified buyers and sellers in the recycling industry." />
        <meta name="keywords" content="scrap trading, recycling, account registration, B2B marketplace" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Main Container */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Left Column - Welcome Section */}
              <div className="order-2 lg:order-1 space-y-6">
                <WelcomeSection />
                
                {/* Security Badges - Desktop Only */}
                <div className="hidden lg:block">
                  <SecurityBadges />
                </div>
              </div>

              {/* Right Column - Registration Form */}
              <div className="order-1 lg:order-2">
                <div className="bg-card rounded-xl border border-border shadow-subtle p-6 lg:p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Create Your Account</h2>
                    <p className="text-muted-foreground">
                      Fill in your details to get started with ScrapConnect
                    </p>
                  </div>

                  <RegistrationForm />
                </div>

                {/* Security Badges - Mobile Only */}
                <div className="lg:hidden mt-6">
                  <SecurityBadges />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-sm text-muted-foreground">
              <p>
                © {new Date()?.getFullYear()} ScrapConnect. All rights reserved. | 
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-foreground transition-smooth">Terms of Service</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-foreground transition-smooth">Privacy Policy</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-foreground transition-smooth">Support</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default RegisterScreen;