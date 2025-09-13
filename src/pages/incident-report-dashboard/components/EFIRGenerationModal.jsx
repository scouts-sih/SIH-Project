import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const EFIRGenerationModal = ({ isOpen, onClose, incidentId, onGenerate }) => {
  const [formData, setFormData] = useState({
    template: 'standard',
    officerName: '',
    officerBadge: '',
    stationCode: '',
    priority: 'medium',
    includeEvidence: true,
    includeTouristProfile: true,
    includeLocationHistory: true,
    includeWitnessStatements: false,
    additionalNotes: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const templateOptions = [
    { value: 'standard', label: 'Standard E-FIR Template' },
    { value: 'missing_person', label: 'Missing Person Template' },
    { value: 'medical_emergency', label: 'Medical Emergency Template' },
    { value: 'theft', label: 'Theft/Crime Template' },
    { value: 'accident', label: 'Accident Template' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate E-FIR generation process
    setTimeout(() => {
      onGenerate({
        incidentId,
        formData,
        efirNumber: `EFIR-${Date.now()}`,
        generatedAt: new Date()?.toISOString()
      });
      setIsGenerating(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-400 p-4">
      <div className="bg-card rounded-lg shadow-elevated-hover max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Generate E-FIR</h2>
            <p className="text-sm text-muted-foreground">
              {incidentId === 'bulk' ? 'Bulk E-FIR Generation' : `Incident #${incidentId}`}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="space-y-6">
            {/* Template Selection */}
            <div>
              <Select
                label="E-FIR Template"
                description="Choose the appropriate template for this incident type"
                options={templateOptions}
                value={formData?.template}
                onChange={(value) => handleInputChange('template', value)}
                required
              />
            </div>

            {/* Officer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Reporting Officer Name"
                type="text"
                placeholder="Enter officer name"
                value={formData?.officerName}
                onChange={(e) => handleInputChange('officerName', e?.target?.value)}
                required
              />
              
              <Input
                label="Officer Badge Number"
                type="text"
                placeholder="Enter badge number"
                value={formData?.officerBadge}
                onChange={(e) => handleInputChange('officerBadge', e?.target?.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Police Station Code"
                type="text"
                placeholder="Enter station code"
                value={formData?.stationCode}
                onChange={(e) => handleInputChange('stationCode', e?.target?.value)}
                required
              />
              
              <Select
                label="Priority Level"
                options={priorityOptions}
                value={formData?.priority}
                onChange={(value) => handleInputChange('priority', value)}
                required
              />
            </div>

            {/* Include Options */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Include in E-FIR</label>
              <div className="space-y-3">
                <Checkbox
                  label="Evidence and Documentation"
                  description="Include photos, videos, and other evidence"
                  checked={formData?.includeEvidence}
                  onChange={(e) => handleInputChange('includeEvidence', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Tourist Profile Information"
                  description="Include complete tourist identification and details"
                  checked={formData?.includeTouristProfile}
                  onChange={(e) => handleInputChange('includeTouristProfile', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Location History"
                  description="Include GPS tracking and movement history"
                  checked={formData?.includeLocationHistory}
                  onChange={(e) => handleInputChange('includeLocationHistory', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Witness Statements"
                  description="Include collected witness testimonies"
                  checked={formData?.includeWitnessStatements}
                  onChange={(e) => handleInputChange('includeWitnessStatements', e?.target?.checked)}
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Additional Notes</label>
              <textarea
                className="w-full p-3 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                rows={4}
                placeholder="Enter any additional information or special instructions..."
                value={formData?.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e?.target?.value)}
              />
            </div>

            {/* Preview Information */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="text-sm font-medium text-foreground mb-2">E-FIR Preview Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Template:</span>
                  <span className="ml-2 text-foreground">{templateOptions?.find(t => t?.value === formData?.template)?.label}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Priority:</span>
                  <span className="ml-2 text-foreground capitalize">{formData?.priority}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Generated By:</span>
                  <span className="ml-2 text-foreground">{formData?.officerName || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Station:</span>
                  <span className="ml-2 text-foreground">{formData?.stationCode || 'Not specified'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
          <div className="text-sm text-muted-foreground">
            E-FIR will be generated with government compliance formatting
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose} disabled={isGenerating}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              onClick={handleGenerate}
              loading={isGenerating}
              disabled={!formData?.officerName || !formData?.officerBadge || !formData?.stationCode}
            >
              {isGenerating ? 'Generating E-FIR...' : 'Generate E-FIR'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EFIRGenerationModal;