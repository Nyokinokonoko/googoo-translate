import { useState, useMemo } from 'react'
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
} from './components'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [toTransform, setToTransform] = useState('ja_formal_aggr')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  
  // Use language context
  const { strings, currentLanguage, setLanguage } = useLanguage()
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

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode)
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

  const disclaimerText = (
    <>
      Translations (text transformations) are powered by LLMs.<br />
      The project is mostly for entertainment purposes.<br />
      LLMs may provide inaccurate response, use the output responsibly with caution.
    </>
  )

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>        <Header
          title={strings.appTitle}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
          onSettingsOpen={handleSettingsOpen}
          darkMode={darkMode}
          onDarkModeToggle={handleDarkModeToggle}
        />        <Paper 
          elevation={1} 
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            border: `1px solid ${customTheme.palette.divider}`
          }}
        >
          <TransformSelector
            fromLabel={strings.fromLabel}
            toLabel={strings.toLabel}
            autoDetect={strings.autoDetect}
            toTransform={toTransform}
            japaneseTargets={japaneseTargets}
            englishTargets={englishTargets}
            getDisplayName={getDisplayName}
            onTransformChange={setToTransform}
          />

          <TranslationBox
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
            onShare={handleShare}
          />
        </Paper>

        <Footer disclaimer={disclaimerText} />

        <SettingsDialog
          open={settingsOpen}
          onClose={handleSettingsClose}
          settingsTitle={strings.settingsTitle}
          settingsPlaceholder={strings.settingsPlaceholder}
          settingsFeatures={strings.settingsFeatures}
          themeSettings={strings.themeSettings}
          translationSettings={strings.translationSettings}
          keyboardSettings={strings.keyboardSettings}
          closeButton={strings.closeButton}
        />
      </Container>
    </ThemeProvider>
  )
}

export default App