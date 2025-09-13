import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import { Checkbox } from '../../../components/ui/Checkbox';

const SystemConfigTab = () => {
  const [alertThreshold, setAlertThreshold] = useState('5');
  const [geoFenceRadius, setGeoFenceRadius] = useState('500');
  const [emergencyTimeout, setEmergencyTimeout] = useState('30');
  const [enableSMSAlerts, setEnableSMSAlerts] = useState(true);
  const [enableEmailAlerts, setEnableEmailAlerts] = useState(true);
  const [enablePushNotifications, setEnablePushNotifications] = useState(true);

  const configSections = [
    {
      title: "Alert Configuration",
      icon: "Bell",
      settings: [
        {
          label: "Alert Threshold (minutes)",
          description: "Time before triggering location-based alerts",
          type: "number",
          value: alertThreshold,
          onChange: setAlertThreshold
        },
        {
          label: "Emergency Response Timeout (seconds)",
          description: "Maximum time to wait for emergency response confirmation",
          type: "number",
          value: emergencyTimeout,
          onChange: setEmergencyTimeout
        }
      ]
    },
    {
      title: "Geo-Fence Settings",
      icon: "MapPin",
      settings: [
        {
          label: "Default Geo-Fence Radius (meters)",
          description: "Default radius for new geo-fenced zones",
          type: "number",
          value: geoFenceRadius,
          onChange: setGeoFenceRadius
        }
      ]
    },
    {
      title: "Notification Channels",
      icon: "MessageSquare",
      settings: [
        {
          label: "SMS Alerts",
          description: "Enable SMS notifications for emergency alerts",
          type: "checkbox",
          value: enableSMSAlerts,
          onChange: setEnableSMSAlerts
        },
        {
          label: "Email Alerts",
          description: "Enable email notifications for incident reports",
          type: "checkbox",
          value: enableEmailAlerts,
          onChange: setEnableEmailAlerts
        },
        {
          label: "Push Notifications",
          description: "Enable push notifications for mobile devices",
          type: "checkbox",
          value: enablePushNotifications,
          onChange: setEnablePushNotifications
        }
      ]
    }
  ];

  const integrationServices = [
    {
      name: "Emergency Services API",
      status: "connected",
      lastSync: "2025-01-11 10:15:00",
      description: "Integration with local emergency response services"
    },
    {
      name: "Weather Service API",
      status: "connected",
      lastSync: "2025-01-11 10:00:00",
      description: "Real-time weather data for safety alerts"
    },
    {
      name: "IoT Device Network",
      status: "warning",
      lastSync: "2025-01-11 09:45:00",
      description: "Wearable device and sensor network integration"
    },
    {
      name: "SMS Gateway",
      status: "disconnected",
      lastSync: "2025-01-11 08:30:00",
      description: "SMS notification service provider"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'bg-success/10 text-success border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'disconnected':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'disconnected':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">System Configuration</h3>
          <p className="text-sm text-muted-foreground">Configure platform settings and integrations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" iconName="RotateCcw">
            Reset to Defaults
          </Button>
          <Button variant="default" iconName="Save">
            Save Changes
          </Button>
        </div>
      </div>
      {/* Configuration Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {configSections?.map((section, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={section?.icon} size={20} className="text-primary" />
              </div>
              <h4 className="text-lg font-medium text-foreground">{section?.title}</h4>
            </div>
            
            <div className="space-y-4">
              {section?.settings?.map((setting, settingIndex) => (
                <div key={settingIndex}>
                  {setting?.type === 'checkbox' ? (
                    <Checkbox
                      label={setting?.label}
                      description={setting?.description}
                      checked={setting?.value}
                      onChange={(e) => setting?.onChange(e?.target?.checked)}
                    />
                  ) : (
                    <Input
                      label={setting?.label}
                      description={setting?.description}
                      type={setting?.type}
                      value={setting?.value}
                      onChange={(e) => setting?.onChange(e?.target?.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Integration Services */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-accent" />
          </div>
          <div>
            <h4 className="text-lg font-medium text-foreground">Integration Services</h4>
            <p className="text-sm text-muted-foreground">External service connections and API integrations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrationServices?.map((service, index) => (
            <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-micro">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon name={getStatusIcon(service?.status)} size={20} className={
                    service?.status === 'connected' ? 'text-success' :
                    service?.status === 'warning' ? 'text-warning' : 'text-error'
                  } />
                  <div>
                    <h5 className="font-medium text-foreground">{service?.name}</h5>
                    <p className="text-xs text-muted-foreground">{service?.description}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(service?.status)}`}>
                  {service?.status?.charAt(0)?.toUpperCase() + service?.status?.slice(1)}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Last sync: {new Date(service.lastSync)?.toLocaleString('en-IN')}</span>
                <Button variant="ghost" size="sm" iconName="Settings" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* System Health */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={20} className="text-success" />
          </div>
          <div>
            <h4 className="text-lg font-medium text-foreground">System Health</h4>
            <p className="text-sm text-muted-foreground">Real-time system performance metrics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
            <div className="text-2xl font-bold text-success mb-1">99.8%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
          <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="text-2xl font-bold text-primary mb-1">1,247</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center p-4 bg-warning/5 rounded-lg border border-warning/20">
            <div className="text-2xl font-bold text-warning mb-1">45ms</div>
            <div className="text-sm text-muted-foreground">Response Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemConfigTab;