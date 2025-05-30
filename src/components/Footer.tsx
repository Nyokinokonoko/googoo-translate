import React from 'react'
import { Box, Typography } from '@mui/material'

interface FooterProps {
  disclaimer: React.ReactNode
}

const Footer: React.FC<FooterProps> = ({ disclaimer }) => {
  return (
    <>
      {/* Disclaimer */}
      <Box className="footer-disclaimer">
        <Typography variant="body2" color="text.secondary" className="footer-disclaimer-text">
          {disclaimer}
        </Typography>
      </Box>

      {/* Footer */}
      <Box className="footer-content">
        <Typography variant="body2" color="text.secondary">
          Made with 😢 by{' '}
          <a 
            href="https://x.com/nyokinokonoko" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Kenny Ha
          </a>
          {' '}with{' '}
          <a 
            href="https://github.com/features/copilot" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub Copilot
          </a>
        </Typography>
      </Box>
    </>
  )
}

export default Footer
