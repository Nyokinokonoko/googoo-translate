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
  useMediaQuery
} from '@mui/material'
import {
  SwapHoriz,
  ContentCopy,
  Share,
  Clear
} from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { translationTargets } from './translationTargets'
import type { TranslationTarget } from './translationTargets'

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

  // Responsive breakpoint
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Group targets by base language for better organization
  const japaneseTargets = translationTargets.filter(target => target.baseLang === 'ja')
  const englishTargets = translationTargets.filter(target => target.baseLang === 'en')

  const getDisplayName = (target: TranslationTarget, isJapanese = false) => {
    return isJapanese ? target.dispJa : target.dispEn
  }

  const handleClear = () => {
    setInputText('')
    setOutputText('')
  }

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box mb={3}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 300, color: '#5f6368' }}>
            Googoo Translate
          </Typography>
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
            >
              <FormControl 
                size="small" 
                sx={{ 
                  flex: 1, 
                  maxWidth: isMobile ? '100%' : 400,
                  minWidth: isMobile ? '100%' : 'auto'
                }} 
                disabled
              >
                <InputLabel>From</InputLabel>
                <Select
                  value="auto"
                  label="From"
                >
                  <MenuItem value="auto">Auto</MenuItem>
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
              </Box>

              <FormControl 
                size="small" 
                sx={{ 
                  flex: 1, 
                  maxWidth: isMobile ? '100%' : 400,
                  minWidth: isMobile ? '100%' : 'auto'
                }}
              >
                <InputLabel>To</InputLabel>
                <Select
                  value={toTransform}
                  label="To"
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
            >
              <TextField
                multiline
                rows={isMobile ? 12 : 16}
                placeholder="Enter text to transform..."
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
                )}
                <Button
                  variant="contained"
                  size="small"
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
                  Translate
                </Button>
              </Box>

              {/* Character Count */}
              {inputText && (
                <Box position="absolute" bottom={8} left={8}>
                  <Chip 
                    label={`${inputText.length} characters`} 
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
            >
              <TextField
                multiline
                rows={isMobile ? 12 : 16}
                placeholder="Transformation will appear here..."
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
          </Box>
        </Paper>

        {/* Footer */}
        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="text.secondary">
            Powered by AI • Transform text in creative ways
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
