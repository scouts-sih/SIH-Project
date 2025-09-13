import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const location = useLocation();

  const primaryNavItems = [
    { path: '/tourist-safety-dashboard', label: 'Safety Dashboard', icon: 'Shield' },
    { path: '/authority-monitoring-hub', label: 'Tourist Monitoring', icon: 'Users' },
    { path: '/geo-fence-management', label: 'Zone Management', icon: 'MapPin' },
    { path: '/incident-report-dashboard', label: 'Incident Response', icon: 'AlertTriangle' },
  ];

  const secondaryNavItems = [
    { path: '/digital-id-generation', label: 'ID Services', icon: 'CreditCard' },
    { path: '/system-administration', label: 'System Admin', icon: 'Settings' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMoreMenu = () => setIsMoreMenuOpen(!isMoreMenuOpen);

  return (
    <header className="sticky top-0 z-100 bg-card border-b border-border shadow-elevated">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Shield" size={24} color="white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground">TouristGuard</h1>
                <p className="text-xs text-muted-foreground">Government Safety Platform</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            ))}
            
            {/* More Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMoreMenu}
                className="flex items-center space-x-1"
              >
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
                <Icon name="ChevronDown" size={14} />
              </Button>
              
              {isMoreMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-elevated-hover z-200">
                  <div className="py-1">
                    {secondaryNavItems?.map((item) => (
                      <Link
                        key={item?.path}
                        to={item?.path}
                        onClick={() => setIsMoreMenuOpen(false)}
                        className={`flex items-center space-x-2 px-4 py-2 text-sm transition-micro ${
                          isActivePath(item?.path)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-popover-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={item?.icon} size={16} />
                        <span>{item?.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Emergency Button */}
            <Button
              variant="destructive"
              size="sm"
              className="hidden sm:flex items-center space-x-2 shadow-emergency"
            >
              <Icon name="Phone" size={16} />
              <span>SOS</span>
            </Button>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="var(--color-muted-foreground)" />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="lg:hidden"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Emergency Button Mobile */}
              <Button
                variant="destructive"
                size="sm"
                fullWidth
                className="mb-3 shadow-emergency"
              >
                <Icon name="Phone" size={16} />
                <span>Emergency SOS</span>
              </Button>

              {/* Primary Navigation */}
              {primaryNavItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-micro ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}

              {/* Secondary Navigation */}
              <div className="pt-2 border-t border-border">
                {secondaryNavItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-micro ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Click outside overlay for more menu */}
      {isMoreMenuOpen && (
        <div
          className="fixed inset-0 z-100"
          onClick={() => setIsMoreMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;