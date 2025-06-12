import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Settings } from "@mui/icons-material";

interface HeaderProps {
  title: string;
  onSettingsOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onSettingsOpen }) => {
  return (
    <Box className="header-container">
      <Typography variant="h4" component="h1" className="header-title">
        {title}
      </Typography>

      <Box className="header-controls">
        <IconButton
          size="small"
          onClick={onSettingsOpen}
          className="header-icon-button"
        >
          <Settings />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
