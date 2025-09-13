import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import InteractiveWorldMap from './components/InteractiveWorldMap';
import TechnologyShowcase from './components/TechnologyShowcase';
import TestimonialCarousel from './components/TestimonialCarousel';
import SolutionsPreview from './components/SolutionsPreview';
import TrustIndicators from './components/TrustIndicators';
import MobileOptimizedCTA from './components/MobileOptimizedCTA';
import Icon from '../../components/AppIcon';


const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>SafeTravel Pro - Your Invisible Guardian for Fearless Exploration</title>
        <meta name="description" content="Advanced AI-powered travel safety platform with real-time monitoring, blockchain identity verification, and emergency response coordination. Trusted by 50,000+ travelers worldwide." />
        <meta name="keywords" content="travel safety, AI monitoring, emergency response, blockchain identity, travel security, family protection, solo travel safety" />
        <meta property="og:title" content="SafeTravel Pro - Your Invisible Guardian for Fearless Exploration" />
        <meta property="og:description" content="Advanced safety technology that enhances, never restricts, your travel experiences. AI-powered monitoring and real-time emergency response coordination." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SafeTravel Pro - Your Invisible Guardian for Fearless Exploration" />
        <meta name="twitter:description" content="Advanced safety technology that enhances, never restricts, your travel experiences." />
        <link rel="canonical" href="/homepage" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          {/* Hero Section with Dynamic Content */}
          <HeroSection />
          
          {/* Interactive World Map with Live Data */}
          <InteractiveWorldMap />
          
          {/* Technology Showcase with Demos */}
          <TechnologyShowcase />
          
          {/* Social Proof Testimonials */}
          <TestimonialCarousel />
          
          {/* Solutions Preview Cards */}
          <SolutionsPreview />
          
          {/* Trust Indicators & Certifications */}
          <TrustIndicators />
          
          {/* Mobile-Optimized CTA */}
          <MobileOptimizedCTA />
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
                    <Icon name="Shield" size={16} color="white" />
                  </div>
                  <span className="text-lg font-bold text-card-foreground">SafeTravel Pro</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your invisible guardian for fearless exploration. Advanced safety technology 
                  that enhances every journey.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs text-success font-medium">All systems operational</span>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-card-foreground mb-4">Platform</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/technology-platform" className="hover:text-primary transition-colors">Technology</a></li>
                  <li><a href="/safety-intelligence-dashboard" className="hover:text-primary transition-colors">Dashboard</a></li>
                  <li><a href="/community-safety-network" className="hover:text-primary transition-colors">Community</a></li>
                  <li><a href="/developer-integration-center" className="hover:text-primary transition-colors">Developers</a></li>
                </ul>
              </div>

              {/* Solutions */}
              <div>
                <h4 className="font-semibold text-card-foreground mb-4">Solutions</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Individual Travelers</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Families</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Tourism Boards</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Emergency Services</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold text-card-foreground mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Emergency: +1-800-SAFE-NOW</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} SafeTravel Pro. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="text-xs text-muted-foreground">Trusted by 50,000+ travelers</span>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={14} className="text-success" />
                  <span className="text-xs text-success font-medium">ISO 27001 Certified</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;