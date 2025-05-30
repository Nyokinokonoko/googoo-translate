import React from 'react'
import {
  Box,
  Typography,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { Settings } from '@mui/icons-material'

interface HeaderProps {
  title: string
  currentLanguage: string
  onLanguageChange: (event: React.MouseEvent<HTMLElement>, newLanguage: string | null) => void
  onSettingsOpen: () => void
}

const Header: React.FC<HeaderProps> = ({
  title,
  currentLanguage,
  onLanguageChange,
  onSettingsOpen,
}) => {
  return (
    <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h4" component="h1" sx={{ fontWeight: 300, color: '#5f6368' }}>
        {title}
      </Typography>
      
      {/* Language Switcher and Settings */}
      <Box display="flex" alignItems="center" gap={1}>
        <ToggleButtonGroup
          value={currentLanguage}
          exclusive
          onChange={onLanguageChange}
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
          onClick={onSettingsOpen}
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
  )
}

export default Header
