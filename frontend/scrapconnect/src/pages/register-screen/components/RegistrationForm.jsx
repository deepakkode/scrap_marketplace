import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../components/ui/AuthenticationGuard';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
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
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: []
  });

  const validatePassword = (password) => {
    const checks = {
      length: password?.length >= 8,
      uppercase: /[A-Z]/?.test(password),
      lowercase: /[a-z]/?.test(password),
      number: /\d/?.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(password)
    };

    const score = Object.values(checks)?.filter(Boolean)?.length;
    const feedback = [];

    if (!checks?.length) feedback?.push('At least 8 characters');
    if (!checks?.uppercase) feedback?.push('One uppercase letter');
    if (!checks?.lowercase) feedback?.push('One lowercase letter');
    if (!checks?.number) feedback?.push('One number');
    if (!checks?.special) feedback?.push('One special character');

    return { score, feedback };
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific field error
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Update password strength
    if (field === 'password') {
      setPasswordStrength(validatePassword(value));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (passwordStrength?.score < 3) {
      newErrors.password = 'Password is too weak';
    }

    // Confirm password validation
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Company name validation (optional but if provided, must be valid)
    if (formData?.companyName?.trim() && formData?.companyName?.trim()?.length < 2) {
      newErrors.companyName = 'Company name must be at least 2 characters';
    }

    // Location validation
    if (!formData?.location?.trim()) {
      newErrors.location = 'Location is required';
    }

    // Terms and privacy validation
    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }

    if (!formData?.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await register({
        name: formData?.fullName,
        email: formData?.email,
        password: formData?.password,
        role: formData?.role,
        companyName: formData?.companyName,
        location: formData?.location
      });

      if (result?.success) {
        navigate('/home-feed');
      } else {
        setErrors({ submit: result?.error || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength?.score <= 1) return 'bg-destructive';
    if (passwordStrength?.score <= 2) return 'bg-warning';
    if (passwordStrength?.score <= 3) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength?.score <= 1) return 'Weak';
    if (passwordStrength?.score <= 2) return 'Fair';
    if (passwordStrength?.score <= 3) return 'Good';
    return 'Strong';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
        
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
          disabled={isLoading}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
          disabled={isLoading}
        />
      </div>
      {/* Password Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Security</h3>
        
        <div className="space-y-2">
          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
            disabled={isLoading}
          />
          
          {formData?.password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Password strength:</span>
                <span className={`text-sm font-medium ${
                  passwordStrength?.score <= 1 ? 'text-destructive' :
                  passwordStrength?.score <= 2 ? 'text-warning' :
                  passwordStrength?.score <= 3 ? 'text-accent' : 'text-success'
                }`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${(passwordStrength?.score / 5) * 100}%` }}
                />
              </div>
              {passwordStrength?.feedback?.length > 0 && (
                <div className="text-xs text-muted-foreground">
                  Missing: {passwordStrength?.feedback?.join(', ')}
                </div>
              )}
            </div>
          )}
        </div>

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
          disabled={isLoading}
        />
      </div>
      {/* Role Selection Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Account Type</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
              formData?.role === 'Buyer' ?'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}>
              <div className="flex items-center space-x-3 mb-2">
                <input
                  type="radio"
                  name="role"
                  value="Buyer"
                  checked={formData?.role === 'Buyer'}
                  onChange={(e) => handleInputChange('role', e?.target?.value)}
                  className="w-4 h-4 text-primary"
                  disabled={isLoading}
                />
                <div className="flex items-center space-x-2">
                  <Icon name="Search" size={20} color="var(--color-primary)" />
                  <span className="font-semibold text-foreground">Buyer</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground ml-7">
                Browse and purchase scrap materials from verified sellers. Access advanced search and filtering tools.
              </p>
            </label>

            <label className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
              formData?.role === 'Seller' ?'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}>
              <div className="flex items-center space-x-3 mb-2">
                <input
                  type="radio"
                  name="role"
                  value="Seller"
                  checked={formData?.role === 'Seller'}
                  onChange={(e) => handleInputChange('role', e?.target?.value)}
                  className="w-4 h-4 text-primary"
                  disabled={isLoading}
                />
                <div className="flex items-center space-x-2">
                  <Icon name="Package" size={20} color="var(--color-primary)" />
                  <span className="font-semibold text-foreground">Seller</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground ml-7">
                List and sell your scrap materials to verified buyers. Manage inventory and track sales performance.
              </p>
            </label>
          </div>
        </div>
      </div>
      {/* Business Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Business Information</h3>
        
        <Input
          label="Company Name"
          type="text"
          placeholder="Enter your company name (optional)"
          value={formData?.companyName}
          onChange={(e) => handleInputChange('companyName', e?.target?.value)}
          error={errors?.companyName}
          disabled={isLoading}
          description="Optional - helps build trust with trading partners"
        />

        <Input
          label="Primary Location"
          type="text"
          placeholder="Enter your city and state"
          value={formData?.location}
          onChange={(e) => handleInputChange('location', e?.target?.value)}
          error={errors?.location}
          required
          disabled={isLoading}
          description="Used for location-based matching with trading partners"
        />
      </div>
      {/* Terms and Privacy Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Legal Agreements</h3>
        
        <div className="space-y-3">
          <Checkbox
            label="I agree to the Terms of Service"
            checked={formData?.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
            error={errors?.agreeToTerms}
            required
            disabled={isLoading}
            description="By checking this box, you agree to our terms and conditions for using ScrapConnect"
          />

          <Checkbox
            label="I agree to the Privacy Policy"
            checked={formData?.agreeToPrivacy}
            onChange={(e) => handleInputChange('agreeToPrivacy', e?.target?.checked)}
            error={errors?.agreeToPrivacy}
            required
            disabled={isLoading}
            description="We respect your privacy and will protect your personal information"
          />
        </div>
      </div>
      {/* Submit Error */}
      {errors?.submit && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} color="var(--color-destructive)" />
            <span className="text-sm text-destructive">{errors?.submit}</span>
          </div>
        </div>
      )}
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;