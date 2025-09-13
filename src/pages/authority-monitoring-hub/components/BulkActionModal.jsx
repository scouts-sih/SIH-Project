import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const BulkActionModal = ({ isOpen, onClose, actionType, selectedTourists, touristData, onConfirm }) => {
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('general');
  const [priority, setPriority] = useState('medium');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const getSelectedTouristNames = () => {
    return selectedTourists?.map(id => {
      const tourist = touristData?.find(t => t?.id === id);
      return tourist ? tourist?.name : 'Unknown';
    })?.join(', ');
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    
    const actionData = {
      type: actionType,
      touristIds: selectedTourists,
      message: message,
      alertType: alertType,
      priority: priority,
      timestamp: new Date()?.toISOString()
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onConfirm(actionData);
    setIsProcessing(false);
    handleClose();
  };

  const handleClose = () => {
    setMessage('');
    setAlertType('general');
    setPriority('medium');
    setIsProcessing(false);
    onClose();
  };

  const getModalTitle = () => {
    switch (actionType) {
      case 'message': return 'Send Message to Tourists';
      case 'alert': return 'Send Alert to Tourists';
      case 'emergency': return 'Initiate Emergency Protocol';
      default: return 'Bulk Action';
    }
  };

  const getModalIcon = () => {
    switch (actionType) {
      case 'message': return 'MessageSquare';
      case 'alert': return 'AlertTriangle';
      case 'emergency': return 'Phone';
      default: return 'Users';
    }
  };

  const getConfirmButtonText = () => {
    switch (actionType) {
      case 'message': return 'Send Message';
      case 'alert': return 'Send Alert';
      case 'emergency': return 'Initiate Emergency';
      default: return 'Confirm';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-400 p-4">
      <div className="bg-card rounded-lg shadow-elevated-hover max-w-2xl w-full">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                actionType === 'emergency' ? 'bg-red-100' :
                actionType === 'alert' ? 'bg-yellow-100' : 'bg-blue-100'
              }`}>
                <Icon 
                  name={getModalIcon()} 
                  size={20} 
                  className={
                    actionType === 'emergency' ? 'text-red-600' :
                    actionType === 'alert' ? 'text-yellow-600' : 'text-blue-600'
                  }
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{getModalTitle()}</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedTourists?.length} tourist{selectedTourists?.length > 1 ? 's' : ''} selected
                </p>
              </div>
            </div>
            <Button variant="ghost" onClick={handleClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Selected Tourists */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Selected Tourists</label>
            <div className="bg-muted/50 rounded-lg p-3 max-h-32 overflow-y-auto">
              <div className="text-sm text-foreground">
                {getSelectedTouristNames()}
              </div>
            </div>
          </div>

          {/* Action Type Specific Fields */}
          {actionType === 'alert' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Alert Type</label>
                <select
                  value={alertType}
                  onChange={(e) => setAlertType(e?.target?.value)}
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="general">General Alert</option>
                  <option value="safety">Safety Warning</option>
                  <option value="weather">Weather Alert</option>
                  <option value="security">Security Notice</option>
                  <option value="evacuation">Evacuation Order</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e?.target?.value)}
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
          )}

          {/* Message */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              {actionType === 'message' ? 'Message' : 
               actionType === 'alert'? 'Alert Message' : 'Emergency Instructions'}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              placeholder={
                actionType === 'message' ? 'Enter your message to tourists...' :
                actionType === 'alert'? 'Enter alert details and instructions...' : 'Enter emergency instructions and contact information...'
              }
              rows={4}
              className="w-full p-3 border border-border rounded-md bg-background text-foreground resize-none"
              required
            />
            <div className="text-xs text-muted-foreground mt-1">
              {message?.length}/500 characters
            </div>
          </div>

          {/* Emergency Protocol Info */}
          {actionType === 'emergency' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-red-800 mb-2">Emergency Protocol</h4>
                  <ul className="text-xs text-red-700 space-y-1">
                    <li>• Emergency services will be automatically notified</li>
                    <li>• Tourist locations will be shared with rescue teams</li>
                    <li>• Emergency contacts will receive immediate notifications</li>
                    <li>• Incident reports will be generated automatically</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Preview */}
          {message && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Message Preview</label>
              <div className="bg-muted/50 border border-border rounded-lg p-3">
                <div className="text-sm text-foreground whitespace-pre-wrap">{message}</div>
                <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
                  Will be sent to {selectedTourists?.length} tourist{selectedTourists?.length > 1 ? 's' : ''} • {new Date()?.toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-end space-x-3">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              variant={actionType === 'emergency' ? 'destructive' : 'default'}
              onClick={handleConfirm}
              disabled={!message?.trim() || isProcessing}
              loading={isProcessing}
            >
              {isProcessing ? 'Processing...' : getConfirmButtonText()}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionModal;