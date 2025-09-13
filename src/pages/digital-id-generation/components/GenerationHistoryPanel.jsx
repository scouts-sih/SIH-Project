import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GenerationHistoryPanel = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const mockHistory = [
    {
      id: 'DID001',
      touristName: 'Rajesh Kumar Sharma',
      touristId: 'TG001',
      generatedAt: '11/09/2025 10:15:23',
      blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
      status: 'active',
      downloads: 2,
      transmissions: 1
    },
    {
      id: 'DID002',
      touristName: 'Priya Patel',
      touristId: 'TG002',
      generatedAt: '11/09/2025 09:45:12',
      blockchainHash: '0x9876543210fedcba0987654321fedcba09876543',
      status: 'active',
      downloads: 1,
      transmissions: 1
    },
    {
      id: 'DID003',
      touristName: 'Michael Johnson',
      touristId: 'TG003',
      generatedAt: '10/09/2025 16:30:45',
      blockchainHash: '0xabcdef1234567890abcdef1234567890abcdef12',
      status: 'expired',
      downloads: 3,
      transmissions: 2
    },
    {
      id: 'DID004',
      touristName: 'Sarah Williams',
      touristId: 'TG004',
      generatedAt: '10/09/2025 14:22:18',
      blockchainHash: '0x567890abcdef1234567890abcdef1234567890ab',
      status: 'active',
      downloads: 1,
      transmissions: 1
    }
  ];

  const periods = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success';
      case 'expired':
        return 'bg-warning/10 text-warning';
      case 'revoked':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const handleViewDetails = (id) => {
    console.log('View details for ID:', id);
  };

  const handleDownloadPDF = (id) => {
    console.log('Download PDF for ID:', id);
  };

  const handleViewOnBlockchain = (hash) => {
    console.log('View on blockchain:', hash);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Generation History</h2>
          <p className="text-sm text-muted-foreground">Recent digital ID generations and their status</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {periods?.map((period) => (
            <Button
              key={period?.value}
              variant={selectedPeriod === period?.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedPeriod(period?.value)}
            >
              {period?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Total Generated</span>
          </div>
          <p className="text-2xl font-bold text-foreground mt-1">247</p>
          <p className="text-xs text-muted-foreground">+12 today</p>
        </div>

        <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Active IDs</span>
          </div>
          <p className="text-2xl font-bold text-foreground mt-1">198</p>
          <p className="text-xs text-muted-foreground">80% active rate</p>
        </div>

        <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">Expired</span>
          </div>
          <p className="text-2xl font-bold text-foreground mt-1">42</p>
          <p className="text-xs text-muted-foreground">17% expired</p>
        </div>

        <div className="p-4 bg-muted/50 border border-border rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Download" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Downloads</span>
          </div>
          <p className="text-2xl font-bold text-foreground mt-1">156</p>
          <p className="text-xs text-muted-foreground">Avg 1.3 per ID</p>
        </div>
      </div>
      {/* History Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Tourist
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Generated At
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Blockchain Hash
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Usage
              </th>
              <th className="text-right py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {mockHistory?.map((record) => (
              <tr key={record?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="py-4 px-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{record?.touristName}</p>
                    <p className="text-xs text-muted-foreground">{record?.touristId}</p>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <p className="text-sm text-foreground">{record?.generatedAt}</p>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-2">
                    <p className="text-xs font-mono text-foreground">
                      {record?.blockchainHash?.substring(0, 12)}...
                    </p>
                    <button
                      onClick={() => handleViewOnBlockchain(record?.blockchainHash)}
                      className="text-primary hover:text-primary/80"
                    >
                      <Icon name="ExternalLink" size={12} />
                    </button>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(record?.status)}`}>
                    {record?.status}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <div className="text-xs text-muted-foreground">
                    <p>{record?.downloads} downloads</p>
                    <p>{record?.transmissions} transmissions</p>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewDetails(record?.id)}
                      className="w-8 h-8"
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownloadPDF(record?.id)}
                      className="w-8 h-8"
                    >
                      <Icon name="Download" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Showing {mockHistory?.length} of {mockHistory?.length} records
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <Icon name="ChevronLeft" size={14} />
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
            <Icon name="ChevronRight" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerationHistoryPanel;