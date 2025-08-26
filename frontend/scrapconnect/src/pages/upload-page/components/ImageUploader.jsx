import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

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

export default ImageUploader;