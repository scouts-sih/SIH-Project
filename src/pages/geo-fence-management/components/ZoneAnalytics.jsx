import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ZoneAnalytics = ({ zones }) => {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('violations');

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const metricOptions = [
    { value: 'violations', label: 'Zone Violations' },
    { value: 'tourists', label: 'Tourist Count' },
    { value: 'alerts', label: 'Alert Frequency' },
    { value: 'response', label: 'Response Time' }
  ];

  // Mock analytics data
  const violationData = zones?.map(zone => ({
    name: zone?.name?.length > 10 ? zone?.name?.substring(0, 10) + '...' : zone?.name,
    violations: Math.floor(Math.random() * 50) + 5,
    tourists: zone?.touristCount,
    alerts: Math.floor(Math.random() * 20) + 2,
    responseTime: Math.floor(Math.random() * 300) + 60
  }));

  const riskDistribution = [
    { name: 'High Risk', value: zones?.filter(z => z?.riskLevel === 'high')?.length, color: '#DC2626' },
    { name: 'Moderate Risk', value: zones?.filter(z => z?.riskLevel === 'moderate')?.length, color: '#D97706' },
    { name: 'Low Risk', value: zones?.filter(z => z?.riskLevel === 'low')?.length, color: '#059669' }
  ];

  const trendData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    violations: Math.floor(Math.random() * 30) + 5,
    alerts: Math.floor(Math.random() * 15) + 2,
    tourists: Math.floor(Math.random() * 100) + 20
  }));

  const totalViolations = violationData?.reduce((sum, item) => sum + item?.violations, 0);
  const totalAlerts = violationData?.reduce((sum, item) => sum + item?.alerts, 0);
  const avgResponseTime = Math.round(violationData?.reduce((sum, item) => sum + item?.responseTime, 0) / violationData?.length);
  const activeZones = zones?.filter(z => z?.isActive)?.length;

  const formatTooltipValue = (value, name) => {
    if (name === 'responseTime') return [`${value}s`, 'Response Time'];
    return [value, name?.charAt(0)?.toUpperCase() + name?.slice(1)];
  };

  return (
    <div className="bg-card rounded-lg shadow-elevated p-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Zone Analytics</h3>
        <div className="flex space-x-2">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
          />
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} />
            <span>Export</span>
          </Button>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-error" />
            <span className="text-sm font-medium text-muted-foreground">Total Violations</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{totalViolations}</div>
          <div className="text-xs text-success">↓ 12% from last period</div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Bell" size={16} className="text-warning" />
            <span className="text-sm font-medium text-muted-foreground">Total Alerts</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{totalAlerts}</div>
          <div className="text-xs text-error">↑ 8% from last period</div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Avg Response</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{avgResponseTime}s</div>
          <div className="text-xs text-success">↓ 15% from last period</div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm font-medium text-muted-foreground">Active Zones</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{activeZones}</div>
          <div className="text-xs text-muted-foreground">of {zones?.length} total</div>
        </div>
      </div>
      {/* Charts Section */}
      <div className="space-y-6">
        {/* Zone Performance Chart */}
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-foreground">Zone Performance</h4>
            <Select
              options={metricOptions}
              value={selectedMetric}
              onChange={setSelectedMetric}
            />
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={violationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                  formatter={formatTooltipValue}
                />
                <Bar 
                  dataKey={selectedMetric} 
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Distribution */}
          <div className="bg-muted/20 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-4">Risk Level Distribution</h4>
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskDistribution?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-2">
              {riskDistribution?.map((item, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item?.color }}
                  />
                  <span className="text-xs text-muted-foreground">{item?.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trend Analysis */}
          <div className="bg-muted/20 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-4">24-Hour Trend</h4>
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="hour" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={10}
                  />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={10} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="violations" 
                    stroke="var(--color-error)" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="alerts" 
                    stroke="var(--color-warning)" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Zone Status Table */}
        <div className="bg-muted/20 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-4">Zone Status Overview</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-medium text-muted-foreground">Zone</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">Risk</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-2 font-medium text-muted-foreground">Tourists</th>
                  <th className="text-right py-2 font-medium text-muted-foreground">Violations</th>
                  <th className="text-right py-2 font-medium text-muted-foreground">Last Alert</th>
                </tr>
              </thead>
              <tbody>
                {zones?.slice(0, 5)?.map((zone, index) => (
                  <tr key={zone?.id} className="border-b border-border/50">
                    <td className="py-2 font-medium text-foreground">{zone?.name}</td>
                    <td className="py-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        zone?.riskLevel === 'high' ? 'bg-error/10 text-error' :
                        zone?.riskLevel === 'moderate'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                      }`}>
                        {zone?.riskLevel}
                      </span>
                    </td>
                    <td className="py-2">
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${
                          zone?.isActive ? 'bg-success' : 'bg-muted-foreground'
                        }`} />
                        <span className="text-muted-foreground">
                          {zone?.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 text-right text-foreground">{zone?.touristCount}</td>
                    <td className="py-2 text-right text-foreground">
                      {violationData?.[index]?.violations || 0}
                    </td>
                    <td className="py-2 text-right text-muted-foreground">
                      {Math.floor(Math.random() * 60)} min ago
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoneAnalytics;