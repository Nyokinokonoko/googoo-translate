import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Paper,
  Divider,
  useTheme,
} from "@mui/material";

export interface LlmDebugInfo {
  request: {
    systemPrompt: string;
    userPrompt: string;
    model: string;
    temperature: number;
    maxTokens: number;
    topP: number;
  };
  response: {
    content: string | null;
    error?: string;
    rawError?: any; // The original error object from the API
  };
}

interface LlmDebugDialogProps {
  open: boolean;
  onClose: () => void;
  debugInfo: LlmDebugInfo | null;
  title?: string;
  closeButton?: string;
}

const LlmDebugDialog: React.FC<LlmDebugDialogProps> = ({
  open,
  onClose,
  debugInfo,
  title = "LLM Debug Information",
  closeButton = "Close",
}) => {
  const theme = useTheme();
  if (!debugInfo) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", gap: 2, height: "60vh" }}>
          {/* Request Side */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Request
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                height: "calc(100% - 32px)",
                overflow: "auto",
                backgroundColor: "background.default",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                Model: {debugInfo.request.model}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Temperature: {debugInfo.request.temperature}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Max Tokens: {debugInfo.request.maxTokens}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Top P: {debugInfo.request.topP}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                System Prompt:
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 1,
                  mb: 2,
                  backgroundColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50',
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                  whiteSpace: "pre-wrap",
                }}
              >
                {debugInfo.request.systemPrompt}
              </Paper>
              
              <Typography variant="subtitle2" gutterBottom>
                User Prompt:
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 1,
                  backgroundColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50',
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                  whiteSpace: "pre-wrap",
                }}
              >
                {debugInfo.request.userPrompt}
              </Paper>
            </Paper>
          </Box>

          {/* Response Side */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Response
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                height: "calc(100% - 32px)",
                overflow: "auto",
                backgroundColor: "background.default",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {debugInfo.response.error ? (
                <>
                  <Typography variant="subtitle2" color="error" gutterBottom>
                    Error Message:
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1,
                      mb: 2,
                      backgroundColor: "error.light",
                      color: "error.contrastText",
                      fontFamily: "monospace",
                      fontSize: "0.875rem",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {debugInfo.response.error}
                  </Paper>
                  
                  {debugInfo.response.rawError && (
                    <>
                      <Typography variant="subtitle2" color="error" gutterBottom>
                        Raw API Response:
                      </Typography>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 1,
                          backgroundColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50',
                          fontFamily: "monospace",
                          fontSize: "0.875rem",
                          whiteSpace: "pre-wrap",
                          maxHeight: "300px",
                          overflow: "auto",
                          "&::-webkit-scrollbar": {
                            display: "none",
                          },
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        {JSON.stringify(debugInfo.response.rawError, null, 2)}
                      </Paper>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Typography variant="subtitle2" gutterBottom>
                    Content:
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1,
                      backgroundColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50',
                      fontFamily: "monospace",
                      fontSize: "0.875rem",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {debugInfo.response.content || "(No content)"}
                  </Paper>
                </>
              )}
            </Paper>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{closeButton}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LlmDebugDialog;