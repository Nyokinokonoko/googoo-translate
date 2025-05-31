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
  characterCount: string;  // Settings
  settingsTitle: string;
  generalSection: string;
  languageSettings: string;
  themeSettings: string;
    // Theme options
  darkMode: string;
  lightMode: string;
  systemDefault: string;
    // LLM Endpoint settings
  llmEndpointSection: string;
  llmProvider: string;
  llmProviderTooltip: string;
  baseUrl: string;
  apiKey: string;
  modelIdentifier: string;
  openaiProvider: string;
  openrouterProvider: string;  customProvider: string;
  showPassword: string;
  hidePassword: string;
  llmEndpointDisclaimer: string;
    // Helper function labels (from translationTargets.ts)
  helperFunctionDetectStyle: string;
  
  // Footer and metadata
  footerText: string;
  disclaimerText: string;
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
  generalSection: 'General',
  languageSettings: 'Language settings',
  themeSettings: 'Theme settings',
    // Theme options
  darkMode: 'Dark Mode',
  lightMode: 'Light Mode',
  systemDefault: 'System Default',
    // LLM Endpoint settings
  llmEndpointSection: 'LLM Endpoint',
  llmProvider: 'Provider',
  llmProviderTooltip: 'Only endpoints that are OpenAI compatible can be used.',
  baseUrl: 'Base URL',
  apiKey: 'API Key',
  modelIdentifier: 'Model Identifier',
  openaiProvider: 'OpenAI',
  openrouterProvider: 'OpenRouter',  customProvider: 'Custom',
  showPassword: 'Show',
  hidePassword: 'Hide',
  llmEndpointDisclaimer: 'Endpoint information provided in settings are stored locally. This page communicates directly to the endpoint provided and will not send these information to any other server.',
    // Helper function labels (from translationTargets.ts)
  helperFunctionDetectStyle: 'Detect style',
  
  // Footer and metadata
  footerText: 'Powered by AI • Transform text in creative ways',
  disclaimerText: 'This project is mostly for entertainment purposes. Translations (text transformations) are powered by LLMs. LLMs may provide inaccurate response, use the output responsibly with caution.',
};

// Helper function to get display string by key
export const getDisplayString = (key: keyof DisplayStrings): string => {
  return displayStrings[key];
};

// Helper function to format character count
export const formatCharacterCount = (count: number): string => {
  return `${count} ${displayStrings.characterCount}`;
};
