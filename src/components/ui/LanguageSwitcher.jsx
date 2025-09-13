import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

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
    { code: 'pa', name: 'Punjabi', flag: '🇮🇳', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'or', name: 'Odia', flag: '🇮🇳', nativeName: 'ଓଡ଼ିଆ' },
    { code: 'as', name: 'Assamese', flag: '🇮🇳', nativeName: 'অসমীয়া' },
  ];

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('touristguard-language');
    if (savedLanguage && languages?.find(lang => lang?.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('touristguard-language', languageCode);
    setIsOpen(false);
    
    // Trigger language change event for other components
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: languageCode } 
    }));
  };

  const getCurrentLanguage = () => {
    return languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Language Selector Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleDropdown}
        className="flex items-center space-x-2 min-w-0"
      >
        <span className="text-lg">{getCurrentLanguage()?.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">
          {getCurrentLanguage()?.name}
        </span>
        <Icon name="ChevronDown" size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      {/* Language Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-md shadow-elevated-hover z-200 max-h-80 overflow-y-auto">
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
          
          <div className="border-t border-border px-3 py-2">
            <div className="text-xs text-muted-foreground">
              Language preference is saved automatically
            </div>
          </div>
        </div>
      )}
      {/* Click outside overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-100"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSwitcher;