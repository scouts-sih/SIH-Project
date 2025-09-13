import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const InteractiveMap = ({ currentLocation = { lat: 28.6139, lng: 77.2090 } }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showZones, setShowZones] = useState(true);
  const [locationAccuracy, setLocationAccuracy] = useState('high');

  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const dangerZones = [
    { id: 1, name: "Construction Area", type: "danger", lat: 28.6150, lng: 77.2100 },
    { id: 2, name: "Restricted Zone", type: "restricted", lat: 28.6120, lng: 77.2080 },
  ];

  const safeZones = [
    { id: 1, name: "Tourist Hub", type: "safe", lat: 28.6140, lng: 77.2095 },
    { id: 2, name: "Police Station", type: "emergency", lat: 28.6135, lng: 77.2085 },
  ];

  const getAccuracyColor = () => {
    switch (locationAccuracy) {
      case 'high': return 'text-success';
      case 'medium': return 'text-warning';
      case 'low': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getAccuracyIcon = () => {
    switch (locationAccuracy) {
      case 'high': return 'MapPin';
      case 'medium': return 'MapPin';
      case 'low': return 'MapPinOff';
      default: return 'MapPin';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Live Location</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowZones(!showZones)}
              className={`p-2 rounded-lg transition-micro ${
                showZones ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              <Icon name="Eye" size={16} />
            </button>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg bg-muted/50 ${getAccuracyColor()}`}>
              <Icon name={getAccuracyIcon()} size={14} />
              <span className="text-xs font-medium capitalize">{locationAccuracy}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-64 bg-muted">
        {!mapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Loading map...</span>
            </div>
          </div>
        ) : (
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Tourist Location Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${currentLocation?.lat},${currentLocation?.lng}&z=16&output=embed`}
            className="border-0"
          />
        )}

        {/* Zone Overlays */}
        {showZones && mapLoaded && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Danger Zone Indicators */}
            <div className="absolute top-4 left-4 space-y-2">
              {dangerZones?.map((zone) => (
                <div key={zone?.id} className="flex items-center space-x-2 bg-error/90 text-error-foreground px-2 py-1 rounded-lg text-xs">
                  <Icon name="AlertTriangle" size={12} />
                  <span>{zone?.name}</span>
                </div>
              ))}
            </div>

            {/* Safe Zone Indicators */}
            <div className="absolute top-4 right-4 space-y-2">
              {safeZones?.map((zone) => (
                <div key={zone?.id} className="flex items-center space-x-2 bg-success/90 text-success-foreground px-2 py-1 rounded-lg text-xs">
                  <Icon name={zone?.type === 'emergency' ? 'Shield' : 'MapPin'} size={12} />
                  <span>{zone?.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="p-4 bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span>New Delhi, India</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-error rounded-full"></div>
              <span className="text-xs text-muted-foreground">Danger</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs text-muted-foreground">Safe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;