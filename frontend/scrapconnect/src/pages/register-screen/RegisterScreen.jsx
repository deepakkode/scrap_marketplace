import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../components/ui/AuthenticationGuard';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Buyer',
    companyName: '',
    location: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: [] });

  const validatePassword = (password) => {
    const checks = {
      length: password?.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    const score = Object.values(checks).filter(Boolean).length;
    const feedback = [];
    if (!checks.length) feedback.push('At least 8 characters');
    if (!checks.uppercase) feedback.push('One uppercase letter');
    if (!checks.lowercase) feedback.push('One lowercase letter');
    if (!checks.number) feedback.push('One number');
    if (!checks.special) feedback.push('One special character');
    return { score, feedback };
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    if (field === 'password') {
      setPasswordStrength(validatePassword(value));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (formData.fullName.trim().length < 2) newErrors.fullName = 'Must be at least 2 characters';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (passwordStrength.score < 3) newErrors.password = 'Password is too weak';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (formData.companyName?.trim()?.length > 0 && formData.companyName.trim().length < 2)
      newErrors.companyName = 'Company name must be at least 2 characters';

    if (!formData.location?.trim()) newErrors.location = 'Location is required';

    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to Terms';
    if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to Privacy Policy';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        companyName: formData.companyName,
        location: formData.location
      });

      const { success, token, role } = response.data;
      if (success) {
        await login({ token, email: formData.email, role });
        navigate('/home-feed');
      } else {
        setErrors({ submit: response?.data?.message || 'Registration failed.' });
      }
    } catch (error) {
      setErrors({ submit: error?.response?.data?.message || 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 1) return 'bg-destructive';
    if (passwordStrength.score <= 2) return 'bg-warning';
    if (passwordStrength.score <= 3) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength.score <= 1) return 'Weak';
    if (passwordStrength.score <= 2) return 'Fair';
    if (passwordStrength.score <= 3) return 'Good';
    return 'Strong';
  };

  const SecurityBadges = () => {
    const securityFeatures = [
      { icon: 'Shield', title: 'SSL Encrypted', description: '256-bit SSL encryption' },
      { icon: 'Lock', title: 'Secure Storage', description: 'Data stored securely' },
      { icon: 'CheckCircle', title: 'Verified Platform', description: 'Trusted by thousands' }
    ];

    return (
      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Shield" size={20} color="var(--color-success)" />
          <h3 className="text-lg font-semibold text-foreground">Your Security Matters</h3>
        </div>
        <div className="space-y-3">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mt-0.5">
                <Icon name={feature.icon} size={16} color="var(--color-success)" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-border flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <span><Icon name="Users" size={14} /> 10,000+ Users</span>
          <span className="w-1 h-1 bg-muted-foreground rounded-full" />
          <span><Icon name="Star" size={14} className="fill-current text-warning" /> 4.8/5 Rating</span>
        </div>
      </div>
    );
  };

  const WelcomeSection = () => {
    const benefits = [
      { icon: 'Recycle', title: 'Sustainable Trading', description: 'Connect with verified traders' },
      { icon: 'TrendingUp', title: 'Market Insights', description: 'Real-time pricing trends' },
      { icon: 'MapPin', title: 'Local Network', description: 'Find partners nearby' },
      { icon: 'MessageCircle', title: 'Direct Communication', description: 'Message securely' }
    ];

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="Recycle" size={24} color="white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">ScrapConnect</h1>
          </div>
          <h2 className="text-xl font-semibold text-foreground">Join the Future of Scrap Trading</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Create your account to start connecting with verified scrap material traders.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-start space-x-3 p-4 bg-card border border-border rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={b.icon} size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{b.title}</h3>
                <p className="text-xs text-muted-foreground">{b.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
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

        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">Already have an account?</p>
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

  return (
    <>
      <Helmet>
        <title>Create Account - ScrapConnect</title>
        <meta
          name="description"
          content="Join ScrapConnect - Create your account to start trading scrap materials with verified buyers and sellers in the recycling industry."
        />
        <meta
          name="keywords"
          content="scrap trading, recycling, account registration, B2B marketplace"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column */}
              <div className="order-2 lg:order-1 space-y-6">
                <WelcomeSection />
                <div className="hidden lg:block">
                  <SecurityBadges />
                </div>
              </div>

              {/* Right Column */}
              <div className="order-1 lg:order-2">
                <div className="bg-card rounded-xl border border-border shadow-subtle p-6 lg:p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Create Your Account</h2>
                    <p className="text-muted-foreground">
                      Fill in your details to get started with ScrapConnect
                    </p>
                  </div>

                  {/* Registration Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form fields (already in your code) */}
                    {/* ... */}
                  </form>
                </div>

                {/* Mobile Security Badges */}
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
                © {new Date().getFullYear()} ScrapConnect. All rights reserved. |
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-foreground transition">Terms of Service</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-foreground transition">Privacy Policy</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default RegisterScreen;
