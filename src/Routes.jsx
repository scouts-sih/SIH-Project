import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TouristSafetyDashboard from './pages/tourist-safety-dashboard';
import SystemAdministration from './pages/system-administration';
import DigitalIdGeneration from './pages/digital-id-generation';
import AuthorityMonitoringHub from './pages/authority-monitoring-hub';
import IncidentReportDashboard from './pages/incident-report-dashboard';
import GeoFenceManagement from './pages/geo-fence-management';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AuthorityMonitoringHub />} />
        <Route path="/tourist-safety-dashboard" element={<TouristSafetyDashboard />} />
        <Route path="/system-administration" element={<SystemAdministration />} />
        <Route path="/digital-id-generation" element={<DigitalIdGeneration />} />
        <Route path="/authority-monitoring-hub" element={<AuthorityMonitoringHub />} />
        <Route path="/incident-report-dashboard" element={<IncidentReportDashboard />} />
        <Route path="/geo-fence-management" element={<GeoFenceManagement />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
