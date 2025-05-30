import React from 'react'
import {
  Box,
  Typography,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from '@mui/material'
import { Settings, DarkMode, LightMode } from '@mui/icons-material'

interface HeaderProps {
  title: string
  currentLanguage: string
  onLanguageChange: (event: React.MouseEvent<HTMLElement>, newLanguage: string | null) => void
  onSettingsOpen: () => void
  darkMode: boolean
  onDarkModeToggle: () => void
}

const Header: React.FC<HeaderProps> = ({
  title,
  currentLanguage,
  onLanguageChange,
  onSettingsOpen,
  darkMode,
  onDarkModeToggle,
}) => {
  const theme = useTheme()
  
  return (
    <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          fontWeight: 300, 
          color: theme.palette.text.secondary 
        }}
      >
        {title}
      </Typography>
        {/* Dark Mode Toggle, Language Switcher and Settings */}
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton 
          size="small" 
          onClick={onDarkModeToggle}
          sx={{ 
            color: theme.palette.text.secondary,
            '&:hover': {
              color: theme.palette.primary.main
            }
          }}
        >
          {darkMode ? <LightMode /> : <DarkMode />}
        </IconButton>
        
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
            color: theme.palette.text.secondary,
            '&:hover': {
              color: theme.palette.primary.main
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
