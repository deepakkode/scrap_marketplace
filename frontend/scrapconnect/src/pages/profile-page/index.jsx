import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import Header from '../../components/ui/Header';
import ProfileHeader from './components/ProfileHeader';
import ListingManagement from './components/ListingManagement';
import AccountSettings from './components/AccountSettings';
import ActivityFeed from './components/ActivityFeed';
import Icon from '../../components/AppIcon';


const ProfilePage = () => {
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [userListings, setUserListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'listings', label: user?.role === 'Seller' ? 'My Listings' : 'My Inquiries', icon: 'Package' },
    { id: 'activity', label: 'Activity', icon: 'Activity' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  // Mock user data with enhanced profile information
  const enhancedUser = {
    ...user,
    phone: user?.phone || '',
    company: user?.company || '',
    location: user?.location || '',
    bio: user?.bio || '',
    avatar: user?.avatar || null,
    isVerified: user?.isVerified ?? false,
    twoFactorEnabled: user?.twoFactorEnabled ?? false,
    createdAt: user?.createdAt || new Date()?.toISOString(),
    rating: user?.rating || null,
    stats: user?.stats || {
      totalListings: 0,
      activeListings: 0,
      completedDeals: 0
    },
    settings: user?.settings || {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      marketingEmails: false,
      weeklyDigest: true,
      instantAlerts: true,
      publicProfile: true,
      showContactInfo: true
    }
  };

  useEffect(() => {
    // Load user data without dummy listings
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // TODO: Replace with actual API call to fetch user's listings
        // Set empty array - no dummy data
        setUserListings([]);
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleUpdateProfile = (updatedData) => {
    updateUser(updatedData);
  };

  const handleEditListing = (listing) => {
    console.log('Edit listing:', listing);
    // Navigate to edit listing page or open edit modal
  };

  const handleDeleteListing = (listingId) => {
    setUserListings(prev => prev?.filter(listing => listing?.id !== listingId));
  };

  const handleMarkAsSold = (listingId) => {
    setUserListings(prev => 
      prev?.map(listing => 
        listing?.id === listingId 
          ? { ...listing, status: 'sold' }
          : listing
      )
    );
  };

  const handleUpdateSettings = (settings) => {
    updateUser({ settings: { ...enhancedUser?.settings, ...settings } });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <ProfileHeader 
              user={enhancedUser} 
              onUpdateProfile={handleUpdateProfile}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ListingManagement
                listings={userListings?.slice(0, 4)}
                userRole={user?.role}
                onEditListing={handleEditListing}
                onDeleteListing={handleDeleteListing}
                onMarkAsSold={handleMarkAsSold}
              />
              <ActivityFeed
                userRole={user?.role}
              />
            </div>
          </div>
        );
      
      case 'listings':
        return (
          <ListingManagement
            listings={userListings}
            userRole={user?.role}
            onEditListing={handleEditListing}
            onDeleteListing={handleDeleteListing}
            onMarkAsSold={handleMarkAsSold}
          />
        );
      
      case 'activity':
        return (
          <ActivityFeed
            userRole={user?.role}
          />
        );
      
      case 'settings':
        return (
          <AccountSettings
            user={enhancedUser}
            onUpdateSettings={handleUpdateSettings}
          />
        );
      
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} onLogout={logout} />
        <div className="pt-16 pb-20 lg:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse">
                  <Icon name="User" size={20} color="white" />
                </div>
                <div className="text-muted-foreground">Loading profile...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={logout} />
      <div className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <span>Profile</span>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground">{tabs?.find(tab => tab?.id === activeTab)?.label}</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              {user?.name}'s Profile
            </h1>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;