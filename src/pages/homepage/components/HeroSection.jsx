import React, { useState, useEffect } from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentSubheadline, setCurrentSubheadline] = useState(0);
  const [visitorType, setVisitorType] = useState('traveler');

  const subheadlines = [
    { text: "Family Peace of Mind", audience: "families" },
    { text: "Solo Adventure Confidence", audience: "solo" },
    { text: "Destination Safety Intelligence", audience: "authorities" }
  ];

  const ctaOptions = {
    traveler: { text: "Start Your Safe Journey", icon: "Shield", variant: "default" },
    authority: { text: "Request Demo", icon: "Play", variant: "outline" }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubheadline((prev) => (prev + 1) % subheadlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleVisitorTypeChange = (type) => {
    setVisitorType(type);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%230066CC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Visitor Type Toggle */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-sm font-medium text-muted-foreground">I am a:</span>
              <div className="flex bg-muted rounded-lg p-1">
                <button
                  onClick={() => handleVisitorTypeChange('traveler')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    visitorType === 'traveler' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Traveler
                </button>
                <button
                  onClick={() => handleVisitorTypeChange('authority')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    visitorType === 'authority' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Authority
                </button>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-brand-hero text-foreground leading-tight">
                Your Invisible Guardian for{' '}
                <span className="text-primary">Fearless Exploration</span>
              </h1>
              
              {/* Rotating Subheadlines */}
              <div className="h-12 overflow-hidden">
                <div 
                  className="transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateY(-${currentSubheadline * 48}px)` }}
                >
                  {subheadlines.map((subtitle, index) => (
                    <p key={index} className="text-brand-subheading text-muted-foreground h-12 flex items-center">
                      {subtitle.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-brand-body text-muted-foreground max-w-lg">
              Advanced safety technology that enhances, never restricts, your travel experiences. 
              AI-powered monitoring, blockchain identity verification, and real-time emergency response 
              coordination - all working invisibly to enable your adventures.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant={ctaOptions[visitorType].variant}
                size="lg"
                iconName={ctaOptions[visitorType].icon}
                iconPosition="left"
                className="shadow-brand-elevated hover-lift"
              >
                {ctaOptions[visitorType].text}
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="group"
              >
                <span className="group-hover:text-primary transition-colors">Watch 2-min Demo</span>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-success">Live & Operational</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">ISO 27001 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-trust" />
                <span className="text-sm font-medium text-foreground">50K+ Protected</span>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            {/* Traveler Image Background */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-brand-premium">
              <Image
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Confident traveler exploring vibrant destination"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>

            {/* Dashboard Overlay */}
            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
              <div className="bg-card/95 backdrop-blur-md rounded-xl p-6 border border-border shadow-brand-premium">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
                      <Icon name="Shield" size={16} color="white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">Safety Dashboard</h3>
                      <p className="text-xs text-muted-foreground">Real-time monitoring</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-success">Active</span>
                  </div>
                </div>

                {/* Mock Dashboard Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name="MapPin" size={14} className="text-primary" />
                      <span className="text-xs font-medium text-muted-foreground">Location</span>
                    </div>
                    <p className="text-sm font-semibold text-card-foreground">Goa, India</p>
                    <p className="text-xs text-success">Safe Zone</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name="Clock" size={14} className="text-trust" />
                      <span className="text-xs font-medium text-muted-foreground">Response</span>
                    </div>
                    <p className="text-sm font-semibold text-card-foreground">2.3 min</p>
                    <p className="text-xs text-trust">Avg time</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Emergency Contacts</span>
                    <span className="text-xs font-medium text-primary">3 Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-8 w-16 h-16 bg-accent/10 rounded-full animate-breathing hidden lg:block"></div>
      <div className="absolute bottom-1/4 left-8 w-12 h-12 bg-trust/10 rounded-full animate-breathing hidden lg:block" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default HeroSection;