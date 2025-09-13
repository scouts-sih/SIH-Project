import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AuditLogsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');

  const auditLogs = [
    {
      id: 1,
      timestamp: "2025-01-11 10:25:15",
      user: "Anita Patel",
      action: "User Account Created",
      target: "mohammed.ali@tourism.gov.in",
      severity: "info",
      ipAddress: "192.168.1.45",
      details: "New entry point officer account created for Airport Authority",
      status: "success"
    },
    {
      id: 2,
      timestamp: "2025-01-11 10:20:32",
      user: "Rajesh Kumar",
      action: "Geo-fence Modified",
      target: "Red Fort Zone",
      severity: "warning",
      ipAddress: "192.168.1.23",
      details: "Geo-fence radius changed from 300m to 500m",
      status: "success"
    },
    {
      id: 3,
      timestamp: "2025-01-11 10:15:08",
      user: "System",
      action: "Emergency Alert Triggered",
      target: "Tourist ID: TG-2025-001234",
      severity: "critical",
      ipAddress: "System",
      details: "SOS button activated by tourist in restricted zone",
      status: "resolved"
    },
    {
      id: 4,
      timestamp: "2025-01-11 10:10:45",
      user: "Priya Sharma",
      action: "Incident Report Generated",
      target: "INC-2025-0156",
      severity: "high",
      ipAddress: "192.168.1.67",
      details: "Missing person report filed for tourist group",
      status: "pending"
    },
    {
      id: 5,
      timestamp: "2025-01-11 10:05:22",
      user: "Anita Patel",
      action: "System Configuration Updated",
      target: "Alert Threshold Settings",
      severity: "medium",
      ipAddress: "192.168.1.45",
      details: "Emergency response timeout changed to 30 seconds",
      status: "success"
    },
    {
      id: 6,
      timestamp: "2025-01-11 09:58:17",
      user: "Mohammed Ali",
      action: "Tourist Registration",
      target: "Tourist ID: TG-2025-001235",
      severity: "info",
      ipAddress: "192.168.1.89",
      details: "New tourist registered at Delhi Airport",
      status: "success"
    },
    {
      id: 7,
      timestamp: "2025-01-11 09:45:33",
      user: "System",
      action: "Failed Login Attempt",
      target: "admin@tourism.gov.in",
      severity: "warning",
      ipAddress: "203.45.67.89",
      details: "Multiple failed login attempts detected",
      status: "blocked"
    },
    {
      id: 8,
      timestamp: "2025-01-11 09:30:12",
      user: "Suresh Reddy",
      action: "Data Export",
      target: "Tourist Records",
      severity: "medium",
      ipAddress: "192.168.1.34",
      details: "Exported 500 tourist records for monthly report",
      status: "success"
    }
  ];

  const actionOptions = [
    { value: '', label: 'All Actions' },
    { value: 'User Account Created', label: 'User Account Created' },
    { value: 'Geo-fence Modified', label: 'Geo-fence Modified' },
    { value: 'Emergency Alert Triggered', label: 'Emergency Alert Triggered' },
    { value: 'Incident Report Generated', label: 'Incident Report Generated' },
    { value: 'System Configuration Updated', label: 'System Configuration Updated' },
    { value: 'Tourist Registration', label: 'Tourist Registration' },
    { value: 'Failed Login Attempt', label: 'Failed Login Attempt' },
    { value: 'Data Export', label: 'Data Export' }
  ];

  const userOptions = [
    { value: '', label: 'All Users' },
    { value: 'Anita Patel', label: 'Anita Patel' },
    { value: 'Rajesh Kumar', label: 'Rajesh Kumar' },
    { value: 'Priya Sharma', label: 'Priya Sharma' },
    { value: 'Mohammed Ali', label: 'Mohammed Ali' },
    { value: 'Suresh Reddy', label: 'Suresh Reddy' },
    { value: 'System', label: 'System' }
  ];

  const severityOptions = [
    { value: '', label: 'All Severities' },
    { value: 'info', label: 'Info' },
    { value: 'medium', label: 'Medium' },
    { value: 'warning', label: 'Warning' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'info':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'medium':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'high':
        return 'bg-error/10 text-error border-error/20';
      case 'critical':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'resolved':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'blocked':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'info':
        return 'Info';
      case 'medium':
        return 'AlertCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'high':
        return 'AlertOctagon';
      case 'critical':
        return 'ShieldAlert';
      default:
        return 'Circle';
    }
  };

  const filteredLogs = auditLogs?.filter(log => {
    const matchesSearch = log?.action?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         log?.target?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         log?.details?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesAction = !selectedAction || log?.action === selectedAction;
    const matchesUser = !selectedUser || log?.user === selectedUser;
    const matchesSeverity = !selectedSeverity || log?.severity === selectedSeverity;
    return matchesSearch && matchesAction && matchesUser && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Audit Logs</h3>
          <p className="text-sm text-muted-foreground">Complete activity tracking and security monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" iconName="Filter">
            Advanced Filters
          </Button>
          <Button variant="outline" iconName="Download">
            Export Logs
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
        <Input
          type="search"
          placeholder="Search logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
        />
        <Select
          placeholder="Filter by action"
          options={actionOptions}
          value={selectedAction}
          onChange={setSelectedAction}
        />
        <Select
          placeholder="Filter by user"
          options={userOptions}
          value={selectedUser}
          onChange={setSelectedUser}
        />
        <Select
          placeholder="Filter by severity"
          options={severityOptions}
          value={selectedSeverity}
          onChange={setSelectedSeverity}
        />
      </div>
      {/* Audit Logs Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Timestamp</th>
                <th className="text-left p-4 font-medium text-foreground">User</th>
                <th className="text-left p-4 font-medium text-foreground">Action</th>
                <th className="text-left p-4 font-medium text-foreground">Target</th>
                <th className="text-left p-4 font-medium text-foreground">Severity</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs?.map((log) => (
                <tr key={log?.id} className="border-b border-border hover:bg-muted/30 transition-micro">
                  <td className="p-4">
                    <div className="text-sm text-foreground">
                      {new Date(log.timestamp)?.toLocaleDateString('en-IN')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(log.timestamp)?.toLocaleTimeString('en-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name={log?.user === 'System' ? 'Server' : 'User'} size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">{log?.user}</div>
                        <div className="text-xs text-muted-foreground">{log?.ipAddress}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-foreground text-sm">{log?.action}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                      {log?.target}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name={getSeverityIcon(log?.severity)} size={16} className={
                        log?.severity === 'info' ? 'text-primary' :
                        log?.severity === 'medium' ? 'text-accent' :
                        log?.severity === 'warning' ? 'text-warning' :
                        log?.severity === 'high'? 'text-error' : 'text-destructive'
                      } />
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(log?.severity)}`}>
                        {log?.severity?.charAt(0)?.toUpperCase() + log?.severity?.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(log?.status)}`}>
                      {log?.status?.charAt(0)?.toUpperCase() + log?.status?.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-muted-foreground max-w-xs truncate" title={log?.details}>
                      {log?.details}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Summary */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="text-sm text-muted-foreground">
          Showing {filteredLogs?.length} of {auditLogs?.length} audit logs
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Success: {auditLogs?.filter(log => log?.status === 'success')?.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">Pending: {auditLogs?.filter(log => log?.status === 'pending')?.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-muted-foreground">Issues: {auditLogs?.filter(log => log?.status === 'blocked')?.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogsTab;