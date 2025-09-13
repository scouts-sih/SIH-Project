import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustIndicators = () => {
  const [activeUsers, setActiveUsers] = useState(50247);
  const [responseTime, setResponseTime] = useState(2.3);
  const [uptime, setUptime] = useState(99.9);

  const certifications = [
    {
      id: 'iso27001',
      name: 'ISO 27001',
      description: 'Information Security Management',
      icon: 'Shield',
      color: 'primary',
      verified: true,
      validUntil: '2025-12-31'
    },
    {
      id: 'gdpr',
      name: 'GDPR Compliant',
      description: 'European Data Protection',
      icon: 'Lock',
      color: 'trust',
      verified: true,
      validUntil: 'Ongoing'
    },
    {
      id: 'soc2',
      name: 'SOC 2 Type II',
      description: 'Security & Availability',
      icon: 'CheckCircle',
      color: 'success',
      verified: true,
      validUntil: '2025-08-15'
    },
    {
      id: 'hipaa',
      name: 'HIPAA Ready',
      description: 'Healthcare Data Security',
      icon: 'Heart',
      color: 'accent',
      verified: true,
      validUntil: 'Ongoing'
    }
  ];

  const partnerships = [
    {
      id: 'interpol',
      name: 'INTERPOL',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      type: 'Law Enforcement',
      description: 'Global police cooperation'
    },
    {
      id: 'who',
      name: 'World Health Organization',
      logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      type: 'Health Authority',
      description: 'Health emergency protocols'
    },
    {
      id: 'unwto',
      name: 'UN Tourism',
      logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      type: 'Tourism Authority',
      description: 'Sustainable tourism safety'
    },
    {
      id: 'iata',
      name: 'IATA',
      logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      type: 'Aviation Authority',
      description: 'Air travel safety standards'
    }
  ];

  const securityFeatures = [
    {
      feature: 'End-to-End Encryption',
      description: 'AES-256 encryption for all data transmission',
      icon: 'Lock',
      status: 'active'
    },
    {
      feature: 'Zero-Knowledge Architecture',
      description: 'We cannot access your personal data',
      icon: 'EyeOff',
      status: 'active'
    },
    {
      feature: 'Blockchain Verification',
      description: 'Immutable identity and transaction records',
      icon: 'Link',
      status: 'active'
    },
    {
      feature: 'Multi-Factor Authentication',
      description: 'Biometric and device-based security',
      icon: 'Fingerprint',
      status: 'active'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 5));
      setResponseTime(prev => Math.max(1.8, Math.min(2.8, prev + (Math.random() - 0.5) * 0.2)));
      setUptime(prev => Math.max(99.5, Math.min(100, prev + (Math.random() - 0.5) * 0.1)));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getColorClasses = (color) => {
    const colorMap = {
      primary: { bg: 'bg-primary/10', text: 'text-primary', icon: 'bg-primary' },
      trust: { bg: 'bg-trust/10', text: 'text-trust', icon: 'bg-trust' },
      success: { bg: 'bg-success/10', text: 'text-success', icon: 'bg-success' },
      accent: { bg: 'bg-accent/10', text: 'text-accent', icon: 'bg-accent' }
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-brand-heading text-foreground mb-4">
            Trusted by Millions, Certified by Authorities
          </h2>
          <p className="text-brand-body text-muted-foreground max-w-2xl mx-auto">
            Our commitment to safety extends beyond technology. We maintain the highest standards 
            of security, privacy, and compliance recognized by international authorities.
          </p>
        </div>

        {/* Live Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card rounded-xl p-6 border border-border shadow-brand-subtle text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="Users" size={24} className="text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">
              {activeUsers?.toLocaleString()}+
            </div>
            <div className="text-sm text-muted-foreground mb-2">Active Protected Users</div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-success font-medium">Live Count</span>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border shadow-brand-subtle text-center">
            <div className="w-12 h-12 bg-trust/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="Clock" size={24} className="text-trust" />
            </div>
            <div className="text-3xl font-bold text-trust mb-2">
              {responseTime?.toFixed(1)} min
            </div>
            <div className="text-sm text-muted-foreground mb-2">Average Response Time</div>
            <div className="flex items-center justify-center space-x-2">
              <Icon name="TrendingDown" size={12} className="text-success" />
              <span className="text-xs text-success font-medium">Improving</span>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border shadow-brand-subtle text-center">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="Activity" size={24} className="text-success" />
            </div>
            <div className="text-3xl font-bold text-success mb-2">
              {uptime?.toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground mb-2">System Uptime</div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-success font-medium">Operational</span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-foreground text-center mb-8">
            Security Certifications & Compliance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert) => {
              const colors = getColorClasses(cert?.color);
              return (
                <div
                  key={cert?.id}
                  className="bg-card rounded-xl p-6 border border-border shadow-brand-subtle hover:shadow-brand-elevated transition-all duration-200 hover-lift"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 ${colors?.icon} rounded-lg flex items-center justify-center`}>
                      <Icon name={cert?.icon} size={20} color="white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground">{cert?.name}</h4>
                      {cert?.verified && (
                        <div className="flex items-center space-x-1">
                          <Icon name="CheckCircle" size={12} className="text-success" />
                          <span className="text-xs text-success font-medium">Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{cert?.description}</p>
                  <div className="text-xs text-muted-foreground">
                    Valid until: <span className="font-medium">{cert?.validUntil}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Partnerships */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-foreground text-center mb-8">
            Trusted Global Partnerships
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerships?.map((partner) => (
              <div
                key={partner?.id}
                className="bg-card rounded-xl p-6 border border-border shadow-brand-subtle hover:shadow-brand-elevated transition-all duration-200 hover-lift text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={partner?.logo}
                    alt={`${partner?.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-card-foreground mb-1">{partner?.name}</h4>
                <p className="text-xs text-primary font-medium mb-2">{partner?.type}</p>
                <p className="text-sm text-muted-foreground">{partner?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-card rounded-2xl p-8 border border-border shadow-brand-premium">
          <div className="text-center mb-8">
            <Icon name="Shield" size={40} className="text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-card-foreground mb-2">
              Enterprise-Grade Security Architecture
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with security-first principles, our platform implements multiple layers of protection 
              to ensure your data remains private and secure at all times.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityFeatures?.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={feature?.icon} size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-card-foreground">{feature?.feature}</h4>
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature?.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success/10 border border-success/20 rounded-lg">
              <Icon name="Award" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">
                Independently audited by leading cybersecurity firms
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;