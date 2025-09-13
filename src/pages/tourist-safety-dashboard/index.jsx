import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import SafetyScoreGauge from './components/SafetyScoreGauge';
import InteractiveMap from './components/InteractiveMap';
import SOSPanicButton from './components/SOSPanicButton';
import StatusCards from './components/StatusCards';
import AlertBanner from './components/AlertBanner';
import QuickActions from './components/QuickActions';
import LanguageAccessibility from './components/LanguageAccessibility';

const TouristSafetyDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [userProfile, setUserProfile] = useState({
    name: 'Rajesh Kumar',
    id: 'TG-2025-001247',
    location: 'New Delhi, India',
    checkInTime: new Date(Date.now() - 3600000),
    safetyScore: 85
  });

  const [dashboardStats, setDashboardStats] = useState({
    totalAlerts: 3,
    activeIncidents: 0,
    nearbyTourists: 42,
    emergencyContacts: 3
  });

  useEffect(() => {
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

  const getLocalizedText = (key) => {
    const translations = {
      en: {
        title: 'Tourist Safety Dashboard',
        welcome: `Welcome back, ${userProfile?.name}`,
        checkedIn: 'Checked in',
        touristId: 'Tourist ID',
        currentLocation: 'Current Location',
        lastUpdate: 'Last updated',
        dashboardOverview: 'Dashboard Overview',
        safetyMetrics: 'Safety Metrics'
      },
      hi: {
        title: 'पर्यटक सुरक्षा डैशबोर्ड',
        welcome: `स्वागत है, ${userProfile?.name}`,
        checkedIn: 'चेक इन किया गया',
        touristId: 'पर्यटक आईडी',
        currentLocation: 'वर्तमान स्थान',
        lastUpdate: 'अंतिम अपडेट',
        dashboardOverview: 'डैशबोर्ड अवलोकन',
        safetyMetrics: 'सुरक्षा मेट्रिक्स'
      }
    };

    return translations?.[currentLanguage]?.[key] || translations?.en?.[key];
  };

  return (
    <>
      <Helmet>
        <title>Tourist Safety Dashboard - TouristGuard</title>
        <meta name="description" content="Real-time tourist safety monitoring dashboard with location tracking, emergency access, and safety score visualization." />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon name="Shield" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {getLocalizedText('title')}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {getLocalizedText('welcome')}
                  </p>
                </div>
              </div>
              
              <LanguageAccessibility />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Alert Banner */}
          <div className="mb-6">
            <AlertBanner />
          </div>

          {/* User Profile Card */}
          <div className="bg-card rounded-xl border border-border p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{getLocalizedText('touristId')}</div>
                  <div className="font-medium text-foreground">{userProfile?.id}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="MapPin" size={20} className="text-success" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{getLocalizedText('currentLocation')}</div>
                  <div className="font-medium text-foreground">{userProfile?.location}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{getLocalizedText('checkedIn')}</div>
                  <div className="font-medium text-foreground">
                    {userProfile?.checkInTime?.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                  <Icon name="RefreshCw" size={20} className="text-warning" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{getLocalizedText('lastUpdate')}</div>
                  <div className="font-medium text-foreground">
                    {new Date()?.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Safety Score */}
            <div className="lg:col-span-1">
              <SafetyScoreGauge 
                score={userProfile?.safetyScore}
                breakdown={{
                  location: 90,
                  weather: 85,
                  crowd: 75,
                  time: 80,
                  zone: 95
                }}
              />
            </div>

            {/* Interactive Map */}
            <div className="lg:col-span-2">
              <InteractiveMap 
                currentLocation={{ lat: 28.6139, lng: 77.2090 }}
              />
            </div>
          </div>

          {/* Status Cards */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              System Status
            </h2>
            <StatusCards />
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Dashboard Statistics */}
          <div className="mt-8 bg-muted/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {getLocalizedText('dashboardOverview')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{dashboardStats?.totalAlerts}</div>
                <div className="text-sm text-muted-foreground">Active Alerts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{dashboardStats?.activeIncidents}</div>
                <div className="text-sm text-muted-foreground">Incidents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{dashboardStats?.nearbyTourists}</div>
                <div className="text-sm text-muted-foreground">Nearby Tourists</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{dashboardStats?.emergencyContacts}</div>
                <div className="text-sm text-muted-foreground">Emergency Contacts</div>
              </div>
            </div>
          </div>
        </div>

        {/* SOS Panic Button */}
        <SOSPanicButton />

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} />
                <span>TouristGuard © {new Date()?.getFullYear()}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Emergency: 108</span>
                <span>•</span>
                <span>Tourist Helpline: 1363</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default TouristSafetyDashboard;