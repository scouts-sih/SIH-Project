import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const InteractiveWorldMap = () => {
  const [activeRegion, setActiveRegion] = useState(null);
  const [interventionCount, setInterventionCount] = useState(12847);
  const [liveAlerts, setLiveAlerts] = useState(23);

  const safetyDataPoints = [
    { id: 1, region: 'North America', lat: 45, lng: -100, status: 'safe', incidents: 12, color: 'success' },
    { id: 2, region: 'Europe', lat: 50, lng: 10, status: 'safe', incidents: 8, color: 'success' },
    { id: 3, region: 'Asia Pacific', lat: 35, lng: 100, status: 'moderate', incidents: 34, color: 'warning' },
    { id: 4, region: 'South America', lat: -15, lng: -60, status: 'safe', incidents: 6, color: 'success' },
    { id: 5, region: 'Africa', lat: 0, lng: 20, status: 'moderate', incidents: 18, color: 'warning' },
    { id: 6, region: 'Middle East', lat: 30, lng: 50, status: 'alert', incidents: 45, color: 'error' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setInterventionCount(prev => prev + Math.floor(Math.random() * 3));
      setLiveAlerts(prev => Math.max(15, prev + Math.floor(Math.random() * 5) - 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'safe': return 'text-success';
      case 'moderate': return 'text-warning';
      case 'alert': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'safe': return 'bg-success/10 border-success/20';
      case 'moderate': return 'bg-warning/10 border-warning/20';
      case 'alert': return 'bg-error/10 border-error/20';
      default: return 'bg-muted border-border';
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-brand-heading text-foreground mb-4">
            Global Safety Intelligence Network
          </h2>
          <p className="text-brand-body text-muted-foreground max-w-2xl mx-auto">
            Real-time safety monitoring across 150+ countries with AI-powered threat detection 
            and instant emergency response coordination.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Live Statistics */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border shadow-brand-subtle">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} className="text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Successful Interventions</h3>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-success mb-2">
                {interventionCount?.toLocaleString()}
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-success" />
                <span className="text-sm text-success font-medium">+12% from last month</span>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border shadow-brand-subtle">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Activity" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Live Monitoring</h3>
                  <p className="text-sm text-muted-foreground">Active alerts</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {liveAlerts}
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-primary font-medium">Real-time updates</span>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border shadow-brand-subtle">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-trust/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-trust" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Response Time</h3>
                  <p className="text-sm text-muted-foreground">Average globally</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-trust mb-2">
                2.3 min
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} className="text-trust" />
                <span className="text-sm text-trust font-medium">Lightning fast</span>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl p-6 border border-border shadow-brand-subtle">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-card-foreground">Global Safety Status</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Safe</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Moderate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-error rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Alert</span>
                  </div>
                </div>
              </div>

              {/* Simplified World Map Representation */}
              <div className="relative bg-muted/30 rounded-lg h-80 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-trust/5"></div>
                
                {/* Map Data Points */}
                {safetyDataPoints?.map((point) => (
                  <div
                    key={point?.id}
                    className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-200 hover:scale-150 ${
                      point?.status === 'safe' ? 'bg-success' :
                      point?.status === 'moderate' ? 'bg-warning' : 'bg-error'
                    } animate-pulse`}
                    style={{
                      left: `${((point?.lng + 180) / 360) * 100}%`,
                      top: `${((90 - point?.lat) / 180) * 100}%`,
                      animationDelay: `${point?.id * 0.5}s`
                    }}
                    onMouseEnter={() => setActiveRegion(point)}
                    onMouseLeave={() => setActiveRegion(null)}
                  >
                    {activeRegion?.id === point?.id && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                        <div className={`px-3 py-2 rounded-lg border text-sm whitespace-nowrap ${getStatusBg(point?.status)}`}>
                          <div className="font-medium">{point?.region}</div>
                          <div className={`text-xs ${getStatusColor(point?.status)}`}>
                            {point?.incidents} incidents this week
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Connecting Lines Animation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="var(--color-trust)" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  {safetyDataPoints?.slice(0, 3)?.map((point, index) => (
                    <line
                      key={`line-${index}`}
                      x1={`${((point?.lng + 180) / 360) * 100}%`}
                      y1={`${((90 - point?.lat) / 180) * 100}%`}
                      x2={`${((safetyDataPoints?.[(index + 1) % 3]?.lng + 180) / 360) * 100}%`}
                      y2={`${((90 - safetyDataPoints?.[(index + 1) % 3]?.lat) / 180) * 100}%`}
                      stroke="url(#connectionGradient)"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                  ))}
                </svg>
              </div>

              {/* Region Details */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {safetyDataPoints?.slice(0, 3)?.map((point) => (
                  <div
                    key={point?.id}
                    className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${getStatusBg(point?.status)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-card-foreground">{point?.region}</h4>
                      <Icon 
                        name={point?.status === 'safe' ? 'CheckCircle' : point?.status === 'moderate' ? 'AlertCircle' : 'XCircle'} 
                        size={16} 
                        className={getStatusColor(point?.status)} 
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {point?.incidents} incidents this week
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveWorldMap;