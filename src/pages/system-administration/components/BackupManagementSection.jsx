import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BackupManagementSection = () => {
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [retentionPeriod, setRetentionPeriod] = useState('30');

  const backupHistory = [
    {
      id: 1,
      timestamp: "2025-01-11 02:00:00",
      type: "Full Backup",
      size: "2.4 GB",
      status: "completed",
      duration: "45 minutes",
      location: "Primary Storage"
    },
    {
      id: 2,
      timestamp: "2025-01-10 02:00:00",
      type: "Incremental Backup",
      size: "156 MB",
      status: "completed",
      duration: "8 minutes",
      location: "Primary Storage"
    },
    {
      id: 3,
      timestamp: "2025-01-09 02:00:00",
      type: "Full Backup",
      size: "2.3 GB",
      status: "completed",
      duration: "42 minutes",
      location: "Primary Storage"
    },
    {
      id: 4,
      timestamp: "2025-01-08 02:00:00",
      type: "Incremental Backup",
      size: "203 MB",
      status: "failed",
      duration: "N/A",
      location: "Primary Storage",
      error: "Network timeout during backup process"
    },
    {
      id: 5,
      timestamp: "2025-01-07 02:00:00",
      type: "Full Backup",
      size: "2.2 GB",
      status: "completed",
      duration: "38 minutes",
      location: "Primary Storage"
    }
  ];

  const frequencyOptions = [
    { value: 'hourly', label: 'Every Hour' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const retentionOptions = [
    { value: '7', label: '7 Days' },
    { value: '30', label: '30 Days' },
    { value: '90', label: '90 Days' },
    { value: '365', label: '1 Year' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'running':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'failed':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'running':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="space-y-6">
      {/* Backup Configuration */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Database" size={20} className="text-primary" />
          </div>
          <div>
            <h4 className="text-lg font-medium text-foreground">Backup Configuration</h4>
            <p className="text-sm text-muted-foreground">Configure automated backup settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Enable Automatic Backups"
              description="Automatically create system backups"
              checked={autoBackupEnabled}
              onChange={(e) => setAutoBackupEnabled(e?.target?.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <Select
              label="Backup Frequency"
              description="How often to create backups"
              options={frequencyOptions}
              value={backupFrequency}
              onChange={setBackupFrequency}
              disabled={!autoBackupEnabled}
            />
          </div>
          
          <div className="space-y-4">
            <Select
              label="Retention Period"
              description="How long to keep backups"
              options={retentionOptions}
              value={retentionPeriod}
              onChange={setRetentionPeriod}
              disabled={!autoBackupEnabled}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Next backup scheduled: {new Date(Date.now() + 24 * 60 * 60 * 1000)?.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" iconName="Play">
              Run Backup Now
            </Button>
            <Button variant="default" iconName="Save">
              Save Settings
            </Button>
          </div>
        </div>
      </div>
      {/* Storage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="HardDrive" size={24} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">15.2 GB</div>
          <div className="text-sm text-muted-foreground">Total Backup Size</div>
        </div>
        
        <div className="bg-card rounded-lg border border-border p-6 text-center">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">47</div>
          <div className="text-sm text-muted-foreground">Successful Backups</div>
        </div>
        
        <div className="bg-card rounded-lg border border-border p-6 text-center">
          <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="Clock" size={24} className="text-warning" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">38 min</div>
          <div className="text-sm text-muted-foreground">Avg Backup Time</div>
        </div>
      </div>
      {/* Backup History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-lg font-medium text-foreground">Backup History</h4>
            <p className="text-sm text-muted-foreground">Recent backup operations and status</p>
          </div>
          <Button variant="outline" iconName="RefreshCw">
            Refresh
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Date & Time</th>
                <th className="text-left p-4 font-medium text-foreground">Type</th>
                <th className="text-left p-4 font-medium text-foreground">Size</th>
                <th className="text-left p-4 font-medium text-foreground">Duration</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {backupHistory?.map((backup) => (
                <tr key={backup?.id} className="border-b border-border hover:bg-muted/30 transition-micro">
                  <td className="p-4">
                    <div className="text-sm text-foreground">
                      {new Date(backup.timestamp)?.toLocaleDateString('en-IN')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(backup.timestamp)?.toLocaleTimeString('en-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name={backup?.type === 'Full Backup' ? 'Database' : 'FileText'} size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{backup?.type}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium text-foreground">{backup?.size}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{backup?.duration}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name={getStatusIcon(backup?.status)} size={16} className={
                        backup?.status === 'completed' ? 'text-success' :
                        backup?.status === 'running'? 'text-primary' : 'text-error'
                      } />
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(backup?.status)}`}>
                        {backup?.status?.charAt(0)?.toUpperCase() + backup?.status?.slice(1)}
                      </span>
                    </div>
                    {backup?.error && (
                      <div className="text-xs text-error mt-1" title={backup?.error}>
                        Error occurred
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {backup?.status === 'completed' && (
                        <>
                          <Button variant="ghost" size="sm" iconName="Download" />
                          <Button variant="ghost" size="sm" iconName="RotateCcw" />
                        </>
                      )}
                      <Button variant="ghost" size="sm" iconName="Info" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Recovery Options */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="RotateCcw" size={20} className="text-warning" />
          </div>
          <div>
            <h4 className="text-lg font-medium text-foreground">Data Recovery</h4>
            <p className="text-sm text-muted-foreground">Restore system data from backups</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h5 className="font-medium text-foreground">Quick Recovery Options</h5>
            <div className="space-y-2">
              <Button variant="outline" fullWidth iconName="Database">
                Restore Latest Full Backup
              </Button>
              <Button variant="outline" fullWidth iconName="FileText">
                Restore User Data Only
              </Button>
              <Button variant="outline" fullWidth iconName="Settings">
                Restore System Configuration
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h5 className="font-medium text-foreground">Advanced Recovery</h5>
            <div className="space-y-2">
              <Button variant="outline" fullWidth iconName="Calendar">
                Point-in-Time Recovery
              </Button>
              <Button variant="outline" fullWidth iconName="Upload">
                Upload Custom Backup
              </Button>
              <Button variant="outline" fullWidth iconName="TestTube">
                Test Recovery Process
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupManagementSection;