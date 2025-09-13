import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      category: 'Tourist Safety',
      items: [
        { path: '/tourist-safety-dashboard', label: 'Safety Dashboard', icon: 'Shield', description: 'Real-time tourist monitoring' },
      ]
    },
    {
      category: 'Authority Operations',
      items: [
        { path: '/authority-monitoring-hub', label: 'Tourist Monitoring', icon: 'Users', description: 'Active tourist oversight' },
        { path: '/geo-fence-management', label: 'Zone Management', icon: 'MapPin', description: 'Geographic boundaries' },
        { path: '/incident-report-dashboard', label: 'Incident Response', icon: 'AlertTriangle', description: 'Emergency case management' },
      ]
    },
    {
      category: 'Administration',
      items: [
        { path: '/digital-id-generation', label: 'ID Services', icon: 'CreditCard', description: 'Digital identity creation' },
        { path: '/system-administration', label: 'System Admin', icon: 'Settings', description: 'Platform configuration' },
      ]
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleEmergencyToggle = () => {
    setIsEmergencyMode(!isEmergencyMode);
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border shadow-elevated z-100 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="flex flex-col h-full">
          {/* Emergency Section */}
          <div className="p-4 border-b border-border">
            {!isCollapsed ? (
              <Button
                variant={isEmergencyMode ? "destructive" : "outline"}
                fullWidth
                onClick={handleEmergencyToggle}
                className={`shadow-emergency ${isEmergencyMode ? 'animate-pulse' : ''}`}
              >
                <Icon name="Phone" size={16} />
                <span>{isEmergencyMode ? 'Emergency Active' : 'Emergency SOS'}</span>
              </Button>
            ) : (
              <Button
                variant={isEmergencyMode ? "destructive" : "outline"}
                size="icon"
                onClick={handleEmergencyToggle}
                className={`w-full shadow-emergency ${isEmergencyMode ? 'animate-pulse' : ''}`}
              >
                <Icon name="Phone" size={16} />
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            {navigationItems?.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-6">
                {!isCollapsed && (
                  <h3 className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {category?.category}
                  </h3>
                )}
                
                <div className="space-y-1 px-2">
                  {category?.items?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-micro group ${
                        isActivePath(item?.path)
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                      title={isCollapsed ? item?.label : ''}
                    >
                      <Icon 
                        name={item?.icon} 
                        size={20} 
                        className={`flex-shrink-0 ${
                          isActivePath(item?.path) ? 'text-primary-foreground' : 'text-current'
                        }`}
                      />
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item?.label}</div>
                          <div className="text-xs opacity-75 truncate">{item?.description}</div>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            {!isCollapsed ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>System Online</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Last sync: {new Date()?.toLocaleTimeString()}
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-2 h-2 bg-success rounded-full" title="System Online"></div>
              </div>
            )}
          </div>
        </div>

        {/* Toggle Button */}
        {onToggle && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="absolute -right-3 top-6 w-6 h-6 bg-card border border-border rounded-full shadow-sm hover:shadow-md"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={12} />
          </Button>
        )}
      </aside>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 z-50 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;