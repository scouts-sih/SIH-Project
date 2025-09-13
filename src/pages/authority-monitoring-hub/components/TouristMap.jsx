import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TouristMap = ({ tourists, selectedTourist, onTouristSelect, filters }) => {
  const [mapView, setMapView] = useState('satellite');
  const [showClusters, setShowClusters] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(12);

  // Filter tourists based on current filters
  const filteredTourists = tourists?.filter(tourist => {
    if (filters?.safetyScore && tourist?.safetyScore < filters?.safetyScore) return false;
    if (filters?.status && tourist?.status !== filters?.status) return false;
    if (filters?.location && !tourist?.currentLocation?.toLowerCase()?.includes(filters?.location?.toLowerCase())) return false;
    return true;
  });

  // Group tourists by proximity for clustering
  const getTouristClusters = () => {
    if (!showClusters) return filteredTourists?.map(t => ({ ...t, count: 1 }));
    
    const clusters = [];
    const processed = new Set();
    
    filteredTourists?.forEach((tourist, index) => {
      if (processed?.has(index)) return;
      
      const cluster = {
        ...tourist,
        count: 1,
        tourists: [tourist]
      };
      
      // Find nearby tourists (simplified clustering)
      filteredTourists?.forEach((other, otherIndex) => {
        if (index !== otherIndex && !processed?.has(otherIndex)) {
          const distance = Math.abs(tourist?.coordinates?.lat - other?.coordinates?.lat) + 
                          Math.abs(tourist?.coordinates?.lng - other?.coordinates?.lng);
          if (distance < 0.01) { // Cluster threshold
            cluster.count++;
            cluster?.tourists?.push(other);
            processed?.add(otherIndex);
          }
        }
      });
      
      processed?.add(index);
      clusters?.push(cluster);
    });
    
    return clusters;
  };

  const clusters = getTouristClusters();

  const getMarkerColor = (safetyScore, status) => {
    if (status === 'emergency') return 'bg-red-500';
    if (status === 'missing') return 'bg-red-700';
    if (safetyScore >= 80) return 'bg-green-500';
    if (safetyScore >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleMarkerClick = (cluster) => {
    if (cluster?.count === 1) {
      onTouristSelect(cluster?.tourists?.[0]);
    } else {
      // Show cluster details or zoom in
      setZoomLevel(prev => Math.min(prev + 2, 18));
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevated h-full flex flex-col">
      {/* Map Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">Tourist Location Map</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={mapView === 'satellite' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('satellite')}
            >
              <Icon name="Satellite" size={16} />
              <span className="hidden sm:inline ml-1">Satellite</span>
            </Button>
            <Button
              variant={mapView === 'terrain' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('terrain')}
            >
              <Icon name="Mountain" size={16} />
              <span className="hidden sm:inline ml-1">Terrain</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={showClusters}
                onChange={(e) => setShowClusters(e?.target?.checked)}
                className="rounded border-border"
              />
              <span>Cluster markers</span>
            </label>
            <div className="text-sm text-muted-foreground">
              Showing {filteredTourists?.length} tourists
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoomLevel(prev => Math.max(prev - 1, 8))}
              disabled={zoomLevel <= 8}
            >
              <Icon name="ZoomOut" size={16} />
            </Button>
            <span className="text-sm text-muted-foreground px-2">{zoomLevel}x</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoomLevel(prev => Math.min(prev + 1, 18))}
              disabled={zoomLevel >= 18}
            >
              <Icon name="ZoomIn" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="flex-1 relative bg-muted">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Tourist Location Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=28.6139,77.2090&z=${zoomLevel}&output=embed`}
          className="absolute inset-0"
        />

        {/* Map Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Tourist Markers */}
          {clusters?.map((cluster, index) => (
            <div
              key={`cluster-${index}`}
              className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${50 + (cluster?.coordinates?.lng - 77.2090) * 1000}%`,
                top: `${50 + (28.6139 - cluster?.coordinates?.lat) * 1000}%`
              }}
              onClick={() => handleMarkerClick(cluster)}
            >
              <div className={`relative ${getMarkerColor(cluster?.safetyScore, cluster?.status)} rounded-full p-2 shadow-lg border-2 border-white`}>
                <Icon name="MapPin" size={16} color="white" />
                {cluster?.count > 1 && (
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cluster?.count}
                  </div>
                )}
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-popover border border-border rounded-md shadow-lg p-2 text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {cluster?.count === 1 ? (
                  <div>
                    <div className="font-medium">{cluster?.name}</div>
                    <div className="text-muted-foreground">Safety: {cluster?.safetyScore}%</div>
                  </div>
                ) : (
                  <div>
                    <div className="font-medium">{cluster?.count} tourists</div>
                    <div className="text-muted-foreground">Click to expand</div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Danger Zones */}
          <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
            <h4 className="text-sm font-medium mb-2">Legend</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Safe (80%+)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Caution (60-79%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Risk (&lt;60%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-700 rounded-full"></div>
                <span>Emergency</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Selected Tourist Info */}
      {selectedTourist && (
        <div className="p-4 border-t border-border bg-muted/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <div className="font-medium">{selectedTourist?.name}</div>
                <div className="text-sm text-muted-foreground">{selectedTourist?.currentLocation}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                selectedTourist?.safetyScore >= 80 ? 'bg-green-100 text-green-800' :
                selectedTourist?.safetyScore >= 60 ? 'bg-yellow-100 text-yellow-800': 'bg-red-100 text-red-800'
              }`}>
                {selectedTourist?.safetyScore}% Safe
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onTouristSelect(null)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TouristMap;