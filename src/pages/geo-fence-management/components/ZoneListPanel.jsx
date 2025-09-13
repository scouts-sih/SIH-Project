import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ZoneListPanel = ({ zones, selectedZone, onZoneSelect, onBulkOperation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedZones, setSelectedZones] = useState([]);

  const riskFilterOptions = [
    { value: 'all', label: 'All Risk Levels' },
    { value: 'high', label: 'High Risk' },
    { value: 'moderate', label: 'Moderate Risk' },
    { value: 'low', label: 'Low Risk' }
  ];

  const statusFilterOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active Only' },
    { value: 'inactive', label: 'Inactive Only' }
  ];

  const filteredZones = zones?.filter(zone => {
    const matchesSearch = zone?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRisk = filterRisk === 'all' || zone?.riskLevel === filterRisk;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && zone?.isActive) ||
      (filterStatus === 'inactive' && !zone?.isActive);
    
    return matchesSearch && matchesRisk && matchesStatus;
  });

  const handleZoneToggle = (zoneId) => {
    setSelectedZones(prev => 
      prev?.includes(zoneId) 
        ? prev?.filter(id => id !== zoneId)
        : [...prev, zoneId]
    );
  };

  const handleSelectAll = () => {
    if (selectedZones?.length === filteredZones?.length) {
      setSelectedZones([]);
    } else {
      setSelectedZones(filteredZones?.map(zone => zone?.id));
    }
  };

  const handleBulkActivate = () => {
    onBulkOperation('activate', selectedZones);
    setSelectedZones([]);
  };

  const handleBulkDeactivate = () => {
    onBulkOperation('deactivate', selectedZones);
    setSelectedZones([]);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedZones?.length} zones?`)) {
      onBulkOperation('delete', selectedZones);
      setSelectedZones([]);
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return 'text-error';
      case 'moderate': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBg = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return 'bg-error/10';
      case 'moderate': return 'bg-warning/10';
      case 'low': return 'bg-success/10';
      default: return 'bg-muted/10';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-elevated h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Geo-Fenced Zones ({filteredZones?.length})
          </h3>
          <Button variant="outline" size="sm" onClick={() => onZoneSelect(null)}>
            <Icon name="Plus" size={16} />
            <span>New Zone</span>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <Input
            type="search"
            placeholder="Search zones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
          
          <div className="grid grid-cols-2 gap-2">
            <Select
              options={riskFilterOptions}
              value={filterRisk}
              onChange={setFilterRisk}
              placeholder="Filter by risk"
            />
            <Select
              options={statusFilterOptions}
              value={filterStatus}
              onChange={setFilterStatus}
              placeholder="Filter by status"
            />
          </div>
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedZones?.length > 0 && (
        <div className="p-3 bg-muted/50 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedZones?.length} zones selected
            </span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={handleBulkActivate}>
                <Icon name="Play" size={14} />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleBulkDeactivate}>
                <Icon name="Pause" size={14} />
              </Button>
              <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                <Icon name="Trash2" size={14} />
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Zone List */}
      <div className="flex-1 overflow-y-auto">
        {filteredZones?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="font-medium text-foreground mb-2">No zones found</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {searchTerm || filterRisk !== 'all' || filterStatus !== 'all' ?'Try adjusting your search or filters' :'Create your first geo-fenced zone to get started'
              }
            </p>
            <Button variant="outline" onClick={() => onZoneSelect(null)}>
              <Icon name="Plus" size={16} />
              <span>Create Zone</span>
            </Button>
          </div>
        ) : (
          <div className="p-2">
            {/* Select All */}
            <div className="flex items-center space-x-2 p-2 mb-2">
              <input
                type="checkbox"
                checked={selectedZones?.length === filteredZones?.length}
                onChange={handleSelectAll}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-foreground">Select All</span>
            </div>

            {/* Zone Items */}
            <div className="space-y-2">
              {filteredZones?.map((zone) => (
                <div
                  key={zone?.id}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedZone?.id === zone?.id
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                  onClick={() => onZoneSelect(zone)}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedZones?.includes(zone?.id)}
                      onChange={(e) => {
                        e?.stopPropagation();
                        handleZoneToggle(zone?.id);
                      }}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary mt-1"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground truncate">
                          {zone?.name}
                        </h4>
                        <div className="flex items-center space-x-1">
                          {!zone?.isActive && (
                            <Icon name="Pause" size={14} className="text-muted-foreground" />
                          )}
                          <div className={`w-2 h-2 rounded-full ${
                            zone?.isActive ? 'bg-success' : 'bg-muted-foreground'
                          }`} />
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getRiskBg(zone?.riskLevel)} ${getRiskColor(zone?.riskLevel)}`}>
                          {zone?.riskLevel?.charAt(0)?.toUpperCase() + zone?.riskLevel?.slice(1)} Risk
                        </span>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Icon name="Users" size={12} />
                          <span>{zone?.touristCount}</span>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Created: {zone?.createdAt?.toLocaleDateString()}
                      </div>

                      {zone?.alertMessage && (
                        <div className="text-xs text-muted-foreground mt-1 truncate">
                          Alert: {zone?.alertMessage}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Footer Stats */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">
              {zones?.filter(z => z?.isActive)?.length}
            </div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-error">
              {zones?.filter(z => z?.riskLevel === 'high')?.length}
            </div>
            <div className="text-xs text-muted-foreground">High Risk</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {zones?.reduce((sum, z) => sum + z?.touristCount, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Tourists</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoneListPanel;