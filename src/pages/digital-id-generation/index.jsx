import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TouristSummaryPanel from './components/TouristSummaryPanel';
import BlockchainGenerationPanel from './components/BlockchainGenerationPanel';
import TouristSelectionModal from './components/TouristSelectionModal';
import GenerationHistoryPanel from './components/GenerationHistoryPanel';

const DigitalIdGeneration = () => {
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedId, setGeneratedId] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Language change handler
  useEffect(() => {
    const savedLanguage = localStorage.getItem('touristguard-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  // Mock selected tourist data
  useEffect(() => {
    // Auto-select first tourist for demo
    const mockTourist = {
      id: 'TG001',
      name: 'Rajesh Kumar Sharma',
      nationality: 'Indian',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      documentNumber: 'AADHAAR-1234-5678-9012',
      idType: 'Aadhaar',
      registrationDate: '11/09/2025',
      entryPoint: 'Delhi Airport',
      phone: '+91 98765 43210',
      email: 'rajesh.sharma@email.com',
      dateOfBirth: '15/03/1985',
      gender: 'Male',
      stayDuration: '7 days',
      visitPurpose: 'Tourism'
    };
    setSelectedTourist(mockTourist);
  }, []);

  const handleTouristSelect = (tourist) => {
    setSelectedTourist(tourist);
    setGeneratedId(null);
    setIsGenerating(false);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedId(null);

    // Simulate blockchain generation process
    setTimeout(() => {
      const mockGeneratedId = {
        hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
        idNumber: `DID-${Date.now()}`,
        blockNumber: '2,847,392',
        timestamp: new Date()?.toLocaleString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      };
      setGeneratedId(mockGeneratedId);
      setIsGenerating(false);
    }, 45000);
  };

  const handleEditTourist = () => {
    setIsSelectionModalOpen(true);
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/tourist-safety-dashboard' },
    { label: 'Digital ID Generation', path: '/digital-id-generation', current: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-4">
            {breadcrumbItems?.map((item, index) => (
              <React.Fragment key={item?.path}>
                {index > 0 && <Icon name="ChevronRight" size={14} className="text-muted-foreground" />}
                {item?.current ? (
                  <span className="text-foreground font-medium">{item?.label}</span>
                ) : (
                  <Link to={item?.path} className="text-muted-foreground hover:text-foreground transition-colors">
                    {item?.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="CreditCard" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Digital ID Generation</h1>
                <p className="text-muted-foreground">Create blockchain-based tamper-proof tourist identities</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                onClick={() => setIsSelectionModalOpen(true)}
                iconName="Search"
              >
                Select Tourist
              </Button>
              <Button
                variant="ghost"
                iconName="RefreshCw"
                onClick={() => window.location?.reload()}
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Pending IDs</span>
              </div>
              <p className="text-xl font-bold text-foreground mt-1">23</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-success" />
                <span className="text-sm font-medium text-foreground">Generated Today</span>
              </div>
              <p className="text-xl font-bold text-foreground mt-1">12</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-warning" />
                <span className="text-sm font-medium text-foreground">Avg. Time</span>
              </div>
              <p className="text-xl font-bold text-foreground mt-1">42s</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Success Rate</span>
              </div>
              <p className="text-xl font-bold text-foreground mt-1">99.8%</p>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Two Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Panel - Tourist Summary */}
          <TouristSummaryPanel 
            touristData={selectedTourist}
            onEdit={handleEditTourist}
          />

          {/* Right Panel - Blockchain Generation */}
          <BlockchainGenerationPanel
            touristData={selectedTourist}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            generatedId={generatedId}
          />
        </div>

        {/* Generation History */}
        <GenerationHistoryPanel />

        {/* Quick Actions */}
        <div className="mt-8 p-6 bg-card rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/authority-monitoring-hub">
              <Button variant="outline" fullWidth className="h-16 flex-col space-y-2">
                <Icon name="Users" size={20} />
                <span className="text-sm">Monitor Tourists</span>
              </Button>
            </Link>
            <Link to="/incident-report-dashboard">
              <Button variant="outline" fullWidth className="h-16 flex-col space-y-2">
                <Icon name="AlertTriangle" size={20} />
                <span className="text-sm">Incident Reports</span>
              </Button>
            </Link>
            <Link to="/geo-fence-management">
              <Button variant="outline" fullWidth className="h-16 flex-col space-y-2">
                <Icon name="MapPin" size={20} />
                <span className="text-sm">Manage Zones</span>
              </Button>
            </Link>
            <Link to="/system-administration">
              <Button variant="outline" fullWidth className="h-16 flex-col space-y-2">
                <Icon name="Settings" size={20} />
                <span className="text-sm">System Settings</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-primary mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-primary mb-1">Blockchain Security Notice</h4>
              <p className="text-sm text-primary/80">
                All digital IDs are secured using 256-bit encryption and recorded on a distributed ledger. 
                Generated IDs are tamper-proof and can be verified through blockchain explorer tools.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Tourist Selection Modal */}
      <TouristSelectionModal
        isOpen={isSelectionModalOpen}
        onClose={() => setIsSelectionModalOpen(false)}
        onSelect={handleTouristSelect}
      />
    </div>
  );
};

export default DigitalIdGeneration;