import React from "react";
import {
  Box,
  TextField,
  IconButton,
  Chip,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { ContentCopy, Share, Clear, BugReport } from "@mui/icons-material";
import type { LlmDebugInfo } from "./LlmDebugDialog";

interface TranslationBoxProps {
  inputText: string;
  outputText: string;
  inputPlaceholder: string;
  outputPlaceholder: string;
  translateButton: string;
  characterCount: string;
  onInputChange: (value: string) => void;
  onClear: () => void;
  onTranslate?: () => void;
  onCopy?: () => void;
  onShare?: () => void;
  // LLM configuration status
  isLlmConfigured: boolean;
  llmNotConfiguredTooltip: string;
  // Loading state
  isTranslating?: boolean;
  // Debug info for errors
  debugInfo?: LlmDebugInfo | null;
  onDebugClick?: () => void;
  hasError?: boolean;
}

const TranslationBox: React.FC<TranslationBoxProps> = ({
  inputText,
  outputText,
  inputPlaceholder,
  outputPlaceholder,
  translateButton,
  characterCount,
  onInputChange,
  onClear,
  onTranslate,
  onCopy,
  onShare,
  isLlmConfigured,
  llmNotConfiguredTooltip,
  isTranslating = false,
  debugInfo,
  onDebugClick,
  hasError = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box className="translation-box-container">
      {/* Input Side */}
      <Box className="translation-box-side">
        <TextField
          multiline
          rows={isMobile ? 12 : 16}
          placeholder={inputPlaceholder}
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          className="translation-box-textarea"
        />
        {/* Input Controls */}
        <Box className="translation-box-controls">
          {inputText && (
            <IconButton size="small" onClick={onClear}>
              <Clear />
            </IconButton>
          )}
          <Tooltip
            title={!isLlmConfigured ? llmNotConfiguredTooltip : ""}
            arrow
            disableHoverListener={isLlmConfigured}
          >
            <span>
              {" "}
              <Button
                variant="contained"
                size="small"
                disabled={
                  !inputText.trim() || !isLlmConfigured || isTranslating
                }
                onClick={onTranslate}
                className="translation-box-translate-button"
              >
                {isTranslating ? "Translating..." : translateButton}
              </Button>
            </span>
          </Tooltip>
        </Box>

        {/* Character Count */}
        {inputText && (
          <Box className="translation-box-character-count">
            <Chip
              label={`${inputText.length} ${characterCount}`}
              size="small"
              variant="outlined"
            />
          </Box>
        )}
      </Box>

      {/* Divider */}
      <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />

      {/* Output Side */}
      <Box className="translation-box-side translation-box-output-side">
        <Box className="translation-box-output-container">
          <TextField
            multiline
            rows={isMobile ? 12 : 16}
            placeholder={outputPlaceholder}
            value={outputText}
            InputProps={{
              readOnly: true,
            }}
            className="translation-box-textarea translation-box-output-textarea"
          />
          {isTranslating && (
            <Box className="translation-box-loading-overlay">
              <CircularProgress size={40} />
            </Box>
          )}
        </Box>
        {/* Output Controls */}
        {outputText && (
          <Box className="translation-box-controls">
            {hasError && debugInfo && onDebugClick && (
              <Tooltip title="Show debug information" arrow>
                <IconButton size="small" onClick={onDebugClick}>
                  <BugReport />
                </IconButton>
              </Tooltip>
            )}
            <IconButton size="small" onClick={onCopy}>
              <ContentCopy />
            </IconButton>
            <IconButton size="small" onClick={onShare}>
              <Share />
            </IconButton>
          </Box>
        )}{" "}
      </Box>
    </Box>
  );
};

export default TranslationBox;
