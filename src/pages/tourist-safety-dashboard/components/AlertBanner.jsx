import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertBanner = () => {
  const [alerts, setAlerts] = useState([]);
  const [currentAlert, setCurrentAlert] = useState(null);

  const mockAlerts = [
    {
      id: 1,
      type: 'geo-fence',
      severity: 'warning',
      title: 'Approaching Restricted Zone',
      message: 'You are 200m away from a restricted construction area. Please maintain safe distance.',
      timestamp: new Date(Date.now() - 300000),
      actions: ['acknowledge', 'navigate']
    },
    {
      id: 2,
      type: 'weather',
      severity: 'info',
      title: 'Weather Update',
      message: 'Heavy rain expected in your area within 2 hours. Consider indoor activities.',
      timestamp: new Date(Date.now() - 600000),
      actions: ['acknowledge']
    },
    {
      id: 3,
      type: 'anomaly',
      severity: 'high',
      title: 'Unusual Activity Detected',
      message: 'AI system detected unusual crowd behavior in your vicinity. Stay alert.',
      timestamp: new Date(Date.now() - 900000),
      actions: ['acknowledge', 'contact']
    }
  ];

  useEffect(() => {
    // Simulate receiving alerts
    const timer = setTimeout(() => {
      setAlerts(mockAlerts);
      setCurrentAlert(mockAlerts?.[0]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getAlertConfig = (severity) => {
    switch (severity) {
      case 'high':
        return {
          bg: 'bg-error/10 border-error/20',
          text: 'text-error',
          icon: 'AlertTriangle',
          iconBg: 'bg-error/20'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10 border-warning/20',
          text: 'text-warning',
          icon: 'AlertCircle',
          iconBg: 'bg-warning/20'
        };
      case 'info':
        return {
          bg: 'bg-accent/10 border-accent/20',
          text: 'text-accent',
          icon: 'Info',
          iconBg: 'bg-accent/20'
        };
      default:
        return {
          bg: 'bg-muted/10 border-border',
          text: 'text-foreground',
          icon: 'Bell',
          iconBg: 'bg-muted/20'
        };
    }
  };

  const handleAcknowledge = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
    if (currentAlert?.id === alertId) {
      const remaining = alerts?.filter(alert => alert?.id !== alertId);
      setCurrentAlert(remaining?.length > 0 ? remaining?.[0] : null);
    }
  };

  const handleNavigate = () => {
    console.log('Navigate to safe route');
    handleAcknowledge(currentAlert?.id);
  };

  const handleContact = () => {
    console.log('Contact emergency services');
  };

  const nextAlert = () => {
    const currentIndex = alerts?.findIndex(alert => alert?.id === currentAlert?.id);
    const nextIndex = (currentIndex + 1) % alerts?.length;
    setCurrentAlert(alerts?.[nextIndex]);
  };

  const prevAlert = () => {
    const currentIndex = alerts?.findIndex(alert => alert?.id === currentAlert?.id);
    const prevIndex = currentIndex === 0 ? alerts?.length - 1 : currentIndex - 1;
    setCurrentAlert(alerts?.[prevIndex]);
  };

  if (!currentAlert) return null;

  const config = getAlertConfig(currentAlert?.severity);

  return (
    <div className={`rounded-xl border p-4 ${config?.bg} animate-in slide-in-from-top-2 duration-300`}>
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg ${config?.iconBg} flex-shrink-0`}>
          <Icon name={config?.icon} size={20} className={config?.text} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className={`font-semibold text-sm ${config?.text}`}>
              {currentAlert?.title}
            </h4>
            <div className="flex items-center space-x-1">
              {alerts?.length > 1 && (
                <>
                  <button
                    onClick={prevAlert}
                    className="p-1 hover:bg-muted/50 rounded transition-micro"
                  >
                    <Icon name="ChevronLeft" size={14} className="text-muted-foreground" />
                  </button>
                  <span className="text-xs text-muted-foreground">
                    {alerts?.findIndex(a => a?.id === currentAlert?.id) + 1}/{alerts?.length}
                  </span>
                  <button
                    onClick={nextAlert}
                    className="p-1 hover:bg-muted/50 rounded transition-micro"
                  >
                    <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                  </button>
                </>
              )}
              <button
                onClick={() => handleAcknowledge(currentAlert?.id)}
                className="p-1 hover:bg-muted/50 rounded transition-micro"
              >
                <Icon name="X" size={14} className="text-muted-foreground" />
              </button>
            </div>
          </div>
          
          <p className="text-sm text-foreground mb-3">
            {currentAlert?.message}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {currentAlert?.timestamp?.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
            
            <div className="flex items-center space-x-2">
              {currentAlert?.actions?.includes('navigate') && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={handleNavigate}
                  className="text-xs"
                >
                  <Icon name="Navigation" size={12} />
                  <span>Navigate</span>
                </Button>
              )}
              
              {currentAlert?.actions?.includes('contact') && (
                <Button
                  variant="destructive"
                  size="xs"
                  onClick={handleContact}
                  className="text-xs"
                >
                  <Icon name="Phone" size={12} />
                  <span>Contact</span>
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="xs"
                onClick={() => handleAcknowledge(currentAlert?.id)}
                className="text-xs"
              >
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;