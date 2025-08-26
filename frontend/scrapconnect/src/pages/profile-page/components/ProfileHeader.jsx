import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const ProfileHeader = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    location: user?.location || '',
    bio: user?.bio || ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { value: 'Buyer', label: 'Buyer' },
    { value: 'Seller', label: 'Seller' }
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      company: user?.company || '',
      location: user?.location || '',
      bio: user?.bio || ''
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdateProfile(editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getInitials = (name) => {
    return name
      ?.split(' ')?.map(word => word?.charAt(0))?.join('')?.toUpperCase()?.slice(0, 2) || 'U';
  };

  const getRoleBadgeColor = (role) => {
    return role === 'Seller' ?'bg-success text-success-foreground' :'bg-accent text-accent-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
        {/* Profile Avatar */}
        <div className="flex-shrink-0 mb-4 lg:mb-0">
          <div className="relative">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center text-2xl font-semibold text-muted-foreground">
              {user?.avatar ? (
                <Image
                  src={user?.avatar}
                  alt={`${user?.name}'s avatar`}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                getInitials(user?.name)
              )}
            </div>
            <div className="absolute -bottom-1 -right-1">
              <div className={`w-6 h-6 rounded-full border-2 border-card flex items-center justify-center ${getRoleBadgeColor(user?.role)}`}>
                <Icon 
                  name={user?.role === 'Seller' ? 'Store' : 'ShoppingCart'} 
                  size={12} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            <div>
              {!isEditing ? (
                <>
                  <h1 className="text-2xl font-bold text-foreground mb-1">
                    {user?.name || 'Anonymous User'}
                  </h1>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(user?.role)}`}>
                      {user?.role || 'User'}
                    </span>
                    {user?.isVerified && (
                      <div className="flex items-center space-x-1 text-success">
                        <Icon name="CheckCircle" size={16} />
                        <span className="text-xs font-medium">Verified</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="space-y-3 mb-4">
                  <Input
                    label="Full Name"
                    value={editData?.name}
                    onChange={(e) => handleInputChange('name', e?.target?.value)}
                    placeholder="Enter your full name"
                  />
                </div>
              )}
            </div>

            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
                iconName="Edit"
                iconPosition="left"
              >
                Edit Profile
              </Button>
            )}
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {!isEditing ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Mail" size={16} />
                  <span>{user?.email || 'No email provided'}</span>
                </div>
                {user?.phone && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Phone" size={16} />
                    <span>{user?.phone}</span>
                  </div>
                )}
                {user?.location && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="MapPin" size={16} />
                    <span>{user?.location}</span>
                  </div>
                )}
                {user?.company && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Building" size={16} />
                    <span>{user?.company}</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <Input
                  label="Email Address"
                  type="email"
                  value={editData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  placeholder="Enter your email"
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={editData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  placeholder="Enter your phone number"
                />
                <Input
                  label="Location"
                  value={editData?.location}
                  onChange={(e) => handleInputChange('location', e?.target?.value)}
                  placeholder="Enter your location"
                />
                <Input
                  label="Company"
                  value={editData?.company}
                  onChange={(e) => handleInputChange('company', e?.target?.value)}
                  placeholder="Enter your company name"
                />
              </>
            )}
          </div>

          {/* Bio Section */}
          {!isEditing ? (
            user?.bio && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  {user?.bio}
                </p>
              </div>
            )
          ) : (
            <div className="mb-4">
              <Input
                label="Bio"
                value={editData?.bio}
                onChange={(e) => handleInputChange('bio', e?.target?.value)}
                placeholder="Tell us about yourself"
              />
            </div>
          )}

          {/* Edit Actions */}
          {isEditing && (
            <div className="flex space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
                loading={isLoading}
                iconName="Check"
                iconPosition="left"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isLoading}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
            </div>
          )}

          {/* Account Stats */}
          <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">
                {user?.stats?.totalListings || 0}
              </div>
              <div className="text-xs text-muted-foreground">
                {user?.role === 'Seller' ? 'Listings' : 'Inquiries'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">
                {user?.stats?.activeListings || 0}
              </div>
              <div className="text-xs text-muted-foreground">
                {user?.role === 'Seller' ? 'Active' : 'Saved'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">
                {user?.stats?.completedDeals || 0}
              </div>
              <div className="text-xs text-muted-foreground">
                Completed
              </div>
            </div>
            {user?.rating && (
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Icon name="Star" size={16} color="#D69E2E" className="fill-current" />
                  <span className="text-lg font-semibold text-foreground">
                    {user?.rating}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;