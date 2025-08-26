import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import Header from '../../components/ui/Header';
import MaterialTypeSelector from './components/MaterialTypeSelector';
import PricingSection from './components/PricingSection';
import LocationSelector from './components/LocationSelector';
import DescriptionEditor from './components/DescriptionEditor';
import ImageUploader from './components/ImageUploader';
import FormActions from './components/FormActions';

const UploadPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    material: '',
    quantity: '',
    pricePerKg: '',
    location: '',
    description: '',
    contactEmail: user?.email || '',
    images: []
  });

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isDraftSaving, setIsDraftSaving] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState({});

  // Redirect non-sellers
  useEffect(() => {
    if (user && user?.role !== 'Seller') {
      navigate('/home-feed');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.material) {
      newErrors.material = 'Please select a material type';
    }

    if (!formData?.quantity || parseFloat(formData?.quantity) <= 0) {
      newErrors.quantity = 'Please enter a valid quantity';
    }

    if (!formData?.pricePerKg || parseFloat(formData?.pricePerKg) <= 0) {
      newErrors.pricePerKg = 'Please enter a valid price per kg';
    }

    if (!formData?.location) {
      newErrors.location = 'Please select a location';
    }

    if (!formData?.description || formData?.description?.trim()?.length < 20) {
      newErrors.description = 'Description must be at least 20 characters long';
    }

    if (!formData?.contactEmail) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    if (formData?.images?.length === 0) {
      newErrors.images = 'Please upload at least one image';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSaveDraft = async () => {
    setIsDraftSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save to localStorage as draft
      const drafts = JSON.parse(localStorage.getItem('listingDrafts') || '[]');
      const draftData = {
        ...formData,
        id: Date.now(),
        status: 'draft',
        createdAt: new Date()?.toISOString(),
        updatedAt: new Date()?.toISOString()
      };
      
      drafts?.push(draftData);
      localStorage.setItem('listingDrafts', JSON.stringify(drafts));
      
      alert('Draft saved successfully!');
    } catch (error) {
      alert('Failed to save draft. Please try again.');
    } finally {
      setIsDraftSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!validateForm()) {
      alert('Please fix the errors before publishing');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save to localStorage as published listing
      const listings = JSON.parse(localStorage.getItem('scrapListings') || '[]');
      const listingData = {
        ...formData,
        id: Date.now(),
        status: 'published',
        seller: {
          id: user?.id,
          name: user?.name,
          email: user?.email,
          rating: 4.5
        },
        postedDate: new Date()?.toISOString(),
        views: 0,
        favorites: 0
      };
      
      listings?.unshift(listingData);
      localStorage.setItem('scrapListings', JSON.stringify(listings));
      
      alert('Listing published successfully!');
      navigate('/home-feed');
    } catch (error) {
      alert('Failed to publish listing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const canPublish = () => {
    return formData?.material && 
           formData?.quantity && 
           formData?.pricePerKg && 
           formData?.location && 
           formData?.description && 
           formData?.contactEmail && 
           formData?.images?.length > 0;
  };

  if (!user || user?.role !== 'Seller') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={logout} />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Create New Listing
            </h1>
            <p className="text-muted-foreground">
              List your scrap materials to connect with potential buyers
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-card rounded-lg border border-border shadow-subtle">
            <div className="p-6 space-y-8">
              {/* Material Type Selection */}
              <MaterialTypeSelector
                selectedMaterial={formData?.material}
                onMaterialChange={(material) => 
                  setFormData(prev => ({ ...prev, material }))
                }
                error={errors?.material}
              />

              {/* Quantity & Pricing */}
              <PricingSection
                quantity={formData?.quantity}
                onQuantityChange={(quantity) => 
                  setFormData(prev => ({ ...prev, quantity }))
                }
                pricePerKg={formData?.pricePerKg}
                onPriceChange={(pricePerKg) => 
                  setFormData(prev => ({ ...prev, pricePerKg }))
                }
                quantityError={errors?.quantity}
                priceError={errors?.pricePerKg}
              />

              {/* Location */}
              <LocationSelector
                selectedLocation={formData?.location}
                onLocationChange={(location) => 
                  setFormData(prev => ({ ...prev, location }))
                }
                error={errors?.location}
              />

              {/* Description & Contact */}
              <DescriptionEditor
                description={formData?.description}
                onDescriptionChange={(description) => 
                  setFormData(prev => ({ ...prev, description }))
                }
                contactEmail={formData?.contactEmail}
                onContactEmailChange={(contactEmail) => 
                  setFormData(prev => ({ ...prev, contactEmail }))
                }
                descriptionError={errors?.description}
                emailError={errors?.contactEmail}
              />

              {/* Image Upload */}
              <ImageUploader
                images={formData?.images}
                onImagesChange={(images) => 
                  setFormData(prev => ({ ...prev, images }))
                }
                error={errors?.images}
              />

              {/* Form Actions */}
              <FormActions
                onSaveDraft={handleSaveDraft}
                onPublish={handlePublish}
                isLoading={isLoading}
                isDraftSaving={isDraftSaving}
                canPublish={canPublish()}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;