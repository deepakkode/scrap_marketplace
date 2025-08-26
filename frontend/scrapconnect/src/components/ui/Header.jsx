import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Home Feed',
      path: '/home-feed',
      icon: 'Home',
      roleRequired: 'Both'
    },
    {
      label: 'Explore',
      path: '/explore-page',
      icon: 'Search',
      roleRequired: 'Both'
    },
    {
      label: 'Upload',
      path: '/upload-page',
      icon: 'Plus',
      roleRequired: 'Seller'
    },
    {
      label: 'Profile',
      path: '/profile-page',
      icon: 'User',
      roleRequired: 'Both'
    }
  ];

  const filteredNavItems = navigationItems?.filter(item => 
    item?.roleRequired === 'Both' || 
    (user?.role && item?.roleRequired === user?.role)
  );

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => location?.pathname === path;

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="Recycle" size={20} color="white" />
      </div>
      <span className="text-xl font-semibold text-primary">ScrapConnect</span>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {filteredNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {item?.label}
              </button>
            ))}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.name || 'User'}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  iconName="LogOut"
                  iconPosition="left"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              iconName={isMobileMenuOpen ? 'X' : 'Menu'}
            />
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-2 space-y-1">
            {filteredNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
            
            {user && (
              <div className="pt-2 mt-2 border-t border-border">
                <div className="px-3 py-2 text-xs text-muted-foreground">
                  Signed in as {user?.name || 'User'}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  iconName="LogOut"
                  iconPosition="left"
                  className="w-full justify-start"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Mobile Bottom Tab Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border">
        <div className="flex items-center justify-around py-2">
          {filteredNavItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-smooth ${
                isActivePath(item?.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                color={isActivePath(item?.path) ? 'var(--color-primary)' : 'currentColor'}
              />
              <span className="text-xs font-medium">{item?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;