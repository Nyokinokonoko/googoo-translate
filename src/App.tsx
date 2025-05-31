import { useState, useMemo, useEffect } from 'react'
import {
  Container,
  Paper,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { translationTargets } from './translationTargets'
import type { TranslationTarget } from './translationTargets'
import { useLanguage, getLocalizedDisplayName } from './languageContext'
import {
  Header,
  TransformSelector,
  TranslationBox,
  SettingsDialog,
  Footer,
  Disclaimer,
} from './components'
import './styles/index.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [toTransform, setToTransform] = useState('ja_formal_aggr')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('system')
  const [systemPrefersDark, setSystemPrefersDark] = useState(false)
  
  // LLM Settings
  const [llmProvider, setLlmProvider] = useState<'openai' | 'openrouter' | 'custom'>('openai')
  const [baseUrl, setBaseUrl] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [modelIdentifier, setModelIdentifier] = useState('gpt-4o-mini')
  
  // Use language context
  const { strings, currentLanguage, setLanguage } = useLanguage()

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemPrefersDark(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Determine actual dark mode based on theme mode
  const darkMode = useMemo(() => {
    switch (themeMode) {
      case 'dark':
        return true
      case 'light':
        return false
      case 'system':
        return systemPrefersDark
      default:
        return false
    }
  }, [themeMode, systemPrefersDark])
  // Create dynamic theme based on dark mode
  const customTheme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      background: {
        default: darkMode ? '#1a1a1a' : '#f5f5f5',
        paper: darkMode ? '#2d2d2d' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#e0e0e0' : 'rgba(0, 0, 0, 0.87)',
        secondary: darkMode ? '#b3b3b3' : 'rgba(0, 0, 0, 0.6)',
      },
      divider: darkMode ? '#404040' : 'rgba(0, 0, 0, 0.12)',
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-input': {
              color: darkMode ? '#e0e0e0' : 'rgba(0, 0, 0, 0.87)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#404040' : 'rgba(0, 0, 0, 0.08)',
            color: darkMode ? '#e0e0e0' : 'rgba(0, 0, 0, 0.87)',
            border: darkMode ? '1px solid #555' : '1px solid rgba(0, 0, 0, 0.23)',
          },
        },
      },
    },
  }), [darkMode])

  // Group targets by base language for better organization
  const japaneseTargets = translationTargets.filter(target => target.baseLang === 'ja')
  const englishTargets = translationTargets.filter(target => target.baseLang === 'en')

  const getDisplayName = (target: TranslationTarget) => {
    return getLocalizedDisplayName(target, currentLanguage)
  }
  const handleClear = () => {
    setInputText('')
    setOutputText('')
  }
  
  const handleLanguageChange = (_event: React.MouseEvent<HTMLElement>, newLanguage: string | null) => {
    if (newLanguage === 'en' || newLanguage === 'ja') {
      setLanguage(newLanguage)
    }
  }
  
  const handleThemeModeChange = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode)
  }

  const handleLlmProviderChange = (provider: 'openai' | 'openrouter' | 'custom') => {
    setLlmProvider(provider)
  }

  const handleBaseUrlChange = (url: string) => {
    setBaseUrl(url)
  }

  const handleApiKeyChange = (key: string) => {
    setApiKey(key)
  }

  const handleModelIdentifierChange = (model: string) => {
    setModelIdentifier(model)
  }

  const handleSettingsOpen = () => {
    setSettingsOpen(true)
  }

  const handleSettingsClose = () => {
    setSettingsOpen(false)
  }

  const handleTranslate = () => {
    // TODO: Implement translation logic
    console.log('Translate:', inputText, 'to', toTransform)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText)
  }
  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share:', outputText)
  }

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <div data-theme={darkMode ? 'dark' : 'light'}>
        <Container maxWidth="lg" className="app-container">          <Header
            title={strings.appTitle}
            onSettingsOpen={handleSettingsOpen}
          />

          <Paper elevation={1} className="app-paper">
            <TransformSelector
              fromLabel={strings.fromLabel}
              toLabel={strings.toLabel}
              autoDetect={strings.autoDetect}
              toTransform={toTransform}
              japaneseTargets={japaneseTargets}
              englishTargets={englishTargets}
              getDisplayName={getDisplayName}
              onTransformChange={setToTransform}
            />            <TranslationBox
              inputText={inputText}
              outputText={outputText}
              inputPlaceholder={strings.inputPlaceholder}
              outputPlaceholder={strings.outputPlaceholder}
              translateButton={strings.translateButton}
              characterCount={strings.characterCount}
              onInputChange={setInputText}
              onClear={handleClear}
              onTranslate={handleTranslate}
              onCopy={handleCopy}
              onShare={handleShare}            />
          </Paper>
          <Disclaimer text={strings.disclaimerText} />
          <Footer />          <SettingsDialog
            open={settingsOpen}
            onClose={handleSettingsClose}
            settingsTitle={strings.settingsTitle}
            settingsPlaceholder={strings.settingsPlaceholder}
            settingsFeatures={strings.settingsFeatures}
            generalSection={strings.generalSection}
            languageSettings={strings.languageSettings}
            themeSettings={strings.themeSettings}
            translationSettings={strings.translationSettings}
            keyboardSettings={strings.keyboardSettings}
            closeButton={strings.closeButton}
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            themeMode={themeMode}
            onThemeModeChange={handleThemeModeChange}
            llmProvider={llmProvider}
            onLlmProviderChange={handleLlmProviderChange}
            baseUrl={baseUrl}
            onBaseUrlChange={handleBaseUrlChange}
            apiKey={apiKey}
            onApiKeyChange={handleApiKeyChange}
            modelIdentifier={modelIdentifier}
            onModelIdentifierChange={handleModelIdentifierChange}
          />
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default App