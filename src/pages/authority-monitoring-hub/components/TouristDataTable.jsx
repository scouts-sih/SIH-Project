import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TouristDataTable = ({ tourists, onTouristSelect, onBulkAction }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'lastCheckIn', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTourists, setSelectedTourists] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and sort tourists
  const filteredAndSortedTourists = useMemo(() => {
    let filtered = tourists?.filter(tourist =>
      tourist?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      tourist?.currentLocation?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      tourist?.digitalId?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'lastCheckIn') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [tourists, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTourists?.length / itemsPerPage);
  const paginatedTourists = filteredAndSortedTourists?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedTourists(new Set(paginatedTourists.map(t => t.id)));
    } else {
      setSelectedTourists(new Set());
    }
  };

  const handleSelectTourist = (touristId, checked) => {
    const newSelected = new Set(selectedTourists);
    if (checked) {
      newSelected?.add(touristId);
    } else {
      newSelected?.delete(touristId);
    }
    setSelectedTourists(newSelected);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Inactive' },
      emergency: { bg: 'bg-red-100', text: 'text-red-800', label: 'Emergency' },
      missing: { bg: 'bg-red-100', text: 'text-red-800', label: 'Missing' }
    };
    const config = statusConfig?.[status] || statusConfig?.inactive;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        {config?.label}
      </span>
    );
  };

  const getSafetyScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatLastCheckIn = (date) => {
    const now = new Date();
    const checkIn = new Date(date);
    const diffMinutes = Math.floor((now - checkIn) / (1000 * 60));
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return `${Math.floor(diffMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevated">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Tourist Registry</h3>
          <div className="flex items-center space-x-2">
            {selectedTourists?.size > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onBulkAction('message', Array.from(selectedTourists))}
                >
                  <Icon name="MessageSquare" size={16} />
                  <span>Message ({selectedTourists?.size})</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onBulkAction('alert', Array.from(selectedTourists))}
                >
                  <Icon name="AlertTriangle" size={16} />
                  <span>Alert</span>
                </Button>
              </>
            )}
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} />
              <span className="hidden sm:inline ml-1">Export</span>
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search tourists by name, location, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredAndSortedTourists?.length} of {tourists?.length} tourists
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedTourists?.size === paginatedTourists?.length && paginatedTourists?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Tourist</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('currentLocation')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Location</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('safetyScore')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Safety Score</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('lastCheckIn')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Last Check-in</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Status</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="p-3 text-left text-sm font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTourists?.map((tourist) => (
              <tr key={tourist?.id} className="border-t border-border hover:bg-muted/30">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedTourists?.has(tourist?.id)}
                    onChange={(e) => handleSelectTourist(tourist?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} color="var(--color-primary)" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{tourist?.name}</div>
                      <div className="text-xs text-muted-foreground">{tourist?.digitalId}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{tourist?.currentLocation}</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <div className={`text-sm font-medium ${getSafetyScoreColor(tourist?.safetyScore)}`}>
                      {tourist?.safetyScore}%
                    </div>
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          tourist?.safetyScore >= 80 ? 'bg-green-500' :
                          tourist?.safetyScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${tourist?.safetyScore}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-foreground">{formatLastCheckIn(tourist?.lastCheckIn)}</div>
                </td>
                <td className="p-3">
                  {getStatusBadge(tourist?.status)}
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onTouristSelect(tourist)}
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onBulkAction('message', [tourist?.id])}
                    >
                      <Icon name="MessageSquare" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onBulkAction('alert', [tourist?.id])}
                    >
                      <Icon name="AlertTriangle" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedTourists?.length)} of {filteredAndSortedTourists?.length} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <Icon name="ChevronLeft" size={16} />
                <span>Previous</span>
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <span>Next</span>
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TouristDataTable;