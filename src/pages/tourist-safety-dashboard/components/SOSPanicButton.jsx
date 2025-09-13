import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SOSPanicButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    let interval;
    if (isPressed && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && isPressed) {
      handleEmergencyActivation();
    }
    return () => clearInterval(interval);
  }, [isPressed, countdown]);

  const handleSOSPress = () => {
    setIsPressed(true);
    setShowConfirmation(true);
    setCountdown(5);
  };

  const handleCancel = () => {
    setIsPressed(false);
    setShowConfirmation(false);
    setCountdown(5);
  };

  const handleEmergencyActivation = () => {
    setIsEmergencyActive(true);
    setIsPressed(false);
    setShowConfirmation(false);
    
    // Simulate emergency services contact
    console.log('Emergency services contacted - Location shared');
    
    // Auto-deactivate after demo period
    setTimeout(() => {
      setIsEmergencyActive(false);
    }, 30000);
  };

  const handleDeactivate = () => {
    setIsEmergencyActive(false);
  };

  if (isEmergencyActive) {
    return (
      <div className="fixed inset-0 bg-error/95 flex items-center justify-center z-400 p-4">
        <div className="bg-card rounded-xl shadow-elevated-hover max-w-md w-full p-8 text-center">
          <div className="animate-pulse mb-6">
            <div className="w-20 h-20 bg-error rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Phone" size={40} color="white" />
            </div>
            
            <h2 className="text-2xl font-bold text-error mb-2">
              EMERGENCY ACTIVE
            </h2>
            
            <p className="text-muted-foreground mb-4">
              Emergency services contacted\nLocation shared automatically
            </p>
            
            <div className="bg-muted rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Connected to Emergency Services</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Response team dispatched
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button
              variant="outline"
              fullWidth
              className="text-error border-error hover:bg-error hover:text-error-foreground"
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
    );
  }

  return (
    <>
      {/* Main SOS Button */}
      {!showConfirmation && (
        <div className="fixed bottom-6 right-6 z-300">
          <Button
            variant="destructive"
            onClick={handleSOSPress}
            className="w-20 h-20 rounded-full shadow-emergency hover:shadow-lg transition-all duration-200 animate-pulse"
          >
            <div className="flex flex-col items-center">
              <Icon name="Phone" size={24} />
              <span className="text-xs font-bold mt-1">SOS</span>
            </div>
          </Button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-400 p-4">
          <div className="bg-card rounded-xl shadow-elevated-hover max-w-sm w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="AlertTriangle" size={32} className="text-error" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Emergency Services
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Contacting emergency services in\n
                <span className="text-2xl font-bold text-error">{countdown}</span> seconds
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
    </>
  );
};

export default SOSPanicButton;