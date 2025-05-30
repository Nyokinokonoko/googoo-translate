import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { useLanguage } from '../languageContext'

interface SettingsDialogProps {
  open: boolean
  onClose: () => void
  settingsTitle: string
  settingsPlaceholder: string
  settingsFeatures: string
  generalSection: string
  languageSettings: string
  themeSettings: string
  translationSettings: string
  keyboardSettings: string
  closeButton: string
  currentLanguage: string
  onLanguageChange: (event: React.MouseEvent<HTMLElement>, newLanguage: string | null) => void
  themeMode: 'light' | 'dark' | 'system'
  onThemeModeChange: (mode: 'light' | 'dark' | 'system') => void
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onClose,
  settingsTitle,
  settingsPlaceholder,
  settingsFeatures,
  generalSection,
  languageSettings,
  themeSettings,
  translationSettings,
  keyboardSettings,
  closeButton,
  currentLanguage,
  onLanguageChange,
  themeMode,
  onThemeModeChange,
}) => {
  const { strings } = useLanguage()
  const handleThemeChange = (event: SelectChangeEvent<string>) => {
    onThemeModeChange(event.target.value as 'light' | 'dark' | 'system')
  }
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {settingsTitle}
      </DialogTitle>
      <DialogContent>
        {/* General Section */}
        <Typography variant="h6" sx={{ mt: 1, mb: 2, fontWeight: 'medium' }}>
          {generalSection}
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          {/* Language Settings */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {languageSettings}
            </Typography>
            <ToggleButtonGroup
              value={currentLanguage}
              exclusive
              onChange={onLanguageChange}
              size="small"
            >
              <ToggleButton value="en">
                EN
              </ToggleButton>
              <ToggleButton value="ja">
                日本語
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
            {/* Theme Settings */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {themeSettings}
            </Typography>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                value={themeMode}
                onChange={handleThemeChange}
                displayEmpty
              >
                <MenuItem value="light">{strings.lightMode}</MenuItem>
                <MenuItem value="dark">{strings.darkMode}</MenuItem>
                <MenuItem value="system">{strings.systemDefault}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />
        
        {/* Future Features */}
        <Typography variant="body1" className="settings-dialog-content">
          {settingsPlaceholder}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {settingsFeatures} 
        </Typography>
        <Box component="ul" className="settings-dialog-features-list">
          <Typography variant="body2" color="text.secondary" component="li">
            {translationSettings}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="li">
            {keyboardSettings}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {closeButton}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SettingsDialog
