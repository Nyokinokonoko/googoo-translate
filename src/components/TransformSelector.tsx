import React from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { SwapHoriz } from '@mui/icons-material'
import type { TranslationTarget } from '../translationTargets'

interface TransformSelectorProps {
  fromLabel: string
  toLabel: string
  autoDetect: string
  toTransform: string
  japaneseTargets: TranslationTarget[]
  englishTargets: TranslationTarget[]
  getDisplayName: (target: TranslationTarget) => string
  onTransformChange: (value: string) => void
}

const TransformSelector: React.FC<TransformSelectorProps> = ({
  fromLabel,
  toLabel,
  autoDetect,
  toTransform,
  japaneseTargets,
  englishTargets,
  getDisplayName,
  onTransformChange,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
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
          <InputLabel>{fromLabel}</InputLabel>
          <Select
            value="auto"
            label={fromLabel}
          >
            <MenuItem value="auto">{autoDetect}</MenuItem>
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
          <InputLabel>{toLabel}</InputLabel>
          <Select
            value={toTransform}
            label={toLabel}
            onChange={(e) => onTransformChange(e.target.value)}
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
  )
}

export default TransformSelector
