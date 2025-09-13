import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TouristProfileModal = ({ tourist, isOpen, onClose, onAction }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !tourist) return null;

  const locationHistory = [
    {
      id: 1,
      location: "India Gate, New Delhi",
      timestamp: new Date(Date.now() - 1800000),
      safetyScore: 85,
      duration: "45 minutes"
    },
    {
      id: 2,
      location: "Red Fort, New Delhi",
      timestamp: new Date(Date.now() - 7200000),
      safetyScore: 78,
      duration: "2 hours"
    },
    {
      id: 3,
      location: "Chandni Chowk Market",
      timestamp: new Date(Date.now() - 14400000),
      safetyScore: 65,
      duration: "1.5 hours"
    }
  ];

  const emergencyContacts = [
    {
      id: 1,
      name: "John Smith",
      relationship: "Spouse",
      phone: "+91 98765 43210",
      email: "john.smith@email.com",
      isPrimary: true
    },
    {
      id: 2,
      name: "Mary Smith",
      relationship: "Daughter",
      phone: "+91 87654 32109",
      email: "mary.smith@email.com",
      isPrimary: false
    }
  ];

  const itinerary = [
    {
      id: 1,
      date: "2025-01-11",
      location: "Taj Mahal, Agra",
      time: "09:00 AM",
      status: "upcoming",
      notes: "Guided tour booked"
    },
    {
      id: 2,
      date: "2025-01-11",
      location: "Agra Fort",
      time: "02:00 PM",
      status: "upcoming",
      notes: "Self-guided visit"
    },
    {
      id: 3,
      date: "2025-01-12",
      location: "Fatehpur Sikri",
      time: "10:00 AM",
      status: "upcoming",
      notes: "Day trip from Agra"
    }
  ];

  const formatTimestamp = (date) => {
    return date?.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      case 'missing': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSafetyScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'location', label: 'Location History', icon: 'MapPin' },
    { id: 'contacts', label: 'Emergency Contacts', icon: 'Phone' },
    { id: 'itinerary', label: 'Itinerary', icon: 'Calendar' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-400 p-4">
      <div className="bg-card rounded-lg shadow-elevated-hover max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={32} color="var(--color-primary)" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{tourist?.name}</h2>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-sm text-muted-foreground">ID: {tourist?.digitalId}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tourist?.status)}`}>
                    {tourist?.status?.charAt(0)?.toUpperCase() + tourist?.status?.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => onAction('message', tourist?.id)}
              >
                <Icon name="MessageSquare" size={16} />
                <span>Message</span>
              </Button>
              <Button
                variant="destructive"
                onClick={() => onAction('emergency', tourist?.id)}
              >
                <Icon name="AlertTriangle" size={16} />
                <span>Emergency</span>
              </Button>
              <Button variant="ghost" onClick={onClose}>
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-0">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                      <div className="text-foreground">{tourist?.name}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nationality</label>
                      <div className="text-foreground">{tourist?.nationality}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Document Type</label>
                      <div className="text-foreground">{tourist?.documentType}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Document Number</label>
                      <div className="text-foreground">{tourist?.documentNumber}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Current Status</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Current Location</label>
                      <div className="flex items-center space-x-2">
                        <Icon name="MapPin" size={16} className="text-muted-foreground" />
                        <span className="text-foreground">{tourist?.currentLocation}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Safety Score</label>
                      <div className="flex items-center space-x-3">
                        <div className={`text-lg font-bold ${getSafetyScoreColor(tourist?.safetyScore)}`}>
                          {tourist?.safetyScore}%
                        </div>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              tourist?.safetyScore >= 80 ? 'bg-green-500' :
                              tourist?.safetyScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${tourist?.safetyScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Last Check-in</label>
                      <div className="text-foreground">{formatTimestamp(new Date(tourist.lastCheckIn))}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Registration Date</label>
                      <div className="text-foreground">{formatTimestamp(new Date(tourist.registrationDate))}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Digital ID Information */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-3">Digital ID Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Digital ID</label>
                    <div className="text-foreground font-mono">{tourist?.digitalId}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Blockchain Hash</label>
                    <div className="text-foreground font-mono text-xs">{tourist?.blockchainHash}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Verification Status</label>
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-green-600" />
                      <span className="text-green-600">Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'location' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Location History</h3>
              <div className="space-y-3">
                {locationHistory?.map((location) => (
                  <div key={location?.id} className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name="MapPin" size={16} className="text-primary" />
                          <span className="font-medium text-foreground">{location?.location}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {formatTimestamp(location?.timestamp)} • Duration: {location?.duration}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">Safety Score:</span>
                          <span className={`text-sm font-medium ${getSafetyScoreColor(location?.safetyScore)}`}>
                            {location?.safetyScore}%
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Icon name="ExternalLink" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Emergency Contacts</h3>
              <div className="space-y-3">
                {emergencyContacts?.map((contact) => (
                  <div key={contact?.id} className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-foreground">{contact?.name}</span>
                          {contact?.isPrimary && (
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                              Primary
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">
                          {contact?.relationship}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm">
                            <Icon name="Phone" size={14} className="text-muted-foreground" />
                            <span>{contact?.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Icon name="Mail" size={14} className="text-muted-foreground" />
                            <span>{contact?.email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Icon name="Phone" size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="MessageSquare" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Travel Itinerary</h3>
              <div className="space-y-3">
                {itinerary?.map((item) => (
                  <div key={item?.id} className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name="Calendar" size={16} className="text-primary" />
                          <span className="font-medium text-foreground">{item?.location}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {item?.date} at {item?.time}
                        </div>
                        {item?.notes && (
                          <div className="text-sm text-muted-foreground">
                            {item?.notes}
                          </div>
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item?.status === 'completed' ? 'bg-green-100 text-green-800' :
                        item?.status === 'current'? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TouristProfileModal;