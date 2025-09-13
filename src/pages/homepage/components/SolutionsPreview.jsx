import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SolutionsPreview = () => {
  const [hoveredSolution, setHoveredSolution] = useState(null);

  const solutions = [
    {
      id: 'individual',
      title: 'Individual Travelers',
      subtitle: 'Personal Safety Guardian',
      description: 'AI-powered personal protection with real-time threat detection, emergency response, and intelligent travel recommendations tailored for solo adventurers.',
      icon: 'User',
      color: 'primary',
      route: '/safety-intelligence-dashboard',
      features: [
        'Personal AI safety assistant',
        'Real-time location monitoring',
        'Instant emergency alerts',
        'Cultural safety guidance',
        'Offline emergency contacts'
      ],
      stats: { users: '35K+', satisfaction: '98%', response: '1.8 min' },
      badge: 'Most Popular'
    },
    {
      id: 'families',
      title: 'Families',
      subtitle: 'Complete Family Protection',
      description: 'Comprehensive family safety ecosystem with multi-generational tracking, child safety features, and elderly care monitoring for worry-free family adventures.',
      icon: 'Users',
      color: 'success',
      route: '/community-safety-network',
      features: [
        'Family group tracking',
        'Child safety zones',
        'Elderly care monitoring',
        'Group communication hub',
        'Medical emergency coordination'
      ],
      stats: { users: '12K+', satisfaction: '99%', response: '2.1 min' },
      badge: 'Family Favorite'
    },
    {
      id: 'tourism-boards',
      title: 'Tourism Boards',
      subtitle: 'Destination Safety Intelligence',
      description: 'Advanced analytics platform for tourism authorities to monitor destination safety, manage incidents, and enhance visitor experience through data-driven insights.',
      icon: 'Building',
      color: 'trust',
      route: '/safety-intelligence-dashboard',
      features: [
        'Real-time safety analytics',
        'Incident management system',
        'Visitor flow optimization',
        'Emergency coordination hub',
        'Reputation management tools'
      ],
      stats: { users: '150+', satisfaction: '96%', response: '45 sec' },
      badge: 'Enterprise Grade'
    },
    {
      id: 'emergency-services',
      title: 'Emergency Services',
      subtitle: 'Rapid Response Coordination',
      description: 'Integrated emergency response platform that connects first responders with real-time incident data, location intelligence, and automated dispatch systems.',
      icon: 'Zap',
      color: 'accent',
      route: '/emergency-response-simulator',
      features: [
        'Automated dispatch system',
        'Real-time incident mapping',
        'Multi-agency coordination',
        'Resource optimization',
        'Performance analytics'
      ],
      stats: { users: '500+', satisfaction: '97%', response: '30 sec' },
      badge: 'Mission Critical'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary/10',
        border: 'border-primary/20',
        text: 'text-primary',
        icon: 'bg-primary',
        gradient: 'from-primary/20 to-primary/5',
        badge: 'bg-primary text-primary-foreground'
      },
      success: {
        bg: 'bg-success/10',
        border: 'border-success/20',
        text: 'text-success',
        icon: 'bg-success',
        gradient: 'from-success/20 to-success/5',
        badge: 'bg-success text-success-foreground'
      },
      trust: {
        bg: 'bg-trust/10',
        border: 'border-trust/20',
        text: 'text-trust',
        icon: 'bg-trust',
        gradient: 'from-trust/20 to-trust/5',
        badge: 'bg-trust text-trust-foreground'
      },
      accent: {
        bg: 'bg-accent/10',
        border: 'border-accent/20',
        text: 'text-accent',
        icon: 'bg-accent',
        gradient: 'from-accent/20 to-accent/5',
        badge: 'bg-accent text-accent-foreground'
      }
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-brand-heading text-foreground mb-4">
            Tailored Safety Solutions
          </h2>
          <p className="text-brand-body text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect safety solution designed specifically for your needs. 
            Each solution offers specialized features and capabilities tailored to different user types and scenarios.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {solutions?.map((solution) => {
            const colors = getColorClasses(solution?.color);
            const isHovered = hoveredSolution === solution?.id;
            
            return (
              <div
                key={solution?.id}
                className={`relative bg-card rounded-xl border transition-all duration-300 cursor-pointer group ${
                  isHovered 
                    ? `${colors?.border} shadow-brand-elevated transform -translate-y-1` 
                    : 'border-border hover:border-primary/30 hover:shadow-brand-subtle'
                }`}
                onMouseEnter={() => setHoveredSolution(solution?.id)}
                onMouseLeave={() => setHoveredSolution(null)}
              >
                {/* Badge */}
                <div className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-medium ${colors?.badge} shadow-sm`}>
                  {solution?.badge}
                </div>
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 ${colors?.icon} rounded-xl flex items-center justify-center shadow-sm ${isHovered ? 'animate-breathing' : ''}`}>
                        <Icon name={solution?.icon} size={28} color="white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-card-foreground">{solution?.title}</h3>
                        <p className={`text-sm font-medium ${colors?.text}`}>{solution?.subtitle}</p>
                      </div>
                    </div>
                    <Icon 
                      name="ArrowUpRight" 
                      size={20} 
                      className={`transition-all duration-200 ${isHovered ? colors?.text + ' transform rotate-45' : 'text-muted-foreground'}`} 
                    />
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {solution?.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-sm font-medium text-card-foreground">Key Features:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {solution?.features?.slice(0, isHovered ? solution?.features?.length : 3)?.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Icon name="CheckCircle" size={14} className={colors?.text} />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    {!isHovered && solution?.features?.length > 3 && (
                      <p className="text-xs text-muted-foreground italic">
                        +{solution?.features?.length - 3} more features
                      </p>
                    )}
                  </div>

                  {/* Stats */}
                  <div className={`grid grid-cols-3 gap-4 p-4 rounded-lg mb-6 ${colors?.bg} ${colors?.border} border`}>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${colors?.text}`}>{solution?.stats?.users}</div>
                      <div className="text-xs text-muted-foreground">Active Users</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${colors?.text}`}>{solution?.stats?.satisfaction}</div>
                      <div className="text-xs text-muted-foreground">Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${colors?.text}`}>{solution?.stats?.response}</div>
                      <div className="text-xs text-muted-foreground">Response</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to={solution?.route}>
                    <Button
                      variant={isHovered ? "default" : "outline"}
                      fullWidth
                      iconName="ArrowRight"
                      iconPosition="right"
                      className={`transition-all duration-200 ${isHovered ? 'shadow-brand-elevated' : ''}`}
                    >
                      Explore {solution?.title}
                    </Button>
                  </Link>
                </div>
                {/* Hover Gradient Overlay */}
                {isHovered && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors?.gradient} rounded-xl pointer-events-none opacity-50`}></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-trust/10 to-success/10 rounded-2xl p-8 border border-primary/20">
            <Icon name="Shield" size={40} className="text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Not Sure Which Solution Fits Your Needs?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our safety experts can help you choose the perfect solution based on your specific requirements, 
              travel patterns, and safety priorities. Get personalized recommendations in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="shadow-brand-elevated"
              >
                Talk to Safety Expert
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Calculator"
                iconPosition="left"
              >
                Take Safety Assessment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsPreview;