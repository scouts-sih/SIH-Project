import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const EmergencyAccessOverlay = () => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isCountingDown, setIsCountingDown] = useState(false);

  useEffect(() => {
    let interval;
    if (isCountingDown && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      handleEmergencyActivation();
    }
    return () => clearInterval(interval);
  }, [isCountingDown, countdown]);

  const handleSOSClick = () => {
    setShowConfirmation(true);
    setIsCountingDown(true);
    setCountdown(5);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setIsCountingDown(false);
    setCountdown(5);
  };

  const handleEmergencyActivation = () => {
    setIsEmergencyActive(true);
    setShowConfirmation(false);
    setIsCountingDown(false);
    
    // Simulate emergency services contact
    console.log('Emergency services contacted');
    
    // Auto-deactivate after 30 seconds for demo
    setTimeout(() => {
      setIsEmergencyActive(false);
    }, 30000);
  };

  const handleDeactivate = () => {
    setIsEmergencyActive(false);
  };

  return (
    <>
      {/* Emergency SOS Button */}
      {!isEmergencyActive && !showConfirmation && (
        <div className="fixed bottom-6 right-6 z-300">
          <Button
            variant="destructive"
            size="lg"
            onClick={handleSOSClick}
            className="w-16 h-16 rounded-full shadow-emergency hover:shadow-lg transition-all duration-200 animate-pulse"
          >
            <div className="flex flex-col items-center">
              <Icon name="Phone" size={20} />
              <span className="text-xs font-bold">SOS</span>
            </div>
          </Button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-400 p-4">
          <div className="bg-card rounded-lg shadow-elevated-hover max-w-sm w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="AlertTriangle" size={32} color="var(--color-destructive)" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Emergency Services
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Contacting emergency services in {countdown} seconds
              </p>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  fullWidth
                  onClick={handleEmergencyActivation}
                >
                  Call Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Active State */}
      {isEmergencyActive && (
        <div className="fixed inset-0 bg-destructive/90 flex items-center justify-center z-400 p-4">
          <div className="bg-card rounded-lg shadow-elevated-hover max-w-md w-full p-8 text-center">
            <div className="animate-pulse mb-6">
              <div className="w-20 h-20 bg-destructive rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Phone" size={40} color="white" />
              </div>
              
              <h2 className="text-2xl font-bold text-destructive mb-2">
                EMERGENCY ACTIVE
              </h2>
              
              <p className="text-muted-foreground mb-4">
                Emergency services have been contacted
              </p>
              
              <div className="bg-muted rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>Connected to Emergency Services</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Location shared automatically
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button
                variant="outline"
                fullWidth
                className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Icon name="MessageSquare" size={16} />
                <span>Send Message</span>
              </Button>
              
              <Button
                variant="ghost"
                fullWidth
                onClick={handleDeactivate}
                className="text-muted-foreground"
              >
                Deactivate Emergency
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Status Bar */}
      {isEmergencyActive && (
        <div className="fixed top-16 left-0 right-0 bg-destructive text-destructive-foreground py-2 px-4 z-200">
          <div className="flex items-center justify-center space-x-2 text-sm font-medium">
            <Icon name="AlertTriangle" size={16} />
            <span>EMERGENCY MODE ACTIVE</span>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyAccessOverlay;