import React from 'react'
import { Typography } from '@mui/material'

interface DisclaimerProps {
  text: string
}

const Disclaimer: React.FC<DisclaimerProps> = ({ text }) => {
  // Split by both English and Japanese sentence endings
  // Handle both '. ' (English) and '。' (Japanese) as sentence separators
  let sentences: string[] = [];
  
  if (text.includes('。')) {
    // Japanese text: split on Japanese full stop
    sentences = text.split('。').filter(sentence => sentence.trim()).map(sentence => sentence.trim() + '。');
    // Remove the extra '。' from the last sentence if it was added
    if (sentences.length > 0 && sentences[sentences.length - 1].endsWith('。。')) {
      sentences[sentences.length - 1] = sentences[sentences.length - 1].slice(0, -1);
    }
  } else {
    // English text: split on '. '
    sentences = text.split('. ').filter(sentence => sentence.trim());
    // Add periods back except for the last sentence
    sentences = sentences.map((sentence, index, array) => 
      sentence.trim() + (index < array.length - 1 ? '.' : '')
    );
  }
    return (
    <Typography 
      variant="body2" 
      color="text.secondary" 
      sx={{ 
        lineHeight: 1.6, 
        textAlign: 'center',
        backgroundColor: 'transparent',
        paddingTop: 2,
        paddingBottom: 2
      }}
    >
      {sentences.map((sentence, index, array) => (
        <React.Fragment key={index}>
          {sentence.trim()}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ))}
    </Typography>
  )
}

export default Disclaimer
