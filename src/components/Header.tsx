import React from 'react'
import {
  Box,
  Typography,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
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
  return (
    <Box className="header-container">
      <Typography variant="h4" component="h1" className="header-title">
        {title}
      </Typography>
      
      <Box className="header-controls">
        <IconButton 
          size="small" 
          onClick={onDarkModeToggle}
          className="header-icon-button"
        >
          {darkMode ? <LightMode /> : <DarkMode />}
        </IconButton>
        
        <ToggleButtonGroup
          value={currentLanguage}
          exclusive
          onChange={onLanguageChange}
          size="small"
          className="header-language-toggle"
        >
          <ToggleButton value="en" className="header-language-button">
            EN
          </ToggleButton>
          <ToggleButton value="ja" className="header-language-button">
            日本語
          </ToggleButton>
        </ToggleButtonGroup>
        
        <IconButton 
          size="small" 
          onClick={onSettingsOpen}
          className="header-icon-button"
        >
          <Settings />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Header
