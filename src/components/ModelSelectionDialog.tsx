import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Typography,
  Box,
  Alert,
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { fetchModels, type ModelInfo } from "../llm/modelService";

interface ModelSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (modelId: string) => void;
  provider: string;
  apiKey?: string;
  currentModel?: string;
  title?: string;
  cancelButton?: string;
}

const ModelSelectionDialog: React.FC<ModelSelectionDialogProps> = ({
  open,
  onClose,
  onSelect,
  provider,
  apiKey,
  currentModel,
  title = "Select Model",
  cancelButton = "Cancel",
}) => {
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter models based on search query
  const filteredModels = models.filter((model) =>
    model.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (model.name && model.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const loadModels = async () => {
    if (!open) return;
    
    setLoading(true);
    setError("");
    
    try {
      const result = await fetchModels(provider, apiKey);
      
      if (result.error) {
        setError(result.error);
        setModels([]);
      } else {
        setModels(result.models);
      }
    } catch (err) {
      setError("Failed to load models");
      setModels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadModels();
      setSearchQuery("");
    }
  }, [open, provider, apiKey]);

  const handleSelect = (modelId: string) => {
    onSelect(modelId);
    onClose();
  };

  const formatPrice = (price?: number) => {
    if (!price) return "";
    return `$${(price * 1000000).toFixed(2)}/1M tokens`;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title} - {provider}</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            size="small"
          />
        </Box>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
            {provider === "OpenAI" && error.includes("API key") && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Please ensure your OpenAI API key is correctly configured in the settings.
              </Typography>
            )}
          </Alert>
        )}

        {!loading && !error && filteredModels.length === 0 && models.length > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
            No models found matching "{searchQuery}"
          </Typography>
        )}

        {!loading && !error && filteredModels.length === 0 && models.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
            No models available
          </Typography>
        )}

        {!loading && !error && filteredModels.length > 0 && (
          <List sx={{ maxHeight: "400px", overflow: "auto" }}>
            {filteredModels.map((model) => (
              <ListItem key={model.id} disablePadding>
                <ListItemButton
                  selected={model.id === currentModel}
                  onClick={() => handleSelect(model.id)}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "primary.light",
                      "&:hover": {
                        backgroundColor: "primary.light",
                      },
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {model.name || model.id}
                        {model.id === currentModel && (
                          <Chip size="small" label="Current" color="primary" />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {model.id}
                        </Typography>
                        {model.description && (
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {model.description}
                          </Typography>
                        )}
                        {(model.context_length || model.pricing) && (
                          <Box sx={{ display: "flex", gap: 1, mt: 0.5, flexWrap: "wrap" }}>
                            {model.context_length && (
                              <Chip
                                size="small"
                                label={`${model.context_length.toLocaleString()} tokens`}
                                variant="outlined"
                              />
                            )}
                            {model.pricing?.prompt && (
                              <Chip
                                size="small"
                                label={`Input: ${formatPrice(model.pricing.prompt)}`}
                                variant="outlined"
                              />
                            )}
                            {model.pricing?.completion && (
                              <Chip
                                size="small"
                                label={`Output: ${formatPrice(model.pricing.completion)}`}
                                variant="outlined"
                              />
                            )}
                          </Box>
                        )}
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelButton}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModelSelectionDialog;