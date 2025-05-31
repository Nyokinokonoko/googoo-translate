import React, { useState } from "react";
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
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Visibility, VisibilityOff, InfoOutlined } from "@mui/icons-material";
import type { SelectChangeEvent } from "@mui/material";
import { useLanguage } from "../languageContext";

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  settingsTitle: string;
  generalSection: string;
  languageSettings: string;
  themeSettings: string;
  closeButton: string;
  currentLanguage: string;
  onLanguageChange: (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: string | null
  ) => void;
  themeMode: "light" | "dark" | "system";
  onThemeModeChange: (mode: "light" | "dark" | "system") => void;
  // LLM Settings
  llmProvider: "openai" | "openrouter" | "custom";
  onLlmProviderChange: (provider: "openai" | "openrouter" | "custom") => void;
  baseUrl: string;
  onBaseUrlChange: (url: string) => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  modelIdentifier: string;
  onModelIdentifierChange: (model: string) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onClose,
  settingsTitle,
  generalSection,
  languageSettings,
  themeSettings,
  closeButton,
  currentLanguage,
  onLanguageChange,
  themeMode,
  onThemeModeChange,
  // LLM Settings
  llmProvider,
  onLlmProviderChange,
  baseUrl,
  onBaseUrlChange,
  apiKey,
  onApiKeyChange,
  modelIdentifier,
  onModelIdentifierChange,
}) => {
  const { strings } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

  const handleThemeChange = (event: SelectChangeEvent<string>) => {
    onThemeModeChange(event.target.value as "light" | "dark" | "system");
  };
  const handleLlmProviderChange = (event: SelectChangeEvent<string>) => {
    const newProvider = event.target.value as
      | "openai"
      | "openrouter"
      | "custom";
    onLlmProviderChange(newProvider);

    // Update base URL when provider changes
    const newBaseUrl = getBaseUrlForProvider(newProvider);
    onBaseUrlChange(newBaseUrl);
  };
  const getBaseUrlForProvider = (
    provider: "openai" | "openrouter" | "custom"
  ) => {
    switch (provider) {
      case "openai":
        return "https://api.openai.com/v1";
      case "openrouter":
        return "https://openrouter.ai/api/v1";
      case "custom":
        return baseUrl; // Keep the current custom URL
      default:
        return baseUrl;
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{settingsTitle}</DialogTitle>
      <DialogContent>
        {/* General Section */}
        <Typography variant="h6" sx={{ mt: 1, mb: 2, fontWeight: "medium" }}>
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
              <ToggleButton value="en">EN</ToggleButton>
              <ToggleButton value="ja">日本語</ToggleButton>
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
          </Box>{" "}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* LLM Endpoint Section */}
        <Typography variant="h6" sx={{ mt: 1, mb: 2, fontWeight: "medium" }}>
          {strings.llmEndpointSection}
        </Typography>

        <Box sx={{ mb: 3 }}>
          {" "}
          {/* LLM Provider */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {strings.llmProvider}
              </Typography>
              <Tooltip title={strings.llmProviderTooltip} arrow>
                <InfoOutlined
                  sx={{
                    ml: 0.5,
                    fontSize: 16,
                    color: "text.secondary",
                    cursor: "help",
                  }}
                />
              </Tooltip>
            </Box>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                value={llmProvider}
                onChange={handleLlmProviderChange}
                displayEmpty
              >
                <MenuItem value="openai">{strings.openaiProvider}</MenuItem>
                <MenuItem value="openrouter">
                  {strings.openrouterProvider}
                </MenuItem>
                <MenuItem value="custom">{strings.customProvider}</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* Base URL */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {strings.baseUrl}
            </Typography>
            <TextField
              size="small"
              fullWidth
              value={getBaseUrlForProvider(llmProvider)}
              onChange={(e) => onBaseUrlChange(e.target.value)}
              disabled={llmProvider !== "custom"}
              placeholder="https://api.example.com/v1"
              sx={{ maxWidth: 400 }}
            />
          </Box>
          {/* API Key */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {strings.apiKey}
            </Typography>
            <TextField
              size="small"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              placeholder="sk-..."
              sx={{ maxWidth: 400 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {/* Model Identifier */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {strings.modelIdentifier}
            </Typography>
            <TextField
              size="small"
              fullWidth
              value={modelIdentifier}
              onChange={(e) => onModelIdentifierChange(e.target.value)}
              placeholder="gpt-4o-mini"
              sx={{ maxWidth: 400 }}
            />
          </Box>
          {/* LLM Endpoint Disclaimer */}
          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: "action.hover",
              borderRadius: 1,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.875rem", lineHeight: 1.4 }}
            >
              {strings.llmEndpointDisclaimer}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{closeButton}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
