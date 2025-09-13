import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const IncidentDetailModal = ({ incident, isOpen, onClose, onUpdateStatus, onAssignResponder }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !incident) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'tourist', label: 'Tourist Profile', icon: 'User' },
    { id: 'location', label: 'Location History', icon: 'MapPin' },
    { id: 'contacts', label: 'Emergency Contacts', icon: 'Phone' },
    { id: 'response', label: 'Response Team', icon: 'Users' },
    { id: 'evidence', label: 'Evidence', icon: 'Camera' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Incident Type</label>
            <div className="flex items-center space-x-2 mt-1">
              <Icon name={incident?.typeIcon} size={16} className="text-muted-foreground" />
              <span className="text-foreground">{incident?.type}</span>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Severity</label>
            <div className="mt-1">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(incident?.severity)}`}>
                {incident?.severity}
              </span>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Location</label>
            <div className="mt-1">
              <p className="text-foreground">{incident?.location}</p>
              <p className="text-sm text-muted-foreground">{incident?.coordinates}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Reported Date/Time</label>
            <div className="mt-1">
              <p className="text-foreground">{incident?.date} at {incident?.time}</p>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Response Time</label>
            <div className="mt-1">
              <p className="text-foreground">{incident?.responseTime || 'Pending'}</p>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Priority Score</label>
            <div className="mt-1">
              <div className="flex items-center space-x-2">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      incident?.priorityScore >= 80 ? 'bg-red-500' :
                      incident?.priorityScore >= 60 ? 'bg-orange-500' :
                      incident?.priorityScore >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${incident?.priorityScore}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-foreground">{incident?.priorityScore}/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium text-muted-foreground">Description</label>
        <div className="mt-1 p-4 bg-muted/30 rounded-lg">
          <p className="text-foreground">{incident?.description}</p>
        </div>
      </div>
    </div>
  );

  const renderTouristTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Image
          src={incident?.tourist?.avatar}
          alt={incident?.tourist?.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-foreground">{incident?.tourist?.name}</h3>
          <p className="text-muted-foreground">Tourist ID: {incident?.tourist?.id}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Nationality</label>
            <p className="text-foreground mt-1">{incident?.tourist?.nationality}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Age</label>
            <p className="text-foreground mt-1">{incident?.tourist?.age} years</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Contact Number</label>
            <p className="text-foreground mt-1">{incident?.tourist?.phone}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Check-in Date</label>
            <p className="text-foreground mt-1">{incident?.tourist?.checkinDate}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Accommodation</label>
            <p className="text-foreground mt-1">{incident?.tourist?.accommodation}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Travel Group</label>
            <p className="text-foreground mt-1">{incident?.tourist?.groupSize} members</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLocationTab = () => (
    <div className="space-y-6">
      <div className="bg-muted/30 rounded-lg p-4">
        <iframe
          width="100%"
          height="300"
          loading="lazy"
          title="Incident Location"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${incident?.coordinates}&z=14&output=embed`}
          className="rounded-lg"
        />
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Recent Location History</h4>
        <div className="space-y-3">
          {incident?.locationHistory?.map((location, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{location?.place}</p>
                <p className="text-xs text-muted-foreground">{location?.timestamp}</p>
              </div>
              <div className="text-xs text-muted-foreground">{location?.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-400 p-4">
      <div className="bg-card rounded-lg shadow-elevated-hover max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Incident #{incident?.incidentId}</h2>
            <p className="text-sm text-muted-foreground">{incident?.type} - {incident?.location}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 text-sm font-medium transition-micro ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'tourist' && renderTouristTab()}
          {activeTab === 'location' && renderLocationTab()}
          {activeTab === 'contacts' && (
            <div className="text-center py-8">
              <Icon name="Phone" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Emergency contacts information would be displayed here.</p>
            </div>
          )}
          {activeTab === 'response' && (
            <div className="text-center py-8">
              <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Response team coordination details would be displayed here.</p>
            </div>
          )}
          {activeTab === 'evidence' && (
            <div className="text-center py-8">
              <Icon name="Camera" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Evidence and documentation would be displayed here.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={() => onUpdateStatus(incident?.incidentId)}>
              <Icon name="Edit" size={16} />
              Update Status
            </Button>
            <Button variant="outline" size="sm" onClick={() => onAssignResponder(incident?.incidentId)}>
              <Icon name="UserPlus" size={16} />
              Assign Responder
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Icon name="FileText" size={16} />
              Generate E-FIR
            </Button>
            <Button variant="default" size="sm">
              <Icon name="Save" size={16} />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailModal;