import React from 'react'
import {
  Box,
  TextField,
  IconButton,
  Chip,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  ContentCopy,
  Share,
  Clear,
} from '@mui/icons-material'

interface TranslationBoxProps {
  inputText: string
  outputText: string
  inputPlaceholder: string
  outputPlaceholder: string
  translateButton: string
  characterCount: string
  onInputChange: (value: string) => void
  onClear: () => void
  onTranslate?: () => void
  onCopy?: () => void
  onShare?: () => void
}

const TranslationBox: React.FC<TranslationBoxProps> = ({
  inputText,
  outputText,
  inputPlaceholder,
  outputPlaceholder,
  translateButton,
  characterCount,
  onInputChange,
  onClear,
  onTranslate,
  onCopy,
  onShare,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
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
          placeholder={inputPlaceholder}
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
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
            <IconButton size="small" onClick={onClear}>
              <Clear />
            </IconButton>
          )}
          <Button
            variant="contained"
            size="small"
            disabled={!inputText.trim()}
            onClick={onTranslate}
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
            {translateButton}
          </Button>
        </Box>

        {/* Character Count */}
        {inputText && (
          <Box position="absolute" bottom={8} left={8}>
            <Chip 
              label={`${inputText.length} ${characterCount}`} 
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
          placeholder={outputPlaceholder}
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
            <IconButton size="small" onClick={onCopy}>
              <ContentCopy />
            </IconButton>
            <IconButton size="small" onClick={onShare}>
              <Share />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default TranslationBox
