import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StatisticsPanel = ({ tourists, onFilterChange }) => {
  const [timeRange, setTimeRange] = useState('24h');
  const [refreshing, setRefreshing] = useState(false);

  // Calculate statistics
  const stats = {
    total: tourists?.length,
    active: tourists?.filter(t => t?.status === 'active')?.length,
    emergency: tourists?.filter(t => t?.status === 'emergency')?.length,
    missing: tourists?.filter(t => t?.status === 'missing')?.length,
    highRisk: tourists?.filter(t => t?.safetyScore < 60)?.length,
    avgSafetyScore: Math.round(tourists?.reduce((sum, t) => sum + t?.safetyScore, 0) / tourists?.length || 0)
  };

  const recentAlerts = [
    {
      id: 1,
      type: 'geo-fence',
      message: "Tourist entered restricted zone",
      tourist: "Sarah Johnson",
      time: new Date(Date.now() - 300000),
      severity: 'high'
    },
    {
      id: 2,
      type: 'safety-score',
      message: "Safety score dropped below threshold",
      tourist: "Raj Patel",
      time: new Date(Date.now() - 600000),
      severity: 'medium'
    },
    {
      id: 3,
      type: 'check-in',
      message: "Missed scheduled check-in",
      tourist: "Emma Wilson",
      time: new Date(Date.now() - 900000),
      severity: 'low'
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'geo-fence': return 'MapPin';
      case 'safety-score': return 'Shield';
      case 'check-in': return 'Clock';
      default: return 'AlertTriangle';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return `${Math.floor(diffMinutes / 1440)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="bg-card rounded-lg border border-border shadow-elevated p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Tourist Overview</h3>
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e?.target?.value)}
              className="text-sm border border-border rounded px-2 py-1 bg-background"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <Icon name="RefreshCw" size={16} className={refreshing ? 'animate-spin' : ''} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Total</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{stats?.total}</div>
          </div>

          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="CheckCircle" size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-800">Active</span>
            </div>
            <div className="text-2xl font-bold text-green-800">{stats?.active}</div>
          </div>

          <div className="bg-red-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="AlertTriangle" size={16} className="text-red-600" />
              <span className="text-sm font-medium text-red-800">Emergency</span>
            </div>
            <div className="text-2xl font-bold text-red-800">{stats?.emergency}</div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Shield" size={16} className="text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">High Risk</span>
            </div>
            <div className="text-2xl font-bold text-yellow-800">{stats?.highRisk}</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Average Safety Score</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    stats?.avgSafetyScore >= 80 ? 'bg-green-500' :
                    stats?.avgSafetyScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${stats?.avgSafetyScore}%` }}
                />
              </div>
              <span className="text-sm font-medium">{stats?.avgSafetyScore}%</span>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Filters */}
      <div className="bg-card rounded-lg border border-border shadow-elevated p-4">
        <h3 className="text-lg font-semibold text-foreground mb-3">Quick Filters</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            fullWidth
            onClick={() => onFilterChange({ status: 'emergency' })}
            className="justify-start"
          >
            <Icon name="AlertTriangle" size={16} className="text-red-600" />
            <span>Emergency Cases ({stats?.emergency})</span>
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={() => onFilterChange({ safetyScore: 60 })}
            className="justify-start"
          >
            <Icon name="Shield" size={16} className="text-yellow-600" />
            <span>High Risk Tourists ({stats?.highRisk})</span>
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={() => onFilterChange({ status: 'missing' })}
            className="justify-start"
          >
            <Icon name="Search" size={16} className="text-red-600" />
            <span>Missing Persons ({stats?.missing})</span>
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={() => onFilterChange({})}
            className="justify-start"
          >
            <Icon name="Users" size={16} className="text-primary" />
            <span>All Tourists ({stats?.total})</span>
          </Button>
        </div>
      </div>
      {/* Recent Alerts */}
      <div className="bg-card rounded-lg border border-border shadow-elevated p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">Recent Alerts</h3>
          <Button variant="ghost" size="sm">
            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>

        <div className="space-y-3">
          {recentAlerts?.map((alert) => (
            <div key={alert?.id} className={`p-3 rounded-lg border ${getAlertColor(alert?.severity)}`}>
              <div className="flex items-start space-x-3">
                <Icon name={getAlertIcon(alert?.type)} size={16} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{alert?.message}</div>
                  <div className="text-xs opacity-75 mt-1">
                    {alert?.tourist} • {formatTime(alert?.time)}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="ChevronRight" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-border">
          <Button variant="outline" fullWidth size="sm">
            <Icon name="Bell" size={16} />
            <span>View All Alerts</span>
          </Button>
        </div>
      </div>
      {/* System Status */}
      <div className="bg-card rounded-lg border border-border shadow-elevated p-4">
        <h3 className="text-lg font-semibold text-foreground mb-3">System Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">GPS Tracking</span>
            </div>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Alert System</span>
            </div>
            <span className="text-xs text-muted-foreground">Active</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Database Sync</span>
            </div>
            <span className="text-xs text-muted-foreground">Syncing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;