import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      type: 'family',
      name: 'Priya Sharma',
      role: 'Mother of Two',
      location: 'Mumbai, India',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      content: `SafeTravel Pro gave us complete peace of mind during our family trip to Thailand. When my elderly mother got separated from our group in Bangkok, the AI system detected the anomaly within minutes and coordinated with local authorities. She was safely reunited with us in just 20 minutes. The real-time family tracking feature is a game-changer for families traveling with seniors.`,
      outcome: 'Family reunited in 20 minutes',
      verified: true,
      date: '2025-01-15'
    },
    {
      id: 2,
      type: 'solo',
      name: 'Alex Chen',
      role: 'Solo Traveler & Blogger',
      location: 'Singapore',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      content: `As a solo female traveler, SafeTravel Pro has revolutionized how I explore new destinations. During my recent trek in Nepal, the system detected unusual weather patterns and automatically rerouted my planned path. The blockchain ID verification made check-ins seamless, and the emergency response feature gave me confidence to venture into remote areas I wouldn't have explored otherwise.`,outcome: 'Safe completion of 15-day solo trek',
      verified: true,
      date: '2025-01-08'
    },
    {
      id: 3,
      type: 'authority',name: 'Dr. Rajesh Kumar',role: 'Tourism Director',location: 'Goa Tourism Board',avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      content: `Implementing SafeTravel Pro across Goa has transformed our destination safety reputation. The platform helped us reduce tourist-related incidents by 67% in just six months. The real-time analytics dashboard allows us to proactively address potential issues, and the emergency response coordination has improved our average response time from 15 minutes to 2.3 minutes.`,
      outcome: '67% reduction in tourist incidents',
      verified: true,
      date: '2024-12-20'
    },
    {
      id: 4,
      type: 'family',name: 'Sarah Johnson',role: 'Adventure Family',location: 'London, UK',avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',rating: 5,content: `Our family loves adventure travel, but safety is always our top priority. SafeTravel Pro's AI detected a potential landslide risk during our Himachal Pradesh trip and suggested an alternative route. The system's predictive capabilities and instant family notifications meant everyone stayed informed and safe. It's like having a personal safety guardian that never sleeps.`,
      outcome: 'Avoided potential landslide danger',
      verified: true,
      date: '2025-01-03'
    },
    {
      id: 5,
      type: 'solo',
      name: 'Maria Rodriguez',
      role: 'Digital Nomad',
      location: 'Barcelona, Spain',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      content: `Working remotely while traveling across India, SafeTravel Pro became my essential companion. The platform's cultural sensitivity features helped me navigate local customs safely, while the blockchain identity system made visa processes and hotel check-ins incredibly smooth. When I fell ill in Rajasthan, the emergency coordination connected me with English-speaking medical professionals within minutes.`,
      outcome: 'Seamless 3-month India journey',
      verified: true,
      date: '2024-12-28'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'family': return 'text-success';
      case 'solo': return 'text-primary';
      case 'authority': return 'text-trust';
      default: return 'text-muted-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'family': return 'Users';
      case 'solo': return 'User';
      case 'authority': return 'Building';
      default: return 'User';
    }
  };

  const current = testimonials?.[currentTestimonial];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-brand-heading text-foreground mb-4">
            Trusted by Travelers Worldwide
          </h2>
          <p className="text-brand-body text-muted-foreground max-w-2xl mx-auto">
            Real stories from families, solo adventurers, and tourism authorities who experienced 
            the life-changing impact of intelligent safety technology.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-brand-premium">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar and Info */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <Image
                    src={current?.avatar}
                    alt={`${current?.name} profile`}
                    className="w-20 h-20 rounded-full object-cover border-4 border-background shadow-brand-subtle"
                  />
                  {current?.verified && (
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-background">
                      <Icon name="CheckCircle" size={16} color="white" />
                    </div>
                  )}
                </div>
                
                <div className="mt-4 text-center md:text-left">
                  <h3 className="font-semibold text-card-foreground">{current?.name}</h3>
                  <p className="text-sm text-muted-foreground">{current?.role}</p>
                  <div className="flex items-center justify-center md:justify-start space-x-2 mt-1">
                    <Icon name="MapPin" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{current?.location}</span>
                  </div>
                  
                  {/* User Type Badge */}
                  <div className={`inline-flex items-center space-x-1 mt-2 px-2 py-1 rounded-full bg-muted text-xs font-medium ${getTypeColor(current?.type)}`}>
                    <Icon name={getTypeIcon(current?.type)} size={12} />
                    <span className="capitalize">{current?.type} Traveler</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(current?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                  ))}
                  <span className="ml-2 text-sm font-medium text-muted-foreground">
                    {current?.rating}.0 • {new Date(current.date)?.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="text-card-foreground leading-relaxed mb-6">
                  <Icon name="Quote" size={24} className="text-primary/30 mb-2" />
                  <p className="text-base md:text-lg">{current?.content}</p>
                </blockquote>

                {/* Outcome Badge */}
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success/10 border border-success/20 rounded-lg">
                  <Icon name="Award" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">{current?.outcome}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-brand-subtle"
              aria-label="Previous testimonial"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center space-x-2">
              {testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentTestimonial 
                      ? 'bg-primary scale-125' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-brand-subtle"
              aria-label="Next testimonial"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>

          {/* Auto-play Indicator */}
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`}></div>
            <span className="text-xs text-muted-foreground">
              {isAutoPlaying ? 'Auto-playing' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
            <div className="text-sm text-muted-foreground">Protected Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">99.8%</div>
            <div className="text-sm text-muted-foreground">Safety Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-trust mb-2">150+</div>
            <div className="text-sm text-muted-foreground">Countries Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">2.3 min</div>
            <div className="text-sm text-muted-foreground">Avg Response Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;