import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ZoneManagementPanel = ({ selectedZone, onZoneUpdate, onZoneDelete, onZoneCreate }) => {
  const [formData, setFormData] = useState({
    name: selectedZone?.name || '',
    riskLevel: selectedZone?.riskLevel || 'moderate',
    alertMessage: selectedZone?.alertMessage || '',
    alertFrequency: selectedZone?.alertFrequency || 'immediate',
    entryAlert: selectedZone?.entryAlert || true,
    exitAlert: selectedZone?.exitAlert || false,
    emergencyProtocol: selectedZone?.emergencyProtocol || 'standard',
    maxCapacity: selectedZone?.maxCapacity || 100,
    isActive: selectedZone?.isActive || true
  });

  const riskLevelOptions = [
    { value: 'low', label: 'Low Risk', description: 'Safe areas with minimal monitoring' },
    { value: 'moderate', label: 'Moderate Risk', description: 'Areas requiring standard precautions' },
    { value: 'high', label: 'High Risk', description: 'Dangerous areas requiring immediate alerts' }
  ];

  const alertFrequencyOptions = [
    { value: 'immediate', label: 'Immediate', description: 'Alert sent instantly' },
    { value: 'delayed', label: 'Delayed (5 min)', description: 'Alert after 5 minutes in zone' },
    { value: 'periodic', label: 'Periodic (15 min)', description: 'Alerts every 15 minutes' }
  ];

  const emergencyProtocolOptions = [
    { value: 'standard', label: 'Standard Protocol', description: 'Regular emergency response' },
    { value: 'enhanced', label: 'Enhanced Protocol', description: 'Immediate response with backup' },
    { value: 'critical', label: 'Critical Protocol', description: 'All available resources deployed' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (selectedZone) {
      onZoneUpdate({ ...selectedZone, ...formData });
    } else {
      onZoneCreate({
        id: `zone_${Date.now()}`,
        ...formData,
        coordinates: [],
        createdAt: new Date(),
        touristCount: 0
      });
    }
  };

  const handleDelete = () => {
    if (selectedZone && window.confirm('Are you sure you want to delete this zone?')) {
      onZoneDelete(selectedZone?.id);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      riskLevel: 'moderate',
      alertMessage: '',
      alertFrequency: 'immediate',
      entryAlert: true,
      exitAlert: false,
      emergencyProtocol: 'standard',
      maxCapacity: 100,
      isActive: true
    });
  };

  return (
    <div className="bg-card rounded-lg shadow-elevated p-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          {selectedZone ? 'Edit Zone' : 'Create New Zone'}
        </h3>
        {selectedZone && (
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={resetForm}>
              <Icon name="Plus" size={16} />
              <span>New</span>
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground border-b border-border pb-2">
            Basic Information
          </h4>
          
          <Input
            label="Zone Name"
            type="text"
            placeholder="Enter zone name"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            required
          />

          <Select
            label="Risk Level"
            options={riskLevelOptions}
            value={formData?.riskLevel}
            onChange={(value) => handleInputChange('riskLevel', value)}
          />

          <Input
            label="Alert Message"
            type="text"
            placeholder="Custom alert message for tourists"
            value={formData?.alertMessage}
            onChange={(e) => handleInputChange('alertMessage', e?.target?.value)}
            description="Message shown to tourists entering this zone"
          />
        </div>

        {/* Alert Configuration */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground border-b border-border pb-2">
            Alert Configuration
          </h4>

          <Select
            label="Alert Frequency"
            options={alertFrequencyOptions}
            value={formData?.alertFrequency}
            onChange={(value) => handleInputChange('alertFrequency', value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="entryAlert"
                checked={formData?.entryAlert}
                onChange={(e) => handleInputChange('entryAlert', e?.target?.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="entryAlert" className="text-sm font-medium text-foreground">
                Entry Alert
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="exitAlert"
                checked={formData?.exitAlert}
                onChange={(e) => handleInputChange('exitAlert', e?.target?.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="exitAlert" className="text-sm font-medium text-foreground">
                Exit Alert
              </label>
            </div>
          </div>
        </div>

        {/* Emergency Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground border-b border-border pb-2">
            Emergency Settings
          </h4>

          <Select
            label="Emergency Protocol"
            options={emergencyProtocolOptions}
            value={formData?.emergencyProtocol}
            onChange={(value) => handleInputChange('emergencyProtocol', value)}
          />

          <Input
            label="Maximum Capacity"
            type="number"
            placeholder="100"
            value={formData?.maxCapacity}
            onChange={(e) => handleInputChange('maxCapacity', parseInt(e?.target?.value) || 0)}
            description="Maximum number of tourists allowed in this zone"
          />
        </div>

        {/* Zone Status */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground border-b border-border pb-2">
            Zone Status
          </h4>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <div className="font-medium text-foreground">Zone Active</div>
              <div className="text-sm text-muted-foreground">
                {formData?.isActive ? 'Zone is currently monitoring tourists' : 'Zone monitoring is disabled'}
              </div>
            </div>
            <button
              onClick={() => handleInputChange('isActive', !formData?.isActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData?.isActive ? 'bg-primary' : 'bg-muted-foreground'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData?.isActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Preview Section */}
        {formData?.alertMessage && (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground border-b border-border pb-2">
              Alert Preview
            </h4>
            <div className={`p-4 rounded-lg border-l-4 ${
              formData?.riskLevel === 'high' ? 'bg-error/10 border-error' :
              formData?.riskLevel === 'moderate'? 'bg-warning/10 border-warning' : 'bg-success/10 border-success'
            }`}>
              <div className="flex items-start space-x-3">
                <Icon 
                  name="AlertTriangle" 
                  size={20} 
                  className={
                    formData?.riskLevel === 'high' ? 'text-error' :
                    formData?.riskLevel === 'moderate'? 'text-warning' : 'text-success'
                  }
                />
                <div>
                  <div className="font-medium text-foreground">Zone Alert</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {formData?.alertMessage}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-border">
          <Button
            variant="default"
            fullWidth
            onClick={handleSave}
            disabled={!formData?.name?.trim()}
          >
            <Icon name="Save" size={16} />
            <span>{selectedZone ? 'Update Zone' : 'Create Zone'}</span>
          </Button>
          {selectedZone && (
            <Button variant="outline" onClick={resetForm}>
              <Icon name="RotateCcw" size={16} />
              <span>Reset</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZoneManagementPanel;