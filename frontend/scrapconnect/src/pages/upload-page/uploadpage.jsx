import React, { useState, useRef } from 'react';

// Assuming these components are available in the specified paths
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

// The combined components start here
// --- FormActions.jsx ---
const FormActions = ({ 
  onSaveDraft, 
  onPublish, 
  isLoading, 
  isDraftSaving, 
  canPublish 
}) => {
  return (
    <div className="space-y-6">
      {/* Publishing Guidelines */}
      <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-accent)" className="mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-foreground mb-2">
              Before Publishing
            </h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={12} color="var(--color-success)" />
                <span>Ensure all required fields are completed</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={12} color="var(--color-success)" />
                <span>Upload clear, well-lit photos of your materials</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={12} color="var(--color-success)" />
                <span>Double-check pricing and quantity information</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={12} color="var(--color-success)" />
                <span>Verify your contact email is correct</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          onClick={onSaveDraft}
          loading={isDraftSaving}
          disabled={isLoading}
          iconName="Save"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Save as Draft
        </Button>
        
        <Button
          variant="default"
          onClick={onPublish}
          loading={isLoading && !isDraftSaving}
          disabled={!canPublish || isDraftSaving}
          iconName="Upload"
          iconPosition="left"
          className="flex-1"
        >
          Publish Listing
        </Button>
      </div>

      {/* Help Text */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Drafts are saved privately and can be edited later. Published listings are immediately visible to buyers.
        </p>
      </div>
    </div>
  );
};

// --- DescriptionEditor.jsx ---
const DescriptionEditor = ({ 
  description, 
  onDescriptionChange, 
  contactEmail, 
  onContactEmailChange, 
  descriptionError, 
  emailError 
}) => {
  const [charCount, setCharCount] = useState(description?.length || 0);
  const maxChars = 1000;

  const handleDescriptionChange = (e) => {
    const value = e?.target?.value;
    if (value?.length <= maxChars) {
      setCharCount(value?.length);
      onDescriptionChange(value);
    }
  };

  const descriptionTips = [
    "Describe the condition and quality of your materials",
    "Mention any processing or cleaning already done",
    "Include specifications like dimensions, purity, or grade",
    "Note any special handling or pickup requirements"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Description & Contact</h3>
        <p className="text-sm text-muted-foreground">
          Provide detailed information to help buyers understand your materials
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Material Description *
          </label>
          <textarea
            className="w-full min-h-[120px] p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
            placeholder="Describe your scrap materials in detail..."
            value={description}
            onChange={handleDescriptionChange}
            maxLength={maxChars}
          />
          <div className="flex justify-between items-center mt-2">
            <span className={`text-xs ${
              charCount > maxChars * 0.9 ? 'text-warning' : 'text-muted-foreground'
            }`}>
              {charCount}/{maxChars} characters
            </span>
            {descriptionError && (
              <span className="text-xs text-destructive">{descriptionError}</span>
            )}
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">💡 Description Tips</h4>
          <ul className="space-y-1">
            {descriptionTips?.map((tip, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-start">
                <span className="text-primary mr-2">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <Input
          label="Contact Email"
          type="email"
          placeholder="your.email@example.com"
          value={contactEmail}
          onChange={(e) => onContactEmailChange(e?.target?.value)}
          error={emailError}
          required
          description="Buyers will use this email to contact you directly"
        />
      </div>
    </div>
  );
};

// --- ImageUploader.jsx ---
const ImageUploader = ({ images, onImagesChange, error }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const maxImages = 5;
  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files?.filter(file => {
      if (!allowedTypes?.includes(file?.type)) {
        alert(`${file?.name} is not a supported image format`);
        return false;
      }
      if (file?.size > maxFileSize) {
        alert(`${file?.name} is too large. Maximum size is 5MB`);
        return false;
      }
      return true;
    });

    if (images?.length + validFiles?.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }

    validFiles?.forEach(file => {
      const fileId = Date.now() + Math.random();
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

      // Simulate upload progress
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: fileId,
          file: file,
          url: e?.target?.result,
          name: file?.name,
          size: file?.size
        };

        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 30;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setUploadProgress(prev => {
              const updated = { ...prev };
              delete updated?.[fileId];
              return updated;
            });
          }
          setUploadProgress(prev => ({ ...prev, [fileId]: Math.min(progress, 100) }));
        }, 200);

        onImagesChange([...images, newImage]);
      };
      reader?.readAsDataURL(file);
    });
  };

  const removeImage = (imageId) => {
    const updatedImages = images?.filter(img => img?.id !== imageId);
    onImagesChange(updatedImages);
    setUploadProgress(prev => {
      const updated = { ...prev };
      delete updated?.[imageId];
      return updated;
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Material Images</h3>
        <p className="text-sm text-muted-foreground">
          Upload clear photos of your scrap materials to attract buyers
        </p>
      </div>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
          dragActive 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={allowedTypes?.join(',')}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Icon name="Upload" size={24} color="var(--color-muted-foreground)" />
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-foreground">
              Drag & drop images here
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse files
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={() => fileInputRef?.current?.click()}
            iconName="Plus"
            iconPosition="left"
          >
            Choose Files
          </Button>
        </div>
      </div>
      {/* Upload Requirements */}
      <div className="bg-muted p-4 rounded-lg">
        <h4 className="text-sm font-medium text-foreground mb-2">Upload Requirements</h4>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={12} color="var(--color-success)" />
            <span>Maximum {maxImages} images per listing</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={12} color="var(--color-success)" />
            <span>Supported formats: JPEG, PNG, WebP</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={12} color="var(--color-success)" />
            <span>Maximum file size: 5MB per image</span>
          </li>
        </ul>
      </div>
      {/* Image Previews */}
      {images?.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">
            Uploaded Images ({images?.length}/{maxImages})
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images?.map((image) => (
              <div key={image?.id} className="relative group">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={image?.url}
                    alt={image?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Upload Progress */}
                {uploadProgress?.[image?.id] !== undefined && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <span className="text-xs text-white">
                        {Math.round(uploadProgress?.[image?.id])}%
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Remove Button */}
                <button
                  onClick={() => removeImage(image?.id)}
                  className="absolute top-2 right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth"
                >
                  <Icon name="X" size={12} />
                </button>
                
                {/* File Info */}
                <div className="mt-2">
                  <p className="text-xs text-foreground truncate">{image?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(image?.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

// --- LocationSelector.jsx ---
const LocationSelector = ({ selectedLocation, onLocationChange, error }) => {
  const locationOptions = [
    { value: '', label: 'Select your location' },
    { value: 'new-york-ny', label: 'New York, NY' },
    { value: 'los-angeles-ca', label: 'Los Angeles, CA' },
    { value: 'chicago-il', label: 'Chicago, IL' },
    { value: 'houston-tx', label: 'Houston, TX' },
    { value: 'phoenix-az', label: 'Phoenix, AZ' },
    { value: 'philadelphia-pa', label: 'Philadelphia, PA' },
    { value: 'san-antonio-tx', label: 'San Antonio, TX' },
    { value: 'san-diego-ca', label: 'San Diego, CA' },
    { value: 'dallas-tx', label: 'Dallas, TX' },
    { value: 'san-jose-ca', label: 'San Jose, CA' },
    { value: 'austin-tx', label: 'Austin, TX' },
    { value: 'jacksonville-fl', label: 'Jacksonville, FL' },
    { value: 'fort-worth-tx', label: 'Fort Worth, TX' },
    { value: 'columbus-oh', label: 'Columbus, OH' },
    { value: 'charlotte-nc', label: 'Charlotte, NC' },
    { value: 'san-francisco-ca', label: 'San Francisco, CA' },
    { value: 'indianapolis-in', label: 'Indianapolis, IN' },
    { value: 'seattle-wa', label: 'Seattle, WA' },
    { value: 'denver-co', label: 'Denver, CO' },
    { value: 'boston-ma', label: 'Boston, MA' }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Location</h3>
        <p className="text-sm text-muted-foreground">
          Where is the material located for pickup?
        </p>
      </div>

      <Select
        label="Pickup Location"
        options={locationOptions}
        value={selectedLocation}
        onChange={onLocationChange}
        error={error}
        required
        searchable
        placeholder="Search for your city..."
        description="Buyers will see this location to estimate pickup logistics"
      />

      <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center mt-0.5">
            <span className="text-xs text-accent-foreground font-bold">i</span>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-foreground">Location Privacy</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Only the city and state will be visible to buyers. Your exact address remains private until you choose to share it directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MaterialTypeSelector.jsx ---
const MaterialTypeSelector = ({ selectedMaterial, onMaterialChange, error }) => {
  const materialOptions = [
    { 
      value: 'plastic', 
      label: 'Plastic',
      description: 'PET bottles, containers, packaging materials'
    },
    { 
      value: 'cotton', 
      label: 'Cotton',
      description: 'Textile waste, fabric scraps, cotton fibers'
    },
    { 
      value: 'iron', 
      label: 'Iron',
      description: 'Scrap metal, iron sheets, construction waste'
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Material Type</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select the type of scrap material you're listing
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {materialOptions?.map((material) => (
          <div
            key={material?.value}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-smooth ${
              selectedMaterial === material?.value
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => onMaterialChange(material?.value)}
          >
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={selectedMaterial === material?.value}
                onChange={() => onMaterialChange(material?.value)}
                className="mt-1"
              />
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{material?.label}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {material?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-sm text-destructive mt-2">{error}</p>
      )}
    </div>
  );
};

// --- PricingSection.jsx ---
const PricingSection = ({ 
  quantity, 
  onQuantityChange, 
  pricePerKg, 
  onPriceChange, 
  quantityError, 
  priceError 
}) => {
  const calculateTotalValue = () => {
    const qty = parseFloat(quantity) || 0;
    const price = parseFloat(pricePerKg) || 0;
    return (qty * price)?.toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Quantity & Pricing</h3>
        <p className="text-sm text-muted-foreground">
          Specify the available quantity and your asking price
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Input
            label="Quantity Available"
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => onQuantityChange(e?.target?.value)}
            error={quantityError}
            required
            min="0.1"
            step="0.1"
          />
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Unit: Kilograms (kg)</span>
          </div>
        </div>

        <div className="space-y-2">
          <Input
            label="Price per Kilogram"
            type="number"
            placeholder="Enter price"
            value={pricePerKg}
            onChange={(e) => onPriceChange(e?.target?.value)}
            error={priceError}
            required
            min="0.01"
            step="0.01"
          />
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Currency: USD ($)</span>
          </div>
        </div>
      </div>
      {quantity && pricePerKg && (
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">
              Total Estimated Value:
            </span>
            <span className="text-lg font-bold text-primary font-mono">
              ${calculateTotalValue()}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Based on {quantity} kg × ${pricePerKg}/kg
          </p>
        </div>
      )}
    </div>
  );
};

// We will export all components individually for reusability.
export {
  FormActions,
  DescriptionEditor,
  ImageUploader,
  LocationSelector,
  MaterialTypeSelector,
  PricingSection,
};