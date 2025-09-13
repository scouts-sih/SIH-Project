import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileOptimizedCTA = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('ios');

  const platforms = [
    {
      id: 'ios',
      name: 'iOS',
      icon: 'Smartphone',
      version: '15.0+',
      size: '45.2 MB',
      rating: '4.9',
      reviews: '12.5K',
      downloadUrl: '#'
    },
    {
      id: 'android',
      name: 'Android',
      icon: 'Smartphone',
      version: '8.0+',
      size: '38.7 MB',
      rating: '4.8',
      reviews: '18.3K',
      downloadUrl: '#'
    }
  ];

  const emergencyFeatures = [
    {
      icon: 'Phone',
      title: 'One-Tap Emergency',
      description: 'Instant access to local emergency services'
    },
    {
      icon: 'MapPin',
      title: 'Live Location Sharing',
      description: 'Real-time location with emergency contacts'
    },
    {
      icon: 'Wifi',
      title: 'Offline Mode',
      description: 'Critical features work without internet'
    },
    {
      icon: 'Users',
      title: 'Emergency Contacts',
      description: 'Quick access to pre-configured contacts'
    }
  ];

  const currentPlatform = platforms?.find(p => p?.id === selectedPlatform);

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-trust/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-brand-heading text-foreground mb-4">
                Your Safety Guardian in Your Pocket
              </h2>
              <p className="text-brand-body text-muted-foreground">
                Download the SafeTravel Pro mobile app and carry advanced safety technology wherever your adventures take you. 
                Optimized for mobile-first safety with offline capabilities and instant emergency access.
              </p>
            </div>

            {/* Platform Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Choose Your Platform:</h3>
              <div className="flex space-x-4">
                {platforms?.map((platform) => (
                  <button
                    key={platform?.id}
                    onClick={() => setSelectedPlatform(platform?.id)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg border transition-all duration-200 ${
                      selectedPlatform === platform?.id
                        ? 'bg-primary text-primary-foreground border-primary shadow-brand-elevated'
                        : 'bg-card text-card-foreground border-border hover:border-primary/30'
                    }`}
                  >
                    <Icon name={platform?.icon} size={20} />
                    <span className="font-medium">{platform?.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* App Details */}
            <div className="bg-card rounded-xl p-6 border border-border shadow-brand-subtle">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-brand rounded-xl flex items-center justify-center shadow-sm">
                  <Icon name="Shield" size={32} color="white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-card-foreground">SafeTravel Pro</h4>
                  <p className="text-sm text-muted-foreground">for {currentPlatform?.name}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="font-semibold text-card-foreground">{currentPlatform?.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{currentPlatform?.reviews} reviews</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-semibold text-card-foreground mb-1">{currentPlatform?.size}</div>
                  <p className="text-xs text-muted-foreground">Download size</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  iconName="Download"
                  iconPosition="left"
                  className="shadow-brand-elevated"
                >
                  Download for {currentPlatform?.name}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Requires {currentPlatform?.name} {currentPlatform?.version} or later
                </p>
              </div>
            </div>

            {/* QR Code */}
            <div className="text-center">
              <div className="inline-block p-4 bg-card rounded-xl border border-border shadow-brand-subtle">
                <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center mb-3">
                  <div className="grid grid-cols-8 gap-1">
                    {[...Array(64)]?.map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-foreground' : 'bg-transparent'}`}
                      ></div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Scan to download</p>
              </div>
            </div>
          </div>

          {/* Right Content - Mobile Features */}
          <div className="space-y-8">
            {/* Mobile Mockup */}
            <div className="relative mx-auto max-w-sm">
              <div className="bg-card rounded-3xl p-2 border-4 border-border shadow-brand-premium">
                <div className="bg-gradient-to-br from-primary/20 to-trust/20 rounded-2xl p-6 aspect-[9/16]">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-foreground rounded-full"></div>
                      <div className="w-1 h-1 bg-foreground rounded-full"></div>
                      <div className="w-1 h-1 bg-foreground rounded-full"></div>
                    </div>
                    <div className="text-xs font-medium">9:41</div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Wifi" size={12} />
                      <Icon name="Battery" size={12} />
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Icon name="Shield" size={24} color="white" />
                    </div>
                    <h5 className="font-semibold text-foreground">SafeTravel Pro</h5>
                    <p className="text-xs text-success">All systems operational</p>
                  </div>

                  {/* Emergency Button */}
                  <div className="text-center mb-6">
                    <button className="w-24 h-24 bg-error rounded-full flex items-center justify-center shadow-lg animate-breathing">
                      <Icon name="AlertTriangle" size={32} color="white" />
                    </button>
                    <p className="text-sm font-medium text-foreground mt-2">Emergency</p>
                    <p className="text-xs text-muted-foreground">Tap for help</p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-card/80 rounded-lg p-3 text-center">
                      <Icon name="MapPin" size={16} className="text-primary mx-auto mb-1" />
                      <p className="text-xs font-medium text-card-foreground">Location</p>
                      <p className="text-xs text-success">Safe Zone</p>
                    </div>
                    <div className="bg-card/80 rounded-lg p-3 text-center">
                      <Icon name="Users" size={16} className="text-trust mx-auto mb-1" />
                      <p className="text-xs font-medium text-card-foreground">Contacts</p>
                      <p className="text-xs text-trust">3 Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Features */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground text-center">
                Always-Available Emergency Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {emergencyFeatures?.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-lg p-4 border border-border shadow-brand-subtle hover:shadow-brand-elevated transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-error/10 rounded-lg flex items-center justify-center">
                        <Icon name={feature?.icon} size={16} className="text-error" />
                      </div>
                      <h4 className="font-medium text-card-foreground">{feature?.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{feature?.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile-Specific Benefits */}
            <div className="bg-gradient-to-r from-error/10 to-warning/10 rounded-xl p-6 border border-error/20">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Smartphone" size={24} className="text-error" />
                <h4 className="text-lg font-semibold text-foreground">Mobile-First Safety</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={14} className="text-success" />
                  <span>Works offline in remote locations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={14} className="text-success" />
                  <span>Emergency features accessible from lock screen</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={14} className="text-success" />
                  <span>Automatic location sharing in emergencies</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={14} className="text-success" />
                  <span>Voice-activated emergency commands</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileOptimizedCTA;