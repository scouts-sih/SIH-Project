import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TouristSummaryPanel = ({ touristData, onEdit }) => {
  if (!touristData) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Icon name="UserX" size={48} className="mx-auto mb-4 opacity-50" />
          <p>No tourist data selected</p>
          <p className="text-sm">Please select a tourist to generate digital ID</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Tourist Summary</h2>
        <button
          onClick={onEdit}
          className="text-primary hover:text-primary/80 transition-colors"
        >
          <Icon name="Edit2" size={16} />
        </button>
      </div>
      {/* Photo and Basic Info */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="relative">
          <Image
            src={touristData?.photo}
            alt={`${touristData?.name} photo`}
            className="w-20 h-20 rounded-lg object-cover border-2 border-border"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card flex items-center justify-center">
            <Icon name="Check" size={10} color="white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-foreground">{touristData?.name}</h3>
          <p className="text-sm text-muted-foreground mb-1">{touristData?.nationality}</p>
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2 py-1 bg-success/10 text-success rounded-full">
              Verified
            </span>
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
              {touristData?.idType}
            </span>
          </div>
        </div>
      </div>
      {/* Personal Details */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Date of Birth
            </label>
            <p className="text-sm font-medium text-foreground">{touristData?.dateOfBirth}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Gender
            </label>
            <p className="text-sm font-medium text-foreground">{touristData?.gender}</p>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Document Number
          </label>
          <p className="text-sm font-medium text-foreground font-mono">{touristData?.documentNumber}</p>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Contact Information
          </label>
          <div className="space-y-1">
            <p className="text-sm text-foreground flex items-center space-x-2">
              <Icon name="Phone" size={14} />
              <span>{touristData?.phone}</span>
            </p>
            <p className="text-sm text-foreground flex items-center space-x-2">
              <Icon name="Mail" size={14} />
              <span>{touristData?.email}</span>
            </p>
          </div>
        </div>
      </div>
      {/* Registration Details */}
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-medium text-foreground mb-3">Registration Details</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Registration Date</span>
            <span className="text-xs font-medium text-foreground">{touristData?.registrationDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Entry Point</span>
            <span className="text-xs font-medium text-foreground">{touristData?.entryPoint}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Duration of Stay</span>
            <span className="text-xs font-medium text-foreground">{touristData?.stayDuration}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Purpose of Visit</span>
            <span className="text-xs font-medium text-foreground">{touristData?.visitPurpose}</span>
          </div>
        </div>
      </div>
      {/* Verification Status */}
      <div className="mt-6 p-3 bg-success/5 border border-success/20 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="ShieldCheck" size={16} className="text-success" />
          <span className="text-sm font-medium text-success">KYC Verification Complete</span>
        </div>
        <p className="text-xs text-success/80 mt-1">
          All documents verified and approved for digital ID generation
        </p>
      </div>
    </div>
  );
};

export default TouristSummaryPanel;