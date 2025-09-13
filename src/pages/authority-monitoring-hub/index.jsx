import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import TouristMap from './components/TouristMap';
import TouristDataTable from './components/TouristDataTable';
import StatisticsPanel from './components/StatisticsPanel';
import TouristProfileModal from './components/TouristProfileModal';
import BulkActionModal from './components/BulkActionModal';

const AuthorityMonitoringHub = () => {
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showBulkActionModal, setShowBulkActionModal] = useState(false);
  const [bulkActionType, setBulkActionType] = useState('');
  const [selectedTouristIds, setSelectedTouristIds] = useState([]);
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState('split'); // split, map, table
  const [isLoading, setIsLoading] = useState(true);

  // Mock tourist data
  const [tourists] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      digitalId: "TG-2025-001234",
      nationality: "United States",
      documentType: "Passport",
      documentNumber: "US123456789",
      currentLocation: "India Gate, New Delhi",
      coordinates: { lat: 28.6129, lng: 77.2295 },
      safetyScore: 85,
      status: "active",
      lastCheckIn: new Date(Date.now() - 1800000),
      registrationDate: new Date(Date.now() - 86400000 * 3),
      blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890"
    },
    {
      id: 2,
      name: "Raj Patel",
      digitalId: "TG-2025-001235",
      nationality: "India",
      documentType: "Aadhaar",
      documentNumber: "1234 5678 9012",
      currentLocation: "Red Fort, New Delhi",
      coordinates: { lat: 28.6562, lng: 77.2410 },
      safetyScore: 72,
      status: "active",
      lastCheckIn: new Date(Date.now() - 3600000),
      registrationDate: new Date(Date.now() - 86400000 * 2),
      blockchainHash: "0x2b3c4d5e6f7890abcdef1234567890ab"
    },
    {
      id: 3,
      name: "Emma Wilson",
      digitalId: "TG-2025-001236",
      nationality: "United Kingdom",
      documentType: "Passport",
      documentNumber: "UK987654321",
      currentLocation: "Chandni Chowk Market",
      coordinates: { lat: 28.6506, lng: 77.2334 },
      safetyScore: 45,
      status: "emergency",
      lastCheckIn: new Date(Date.now() - 7200000),
      registrationDate: new Date(Date.now() - 86400000 * 1),
      blockchainHash: "0x3c4d5e6f7890abcdef1234567890abcd"
    },
    {
      id: 4,
      name: "Michael Chen",
      digitalId: "TG-2025-001237",
      nationality: "Canada",
      documentType: "Passport",
      documentNumber: "CA456789123",
      currentLocation: "Lotus Temple, New Delhi",
      coordinates: { lat: 28.5535, lng: 77.2588 },
      safetyScore: 91,
      status: "active",
      lastCheckIn: new Date(Date.now() - 900000),
      registrationDate: new Date(Date.now() - 86400000 * 4),
      blockchainHash: "0x4d5e6f7890abcdef1234567890abcdef"
    },
    {
      id: 5,
      name: "Lisa Anderson",
      digitalId: "TG-2025-001238",
      nationality: "Australia",
      documentType: "Passport",
      documentNumber: "AU789123456",
      currentLocation: "Qutub Minar, New Delhi",
      coordinates: { lat: 28.5245, lng: 77.1855 },
      safetyScore: 67,
      status: "inactive",
      lastCheckIn: new Date(Date.now() - 14400000),
      registrationDate: new Date(Date.now() - 86400000 * 5),
      blockchainHash: "0x5e6f7890abcdef1234567890abcdef12"
    },
    {
      id: 6,
      name: "David Kumar",
      digitalId: "TG-2025-001239",
      nationality: "India",
      documentType: "Aadhaar",
      documentNumber: "9876 5432 1098",
      currentLocation: "Humayun's Tomb, New Delhi",
      coordinates: { lat: 28.5933, lng: 77.2507 },
      safetyScore: 38,
      status: "missing",
      lastCheckIn: new Date(Date.now() - 21600000),
      registrationDate: new Date(Date.now() - 86400000 * 6),
      blockchainHash: "0x6f7890abcdef1234567890abcdef1234"
    }
  ]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleTouristSelect = (tourist) => {
    setSelectedTourist(tourist);
    if (tourist) {
      setShowProfileModal(true);
    }
  };

  const handleBulkAction = (actionType, touristIds) => {
    setBulkActionType(actionType);
    setSelectedTouristIds(touristIds);
    setShowBulkActionModal(true);
  };

  const handleBulkActionConfirm = (actionData) => {
    console.log('Bulk action confirmed:', actionData);
    // Here you would typically send the action to your backend
    setShowBulkActionModal(false);
    setBulkActionType('');
    setSelectedTouristIds([]);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleProfileAction = (actionType, touristId) => {
    console.log(`Profile action: ${actionType} for tourist ${touristId}`);
    // Handle profile-specific actions
    setShowProfileModal(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={32} color="var(--color-primary)" className="animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Loading Authority Hub</h2>
          <p className="text-muted-foreground">Initializing tourist monitoring systems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-elevated">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Authority Monitoring Hub</h1>
              <p className="text-muted-foreground">Real-time tourist oversight and management</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'split' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('split')}
                >
                  <Icon name="Layout" size={16} />
                  <span className="hidden sm:inline ml-1">Split</span>
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                >
                  <Icon name="Map" size={16} />
                  <span className="hidden sm:inline ml-1">Map</span>
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                >
                  <Icon name="Table" size={16} />
                  <span className="hidden sm:inline ml-1">Table</span>
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center space-x-2">
                <Link to="/incident-report-dashboard">
                  <Button variant="outline" size="sm">
                    <Icon name="FileText" size={16} />
                    <span className="hidden sm:inline ml-1">Incidents</span>
                  </Button>
                </Link>
                <Link to="/geo-fence-management">
                  <Button variant="outline" size="sm">
                    <Icon name="MapPin" size={16} />
                    <span className="hidden sm:inline ml-1">Zones</span>
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleBulkAction('emergency', tourists?.filter(t => t?.status === 'emergency')?.map(t => t?.id))}
                >
                  <Icon name="Phone" size={16} />
                  <span className="hidden sm:inline ml-1">Emergency</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Statistics Panel */}
        <div className="w-80 border-r border-border bg-card overflow-y-auto">
          <StatisticsPanel 
            tourists={tourists}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {viewMode === 'split' && (
            <>
              {/* Map Section */}
              <div className="h-1/2 p-4">
                <TouristMap
                  tourists={tourists}
                  selectedTourist={selectedTourist}
                  onTouristSelect={handleTouristSelect}
                  filters={filters}
                />
              </div>
              
              {/* Table Section */}
              <div className="h-1/2 p-4 pt-0">
                <TouristDataTable
                  tourists={tourists}
                  onTouristSelect={handleTouristSelect}
                  onBulkAction={handleBulkAction}
                />
              </div>
            </>
          )}

          {viewMode === 'map' && (
            <div className="flex-1 p-4">
              <TouristMap
                tourists={tourists}
                selectedTourist={selectedTourist}
                onTouristSelect={handleTouristSelect}
                filters={filters}
              />
            </div>
          )}

          {viewMode === 'table' && (
            <div className="flex-1 p-4">
              <TouristDataTable
                tourists={tourists}
                onTouristSelect={handleTouristSelect}
                onBulkAction={handleBulkAction}
              />
            </div>
          )}
        </div>
      </div>
      {/* Modals */}
      <TouristProfileModal
        tourist={selectedTourist}
        isOpen={showProfileModal}
        onClose={() => {
          setShowProfileModal(false);
          setSelectedTourist(null);
        }}
        onAction={handleProfileAction}
      />
      <BulkActionModal
        isOpen={showBulkActionModal}
        onClose={() => {
          setShowBulkActionModal(false);
          setBulkActionType('');
          setSelectedTouristIds([]);
        }}
        actionType={bulkActionType}
        selectedTourists={selectedTouristIds}
        touristData={tourists}
        onConfirm={handleBulkActionConfirm}
      />
      {/* Emergency Alert Banner */}
      {tourists?.some(t => t?.status === 'emergency') && (
        <div className="fixed bottom-4 right-4 bg-destructive text-destructive-foreground rounded-lg shadow-emergency p-4 max-w-sm">
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" size={20} className="animate-pulse" />
            <div>
              <div className="font-medium">Emergency Alert</div>
              <div className="text-sm opacity-90">
                {tourists?.filter(t => t?.status === 'emergency')?.length} tourist(s) need immediate attention
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFilterChange({ status: 'emergency' })}
              className="text-destructive-foreground hover:bg-destructive-foreground/10"
            >
              <Icon name="Eye" size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorityMonitoringHub;