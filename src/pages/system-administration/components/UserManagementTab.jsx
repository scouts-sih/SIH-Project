import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const users = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@tourism.gov.in",
      role: "Tourism Officer",
      department: "Rajasthan Tourism",
      status: "active",
      lastLogin: "2025-01-11 09:15:00",
      permissions: ["view_tourists", "manage_incidents", "generate_reports"]
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@police.gov.in",
      role: "Police Administrator",
      department: "Delhi Police",
      status: "active",
      lastLogin: "2025-01-11 08:45:00",
      permissions: ["view_tourists", "manage_incidents", "emergency_response", "system_admin"]
    },
    {
      id: 3,
      name: "Mohammed Ali",
      email: "mohammed.ali@tourism.gov.in",
      role: "Entry Point Officer",
      department: "Airport Authority",
      status: "inactive",
      lastLogin: "2025-01-10 16:30:00",
      permissions: ["register_tourists", "view_tourists"]
    },
    {
      id: 4,
      name: "Anita Patel",
      email: "anita.patel@tourism.gov.in",
      role: "System Administrator",
      department: "IT Department",
      status: "active",
      lastLogin: "2025-01-11 10:00:00",
      permissions: ["full_access", "system_config", "user_management", "audit_logs"]
    },
    {
      id: 5,
      name: "Suresh Reddy",
      email: "suresh.reddy@tourism.gov.in",
      role: "Tourism Officer",
      department: "Andhra Pradesh Tourism",
      status: "suspended",
      lastLogin: "2025-01-09 14:20:00",
      permissions: ["view_tourists", "manage_incidents"]
    }
  ];

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'System Administrator', label: 'System Administrator' },
    { value: 'Tourism Officer', label: 'Tourism Officer' },
    { value: 'Police Administrator', label: 'Police Administrator' },
    { value: 'Entry Point Officer', label: 'Entry Point Officer' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'inactive':
        return 'bg-muted text-muted-foreground border-border';
      case 'suspended':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = !selectedRole || user?.role === selectedRole;
    const matchesStatus = !selectedStatus || user?.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">User Management</h3>
          <p className="text-sm text-muted-foreground">Manage user accounts, roles, and permissions</p>
        </div>
        <Button variant="default" iconName="UserPlus" iconPosition="left">
          Add New User
        </Button>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
        <Input
          type="search"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
        />
        <Select
          placeholder="Filter by role"
          options={roleOptions}
          value={selectedRole}
          onChange={setSelectedRole}
        />
        <Select
          placeholder="Filter by status"
          options={statusOptions}
          value={selectedStatus}
          onChange={setSelectedStatus}
        />
      </div>
      {/* Users Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">User</th>
                <th className="text-left p-4 font-medium text-foreground">Role & Department</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Last Login</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr key={user?.id} className="border-b border-border hover:bg-muted/30 transition-micro">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{user?.name}</div>
                        <div className="text-sm text-muted-foreground">{user?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-foreground">{user?.role}</div>
                      <div className="text-sm text-muted-foreground">{user?.department}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(user?.status)}`}>
                      {user?.status?.charAt(0)?.toUpperCase() + user?.status?.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-foreground">
                      {new Date(user.lastLogin)?.toLocaleDateString('en-IN')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(user.lastLogin)?.toLocaleTimeString('en-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" iconName="Edit" />
                      <Button variant="ghost" size="sm" iconName="Shield" />
                      <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Bulk Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="text-sm text-muted-foreground">
          Showing {filteredUsers?.length} of {users?.length} users
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export Users
          </Button>
          <Button variant="outline" size="sm" iconName="Upload">
            Bulk Import
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTab;