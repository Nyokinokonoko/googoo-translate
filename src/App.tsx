import { useState } from 'react'
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import {
  SwapHoriz,
  ContentCopy,
  Share,
  Clear,
  Settings
} from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { translationTargets } from './translationTargets'
import type { TranslationTarget } from './translationTargets'
import { useLanguage, getLocalizedDisplayName } from './languageContext'

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
})

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [toTransform, setToTransform] = useState('ja_formal_aggr')
  const [settingsOpen, setSettingsOpen] = useState(false)
    // Use language context
  const { strings, currentLanguage, setLanguage } = useLanguage()

  // Responsive breakpoint
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

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

  const handleSettingsOpen = () => {
    setSettingsOpen(true)
  }

  const handleSettingsClose = () => {
    setSettingsOpen(false)
  }

  return (
    <ThemeProvider theme={customTheme}>      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>        <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" component="h1" sx={{ fontWeight: 300, color: '#5f6368' }}>
            {strings.appTitle}
          </Typography>
          
          {/* Language Switcher and Settings */}
          <Box display="flex" alignItems="center" gap={1}>
            <ToggleButtonGroup
              value={currentLanguage}
              exclusive
              onChange={handleLanguageChange}
              size="small"
              sx={{ height: 'fit-content' }}
            >
              <ToggleButton value="en" sx={{ px: 2 }}>
                EN
              </ToggleButton>
              <ToggleButton value="ja" sx={{ px: 2 }}>
                日本語
              </ToggleButton>
            </ToggleButtonGroup>
            
            <IconButton 
              size="small" 
              onClick={handleSettingsOpen}
              sx={{ 
                color: '#5f6368',
                '&:hover': {
                  color: '#1976d2'
                }
              }}
            >
              <Settings />
            </IconButton>
          </Box>
        </Box>

        <Paper 
          elevation={1} 
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid #dadce0'
          }}
        >
          {/* Transform Type Selector */}
          <Box sx={{ p: 2, borderBottom: '1px solid #dadce0' }}>
            <Box 
              display="flex" 
              alignItems="center" 
              justifyContent="space-between" 
              gap={2}
              flexDirection={isMobile ? 'column' : 'row'}
            >              <FormControl 
                size="small" 
                sx={{ 
                  flex: 1, 
                  maxWidth: isMobile ? '100%' : 400,
                  minWidth: isMobile ? '100%' : 'auto'
                }} 
                disabled
              >                <InputLabel>{strings.fromLabel}</InputLabel>
                <Select
                  value="auto"
                  label={strings.fromLabel}
                >
                  <MenuItem value="auto">{strings.autoDetect}</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ px: isMobile ? 0 : 2, py: isMobile ? 1 : 0 }}>
                <SwapHoriz 
                  sx={{ 
                    color: '#5f6368', 
                    fontSize: 28,
                    transform: isMobile ? 'rotate(90deg)' : 'none'
                  }} 
                />
              </Box>              <FormControl 
                size="small" 
                sx={{ 
                  flex: 1, 
                  maxWidth: isMobile ? '100%' : 400,
                  minWidth: isMobile ? '100%' : 'auto'
                }}
              >
                <InputLabel>{strings.toLabel}</InputLabel>
                <Select
                  value={toTransform}
                  label={strings.toLabel}
                  onChange={(e) => setToTransform(e.target.value)}
                >
                  {japaneseTargets.map((target) => (
                    <MenuItem key={target.identifier} value={target.identifier}>
                      {getDisplayName(target)}
                    </MenuItem>
                  ))}
                  <Divider />
                  {englishTargets.map((target) => (
                    <MenuItem key={target.identifier} value={target.identifier}>
                      {getDisplayName(target)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Translation Box */}
          <Box 
            display="flex" 
            flexDirection={isMobile ? 'column' : 'row'}
            minHeight={isMobile ? 600 : 400}
          >
            {/* Input Side */}
            <Box 
              flex={1} 
              position="relative"
              minHeight={isMobile ? 300 : 'auto'}
            >              <TextField
                multiline
                rows={isMobile ? 12 : 16}
                placeholder={strings.inputPlaceholder}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    border: 'none',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': { border: 'none' },
                  },
                  '& .MuiInputBase-input': {
                    fontSize: '18px',
                    lineHeight: 1.5,
                  }
                }}
              />
              
              {/* Input Controls */}
              <Box 
                position="absolute" 
                bottom={8} 
                right={8} 
                display="flex" 
                gap={1}
                alignItems="center"
              >
                {inputText && (
                  <IconButton size="small" onClick={handleClear}>
                    <Clear />
                  </IconButton>
                )}                <Button
                  variant="contained"
                  size="small"
                  disabled={!inputText.trim()}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 2,
                    bgcolor: '#1976d2',
                    '&:hover': {
                      bgcolor: '#1565c0'
                    }
                  }}
                >
                  {strings.translateButton}
                </Button>
              </Box>              {/* Character Count */}
              {inputText && (
                <Box position="absolute" bottom={8} left={8}>
                  <Chip 
                    label={`${inputText.length} ${strings.characterCount}`} 
                    size="small" 
                    variant="outlined"
                  />
                </Box>
              )}
            </Box>

            {/* Divider */}
            <Divider 
              orientation={isMobile ? 'horizontal' : 'vertical'} 
              flexItem 
            />

            {/* Output Side */}
            <Box 
              flex={1} 
              position="relative" 
              bgcolor="#f8f9fa"
              minHeight={isMobile ? 300 : 'auto'}
            >              <TextField
                multiline
                rows={isMobile ? 12 : 16}
                placeholder={strings.outputPlaceholder}
                value={outputText}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    border: 'none',
                    bgcolor: 'transparent',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': { border: 'none' },
                  },
                  '& .MuiInputBase-input': {
                    fontSize: '18px',
                    lineHeight: 1.5,
                  }
                }}
              />

              {/* Output Controls */}
              {outputText && (
                <Box 
                  position="absolute" 
                  bottom={8} 
                  right={8} 
                  display="flex" 
                  gap={1}
                >
                  <IconButton size="small">
                    <ContentCopy />
                  </IconButton>
                  <IconButton size="small">
                    <Share />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>        </Paper>        {/* Disclaimer */}
        <Box textAlign="center" mt={3} mb={2}>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            Translations (text transformations) are powered by LLMs.<br />
            The project is mostly for entertainment purposes.<br />
            LLMs may provide inaccurate response, use the output responsibly with caution.
          </Typography>
        </Box>        {/* Footer */}
        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Made with 😢 by{' '}
            <a 
              href="https://x.com/nyokinokonoko" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: 'inherit', 
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#1976d2'}
              onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'inherit'}
            >
              Kenny Ha
            </a>
            {' '}with{' '}
            <a 
              href="https://github.com/features/copilot" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: 'inherit', 
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#1976d2'}
              onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'inherit'}
            >
              GitHub Copilot            </a>
          </Typography>
        </Box>        {/* Settings Dialog */}
        <Dialog 
          open={settingsOpen} 
          onClose={handleSettingsClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {strings.settingsTitle}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ py: 2 }}>
              {strings.settingsPlaceholder}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {strings.settingsFeatures} 
            </Typography>
            <Box component="ul" sx={{ mt: 1, pl: 2 }}>
              <Typography variant="body2" color="text.secondary" component="li">
                {strings.themeSettings}
              </Typography>
              <Typography variant="body2" color="text.secondary" component="li">
                {strings.translationSettings}
              </Typography>
              <Typography variant="body2" color="text.secondary" component="li">
                {strings.keyboardSettings}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSettingsClose}>
              {strings.closeButton}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  )
}

export default App
