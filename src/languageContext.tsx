// Language context and hook for managing internationalization
// 国際化のための言語コンテキストとフック

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { displayStrings } from './displayStrings';
import { displayStringsJa } from './displayStrings.ja';
import type { DisplayStrings } from './displayStrings';

export type Language = 'en' | 'ja';

interface LanguageContextType {
  currentLanguage: Language;
  strings: DisplayStrings;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const getStrings = (language: Language): DisplayStrings => {
    switch (language) {
      case 'ja':
        return displayStringsJa;
      case 'en':
      default:
        return displayStrings;
    }
  };

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const value: LanguageContextType = {
    currentLanguage,
    strings: getStrings(currentLanguage),
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Helper function to get translated display name for translation targets
export function getLocalizedDisplayName(
  target: { dispEn: string; dispJa: string },
  language: Language
): string {
  return language === 'ja' ? target.dispJa : target.dispEn;
}
