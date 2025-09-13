import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SafetyScoreGauge = ({ score = 85, breakdown = {} }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 500);
    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'from-success/20 to-success/5';
    if (score >= 60) return 'from-warning/20 to-warning/5';
    return 'from-error/20 to-error/5';
  };

  const getScoreStatus = (score) => {
    if (score >= 80) return 'Safe';
    if (score >= 60) return 'Caution';
    return 'High Risk';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const defaultBreakdown = {
    location: 90,
    weather: 85,
    crowd: 75,
    time: 80,
    zone: 95
  };

  const currentBreakdown = { ...defaultBreakdown, ...breakdown };

  return (
    <div className={`relative bg-gradient-to-br ${getScoreBackground(score)} rounded-xl p-6 border border-border`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Safety Score</h3>
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="p-2 hover:bg-muted rounded-lg transition-micro"
        >
          <Icon name="Info" size={16} className="text-muted-foreground" />
        </button>
      </div>
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/30"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`${getScoreColor(score)} transition-all duration-1000 ease-out`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {Math.round(animatedScore)}
            </span>
            <span className="text-xs text-muted-foreground">out of 100</span>
          </div>
        </div>
      </div>
      <div className="text-center">
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
          score >= 80 ? 'bg-success/10 text-success' :
          score >= 60 ? 'bg-warning/10 text-warning': 'bg-error/10 text-error'
        }`}>
          <Icon 
            name={score >= 80 ? "Shield" : score >= 60 ? "AlertTriangle" : "ShieldX"} 
            size={14} 
          />
          <span>{getScoreStatus(score)}</span>
        </div>
      </div>
      {showBreakdown && (
        <div className="mt-4 p-4 bg-card rounded-lg border border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Score Breakdown</h4>
          <div className="space-y-2">
            {Object.entries(currentBreakdown)?.map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={
                      key === 'location' ? 'MapPin' :
                      key === 'weather' ? 'Cloud' :
                      key === 'crowd' ? 'Users' :
                      key === 'time'? 'Clock' : 'Shield'
                    } 
                    size={14} 
                    className="text-muted-foreground" 
                  />
                  <span className="text-sm capitalize text-foreground">{key}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        value >= 80 ? 'bg-success' :
                        value >= 60 ? 'bg-warning': 'bg-error'
                      }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground w-8">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyScoreGauge;