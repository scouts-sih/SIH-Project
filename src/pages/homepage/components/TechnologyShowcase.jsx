import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TechnologyShowcase = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [demoProgress, setDemoProgress] = useState(0);

  const technologies = [
    {
      id: 'ai-detection',
      title: 'AI Anomaly Detection',
      description: 'Advanced machine learning algorithms analyze behavioral patterns, environmental data, and crowd dynamics to predict and prevent potential safety threats before they escalate.',
      icon: 'Brain',
      color: 'primary',
      features: ['Real-time pattern analysis', 'Predictive threat modeling', 'Behavioral anomaly detection', 'Environmental risk assessment'],
      demoSteps: [
        { step: 1, action: 'Scanning environment...', status: 'active' },
        { step: 2, action: 'Analyzing crowd density', status: 'pending' },
        { step: 3, action: 'Detecting anomalies', status: 'pending' },
        { step: 4, action: 'Alert generated', status: 'pending' }
      ]
    },
    {
      id: 'blockchain-id',
      title: 'Blockchain Identity Verification',
      description: 'Immutable digital identity system using blockchain technology ensures secure, tamper-proof verification while maintaining complete privacy and user control over personal data.',
      icon: 'Shield',
      color: 'trust',
      features: ['Immutable identity records', 'Zero-knowledge verification', 'Decentralized authentication', 'Privacy-first design'],
      demoSteps: [
        { step: 1, action: 'Creating digital identity...', status: 'active' },
        { step: 2, action: 'Blockchain verification', status: 'pending' },
        { step: 3, action: 'Cryptographic signing', status: 'pending' },
        { step: 4, action: 'Identity secured', status: 'pending' }
      ]
    },
    {
      id: 'emergency-response',
      title: 'Emergency Response Coordination',
      description: 'Intelligent emergency response system that instantly connects travelers with local authorities, medical services, and emergency contacts through automated coordination protocols.',
      icon: 'Zap',
      color: 'accent',
      features: ['Instant alert dispatch', 'Multi-channel communication', 'Location-based routing', 'Real-time status updates'],
      demoSteps: [
        { step: 1, action: 'Emergency detected...', status: 'active' },
        { step: 2, action: 'Contacting authorities', status: 'pending' },
        { step: 3, action: 'Notifying contacts', status: 'pending' },
        { step: 4, action: 'Response coordinated', status: 'pending' }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoProgress((prev) => {
        if (prev >= 100) {
          setActiveDemo((current) => (current + 1) % technologies?.length);
          return 0;
        }
        return prev + (100 / 15); // 15 second demo
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary/10',
        border: 'border-primary/20',
        text: 'text-primary',
        icon: 'bg-primary',
        gradient: 'from-primary/20 to-primary/5'
      },
      trust: {
        bg: 'bg-trust/10',
        border: 'border-trust/20',
        text: 'text-trust',
        icon: 'bg-trust',
        gradient: 'from-trust/20 to-trust/5'
      },
      accent: {
        bg: 'bg-accent/10',
        border: 'border-accent/20',
        text: 'text-accent',
        icon: 'bg-accent',
        gradient: 'from-accent/20 to-accent/5'
      }
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const currentTech = technologies?.[activeDemo];
  const currentStep = Math.floor((demoProgress / 100) * currentTech?.demoSteps?.length);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-brand-heading text-foreground mb-4">
            Advanced Safety Technology Stack
          </h2>
          <p className="text-brand-body text-muted-foreground max-w-2xl mx-auto">
            Experience our cutting-edge safety technologies through interactive demonstrations. 
            Each system works seamlessly together to create an invisible safety net around your travels.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {technologies?.map((tech, index) => {
            const colors = getColorClasses(tech?.color);
            const isActive = index === activeDemo;
            
            return (
              <div
                key={tech?.id}
                className={`relative bg-card rounded-xl border transition-all duration-500 cursor-pointer hover-lift ${
                  isActive 
                    ? `${colors?.border} shadow-brand-elevated` 
                    : 'border-border hover:border-primary/30'
                }`}
                onClick={() => setActiveDemo(index)}
              >
                {/* Progress Bar for Active Demo */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-muted rounded-t-xl overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${colors?.gradient} transition-all duration-1000 ease-linear`}
                      style={{ width: `${demoProgress}%` }}
                    ></div>
                  </div>
                )}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 ${colors?.icon} rounded-lg flex items-center justify-center shadow-sm`}>
                      <Icon name={tech?.icon} size={24} color="white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-card-foreground">{tech?.title}</h3>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${isActive ? colors?.icon : 'bg-muted-foreground'} ${isActive ? 'animate-pulse' : ''}`}></div>
                        <span className={`text-sm font-medium ${isActive ? colors?.text : 'text-muted-foreground'}`}>
                          {isActive ? 'Live Demo' : 'Click to Demo'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {tech?.description}
                  </p>

                  {/* Demo Steps */}
                  {isActive && (
                    <div className="mb-6 space-y-3">
                      <h4 className="text-sm font-medium text-card-foreground">Live Demonstration:</h4>
                      {tech?.demoSteps?.map((step, stepIndex) => (
                        <div
                          key={step?.step}
                          className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${
                            stepIndex <= currentStep 
                              ? `${colors?.bg} ${colors?.border} border` 
                              : 'bg-muted/30'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            stepIndex < currentStep 
                              ? `${colors?.icon} text-white` 
                              : stepIndex === currentStep 
                                ? `${colors?.bg} ${colors?.text} border ${colors?.border}` 
                                : 'bg-muted text-muted-foreground'
                          }`}>
                            {stepIndex < currentStep ? (
                              <Icon name="Check" size={12} />
                            ) : (
                              step?.step
                            )}
                          </div>
                          <span className={`text-sm ${
                            stepIndex <= currentStep ? colors?.text : 'text-muted-foreground'
                          }`}>
                            {step?.action}
                          </span>
                          {stepIndex === currentStep && (
                            <div className="ml-auto">
                              <div className={`w-4 h-4 border-2 ${colors?.border} border-t-transparent rounded-full animate-spin`}></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-card-foreground">Key Features:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {tech?.features?.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <Icon name="CheckCircle" size={14} className={colors?.text} />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <Button
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      fullWidth
                      iconName="Play"
                      iconPosition="left"
                      className={isActive ? 'shadow-brand-elevated' : ''}
                    >
                      {isActive ? 'Watching Demo' : 'Start Demo'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technology Integration Message */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-trust/10 to-accent/10 rounded-xl p-8 border border-primary/20">
            <Icon name="Cpu" size={32} className="text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Seamlessly Integrated Technology
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All three technologies work together in perfect harmony, creating a comprehensive safety ecosystem 
              that adapts to your travel patterns and provides intelligent protection without interrupting your adventures.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;