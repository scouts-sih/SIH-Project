import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const StatusIndicatorBar = () => {
  const [status, setStatus] = useState({
    connectivity: 'online', // online, offline, poor
    location: 'accurate', // accurate, approximate, unavailable
    security: 'secure', // secure, warning, alert
    lastSync: new Date(),
    activeUsers: 1247,
    systemLoad: 'normal' // normal, high, critical
  });

  useEffect(() => {
    // Simulate real-time status updates
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        lastSync: new Date(),
        activeUsers: Math.floor(Math.random() * 200) + 1200,
        systemLoad: Math.random() > 0.9 ? 'high' : 'normal'
      }));
    }, 30000);

    // Simulate connectivity changes
    const connectivityInterval = setInterval(() => {
      const rand = Math.random();
      let connectivity = 'online';
      if (rand < 0.05) connectivity = 'offline';
      else if (rand < 0.15) connectivity = 'poor';
      
      setStatus(prev => ({ ...prev, connectivity }));
    }, 60000);

    return () => {
      clearInterval(interval);
      clearInterval(connectivityInterval);
    };
  }, []);

  const getConnectivityStatus = () => {
    switch (status?.connectivity) {
      case 'online':
        return { icon: 'Wifi', color: 'text-success', bg: 'bg-success/10', label: 'Online' };
      case 'poor':
        return { icon: 'WifiOff', color: 'text-warning', bg: 'bg-warning/10', label: 'Poor Connection' };
      case 'offline':
        return { icon: 'WifiOff', color: 'text-error', bg: 'bg-error/10', label: 'Offline' };
      default:
        return { icon: 'Wifi', color: 'text-success', bg: 'bg-success/10', label: 'Online' };
    }
  };

  const getLocationStatus = () => {
    switch (status?.location) {
      case 'accurate':
        return { icon: 'MapPin', color: 'text-success', bg: 'bg-success/10', label: 'GPS Accurate' };
      case 'approximate':
        return { icon: 'MapPin', color: 'text-warning', bg: 'bg-warning/10', label: 'GPS Approximate' };
      case 'unavailable':
        return { icon: 'MapPinOff', color: 'text-error', bg: 'bg-error/10', label: 'GPS Unavailable' };
      default:
        return { icon: 'MapPin', color: 'text-success', bg: 'bg-success/10', label: 'GPS Accurate' };
    }
  };

  const getSecurityStatus = () => {
    switch (status?.security) {
      case 'secure':
        return { icon: 'Shield', color: 'text-success', bg: 'bg-success/10', label: 'Secure' };
      case 'warning':
        return { icon: 'ShieldAlert', color: 'text-warning', bg: 'bg-warning/10', label: 'Security Warning' };
      case 'alert':
        return { icon: 'ShieldX', color: 'text-error', bg: 'bg-error/10', label: 'Security Alert' };
      default:
        return { icon: 'Shield', color: 'text-success', bg: 'bg-success/10', label: 'Secure' };
    }
  };

  const getSystemLoadStatus = () => {
    switch (status?.systemLoad) {
      case 'normal':
        return { icon: 'Server', color: 'text-success', bg: 'bg-success/10', label: 'Normal Load' };
      case 'high':
        return { icon: 'Server', color: 'text-warning', bg: 'bg-warning/10', label: 'High Load' };
      case 'critical':
        return { icon: 'ServerCrash', color: 'text-error', bg: 'bg-error/10', label: 'Critical Load' };
      default:
        return { icon: 'Server', color: 'text-success', bg: 'bg-success/10', label: 'Normal Load' };
    }
  };

  let connectivity = getConnectivityStatus();
  const location = getLocationStatus();
  const security = getSecurityStatus();
  const systemLoad = getSystemLoadStatus();

  return (
    <div className="bg-muted/50 border-b border-border px-4 py-1">
      <div className="flex items-center justify-between text-xs">
        {/* Left Side - System Status */}
        <div className="flex items-center space-x-4">
          {/* Connectivity */}
          <div className="flex items-center space-x-1">
            <div className={`p-1 rounded ${connectivity?.bg}`}>
              <Icon name={connectivity?.icon} size={12} className={connectivity?.color} />
            </div>
            <span className="hidden sm:inline text-muted-foreground">{connectivity?.label}</span>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-1">
            <div className={`p-1 rounded ${location?.bg}`}>
              <Icon name={location?.icon} size={12} className={location?.color} />
            </div>
            <span className="hidden md:inline text-muted-foreground">{location?.label}</span>
          </div>

          {/* Security */}
          <div className="flex items-center space-x-1">
            <div className={`p-1 rounded ${security?.bg}`}>
              <Icon name={security?.icon} size={12} className={security?.color} />
            </div>
            <span className="hidden lg:inline text-muted-foreground">{security?.label}</span>
          </div>
        </div>

        {/* Center - Active Users (Desktop only) */}
        <div className="hidden lg:flex items-center space-x-2 text-muted-foreground">
          <Icon name="Users" size={12} />
          <span>{status?.activeUsers?.toLocaleString()} active users</span>
        </div>

        {/* Right Side - System Info */}
        <div className="flex items-center space-x-4">
          {/* System Load */}
          <div className="flex items-center space-x-1">
            <div className={`p-1 rounded ${systemLoad?.bg}`}>
              <Icon name={systemLoad?.icon} size={12} className={systemLoad?.color} />
            </div>
            <span className="hidden sm:inline text-muted-foreground">{systemLoad?.label}</span>
          </div>

          {/* Last Sync */}
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="RefreshCw" size={12} />
            <span className="hidden md:inline">
              {status?.lastSync?.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusIndicatorBar;