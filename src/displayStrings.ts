// Display strings extracted from interfaces and UI components
// This file centralizes all text content for easier localization and maintenance

export interface DisplayStrings {
  // App title and branding
  appTitle: string;
  
  // Form labels and placeholders
  fromLabel: string;
  toLabel: string;
  autoDetect: string;
  inputPlaceholder: string;
  outputPlaceholder: string;
  
  // Button labels
  translateButton: string;
  closeButton: string;
  
  // Status and feedback
  characterCount: string;
  
  // Settings
  settingsTitle: string;
  settingsPlaceholder: string;
  settingsFeatures: string;
  themeSettings: string;
  translationSettings: string;
  keyboardSettings: string;
  
  // Helper function labels (from translationTargets.ts)
  helperFunctionDetectStyle: string;
  
  // Footer and metadata
  footerText: string;
}

export const displayStrings: DisplayStrings = {
  // App title and branding
  appTitle: 'Googoo Translate',
  
  // Form labels and placeholders
  fromLabel: 'From',
  toLabel: 'To',
  autoDetect: 'Auto',
  inputPlaceholder: 'Enter text to transform...',
  outputPlaceholder: 'Transformation will appear here...',
  
  // Button labels
  translateButton: 'Translate',
  closeButton: 'Close',
  
  // Status and feedback
  characterCount: 'characters',
  
  // Settings
  settingsTitle: 'Settings',
  settingsPlaceholder: 'Settings options will be available here in a future update.',
  settingsFeatures: 'Planned features:',
  themeSettings: 'Theme settings',
  translationSettings: 'Translation preferences',
  keyboardSettings: 'Keyboard shortcuts',
  
  // Helper function labels (from translationTargets.ts)
  helperFunctionDetectStyle: 'Detect style',
  
  // Footer and metadata
  footerText: 'Powered by AI • Transform text in creative ways'
};

// Helper function to get display string by key
export const getDisplayString = (key: keyof DisplayStrings): string => {
  return displayStrings[key];
};

// Helper function to format character count
export const formatCharacterCount = (count: number): string => {
  return `${count} ${displayStrings.characterCount}`;
};
