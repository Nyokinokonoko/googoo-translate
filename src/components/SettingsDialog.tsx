import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from '@mui/material'

interface SettingsDialogProps {
  open: boolean
  onClose: () => void
  settingsTitle: string
  settingsPlaceholder: string
  settingsFeatures: string
  themeSettings: string
  translationSettings: string
  keyboardSettings: string
  closeButton: string
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onClose,
  settingsTitle,
  settingsPlaceholder,
  settingsFeatures,
  themeSettings,
  translationSettings,
  keyboardSettings,
  closeButton,
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {settingsTitle}
      </DialogTitle>      <DialogContent>
        <Typography variant="body1" className="settings-dialog-content">
          {settingsPlaceholder}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {settingsFeatures} 
        </Typography>
        <Box component="ul" className="settings-dialog-features-list">
          <Typography variant="body2" color="text.secondary" component="li">
            {themeSettings}
          </Typography>
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
