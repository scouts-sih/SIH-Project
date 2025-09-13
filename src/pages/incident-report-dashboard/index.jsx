import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import StatusIndicatorBar from '../../components/ui/StatusIndicatorBar';
import EmergencyAccessOverlay from '../../components/ui/EmergencyAccessOverlay';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import IncidentSummaryCards from './components/IncidentSummaryCards';
import IncidentFilters from './components/IncidentFilters';
import IncidentTable from './components/IncidentTable';
import IncidentDetailModal from './components/IncidentDetailModal';
import AnalyticsPanel from './components/AnalyticsPanel';
import EFIRGenerationModal from './components/EFIRGenerationModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const IncidentReportDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('incidents');
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEFIRModal, setShowEFIRModal] = useState(false);
  const [efirIncidentId, setEFIRIncidentId] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    severity: 'all',
    type: 'all',
    location: 'all',
    date: ''
  });

  // Mock data for incidents
  const mockIncidents = [
    {
      incidentId: 'INC-2024-001',
      type: 'Missing Person',
      typeIcon: 'UserX',
      tourist: {
        name: 'Sarah Johnson',
        id: 'TID-US-2024-001',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        nationality: 'United States',
        age: 28,
        phone: '+1-555-0123',
        checkinDate: '15/03/2024',
        accommodation: 'Hotel Taj, Goa',
        groupSize: 2
      },
      location: 'Baga Beach, Goa',
      coordinates: '15.5557,73.7516',
      severity: 'high',
      status: 'investigating',
      date: '18/03/2024',
      time: '14:30',
      timestamp: new Date('2024-03-18T14:30:00'),
      responder: {
        name: 'Inspector Raj Patel',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      },
      description: `Tourist Sarah Johnson was last seen at Baga Beach around 2:30 PM. She was with her friend but got separated during crowded beach activities. Friend reported her missing after 2 hours of searching. Local authorities have been notified and search operations are underway.`,
      priorityScore: 85,
      responseTime: '8 minutes',
      locationHistory: [
        { place: 'Hotel Taj, Goa', timestamp: '18/03/2024 12:00', duration: '2h 30m' },
        { place: 'Baga Beach North', timestamp: '18/03/2024 14:15', duration: '15m' },
        { place: 'Baga Beach Central', timestamp: '18/03/2024 14:30', duration: 'Last known' }
      ]
    },
    {
      incidentId: 'INC-2024-002',
      type: 'Medical Emergency',
      typeIcon: 'Heart',
      tourist: {
        name: 'Rajesh Kumar',
        id: 'TID-IN-2024-045',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        nationality: 'India',
        age: 45,
        phone: '+91-9876543210',
        checkinDate: '16/03/2024',
        accommodation: 'Mountain View Resort, Manali',
        groupSize: 4
      },
      location: 'Rohtang Pass, Himachal Pradesh',
      coordinates: '32.3726,77.2497',
      severity: 'critical',
      status: 'resolved',
      date: '17/03/2024',
      time: '11:45',
      timestamp: new Date('2024-03-17T11:45:00'),
      responder: {
        name: 'Dr. Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150'
      },
      description: `Tourist experienced altitude sickness at Rohtang Pass. Immediate medical attention was provided by local medical team. Patient was stabilized and transported to nearby hospital for further treatment. Full recovery achieved.`,
      priorityScore: 95,
      responseTime: '12 minutes',
      locationHistory: [
        { place: 'Mountain View Resort', timestamp: '17/03/2024 08:00', duration: '3h 45m' },
        { place: 'Rohtang Pass Base', timestamp: '17/03/2024 11:30', duration: '15m' },
        { place: 'Rohtang Pass Summit', timestamp: '17/03/2024 11:45', duration: 'Incident location' }
      ]
    },
    {
      incidentId: 'INC-2024-003',
      type: 'Theft',
      typeIcon: 'ShieldAlert',
      tourist: {
        name: 'Emma Wilson',
        id: 'TID-UK-2024-012',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        nationality: 'United Kingdom',
        age: 32,
        phone: '+44-7700-900123',
        checkinDate: '14/03/2024',
        accommodation: 'Heritage Hotel, Jaipur',
        groupSize: 1
      },
      location: 'Hawa Mahal, Jaipur',
      coordinates: '26.9239,75.8267',
      severity: 'medium',
      status: 'reported',
      date: '18/03/2024',
      time: '16:20',
      timestamp: new Date('2024-03-18T16:20:00'),
      responder: null,
      description: `Tourist reported theft of handbag containing passport, cash, and personal items while visiting Hawa Mahal. Incident occurred in crowded tourist area. CCTV footage is being reviewed and local police have been informed.`,
      priorityScore: 65,
      responseTime: null,
      locationHistory: [
        { place: 'Heritage Hotel, Jaipur', timestamp: '18/03/2024 14:00', duration: '2h 20m' },
        { place: 'City Palace', timestamp: '18/03/2024 15:30', duration: '50m' },
        { place: 'Hawa Mahal', timestamp: '18/03/2024 16:20', duration: 'Incident location' }
      ]
    },
    {
      incidentId: 'INC-2024-004',
      type: 'Accident',
      typeIcon: 'AlertTriangle',
      tourist: {
        name: 'Michael Chen',
        id: 'TID-SG-2024-008',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        nationality: 'Singapore',
        age: 29,
        phone: '+65-9123-4567',
        checkinDate: '15/03/2024',
        accommodation: 'Backwater Resort, Kerala',
        groupSize: 3
      },
      location: 'Alleppey Backwaters, Kerala',
      coordinates: '9.4981,76.3388',
      severity: 'low',
      status: 'closed',
      date: '16/03/2024',
      time: '10:15',
      timestamp: new Date('2024-03-16T10:15:00'),
      responder: {
        name: 'Officer Suresh Nair',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150'
      },
      description: `Minor boat accident during backwater tour. Tourist sustained minor injuries and was treated by local medical team. No serious injuries reported. Insurance claim processed and case closed.`,
      priorityScore: 35,
      responseTime: '15 minutes',
      locationHistory: [
        { place: 'Backwater Resort', timestamp: '16/03/2024 08:00', duration: '2h 15m' },
        { place: 'Alleppey Boat Jetty', timestamp: '16/03/2024 09:45', duration: '30m' },
        { place: 'Backwater Channel 3', timestamp: '16/03/2024 10:15', duration: 'Incident location' }
      ]
    },
    {
      incidentId: 'INC-2024-005',
      type: 'Harassment',
      typeIcon: 'UserX',
      tourist: {
        name: 'Lisa Anderson',
        id: 'TID-CA-2024-019',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        nationality: 'Canada',
        age: 26,
        phone: '+1-416-555-0198',
        checkinDate: '17/03/2024',
        accommodation: 'Yoga Retreat, Rishikesh',
        groupSize: 1
      },
      location: 'Laxman Jhula, Rishikesh',
      coordinates: '30.1367,78.2932',
      severity: 'medium',
      status: 'investigating',
      date: '18/03/2024',
      time: '18:45',
      timestamp: new Date('2024-03-18T18:45:00'),
      responder: {
        name: 'Inspector Meera Gupta',
        avatar: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150'
      },
      description: `Tourist reported harassment by local individuals near Laxman Jhula. Incident reported to local authorities and investigation is ongoing. Tourist safety measures have been enhanced in the area.`,
      priorityScore: 70,
      responseTime: '6 minutes',
      locationHistory: [
        { place: 'Yoga Retreat Center', timestamp: '18/03/2024 17:00', duration: '1h 45m' },
        { place: 'Ram Jhula Market', timestamp: '18/03/2024 18:30', duration: '15m' },
        { place: 'Laxman Jhula', timestamp: '18/03/2024 18:45', duration: 'Incident location' }
      ]
    }
  ];

  // Mock summary data
  const summaryData = {
    totalIncidents: 156,
    activeCases: 23,
    resolutionRate: 94,
    avgResponseTime: 12
  };

  // Mock analytics data
  const analyticsData = {
    trends: [],
    types: [],
    responseTime: [],
    hotspots: []
  };

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('touristguard-language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Listen for language changes
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      severity: 'all',
      type: 'all',
      location: 'all',
      date: ''
    });
  };

  const handleViewDetails = (incident) => {
    setSelectedIncident(incident);
    setShowDetailModal(true);
  };

  const handleGenerateEFIR = (incidentId) => {
    setEFIRIncidentId(incidentId);
    setShowEFIRModal(true);
  };

  const handleUpdateStatus = (incidentId) => {
    console.log('Update status for incident:', incidentId);
  };

  const handleAssignResponder = (incidentId) => {
    console.log('Assign responder for incident:', incidentId);
  };

  const handleEFIRGenerate = (efirData) => {
    console.log('E-FIR generated:', efirData);
  };

  // Filter incidents based on current filters
  const filteredIncidents = mockIncidents?.filter(incident => {
    if (filters?.search && !incident?.tourist?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
        !incident?.incidentId?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
        !incident?.location?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }
    if (filters?.status !== 'all' && incident?.status !== filters?.status) return false;
    if (filters?.severity !== 'all' && incident?.severity !== filters?.severity) return false;
    if (filters?.type !== 'all' && incident?.type?.toLowerCase()?.replace(' ', '_') !== filters?.type) return false;
    if (filters?.location !== 'all') {
      const locationMap = {
        'goa': 'goa',
        'kerala': 'kerala',
        'rajasthan': 'jaipur',
        'himachal': 'himachal',
        'uttarakhand': 'rishikesh'
      };
      if (!incident?.location?.toLowerCase()?.includes(locationMap?.[filters?.location] || filters?.location)) return false;
    }
    if (filters?.date && incident?.date !== filters?.date) return false;
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Incident Report Dashboard - TouristGuard</title>
        <meta name="description" content="Comprehensive incident tracking, automated E-FIR generation, and response analytics for tourism officials and law enforcement." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <StatusIndicatorBar />
        
        <div className="flex">
          <Sidebar 
            isCollapsed={sidebarCollapsed} 
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
          />
          
          <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
            <div className="p-6">
              {/* Page Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Incident Report Dashboard</h1>
                  <p className="text-muted-foreground mt-2">
                    Comprehensive incident tracking and emergency response management
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <LanguageSwitcher />
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={activeView === 'incidents' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveView('incidents')}
                    >
                      <Icon name="List" size={16} />
                      Incidents
                    </Button>
                    <Button
                      variant={activeView === 'analytics' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveView('analytics')}
                    >
                      <Icon name="BarChart3" size={16} />
                      Analytics
                    </Button>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <IncidentSummaryCards summaryData={summaryData} />

              {/* Main Content */}
              {activeView === 'incidents' ? (
                <div className="space-y-6">
                  <IncidentFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                  />
                  
                  <IncidentTable
                    incidents={filteredIncidents}
                    onViewDetails={handleViewDetails}
                    onGenerateEFIR={handleGenerateEFIR}
                  />
                </div>
              ) : (
                <AnalyticsPanel analyticsData={analyticsData} />
              )}
            </div>
          </main>
        </div>

        {/* Modals */}
        <IncidentDetailModal
          incident={selectedIncident}
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          onUpdateStatus={handleUpdateStatus}
          onAssignResponder={handleAssignResponder}
        />

        <EFIRGenerationModal
          isOpen={showEFIRModal}
          onClose={() => setShowEFIRModal(false)}
          incidentId={efirIncidentId}
          onGenerate={handleEFIRGenerate}
        />

        <EmergencyAccessOverlay />
      </div>
    </>
  );
};

export default IncidentReportDashboard;