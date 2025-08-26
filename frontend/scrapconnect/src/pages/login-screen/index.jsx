import React from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import TrustIndicators from './components/TrustIndicators';
import WelcomeSection from './components/WelcomeSection';

const LoginScreen = () => {
  return (
    <>
      <Helmet>
        <title>Sign In - ScrapConnect | B2B Scrap Materials Marketplace</title>
        <meta name="description" content="Sign in to ScrapConnect, the trusted B2B marketplace for scrap materials trading. Connect with verified sellers and buyers in the recycling industry." />
        <meta name="keywords" content="scrap materials, B2B marketplace, recycling, login, authentication" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Main Container */}
        <div className="min-h-screen flex">
          {/* Left Panel - Welcome Section (Hidden on Mobile) */}
          <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-card border-r border-border">
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="w-full max-w-lg">
                <WelcomeSection />
              </div>
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className="flex-1 lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-8">
            <div className="w-full max-w-md space-y-8">
              {/* Mobile Logo (Visible only on mobile) */}
              <div className="lg:hidden text-center space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-primary-foreground rounded"></div>
                  </div>
                  <h1 className="text-2xl font-bold text-primary">ScrapConnect</h1>
                </div>
                <p className="text-muted-foreground">
                  Sign in to your account
                </p>
              </div>

              {/* Desktop Header */}
              <div className="hidden lg:block text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">
                  Sign In
                </h1>
                <p className="text-muted-foreground">
                  Welcome back! Please sign in to your account.
                </p>
              </div>

              {/* Login Form */}
              <LoginForm />

              {/* Trust Indicators (Desktop Only) */}
              <div className="hidden xl:block">
                <TrustIndicators />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Trust Indicators */}
        <div className="lg:hidden bg-card border-t border-border p-6">
          <div className="max-w-md mx-auto">
            <TrustIndicators />
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} ScrapConnect. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Privacy Policy
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Terms of Service
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LoginScreen;