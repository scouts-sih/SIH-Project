import React from 'react';
import Icon from '../../../components/AppIcon';

const IncidentSummaryCards = ({ summaryData }) => {
  const cards = [
    {
      title: "Total Incidents",
      value: summaryData?.totalIncidents,
      change: "+12%",
      changeType: "increase",
      icon: "AlertTriangle",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      title: "Active Cases",
      value: summaryData?.activeCases,
      change: "-8%",
      changeType: "decrease",
      icon: "Clock",
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600"
    },
    {
      title: "Resolution Rate",
      value: `${summaryData?.resolutionRate}%`,
      change: "+5%",
      changeType: "increase",
      icon: "CheckCircle",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600"
    },
    {
      title: "Avg Response Time",
      value: `${summaryData?.avgResponseTime} min`,
      change: "-15%",
      changeType: "decrease",
      icon: "Timer",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards?.map((card, index) => (
        <div key={index} className={`${card?.color} border rounded-lg p-6 transition-micro hover:shadow-elevated`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg bg-white ${card?.iconColor}`}>
              <Icon name={card?.icon} size={24} />
            </div>
            <div className={`text-sm font-medium ${
              card?.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {card?.change}
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">{card?.value}</h3>
            <p className="text-sm text-muted-foreground">{card?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncidentSummaryCards;