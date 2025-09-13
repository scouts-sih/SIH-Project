import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import UserManagementTab from './components/UserManagementTab';
import SystemConfigTab from './components/SystemConfigTab';
import DataAnalyticsTab from './components/DataAnalyticsTab';
import AuditLogsTab from './components/AuditLogsTab';
import BackupManagementSection from './components/BackupManagementSection';

const SystemAdministration = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [currentLanguage, setCurrentLanguage] = useState('en');

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

  const tabs = [
    {
      id: 'users',
      label: 'User Management',
      icon: 'Users',
      description: 'Manage user accounts and permissions'
    },
    {
      id: 'config',
      label: 'System Configuration',
      icon: 'Settings',
      description: 'Configure platform settings'
    },
    {
      id: 'analytics',
      label: 'Data Analytics',
      icon: 'BarChart3',
      description: 'View system analytics and reports'
    },
    {
      id: 'audit',
      label: 'Audit Logs',
      icon: 'FileText',
      description: 'Monitor system activity'
    },
    {
      id: 'backup',
      label: 'Backup Management',
      icon: 'Database',
      description: 'Manage data backups and recovery'
    }
  ];

  const systemStats = [
    {
      title: "Total Users",
      value: "156",
      change: "+12",
      trend: "up",
      icon: "Users",
      color: "text-primary"
    },
    {
      title: "Active Sessions",
      value: "89",
      change: "+5",
      trend: "up",
      icon: "Activity",
      color: "text-success"
    },
    {
      title: "System Uptime",
      value: "99.8%",
      change: "+0.2%",
      trend: "up",
      icon: "Server",
      color: "text-accent"
    },
    {
      title: "Storage Used",
      value: "67%",
      change: "+3%",
      trend: "up",
      icon: "HardDrive",
      color: "text-warning"
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagementTab />;
      case 'config':
        return <SystemConfigTab />;
      case 'analytics':
        return <DataAnalyticsTab />;
      case 'audit':
        return <AuditLogsTab />;
      case 'backup':
        return <BackupManagementSection />;
      default:
        return <UserManagementTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>System Administration - TouristGuard</title>
        <meta name="description" content="Comprehensive system administration dashboard for tourism department administrators with user management, system configuration, and monitoring tools." />
      </Helmet>
      {/* Header */}
      <div className="bg-card border-b border-border shadow-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-6 gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">System Administration</h1>
                <p className="text-muted-foreground">Comprehensive platform management and oversight</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">System Online</span>
              </div>
              <Button variant="outline" iconName="RefreshCw">
                Refresh
              </Button>
              <Button variant="destructive" iconName="Phone">
                Emergency
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* System Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {systemStats?.map((stat, index) => (
            <div key={index} className="bg-card rounded-lg border border-border p-6 hover:shadow-elevated-hover transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  stat?.color === 'text-primary' ? 'bg-primary/10' :
                  stat?.color === 'text-success' ? 'bg-success/10' :
                  stat?.color === 'text-accent'? 'bg-accent/10' : 'bg-warning/10'
                }`}>
                  <Icon name={stat?.icon} size={20} className={stat?.color} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat?.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  <Icon name={stat?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
                  <span>{stat?.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
              <div className="text-sm text-muted-foreground">{stat?.title}</div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-card rounded-lg border border-border mb-6">
          <div className="border-b border-border">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-micro ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span className="hidden sm:inline">{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" fullWidth iconName="UserPlus">
              Add New User
            </Button>
            <Button variant="outline" fullWidth iconName="Download">
              Export System Report
            </Button>
            <Button variant="outline" fullWidth iconName="Database">
              Create Backup
            </Button>
            <Button variant="outline" fullWidth iconName="AlertTriangle">
              System Health Check
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>TouristGuard System Administration • Last updated: {new Date()?.toLocaleString('en-IN')}</p>
          <p className="mt-1">© {new Date()?.getFullYear()} Government of India - Ministry of Tourism</p>
        </div>
      </div>
    </div>
  );
};

export default SystemAdministration;