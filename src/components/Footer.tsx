import React from 'react'
import { Box, Typography } from '@mui/material'

interface FooterProps {
  disclaimer: React.ReactNode
}

const Footer: React.FC<FooterProps> = ({ disclaimer }) => {
  return (
    <>
      {/* Disclaimer */}
      <Box textAlign="center" mt={3} mb={2}>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          {disclaimer}
        </Typography>
      </Box>

      {/* Footer */}
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
            GitHub Copilot
          </a>
        </Typography>
      </Box>
    </>
  )
}

export default Footer
