import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../components/ui/AuthenticationGuard';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const mockCredentials = [
    { email: 'seller@scrapconnect.com', password: 'seller123', role: 'Seller' },
    { email: 'buyer@scrapconnect.com', password: 'buyer123', role: 'Buyer' },
    { email: 'admin@scrapconnect.com', password: 'admin123', role: 'Admin' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Check against mock credentials
      const validCredential = mockCredentials?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );
      
      if (!validCredential) {
        setErrors({
          general: `Invalid credentials. Try: ${mockCredentials?.[0]?.email} / ${mockCredentials?.[0]?.password} (Seller) or ${mockCredentials?.[1]?.email} / ${mockCredentials?.[1]?.password} (Buyer)`
        });
        return;
      }
      
      const result = await login({
        email: formData?.email,
        password: formData?.password,
        role: validCredential?.role
      });
      
      if (result?.success) {
        navigate('/home-feed');
      } else {
        setErrors({ general: result?.error || 'Login failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Mock forgot password functionality
    alert('Password reset link would be sent to your email address.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
              <div className="text-sm text-error">
                {errors?.general}
              </div>
            </div>
          </div>
        )}

        {/* Email Field */}
        <Input
          type="email"
          name="email"
          label="Email Address"
          placeholder="Enter your business email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          disabled={isLoading}
          className="w-full"
        />

        {/* Password Field */}
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          disabled={isLoading}
          className="w-full"
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <Checkbox
            name="rememberMe"
            label="Remember me"
            checked={formData?.rememberMe}
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
          <span className="text-sm text-muted-foreground">
            New to the platform?{' '}
          </span>
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
    </div>
  );
};

export default LoginForm;