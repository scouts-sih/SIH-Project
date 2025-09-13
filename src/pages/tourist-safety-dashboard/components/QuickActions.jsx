import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const quickActionItems = [
    {
      id: 'emergency-contacts',
      title: 'Emergency Contacts',
      description: 'View and manage emergency contacts',
      icon: 'Phone',
      color: 'text-error',
      bg: 'bg-error/10',
      action: () => console.log('Open emergency contacts')
    },
    {
      id: 'itinerary',
      title: 'My Itinerary',
      description: 'View travel timeline and plans',
      icon: 'Calendar',
      color: 'text-accent',
      bg: 'bg-accent/10',
      action: () => console.log('Open itinerary')
    },
    {
      id: 'safety-guidelines',
      title: 'Safety Guidelines',
      description: 'Local safety tips and protocols',
      icon: 'BookOpen',
      color: 'text-success',
      bg: 'bg-success/10',
      action: () => console.log('Open safety guidelines')
    },
    {
      id: 'nearby-services',
      title: 'Nearby Services',
      description: 'Find hospitals, police, ATMs',
      icon: 'MapPin',
      color: 'text-warning',
      bg: 'bg-warning/10',
      action: () => console.log('Open nearby services')
    }
  ];

  const navigationItems = [
    {
      id: 'digital-id',
      title: 'Digital ID',
      description: 'View your tourist ID',
      icon: 'CreditCard',
      path: '/digital-id-generation'
    },
    {
      id: 'incident-report',
      title: 'Report Incident',
      description: 'File a safety report',
      icon: 'AlertTriangle',
      path: '/incident-report-dashboard'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActionItems?.map((item) => (
            <button
              key={item?.id}
              onClick={item?.action}
              className={`${item?.bg} rounded-xl p-4 border border-border hover:shadow-elevated transition-all duration-200 text-left group`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-card ${item?.color}`}>
                  <Icon name={item?.icon} size={20} />
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-foreground transition-micro" />
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-1">
                  {item?.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {item?.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Navigation Actions */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">More Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {navigationItems?.map((item) => (
            <Link
              key={item?.id}
              to={item?.path}
              className="bg-card rounded-xl p-4 border border-border hover:shadow-elevated transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon name={item?.icon} size={24} className="text-primary" />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">
                    {item?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item?.description}
                  </p>
                </div>
                
                <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-foreground transition-micro" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Emergency Information */}
      <div className="bg-error/5 rounded-xl p-4 border border-error/20">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-error/10">
            <Icon name="AlertTriangle" size={20} className="text-error" />
          </div>
          
          <div className="flex-1">
            <h4 className="font-semibold text-error mb-2">Emergency Numbers</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={14} className="text-muted-foreground" />
                <span className="text-foreground">Police: 100</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={14} className="text-muted-foreground" />
                <span className="text-foreground">Fire: 101</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={14} className="text-muted-foreground" />
                <span className="text-foreground">Ambulance: 102</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={14} className="text-muted-foreground" />
                <span className="text-foreground">Emergency: 108</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;