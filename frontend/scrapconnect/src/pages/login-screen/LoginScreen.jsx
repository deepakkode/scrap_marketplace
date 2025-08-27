import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../components/ui/AuthenticationGuard';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LoginScreen = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // --- Fetch any required data on mount ---
  useEffect(() => {
    axios.get('http://localhost:5000/api/login/login')
      .then(response => {
        console.log('GET Response:', response.data);
      })
      .catch(error => {
        console.error('GET Error:', error);
      });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      const { success, token, role, message } = response.data;

      if (success) {
        await login({ token, email: formData.email, role });
        navigate('/home-feed');
      } else {
        setErrors({ general: message || 'Login failed' });
      }

    } catch (error) {
      const errMsg = error?.response?.data?.message || 'Network error. Please try again.';
      setErrors({ general: errMsg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset link would be sent to your email address.');
  };

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
    <>
      <Helmet>
        <title>Sign In - ScrapConnect | B2B Scrap Materials Marketplace</title>
        <meta name="description" content="Sign in to ScrapConnect, the trusted B2B marketplace for scrap materials trading. Connect with verified sellers and buyers in the recycling industry." />
        <meta name="keywords" content="scrap materials, B2B marketplace, recycling, login, authentication" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="min-h-screen flex">
          {/* Left Panel */}
          <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-card border-r border-border">
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="w-full max-w-lg space-y-8">
                {/* Welcome Section */}
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
                    alt="Recycling facility"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm font-medium">Trusted by Industry Leaders</div>
                    <div className="text-xs opacity-90">Join thousands of successful traders</div>
                  </div>
                </div>
                {/* Features */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground text-center">
                    Why Choose ScrapConnect?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-card border border-border rounded-lg hover:shadow-subtle transition-smooth">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={feature.icon} size={20} color="var(--color-accent)" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-1">{feature.title}</h4>
                          <p className="text-xs text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center text-xs text-muted-foreground">
                  Today is {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className="flex-1 lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-8">
            <div className="w-full max-w-md space-y-8">
              <div className="lg:hidden text-center space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-primary-foreground rounded"></div>
                  </div>
                  <h1 className="text-2xl font-bold text-primary">ScrapConnect</h1>
                </div>
                    <p className="text-muted-foreground">Sign in to your account</p>
              </div>

              {/* Desktop Header */}
              <div className="hidden lg:block text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Sign In</h1>
                <p className="text-muted-foreground">Welcome back! Please sign in to your account.</p>
              </div>

              {/* General Error Message */}
              {errors.general && (
                <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-error">{errors.general}</div>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="email"
                  name="email"
                  label="Email Address"
                  placeholder="Enter your business email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  required
                  disabled={isLoading}
                  className="w-full"
                />

                <Input
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  required
                  disabled={isLoading}
                  className="w-full"
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <Checkbox
                    name="rememberMe"
                    label="Remember me"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />

                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-accent hover:text-accent/80 transition-smooth"
                    disabled={isLoading}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  loading={isLoading}
                  disabled={isLoading}
                  fullWidth
                  iconName="LogIn"
                  iconPosition="left"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                {/* Register Link */}
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">New to the platform? </span>
                  <button
                    type="button"
                    onClick={() => navigate('/register-screen')}
                    className="text-sm text-accent hover:text-accent/80 font-medium transition-smooth"
                    disabled={isLoading}
                  >
                    Register here
                  </button>
                </div>
              </form>

              {/* Trust Indicators (Desktop Only) */}
              <div className="hidden xl:block space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Secure & Trusted Platform</h3>
                <div className="space-y-3">
                  {securityFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={feature.icon} size={16} color="var(--color-success)" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{feature.title}</div>
                        <div className="text-xs text-muted-foreground">{feature.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary font-mono">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-2 p-3 bg-success/5 border border-success/20 rounded-lg">
                  <Icon name="Shield" size={20} color="var(--color-success)" />
                  <span className="text-sm font-medium text-success">256-bit SSL Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Trust Indicators */}
        <div className="lg:hidden bg-card border-t border-border p-6">
          <div className="max-w-md mx-auto space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Secure & Trusted Platform</h3>
            <div className="space-y-3">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={feature.icon} size={16} color="var(--color-success)" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{feature.title}</div>
                    <div className="text-xs text-muted-foreground">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} ScrapConnect. All rights reserved.
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

