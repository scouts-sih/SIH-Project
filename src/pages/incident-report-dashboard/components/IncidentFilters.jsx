import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const IncidentFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'reported', label: 'Reported' },
    { value: 'investigating', label: 'Investigating' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severity' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'missing_person', label: 'Missing Person' },
    { value: 'medical_emergency', label: 'Medical Emergency' },
    { value: 'theft', label: 'Theft' },
    { value: 'accident', label: 'Accident' },
    { value: 'harassment', label: 'Harassment' },
    { value: 'fraud', label: 'Fraud' },
    { value: 'other', label: 'Other' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'goa', label: 'Goa' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'himachal', label: 'Himachal Pradesh' },
    { value: 'uttarakhand', label: 'Uttarakhand' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filter Incidents</h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          <Icon name="X" size={16} />
          Clear All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div>
          <Input
            type="search"
            placeholder="Search incidents..."
            value={filters?.search}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
          />
        </div>
        
        <div>
          <Select
            placeholder="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
          />
        </div>
        
        <div>
          <Select
            placeholder="Severity"
            options={severityOptions}
            value={filters?.severity}
            onChange={(value) => onFilterChange('severity', value)}
          />
        </div>
        
        <div>
          <Select
            placeholder="Type"
            options={typeOptions}
            value={filters?.type}
            onChange={(value) => onFilterChange('type', value)}
          />
        </div>
        
        <div>
          <Select
            placeholder="Location"
            options={locationOptions}
            value={filters?.location}
            onChange={(value) => onFilterChange('location', value)}
          />
        </div>
        
        <div>
          <Input
            type="date"
            placeholder="Date"
            value={filters?.date}
            onChange={(e) => onFilterChange('date', e?.target?.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default IncidentFilters;