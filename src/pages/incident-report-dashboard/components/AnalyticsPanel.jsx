import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsPanel = ({ analyticsData }) => {
  const COLORS = ['#3B82F6', '#EF4444', '#F59E0B', '#10B981', '#8B5CF6'];

  const incidentTrendData = [
    { month: 'Jan', incidents: 45, resolved: 42 },
    { month: 'Feb', incidents: 52, resolved: 48 },
    { month: 'Mar', incidents: 38, resolved: 35 },
    { month: 'Apr', incidents: 61, resolved: 55 },
    { month: 'May', incidents: 73, resolved: 68 },
    { month: 'Jun', incidents: 58, resolved: 52 }
  ];

  const incidentTypeData = [
    { name: 'Missing Person', value: 35, color: '#EF4444' },
    { name: 'Medical Emergency', value: 28, color: '#F59E0B' },
    { name: 'Theft', value: 20, color: '#3B82F6' },
    { name: 'Accident', value: 12, color: '#10B981' },
    { name: 'Other', value: 5, color: '#8B5CF6' }
  ];

  const responseTimeData = [
    { time: '0-5 min', count: 45 },
    { time: '5-15 min', count: 78 },
    { time: '15-30 min', count: 32 },
    { time: '30+ min', count: 15 }
  ];

  const hotspotData = [
    { location: 'Baga Beach, Goa', incidents: 23, risk: 'High' },
    { location: 'Manali, Himachal', incidents: 18, risk: 'Medium' },
    { location: 'Rishikesh, Uttarakhand', incidents: 15, risk: 'Medium' },
    { location: 'Jaipur, Rajasthan', incidents: 12, risk: 'Low' },
    { location: 'Munnar, Kerala', incidents: 8, risk: 'Low' }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Analytics & Insights</h3>
        <div className="flex items-center space-x-2">
          <select className="text-sm border border-border rounded-md px-3 py-1 bg-card text-foreground">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incident Trends */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-medium text-foreground">Incident Trends</h4>
            <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={incidentTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px'
                  }} 
                />
                <Line type="monotone" dataKey="incidents" stroke="#3B82F6" strokeWidth={2} name="Reported" />
                <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Incident Types */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-medium text-foreground">Incident Types</h4>
            <Icon name="PieChart" size={20} className="text-muted-foreground" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incidentTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {incidentTypeData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {incidentTypeData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item?.color }}></div>
                <span className="text-xs text-muted-foreground">{item?.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Response Time Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-medium text-foreground">Response Time Distribution</h4>
            <Icon name="Clock" size={20} className="text-muted-foreground" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px'
                  }} 
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Incident Hotspots */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-medium text-foreground">Incident Hotspots</h4>
            <Icon name="MapPin" size={20} className="text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {hotspotData?.map((hotspot, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{hotspot?.location}</p>
                  <p className="text-xs text-muted-foreground">{hotspot?.incidents} incidents</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(hotspot?.risk)}`}>
                  {hotspot?.risk}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Performance Metrics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-base font-medium text-foreground mb-4">Performance Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <div className="text-sm text-muted-foreground">Resolution Rate</div>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">12.5 min</div>
            <div className="text-sm text-muted-foreground">Avg Response Time</div>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">4.8/5</div>
            <div className="text-sm text-muted-foreground">Satisfaction Score</div>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">87%</div>
            <div className="text-sm text-muted-foreground">First Call Resolution</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;