import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BlockchainGenerationPanel = ({ touristData, onGenerate, isGenerating, generatedId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(45);

  const steps = [
    { id: 'hashing', label: 'Data Hashing', icon: 'Hash', description: 'Creating cryptographic hash of tourist data' },
    { id: 'validation', label: 'Validation', icon: 'CheckCircle', description: 'Validating data integrity and format' },
    { id: 'blockchain', label: 'Blockchain Recording', icon: 'Link', description: 'Recording on distributed ledger' },
    { id: 'confirmation', label: 'Network Confirmation', icon: 'Shield', description: 'Awaiting network consensus' },
    { id: 'complete', label: 'ID Generated', icon: 'Award', description: 'Digital ID successfully created' }
  ];

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 3;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });

        setEstimatedTime(prev => Math.max(0, prev - 1));
        
        if (progress > 20 && currentStep === 0) setCurrentStep(1);
        if (progress > 40 && currentStep === 1) setCurrentStep(2);
        if (progress > 70 && currentStep === 2) setCurrentStep(3);
        if (progress > 95 && currentStep === 3) setCurrentStep(4);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isGenerating, progress, currentStep]);

  const handleGenerate = () => {
    setCurrentStep(0);
    setProgress(0);
    setEstimatedTime(45);
    onGenerate();
  };

  if (generatedId) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 h-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Award" size={32} className="text-success" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Digital ID Generated Successfully</h2>
          <p className="text-sm text-muted-foreground">
            Blockchain-based tourist ID has been created and verified
          </p>
        </div>
        {/* Generated ID Details */}
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-muted/50 rounded-lg">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Blockchain Hash
            </label>
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-sm font-mono text-foreground break-all">{generatedId?.hash}</p>
              <button className="text-primary hover:text-primary/80">
                <Icon name="Copy" size={14} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Digital ID Number
              </label>
              <p className="text-sm font-mono font-medium text-foreground">{generatedId?.idNumber}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Block Number
              </label>
              <p className="text-sm font-mono font-medium text-foreground">{generatedId?.blockNumber}</p>
            </div>
          </div>

          <div className="p-3 bg-muted/50 rounded-lg">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Generation Timestamp
            </label>
            <p className="text-sm font-medium text-foreground">{generatedId?.timestamp}</p>
          </div>
        </div>
        {/* QR Code Preview */}
        <div className="text-center mb-6">
          <div className="w-32 h-32 bg-muted border-2 border-dashed border-border rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="QrCode" size={48} className="text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">QR Code for Mobile Access</p>
        </div>
        {/* Security Indicators */}
        <div className="flex items-center justify-center space-x-4 mb-6 text-xs">
          <div className="flex items-center space-x-1 text-success">
            <Icon name="Lock" size={12} />
            <span>Encrypted</span>
          </div>
          <div className="flex items-center space-x-1 text-success">
            <Icon name="Shield" size={12} />
            <span>Tamper-Proof</span>
          </div>
          <div className="flex items-center space-x-1 text-success">
            <Icon name="CheckCircle" size={12} />
            <span>Verified</span>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="space-y-3">
          <Button variant="default" fullWidth iconName="Download">
            Export PDF
          </Button>
          <Button variant="outline" fullWidth iconName="Send">
            Send to Tourist Device
          </Button>
          <Button variant="ghost" fullWidth iconName="ExternalLink">
            View on Blockchain Explorer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-full">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">Blockchain ID Generation</h2>
        <p className="text-sm text-muted-foreground">
          Create tamper-proof digital identity with blockchain verification
        </p>
      </div>
      {!isGenerating ? (
        <>
          {/* Pre-generation Info */}
          <div className="space-y-4 mb-6">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-primary mb-1">Blockchain Security</h4>
                  <p className="text-xs text-primary/80">
                    Digital ID will be recorded on distributed ledger ensuring immutability and transparency
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-muted/50 rounded-lg">
                <Icon name="Clock" size={20} className="mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs font-medium text-foreground">~45 seconds</p>
                <p className="text-xs text-muted-foreground">Generation Time</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <Icon name="Shield" size={20} className="mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs font-medium text-foreground">256-bit</p>
                <p className="text-xs text-muted-foreground">Encryption</p>
              </div>
            </div>
          </div>

          <Button
            variant="default"
            fullWidth
            size="lg"
            onClick={handleGenerate}
            disabled={!touristData}
            iconName="Zap"
            className="mb-4"
          >
            Generate Digital ID
          </Button>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Ensure tourist data is verified before generation
            </p>
          </div>
        </>
      ) : (
        <>
          {/* Generation Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Generation Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Current Step */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name={steps?.[currentStep]?.icon} size={16} color="white" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">{steps?.[currentStep]?.label}</h4>
                <p className="text-xs text-muted-foreground">{steps?.[currentStep]?.description}</p>
              </div>
            </div>
          </div>

          {/* Steps Progress */}
          <div className="space-y-3 mb-6">
            {steps?.map((step, index) => (
              <div key={step?.id} className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  index < currentStep ? 'bg-success text-success-foreground' :
                  index === currentStep ? 'bg-primary text-primary-foreground': 'bg-muted text-muted-foreground'
                }`}>
                  {index < currentStep ? (
                    <Icon name="Check" size={12} />
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>
                <span className={`text-sm ${
                  index <= currentStep ? 'text-foreground font-medium' : 'text-muted-foreground'
                }`}>
                  {step?.label}
                </span>
              </div>
            ))}
          </div>

          {/* Estimated Time */}
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Clock" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Estimated time remaining: {estimatedTime}s
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BlockchainGenerationPanel;