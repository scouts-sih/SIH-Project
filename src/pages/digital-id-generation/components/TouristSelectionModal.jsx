import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const TouristSelectionModal = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const mockTourists = [
    {
      id: 'TG001',
      name: 'Rajesh Kumar Sharma',
      nationality: 'Indian',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      documentNumber: 'AADHAAR-1234-5678-9012',
      idType: 'Aadhaar',
      registrationDate: '11/09/2025',
      entryPoint: 'Delhi Airport',
      phone: '+91 98765 43210',
      email: 'rajesh.sharma@email.com',
      dateOfBirth: '15/03/1985',
      gender: 'Male',
      stayDuration: '7 days',
      visitPurpose: 'Tourism',
      status: 'verified'
    },
    {
      id: 'TG002',
      name: 'Priya Patel',
      nationality: 'Indian',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      documentNumber: 'PASSPORT-J8765432',
      idType: 'Passport',
      registrationDate: '10/09/2025',
      entryPoint: 'Mumbai Airport',
      phone: '+91 87654 32109',
      email: 'priya.patel@email.com',
      dateOfBirth: '22/07/1990',
      gender: 'Female',
      stayDuration: '14 days',
      visitPurpose: 'Business',
      status: 'verified'
    },
    {
      id: 'TG003',
      name: 'Michael Johnson',
      nationality: 'American',
      photo: 'https://randomuser.me/api/portraits/men/56.jpg',
      documentNumber: 'PASSPORT-US123456',
      idType: 'Passport',
      registrationDate: '09/09/2025',
      entryPoint: 'Chennai Airport',
      phone: '+1 555 123 4567',
      email: 'michael.johnson@email.com',
      dateOfBirth: '08/11/1982',
      gender: 'Male',
      stayDuration: '21 days',
      visitPurpose: 'Tourism',
      status: 'pending'
    },
    {
      id: 'TG004',
      name: 'Sarah Williams',
      nationality: 'British',
      photo: 'https://randomuser.me/api/portraits/women/68.jpg',
      documentNumber: 'PASSPORT-UK789012',
      idType: 'Passport',
      registrationDate: '08/09/2025',
      entryPoint: 'Kolkata Airport',
      phone: '+44 20 7946 0958',
      email: 'sarah.williams@email.com',
      dateOfBirth: '14/05/1988',
      gender: 'Female',
      stayDuration: '10 days',
      visitPurpose: 'Cultural Exchange',
      status: 'verified'
    }
  ];

  const filteredTourists = mockTourists?.filter(tourist => {
    const matchesSearch = tourist?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         tourist?.documentNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         tourist?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || tourist?.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleSelect = (tourist) => {
    onSelect(tourist);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-400 p-4">
      <div className="bg-card rounded-lg shadow-elevated-hover max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Select Tourist</h2>
            <p className="text-sm text-muted-foreground">Choose a verified tourist to generate digital ID</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-border">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search by name, document number, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="w-full"
              />
            </div>
            <div className="flex space-x-2">
              {['all', 'verified', 'pending']?.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className="capitalize"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Tourist List */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {filteredTourists?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No tourists found matching your criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTourists?.map((tourist) => (
                <div
                  key={tourist?.id}
                  className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleSelect(tourist)}
                >
                  <div className="relative">
                    <Image
                      src={tourist?.photo}
                      alt={`${tourist?.name} photo`}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    {tourist?.status === 'verified' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card flex items-center justify-center">
                        <Icon name="Check" size={8} color="white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-foreground">{tourist?.name}</h3>
                      <span className="text-xs text-muted-foreground">({tourist?.id})</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{tourist?.nationality}</span>
                      <span>•</span>
                      <span>{tourist?.idType}</span>
                      <span>•</span>
                      <span>{tourist?.registrationDate}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{tourist?.documentNumber}</p>
                  </div>

                  <div className="text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      tourist?.status === 'verified' 
                        ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
                    }`}>
                      {tourist?.status === 'verified' ? 'Verified' : 'Pending'}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{tourist?.entryPoint}</p>
                  </div>

                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {filteredTourists?.length} tourist{filteredTourists?.length !== 1 ? 's' : ''} found
            </span>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Info" size={14} />
              <span>Only verified tourists can generate digital IDs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristSelectionModal;