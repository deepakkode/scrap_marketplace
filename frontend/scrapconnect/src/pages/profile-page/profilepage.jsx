import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Image from '../../../components/AppImage';
import Select from '../../../components/ui/Select';

// The combined components start here
// --- AccountSettings.jsx ---
const AccountSettings = ({ user, onUpdateSettings }) => {
  const [activeSection, setActiveSection] = useState('security');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: user?.settings?.emailNotifications ?? true,
    smsNotifications: user?.settings?.smsNotifications ?? false,
    pushNotifications: user?.settings?.pushNotifications ?? true,
    marketingEmails: user?.settings?.marketingEmails ?? false,
    weeklyDigest: user?.settings?.weeklyDigest ?? true,
    instantAlerts: user?.settings?.instantAlerts ?? true
  });

  const sections = [
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'privacy', label: 'Privacy', icon: 'Lock' },
    { id: 'account', label: 'Account', icon: 'Settings' }
  ];

  const handlePasswordChange = async () => {
    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock password change
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      alert('Password updated successfully');
    } catch (error) {
      console.error('Failed to update password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationUpdate = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (onUpdateSettings) {
        onUpdateSettings({ notifications: notificationSettings });
      }
      alert('Notification settings updated successfully');
    } catch (error) {
      console.error('Failed to update notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChange = (key, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion requested. You will receive a confirmation email.');
    }
  };

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={passwordData?.currentPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e?.target?.value }))}
            placeholder="Enter current password"
          />
          <Input
            label="New Password"
            type="password"
            value={passwordData?.newPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e?.target?.value }))}
            placeholder="Enter new password"
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordData?.confirmPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e?.target?.value }))}
            placeholder="Confirm new password"
          />
          <Button
            variant="default"
            onClick={handlePasswordChange}
            loading={isLoading}
            iconName="Key"
            iconPosition="left"
          >
            Update Password
          </Button>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div>
            <div className="font-medium text-foreground">SMS Authentication</div>
            <div className="text-sm text-muted-foreground">
              {user?.twoFactorEnabled ? 'Enabled' : 'Not enabled'}
            </div>
          </div>
          <Button
            variant={user?.twoFactorEnabled ? "destructive" : "default"}
            size="sm"
            iconName={user?.twoFactorEnabled ? "ShieldOff" : "Shield"}
            iconPosition="left"
          >
            {user?.twoFactorEnabled ? 'Disable' : 'Enable'}
          </Button>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Login Sessions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Monitor" size={20} color="var(--color-muted-foreground)" />
              <div>
                <div className="font-medium text-foreground">Current Session</div>
                <div className="text-sm text-muted-foreground">Chrome on Windows • Active now</div>
              </div>
            </div>
            <span className="text-xs text-success font-medium">Current</span>
          </div>
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Smartphone" size={20} color="var(--color-muted-foreground)" />
              <div>
                <div className="font-medium text-foreground">Mobile Session</div>
                <div className="text-sm text-muted-foreground">Safari on iPhone • 2 hours ago</div>
              </div>
            </div>
            <Button variant="ghost" size="sm" iconName="X">
              Revoke
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <Checkbox
            label="Email notifications"
            description="Receive notifications via email"
            checked={notificationSettings?.emailNotifications}
            onChange={(e) => handleNotificationChange('emailNotifications', e?.target?.checked)}
          />
          <Checkbox
            label="Weekly digest"
            description="Get a weekly summary of your activity"
            checked={notificationSettings?.weeklyDigest}
            onChange={(e) => handleNotificationChange('weeklyDigest', e?.target?.checked)}
          />
          <Checkbox
            label="Marketing emails"
            description="Receive promotional emails and updates"
            checked={notificationSettings?.marketingEmails}
            onChange={(e) => handleNotificationChange('marketingEmails', e?.target?.checked)}
          />
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Push Notifications</h3>
        <div className="space-y-4">
          <Checkbox
            label="Push notifications"
            description="Receive push notifications in your browser"
            checked={notificationSettings?.pushNotifications}
            onChange={(e) => handleNotificationChange('pushNotifications', e?.target?.checked)}
          />
          <Checkbox
            label="Instant alerts"
            description="Get notified immediately for important updates"
            checked={notificationSettings?.instantAlerts}
            onChange={(e) => handleNotificationChange('instantAlerts', e?.target?.checked)}
          />
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">SMS Notifications</h3>
        <div className="space-y-4">
          <Checkbox
            label="SMS notifications"
            description="Receive notifications via text message"
            checked={notificationSettings?.smsNotifications}
            onChange={(e) => handleNotificationChange('smsNotifications', e?.target?.checked)}
          />
        </div>
      </div>

      <div className="pt-4">
        <Button
          variant="default"
          onClick={handleNotificationUpdate}
          loading={isLoading}
          iconName="Save"
          iconPosition="left"
        >
          Save Notification Settings
        </Button>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Profile Visibility</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <div className="font-medium text-foreground">Public Profile</div>
              <div className="text-sm text-muted-foreground">
                Allow others to find and view your profile
              </div>
            </div>
            <Checkbox
              checked={user?.settings?.publicProfile ?? true}
              onChange={(e) => console.log('Public profile:', e?.target?.checked)}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <div className="font-medium text-foreground">Show Contact Info</div>
              <div className="text-sm text-muted-foreground">
                Display your contact information on listings
              </div>
            </div>
            <Checkbox
              checked={user?.settings?.showContactInfo ?? true}
              onChange={(e) => console.log('Show contact info:', e?.target?.checked)}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Data & Privacy</h3>
        <div className="space-y-3">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            className="w-full justify-start"
          >
            Download My Data
          </Button>
          <Button
            variant="outline"
            iconName="FileText"
            iconPosition="left"
            className="w-full justify-start"
          >
            Privacy Policy
          </Button>
          <Button
            variant="outline"
            iconName="Shield"
            iconPosition="left"
            className="w-full justify-start"
          >
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAccountSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Information</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <div className="font-medium text-foreground">Account Created</div>
              <div className="text-sm text-muted-foreground">
                {new Date(user?.createdAt || '2024-01-15')?.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <div className="font-medium text-foreground">Account Type</div>
              <div className="text-sm text-muted-foreground">{user?.role || 'User'}</div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <div className="font-medium text-foreground">Email Verification</div>
              <div className="text-sm text-muted-foreground">
                {user?.isVerified ? 'Verified' : 'Not verified'}
              </div>
            </div>
            {!user?.isVerified && (
              <Button variant="outline" size="sm">
                Verify Email
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h3>
        <div className="p-4 border border-destructive rounded-lg">
          <div className="mb-4">
            <div className="font-medium text-foreground">Delete Account</div>
            <div className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data. This action cannot be undone.
            </div>
          </div>
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}
            iconName="Trash2"
            iconPosition="left"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'security':
        return renderSecuritySection();
      case 'notifications':
        return renderNotificationsSection();
      case 'privacy':
        return renderPrivacySection();
      case 'account':
        return renderAccountSection();
      default:
        return renderSecuritySection();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">Account Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your account security, notifications, and privacy settings
        </p>
      </div>
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-64 border-b lg:border-b-0 lg:border-r border-border">
          <nav className="p-4">
            <div className="space-y-1">
              {sections?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => setActiveSection(section?.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    activeSection === section?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={section?.icon} size={18} />
                  <span>{section?.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// --- ActivityFeed.jsx ---
const ActivityFeed = ({ activities = [], userRole }) => {
  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('week');

  const filterOptions = [
    { value: 'all', label: 'All Activity' },
    { value: 'listings', label: 'Listings' },
    { value: 'inquiries', label: 'Inquiries' },
    { value: 'messages', label: 'Messages' },
    { value: 'transactions', label: 'Transactions' }
  ];

  const timeRangeOptions = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' }
  ];

  const allActivities = activities || [];

  const filteredActivities = allActivities?.filter(activity => {
    if (filter === 'all') return true;
    return activity?.type?.includes(filter?.slice(0, -1)); // Remove 's' from filter
  });

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  const getActivityIcon = (type) => {
    const iconMap = {
      listing_created: 'Plus',
      listing_updated: 'Edit',
      listing_viewed: 'Eye',
      inquiry_received: 'MessageCircle',
      inquiry_sent: 'Send',
      message_received: 'Mail',
      message_sent: 'Send',
      transaction_completed: 'CheckCircle',
      profile_updated: 'User',
      account_verified: 'Shield'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      listing_created: 'text-success',
      listing_updated: 'text-accent',
      listing_viewed: 'text-muted-foreground',
      inquiry_received: 'text-accent',
      inquiry_sent: 'text-accent',
      message_received: 'text-accent',
      message_sent: 'text-muted-foreground',
      transaction_completed: 'text-success',
      profile_updated: 'text-muted-foreground',
      account_verified: 'text-success'
    };
    return colorMap?.[type] || 'text-muted-foreground';
  };

  if (filteredActivities?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Activity" size={24} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Activity Yet</h3>
        <p className="text-muted-foreground mb-4">
          Your recent activity will appear here once you start using the platform.
        </p>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
        >
          Get Started
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
            <p className="text-sm text-muted-foreground">
              Track your recent actions and interactions
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Select
              options={filterOptions}
              value={filter}
              onChange={setFilter}
              placeholder="Filter activity"
              className="w-40"
            />
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={setTimeRange}
              placeholder="Time range"
              className="w-32"
            />
          </div>
        </div>
      </div>
      {/* Activity List */}
      <div className="p-6">
        <div className="space-y-4">
          {filteredActivities?.map((activity, index) => (
            <div key={activity?.id} className="flex items-start space-x-4 p-4 hover:bg-muted rounded-lg transition-smooth">
              {/* Icon */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                <Icon 
                  name={getActivityIcon(activity?.type)} 
                  size={18} 
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground">
                      {activity?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activity?.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <span className="text-xs text-muted-foreground">
                      {getTimeAgo(activity?.timestamp)}
                    </span>
                  </div>
                </div>

                {/* Additional Actions */}
                {activity?.type === 'inquiry_received' && (
                  <div className="flex space-x-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MessageCircle"
                      iconPosition="left"
                    >
                      Reply
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                    >
                      View Details
                    </Button>
                  </div>
                )}

                {activity?.type === 'transaction_completed' && (
                  <div className="flex space-x-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Download"
                      iconPosition="left"
                    >
                      Download Receipt
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Star"
                      iconPosition="left"
                    >
                      Rate Buyer
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-6">
          <Button
            variant="outline"
            iconName="ChevronDown"
            iconPosition="left"
          >
            Load More Activity
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- ListingManagement.jsx ---
const ListingManagement = ({ listings = [], userRole, onEditListing, onDeleteListing, onMarkAsSold }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filterOptions = [
    { value: 'all', label: 'All Listings' },
    { value: 'active', label: 'Active' },
    { value: 'sold', label: 'Sold' },
    { value: 'draft', label: 'Draft' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'price-low', label: 'Price: Low to High' }
  ];

  const filteredListings = listings?.filter(listing => {
    if (filter === 'all') return true;
    return listing?.status === filter;
  });

  const sortedListings = [...filteredListings]?.sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.postedDate) - new Date(b.postedDate);
      case 'price-high':
        return b?.price - a?.price;
      case 'price-low':
        return a?.price - b?.price;
      default:
        return new Date(b.postedDate) - new Date(a.postedDate);
    }
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Active' },
      sold: { color: 'bg-muted text-muted-foreground', label: 'Sold' },
      draft: { color: 'bg-warning text-warning-foreground', label: 'Draft' },
      expired: { color: 'bg-destructive text-destructive-foreground', label: 'Expired' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.active;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatPrice = (price) => {
    return `$${price?.toLocaleString()}`;
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleEdit = (listing) => {
    if (onEditListing) {
      onEditListing(listing);
    }
  };

  const handleDelete = (listingId) => {
    if (onDeleteListing && window.confirm('Are you sure you want to delete this listing?')) {
      onDeleteListing(listingId);
    }
  };

  const handleMarkAsSold = (listingId) => {
    if (onMarkAsSold) {
      onMarkAsSold(listingId);
    }
  };

  if (listings?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name={userRole === 'Seller' ? 'Package' : 'Search'} size={24} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {userRole === 'Seller' ? 'No Listings Yet' : 'No Inquiries Yet'}
        </h3>
        <p className="text-muted-foreground mb-4">
          {userRole === 'Seller' ?'Start by creating your first scrap material listing to connect with buyers.' :'Browse the marketplace and start inquiring about materials you need.'
          }
        </p>
        <Button
          variant="default"
          iconName={userRole === 'Seller' ? 'Plus' : 'Search'}
          iconPosition="left"
        >
          {userRole === 'Seller' ? 'Create First Listing' : 'Explore Marketplace'}
        </Button>
      </div>
    );
  }

  const displayData = userRole === 'Seller' ? listings : [];

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {userRole === 'Seller' ? 'My Listings' : 'My Inquiries'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {userRole === 'Seller' ?'Manage your scrap material listings' :'Track your material inquiries and saved searches'
              }
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Select
              options={filterOptions}
              value={filter}
              onChange={setFilter}
              placeholder="Filter by status"
              className="w-40"
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              className="w-40"
            />
          </div>
        </div>
      </div>
      {/* Listings Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedListings?.map((listing) => (
            <div key={listing?.id} className="border border-border rounded-lg overflow-hidden hover:shadow-card transition-smooth">
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={listing?.images?.[0] || '/assets/images/no_image.png'}
                  alt={listing?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  {getStatusBadge(listing?.status)}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {listing?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {listing?.material}
                    </p>
                  </div>
                  <div className="text-right ml-2">
                    <div className="font-bold text-foreground font-mono">
                      {formatPrice(listing?.price)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      per {listing?.unit}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Package" size={14} />
                    <span className="font-mono">{listing?.quantity} {listing?.unit}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{formatDate(listing?.postedDate)}</span>
                  </div>
                </div>

                {listing?.location && (
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-3">
                    <Icon name="MapPin" size={14} />
                    <span>{listing?.location}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  {userRole === 'Seller' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(listing)}
                        iconName="Edit"
                        iconPosition="left"
                        className="flex-1"
                      >
                        Edit
                      </Button>
                      
                      {listing?.status === 'active' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleMarkAsSold(listing?.id)}
                          iconName="Check"
                          iconPosition="left"
                        >
                          Mark Sold
                        </Button>
                      )}
                      
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(listing?.id)}
                        iconName="Trash2"
                      />
                    </>
                  )}
                  
                  {userRole === 'Buyer' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="MessageCircle"
                        iconPosition="left"
                        className="flex-1"
                      >
                        Contact
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Heart"
                      />
                    </>
                  )}
                </div>

                {/* Stats for sellers */}
                {userRole === 'Seller' && listing?.stats && (
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} />
                      <span>{listing?.stats?.views} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={12} />
                      <span>{listing?.stats?.inquiries} inquiries</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- ProfileHeader.jsx ---
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

// We will export all components individually for reusability.
export {
  AccountSettings,
  ActivityFeed,
  ListingManagement,
  ProfileHeader,
};