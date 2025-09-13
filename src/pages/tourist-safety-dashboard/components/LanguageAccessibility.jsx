import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageAccessibility = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिंदी' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩', nativeName: 'বাংলা' },
    { code: 'te', name: 'Telugu', flag: '🇮🇳', nativeName: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', flag: '🇮🇳', nativeName: 'मराठी' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳', nativeName: 'தமிழ்' },
    { code: 'gu', name: 'Gujarati', flag: '🇮🇳', nativeName: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', flag: '🇮🇳', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', flag: '🇮🇳', nativeName: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', flag: '🇮🇳', nativeName: 'ਪੰਜਾਬੀ' }
  ];

  useEffect(() => {
    // Load saved preferences
    const savedLanguage = localStorage.getItem('touristguard-language');
    const savedContrast = localStorage.getItem('touristguard-contrast') === 'true';
    const savedFontSize = localStorage.getItem('touristguard-fontsize') || 'normal';

    if (savedLanguage) setCurrentLanguage(savedLanguage);
    setIsHighContrast(savedContrast);
    setFontSize(savedFontSize);

    // Apply contrast mode
    if (savedContrast) {
      document.documentElement?.classList?.add('high-contrast');
    }
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('touristguard-language', languageCode);
    setIsLanguageOpen(false);
    
    // Trigger language change event
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: languageCode } 
    }));
  };

  const toggleHighContrast = () => {
    const newContrast = !isHighContrast;
    setIsHighContrast(newContrast);
    localStorage.setItem('touristguard-contrast', newContrast?.toString());
    
    if (newContrast) {
      document.documentElement?.classList?.add('high-contrast');
    } else {
      document.documentElement?.classList?.remove('high-contrast');
    }
  };

  const changeFontSize = (size) => {
    setFontSize(size);
    localStorage.setItem('touristguard-fontsize', size);
    
    // Apply font size class
    document.documentElement?.classList?.remove('font-small', 'font-normal', 'font-large');
    document.documentElement?.classList?.add(`font-${size}`);
  };

  const getCurrentLanguage = () => {
    return languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Language Selector */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsLanguageOpen(!isLanguageOpen)}
          className="flex items-center space-x-2"
        >
          <span className="text-lg">{getCurrentLanguage()?.flag}</span>
          <span className="hidden sm:inline text-sm">
            {getCurrentLanguage()?.name}
          </span>
          <Icon name="ChevronDown" size={14} className={`transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
        </Button>

        {isLanguageOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-elevated-hover z-200 max-h-80 overflow-y-auto">
            <div className="py-2">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
                Select Language
              </div>
              
              {languages?.map((language) => (
                <button
                  key={language?.code}
                  onClick={() => handleLanguageChange(language?.code)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-sm transition-micro hover:bg-muted ${
                    currentLanguage === language?.code 
                      ? 'bg-accent text-accent-foreground' 
                      : 'text-popover-foreground'
                  }`}
                >
                  <span className="text-lg">{language?.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{language?.name}</div>
                    <div className="text-xs opacity-75">{language?.nativeName}</div>
                  </div>
                  {currentLanguage === language?.code && (
                    <Icon name="Check" size={16} className="text-accent-foreground" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Accessibility Options */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
          className="flex items-center space-x-1"
        >
          <Icon name="Accessibility" size={16} />
          <Icon name="ChevronDown" size={14} className={`transition-transform ${isAccessibilityOpen ? 'rotate-180' : ''}`} />
        </Button>

        {isAccessibilityOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-popover border border-border rounded-lg shadow-elevated-hover z-200">
            <div className="p-4">
              <div className="text-sm font-semibold text-foreground mb-3">
                Accessibility Options
              </div>
              
              {/* High Contrast Toggle */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm font-medium text-foreground">High Contrast</div>
                  <div className="text-xs text-muted-foreground">Improve text visibility</div>
                </div>
                <button
                  onClick={toggleHighContrast}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    isHighContrast ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    isHighContrast ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Font Size Options */}
              <div className="mb-4">
                <div className="text-sm font-medium text-foreground mb-2">Text Size</div>
                <div className="flex space-x-2">
                  {['small', 'normal', 'large']?.map((size) => (
                    <button
                      key={size}
                      onClick={() => changeFontSize(size)}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-micro ${
                        fontSize === size
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {size === 'small' ? 'A' : size === 'normal' ? 'A' : 'A'}
                      <span className="ml-1 capitalize">{size}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Commands Info */}
              <div className="border-t border-border pt-3">
                <div className="text-sm font-medium text-foreground mb-1">Voice Commands</div>
                <div className="text-xs text-muted-foreground">
                  Say "Emergency" or "Help" to activate SOS
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Click outside overlays */}
      {(isLanguageOpen || isAccessibilityOpen) && (
        <div
          className="fixed inset-0 z-100"
          onClick={() => {
            setIsLanguageOpen(false);
            setIsAccessibilityOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default LanguageAccessibility;