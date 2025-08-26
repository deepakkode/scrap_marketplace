import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

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

export default AccountSettings;