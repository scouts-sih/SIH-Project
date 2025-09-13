import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const DataAnalyticsTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('tourists');

  const periodOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const metricOptions = [
    { value: 'tourists', label: 'Tourist Activity' },
    { value: 'incidents', label: 'Incident Reports' },
    { value: 'safety', label: 'Safety Scores' },
    { value: 'alerts', label: 'Alert Activity' }
  ];

  const touristData = [
    { name: 'Mon', registrations: 45, active: 120, incidents: 2 },
    { name: 'Tue', registrations: 52, active: 135, incidents: 1 },
    { name: 'Wed', registrations: 38, active: 98, incidents: 3 },
    { name: 'Thu', registrations: 61, active: 142, incidents: 0 },
    { name: 'Fri', registrations: 73, active: 168, incidents: 2 },
    { name: 'Sat', registrations: 89, active: 201, incidents: 4 },
    { name: 'Sun', registrations: 67, active: 156, incidents: 1 }
  ];

  const safetyScoreData = [
    { name: 'Jan', score: 8.5 },
    { name: 'Feb', score: 8.2 },
    { name: 'Mar', score: 8.7 },
    { name: 'Apr', score: 8.9 },
    { name: 'May', score: 8.4 },
    { name: 'Jun', score: 8.6 },
    { name: 'Jul', score: 8.8 }
  ];

  const demographicData = [
    { name: 'Domestic', value: 65, color: '#1E40AF' },
    { name: 'International', value: 25, color: '#0EA5E9' },
    { name: 'Business', value: 10, color: '#64748B' }
  ];

  const incidentTypeData = [
    { name: 'Medical Emergency', value: 35, color: '#DC2626' },
    { name: 'Lost Tourist', value: 28, color: '#D97706' },
    { name: 'Safety Alert', value: 22, color: '#059669' },
    { name: 'Other', value: 15, color: '#64748B' }
  ];

  const keyMetrics = [
    {
      title: "Total Tourists",
      value: "12,847",
      change: "+8.2%",
      trend: "up",
      icon: "Users",
      color: "text-primary"
    },
    {
      title: "Active Incidents",
      value: "23",
      change: "-12.5%",
      trend: "down",
      icon: "AlertTriangle",
      color: "text-warning"
    },
    {
      title: "Safety Score",
      value: "8.6/10",
      change: "+0.3",
      trend: "up",
      icon: "Shield",
      color: "text-success"
    },
    {
      title: "Response Time",
      value: "4.2 min",
      change: "-0.8 min",
      trend: "down",
      icon: "Clock",
      color: "text-accent"
    }
  ];

  const systemUsageStats = [
    { feature: "Tourist Registration", usage: 89, trend: "up" },
    { feature: "Location Tracking", usage: 76, trend: "up" },
    { feature: "Emergency Alerts", usage: 45, trend: "down" },
    { feature: "Incident Reporting", usage: 67, trend: "up" },
    { feature: "Geo-fence Monitoring", usage: 82, trend: "up" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Data Analytics</h3>
          <p className="text-sm text-muted-foreground">Comprehensive system analytics and reporting</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            className="w-40"
          />
          <Button variant="outline" iconName="Download">
            Export Report
          </Button>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics?.map((metric, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                metric?.color === 'text-primary' ? 'bg-primary/10' :
                metric?.color === 'text-warning' ? 'bg-warning/10' :
                metric?.color === 'text-success'? 'bg-success/10' : 'bg-accent/10'
              }`}>
                <Icon name={metric?.icon} size={20} className={metric?.color} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                metric?.trend === 'up' ? 'text-success' : 'text-error'
              }`}>
                <Icon name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
                <span>{metric?.change}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{metric?.value}</div>
            <div className="text-sm text-muted-foreground">{metric?.title}</div>
          </div>
        ))}
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tourist Activity Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-medium text-foreground">Tourist Activity</h4>
            <Select
              options={metricOptions}
              value={selectedMetric}
              onChange={setSelectedMetric}
              className="w-40"
            />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={touristData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="registrations" fill="var(--color-primary)" />
                <Bar dataKey="active" fill="var(--color-accent)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Safety Score Trend */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="text-lg font-medium text-foreground mb-6">Safety Score Trend</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={safetyScoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis domain={[7, 10]} stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="var(--color-success)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tourist Demographics */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="text-lg font-medium text-foreground mb-6">Tourist Demographics</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {demographicData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Incident Types */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="text-lg font-medium text-foreground mb-6">Incident Types</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incidentTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {incidentTypeData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* System Usage Statistics */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-lg font-medium text-foreground mb-6">System Usage Statistics</h4>
        <div className="space-y-4">
          {systemUsageStats?.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="font-medium text-foreground">{stat?.feature}</span>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat?.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  <Icon name={stat?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${stat?.usage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-foreground w-12 text-right">{stat?.usage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataAnalyticsTab;