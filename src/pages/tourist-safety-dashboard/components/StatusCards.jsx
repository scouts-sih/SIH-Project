import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const StatusCards = () => {
  const [statuses, setStatuses] = useState({
    network: { status: 'online', strength: 4, type: '4G' },
    location: { status: 'accurate', accuracy: 'high', lastUpdate: new Date() },
    emergency: { status: 'available', contacts: 3, verified: true },
    battery: { level: 85, charging: false }
  });

  useEffect(() => {
    // Simulate real-time status updates
    const interval = setInterval(() => {
      setStatuses(prev => ({
        ...prev,
        location: {
          ...prev?.location,
          lastUpdate: new Date()
        },
        battery: {
          ...prev?.battery,
          level: Math.max(20, prev?.battery?.level - Math.random() * 2)
        }
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getNetworkStatus = () => {
    const { status, strength, type } = statuses?.network;
    return {
      icon: status === 'online' ? 'Wifi' : 'WifiOff',
      color: status === 'online' ? 'text-success' : 'text-error',
      bg: status === 'online' ? 'bg-success/10' : 'bg-error/10',
      label: status === 'online' ? `${type} Connected` : 'No Connection',
      detail: status === 'online' ? `Signal: ${strength}/4` : 'Check connection'
    };
  };

  const getLocationStatus = () => {
    const { status, accuracy } = statuses?.location;
    return {
      icon: status === 'accurate' ? 'MapPin' : 'MapPinOff',
      color: status === 'accurate' ? 'text-success' : 'text-warning',
      bg: status === 'accurate' ? 'bg-success/10' : 'bg-warning/10',
      label: status === 'accurate' ? 'GPS Active' : 'GPS Limited',
      detail: `Accuracy: ${accuracy}`
    };
  };

  const getEmergencyStatus = () => {
    const { status, contacts, verified } = statuses?.emergency;
    return {
      icon: verified ? 'Shield' : 'ShieldAlert',
      color: verified ? 'text-success' : 'text-warning',
      bg: verified ? 'bg-success/10' : 'bg-warning/10',
      label: status === 'available' ? 'Contacts Ready' : 'Setup Required',
      detail: `${contacts} emergency contacts`
    };
  };

  const getBatteryStatus = () => {
    const { level, charging } = statuses?.battery;
    return {
      icon: charging ? 'BatteryCharging' : level > 20 ? 'Battery' : 'BatteryLow',
      color: level > 50 ? 'text-success' : level > 20 ? 'text-warning' : 'text-error',
      bg: level > 50 ? 'bg-success/10' : level > 20 ? 'bg-warning/10' : 'bg-error/10',
      label: charging ? 'Charging' : `${Math.round(level)}%`,
      detail: charging ? 'Power connected' : level > 20 ? 'Battery good' : 'Low battery'
    };
  };

  const network = getNetworkStatus();
  const location = getLocationStatus();
  const emergency = getEmergencyStatus();
  const battery = getBatteryStatus();

  const statusItems = [
    { key: 'network', ...network },
    { key: 'location', ...location },
    { key: 'emergency', ...emergency },
    { key: 'battery', ...battery }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statusItems?.map((item) => (
        <div key={item?.key} className={`${item?.bg} rounded-xl p-4 border border-border`}>
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg bg-card ${item?.color}`}>
              <Icon name={item?.icon} size={20} />
            </div>
            <div className={`w-2 h-2 rounded-full ${
              item?.color === 'text-success' ? 'bg-success' :
              item?.color === 'text-warning'? 'bg-warning' : 'bg-error'
            }`} />
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-1">
              {item?.label}
            </h4>
            <p className="text-xs text-muted-foreground">
              {item?.detail}
            </p>
          </div>

          {item?.key === 'location' && (
            <div className="mt-2 text-xs text-muted-foreground">
              Updated: {statuses?.location?.lastUpdate?.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          )}

          {item?.key === 'battery' && statuses?.battery?.level <= 20 && (
            <div className="mt-2">
              <div className="w-full bg-muted rounded-full h-1">
                <div 
                  className="bg-error h-1 rounded-full transition-all duration-300"
                  style={{ width: `${statuses?.battery?.level}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatusCards;