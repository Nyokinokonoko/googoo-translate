import React from 'react'
import { Typography } from '@mui/material'

interface DisclaimerProps {
  text: string
}

const Disclaimer: React.FC<DisclaimerProps> = ({ text }) => {
  return (
    <Typography 
      variant="body2" 
      color="text.secondary" 
      sx={{ 
        lineHeight: 1.6, 
        textAlign: 'center',
        backgroundColor: 'transparent'
      }}
    >
      {text.split('. ').map((sentence, index, array) => (
        <React.Fragment key={index}>
          {sentence}{index < array.length - 1 ? '.' : ''}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ))}
    </Typography>
  )
}

export default Disclaimer
