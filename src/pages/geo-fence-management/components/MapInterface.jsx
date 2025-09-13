import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapInterface = ({ zones, selectedZone, onZoneSelect, onZoneCreate, onZoneUpdate, drawingMode, onDrawingModeChange }) => {
  const mapRef = useRef(null);
  const [drawingPoints, setDrawingPoints] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 }); // Delhi coordinates
  const [zoomLevel, setZoomLevel] = useState(12);

  const drawingTools = [
    { id: 'select', name: 'Select', icon: 'MousePointer', description: 'Select and edit zones' },
    { id: 'polygon', name: 'Polygon', icon: 'Pentagon', description: 'Draw polygonal zones' },
    { id: 'circle', name: 'Circle', icon: 'Circle', description: 'Draw circular zones' },
    { id: 'rectangle', name: 'Rectangle', icon: 'Square', description: 'Draw rectangular zones' }
  ];

  const handleMapClick = (event) => {
    if (drawingMode === 'select') return;
    
    const rect = mapRef?.current?.getBoundingClientRect();
    const x = event?.clientX - rect?.left;
    const y = event?.clientY - rect?.top;
    
    // Convert pixel coordinates to lat/lng (simplified)
    const lat = mapCenter?.lat + (y - rect?.height / 2) * 0.001;
    const lng = mapCenter?.lng + (x - rect?.width / 2) * 0.001;
    
    if (drawingMode === 'polygon') {
      const newPoint = { lat, lng };
      setDrawingPoints(prev => [...prev, newPoint]);
      setIsDrawing(true);
    }
  };

  const completeDrawing = () => {
    if (drawingPoints?.length >= 3) {
      const newZone = {
        id: `zone_${Date.now()}`,
        name: `New Zone ${zones?.length + 1}`,
        type: drawingMode,
        coordinates: drawingPoints,
        riskLevel: 'moderate',
        isActive: true,
        createdAt: new Date(),
        touristCount: 0
      };
      onZoneCreate(newZone);
    }
    setDrawingPoints([]);
    setIsDrawing(false);
    onDrawingModeChange('select');
  };

  const cancelDrawing = () => {
    setDrawingPoints([]);
    setIsDrawing(false);
    onDrawingModeChange('select');
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return '#DC2626';
      case 'moderate': return '#D97706';
      case 'low': return '#059669';
      default: return '#6B7280';
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="relative h-full bg-muted rounded-lg overflow-hidden">
      {/* Map Container */}
      <div 
        ref={mapRef}
        className="w-full h-full cursor-crosshair relative"
        onClick={handleMapClick}
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundColor: '#f8fafc'
        }}
      >
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Geo Fence Management Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${zoomLevel}&output=embed`}
          className="absolute inset-0"
        />

        {/* Zone Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {zones?.map((zone) => (
            <div
              key={zone?.id}
              className={`absolute border-2 rounded-lg pointer-events-auto cursor-pointer transition-all ${
                selectedZone?.id === zone?.id ? 'border-primary shadow-lg' : 'border-opacity-70'
              }`}
              style={{
                borderColor: getRiskColor(zone?.riskLevel),
                backgroundColor: `${getRiskColor(zone?.riskLevel)}20`,
                left: `${20 + (zone?.id?.charCodeAt(zone?.id?.length - 1) % 60)}%`,
                top: `${20 + (zone?.id?.charCodeAt(zone?.id?.length - 2) % 40)}%`,
                width: `${15 + (zone?.id?.charCodeAt(zone?.id?.length - 1) % 20)}%`,
                height: `${15 + (zone?.id?.charCodeAt(zone?.id?.length - 2) % 15)}%`
              }}
              onClick={(e) => {
                e?.stopPropagation();
                onZoneSelect(zone);
              }}
            >
              <div className="absolute -top-6 left-0 bg-card px-2 py-1 rounded text-xs font-medium shadow-sm">
                {zone?.name}
              </div>
              {zone?.touristCount > 0 && (
                <div className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs px-1 py-0.5 rounded">
                  {zone?.touristCount}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Drawing Points */}
        {drawingPoints?.map((point, index) => (
          <div
            key={index}
            className="absolute w-2 h-2 bg-primary rounded-full transform -translate-x-1 -translate-y-1"
            style={{
              left: `${50 + (point?.lng - mapCenter?.lng) * 1000}%`,
              top: `${50 + (point?.lat - mapCenter?.lat) * 1000}%`
            }}
          />
        ))}
      </div>
      {/* Drawing Tools */}
      <div className="absolute top-4 left-4 bg-card rounded-lg shadow-elevated p-2">
        <div className="flex flex-col space-y-1">
          {drawingTools?.map((tool) => (
            <Button
              key={tool?.id}
              variant={drawingMode === tool?.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onDrawingModeChange(tool?.id)}
              className="justify-start"
              title={tool?.description}
            >
              <Icon name={tool?.icon} size={16} />
              <span className="hidden lg:inline ml-2">{tool?.name}</span>
            </Button>
          ))}
        </div>
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 bg-card rounded-lg shadow-elevated p-2">
        <div className="flex flex-col space-y-1">
          <Button variant="ghost" size="sm" onClick={handleZoomIn}>
            <Icon name="Plus" size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleZoomOut}>
            <Icon name="Minus" size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setMapCenter({ lat: 28.6139, lng: 77.2090 })}>
            <Icon name="Home" size={16} />
          </Button>
        </div>
      </div>
      {/* Drawing Controls */}
      {isDrawing && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-card rounded-lg shadow-elevated p-3">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium">Drawing {drawingMode} zone</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={cancelDrawing}>
                Cancel
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={completeDrawing}
                disabled={drawingPoints?.length < 3}
              >
                Complete
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Zone Info Popup */}
      {selectedZone && (
        <div className="absolute bottom-4 right-4 bg-card rounded-lg shadow-elevated p-4 max-w-xs">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-foreground">{selectedZone?.name}</h4>
            <Button variant="ghost" size="sm" onClick={() => onZoneSelect(null)}>
              <Icon name="X" size={14} />
            </Button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Risk Level:</span>
              <span className={`font-medium ${
                selectedZone?.riskLevel === 'high' ? 'text-error' :
                selectedZone?.riskLevel === 'moderate' ? 'text-warning' : 'text-success'
              }`}>
                {selectedZone?.riskLevel?.charAt(0)?.toUpperCase() + selectedZone?.riskLevel?.slice(1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tourists:</span>
              <span className="font-medium">{selectedZone?.touristCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className={`font-medium ${selectedZone?.isActive ? 'text-success' : 'text-muted-foreground'}`}>
                {selectedZone?.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapInterface;