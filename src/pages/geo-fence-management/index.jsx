import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import StatusIndicatorBar from '../../components/ui/StatusIndicatorBar';
import EmergencyAccessOverlay from '../../components/ui/EmergencyAccessOverlay';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import MapInterface from './components/MapInterface';
import ZoneManagementPanel from './components/ZoneManagementPanel';
import ZoneListPanel from './components/ZoneListPanel';
import ZoneAnalytics from './components/ZoneAnalytics';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const GeoFenceManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('map');
  const [selectedZone, setSelectedZone] = useState(null);
  const [drawingMode, setDrawingMode] = useState('select');
  const [zones, setZones] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock zones data
  const mockZones = [
    {
      id: 'zone_1',
      name: 'Red Fort Restricted Area',
      type: 'polygon',
      riskLevel: 'high',
      coordinates: [
        { lat: 28.6562, lng: 77.2410 },
        { lat: 28.6572, lng: 77.2420 },
        { lat: 28.6552, lng: 77.2430 },
        { lat: 28.6542, lng: 77.2400 }
      ],
      alertMessage: 'You are entering a restricted archaeological zone. Please maintain distance from monuments.',
      alertFrequency: 'immediate',
      entryAlert: true,
      exitAlert: false,
      emergencyProtocol: 'enhanced',
      maxCapacity: 50,
      isActive: true,
      createdAt: new Date('2024-01-15'),
      touristCount: 23
    },
    {
      id: 'zone_2',
      name: 'India Gate Security Zone',
      type: 'circle',
      riskLevel: 'moderate',
      coordinates: [
        { lat: 28.6129, lng: 77.2295 }
      ],
      alertMessage: 'Security checkpoint ahead. Please have your identification ready.',
      alertFrequency: 'delayed',
      entryAlert: true,
      exitAlert: true,
      emergencyProtocol: 'standard',
      maxCapacity: 200,
      isActive: true,
      createdAt: new Date('2024-02-01'),
      touristCount: 156
    },
    {
      id: 'zone_3',
      name: 'Lotus Temple Quiet Zone',
      type: 'polygon',
      riskLevel: 'low',
      coordinates: [
        { lat: 28.5535, lng: 77.2588 },
        { lat: 28.5545, lng: 77.2598 },
        { lat: 28.5525, lng: 77.2608 },
        { lat: 28.5515, lng: 77.2578 }
      ],
      alertMessage: 'Please maintain silence in this meditation area.',
      alertFrequency: 'periodic',
      entryAlert: true,
      exitAlert: false,
      emergencyProtocol: 'standard',
      maxCapacity: 100,
      isActive: true,
      createdAt: new Date('2024-01-20'),
      touristCount: 45
    },
    {
      id: 'zone_4',
      name: 'Chandni Chowk Traffic Zone',
      type: 'rectangle',
      riskLevel: 'moderate',
      coordinates: [
        { lat: 28.6506, lng: 77.2303 },
        { lat: 28.6516, lng: 77.2313 },
        { lat: 28.6496, lng: 77.2323 },
        { lat: 28.6486, lng: 77.2293 }
      ],
      alertMessage: 'Heavy traffic area. Please stay with your group and follow traffic signals.',
      alertFrequency: 'immediate',
      entryAlert: true,
      exitAlert: false,
      emergencyProtocol: 'standard',
      maxCapacity: 300,
      isActive: false,
      createdAt: new Date('2024-02-10'),
      touristCount: 0
    },
    {
      id: 'zone_5',
      name: 'Qutub Minar Construction Zone',
      type: 'polygon',
      riskLevel: 'high',
      coordinates: [
        { lat: 28.5244, lng: 77.1855 },
        { lat: 28.5254, lng: 77.1865 },
        { lat: 28.5234, lng: 77.1875 },
        { lat: 28.5224, lng: 77.1845 }
      ],
      alertMessage: 'Construction work in progress. Hard hats required. Authorized personnel only.',
      alertFrequency: 'immediate',
      entryAlert: true,
      exitAlert: true,
      emergencyProtocol: 'critical',
      maxCapacity: 10,
      isActive: true,
      createdAt: new Date('2024-02-15'),
      touristCount: 3
    }
  ];

  useEffect(() => {
    setZones(mockZones);
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('touristguard-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Listen for language changes
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleZoneCreate = (newZone) => {
    setZones(prev => [...prev, newZone]);
    setSelectedZone(newZone);
  };

  const handleZoneUpdate = (updatedZone) => {
    setZones(prev => prev?.map(zone => 
      zone?.id === updatedZone?.id ? updatedZone : zone
    ));
    setSelectedZone(updatedZone);
  };

  const handleZoneDelete = (zoneId) => {
    setZones(prev => prev?.filter(zone => zone?.id !== zoneId));
    if (selectedZone?.id === zoneId) {
      setSelectedZone(null);
    }
  };

  const handleBulkOperation = (operation, zoneIds) => {
    switch (operation) {
      case 'activate':
        setZones(prev => prev?.map(zone => 
          zoneIds?.includes(zone?.id) ? { ...zone, isActive: true } : zone
        ));
        break;
      case 'deactivate':
        setZones(prev => prev?.map(zone => 
          zoneIds?.includes(zone?.id) ? { ...zone, isActive: false } : zone
        ));
        break;
      case 'delete':
        setZones(prev => prev?.filter(zone => !zoneIds?.includes(zone?.id)));
        if (selectedZone && zoneIds?.includes(selectedZone?.id)) {
          setSelectedZone(null);
        }
        break;
      default:
        break;
    }
  };

  const viewOptions = [
    { id: 'map', label: 'Map View', icon: 'Map', description: 'Interactive zone mapping' },
    { id: 'list', label: 'Zone List', icon: 'List', description: 'Tabular zone management' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3', description: 'Performance insights' }
  ];

  return (
    <>
      <Helmet>
        <title>Geo Fence Management - TouristGuard</title>
        <meta name="description" content="Create, modify, and monitor danger zones with real-time boundary visualization and alert configuration for tourist safety management." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <StatusIndicatorBar />
        
        <div className="flex">
          <Sidebar 
            isCollapsed={sidebarCollapsed} 
            onToggle={handleSidebarToggle}
          />
          
          <main className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? 'ml-16' : 'ml-64'
          } lg:${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
            <div className="p-6">
              {/* Page Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Geo Fence Management
                  </h1>
                  <p className="text-muted-foreground">
                    Create and manage geo-fenced zones for tourist safety monitoring
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <LanguageSwitcher />
                  
                  {/* View Toggle */}
                  <div className="flex bg-muted rounded-lg p-1">
                    {viewOptions?.map((option) => (
                      <Button
                        key={option?.id}
                        variant={activeView === option?.id ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setActiveView(option?.id)}
                        className="px-3"
                        title={option?.description}
                      >
                        <Icon name={option?.icon} size={16} />
                        <span className="hidden sm:inline ml-2">{option?.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-card rounded-lg shadow-elevated p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name="MapPin" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{zones?.length}</div>
                      <div className="text-sm text-muted-foreground">Total Zones</div>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg shadow-elevated p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <Icon name="Shield" size={20} className="text-success" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {zones?.filter(z => z?.isActive)?.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Active Zones</div>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg shadow-elevated p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-error/10 rounded-lg">
                      <Icon name="AlertTriangle" size={20} className="text-error" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {zones?.filter(z => z?.riskLevel === 'high')?.length}
                      </div>
                      <div className="text-sm text-muted-foreground">High Risk</div>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg shadow-elevated p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <Icon name="Users" size={20} className="text-warning" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {zones?.reduce((sum, z) => sum + z?.touristCount, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Monitored Tourists</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-20rem)]">
                {/* Primary View */}
                <div className="lg:col-span-2">
                  {activeView === 'map' && (
                    <MapInterface
                      zones={zones}
                      selectedZone={selectedZone}
                      onZoneSelect={setSelectedZone}
                      onZoneCreate={handleZoneCreate}
                      onZoneUpdate={handleZoneUpdate}
                      drawingMode={drawingMode}
                      onDrawingModeChange={setDrawingMode}
                    />
                  )}
                  
                  {activeView === 'list' && (
                    <ZoneListPanel
                      zones={zones}
                      selectedZone={selectedZone}
                      onZoneSelect={setSelectedZone}
                      onBulkOperation={handleBulkOperation}
                    />
                  )}
                  
                  {activeView === 'analytics' && (
                    <ZoneAnalytics zones={zones} />
                  )}
                </div>

                {/* Side Panel */}
                <div className="lg:col-span-1">
                  <ZoneManagementPanel
                    selectedZone={selectedZone}
                    onZoneUpdate={handleZoneUpdate}
                    onZoneDelete={handleZoneDelete}
                    onZoneCreate={handleZoneCreate}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>

        <EmergencyAccessOverlay />
      </div>
    </>
  );
};

export default GeoFenceManagement;