import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { SwapHoriz } from "@mui/icons-material";
import type { TranslationTarget } from "../translationTargets";

interface TransformSelectorProps {
  fromLabel: string;
  toLabel: string;
  autoDetect: string;
  toTransform: string;
  japaneseTargets: TranslationTarget[];
  englishTargets: TranslationTarget[];
  getDisplayName: (target: TranslationTarget) => string;
  onTransformChange: (value: string) => void;
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
  return (
    <Box className="transform-selector-container">
      <Box className="transform-selector-content">
        <FormControl
          size="small"
          className="transform-selector-form-control"
          disabled
        >
          <InputLabel>{fromLabel}</InputLabel>
          <Select value="auto" label={fromLabel}>
            <MenuItem value="auto">{autoDetect}</MenuItem>
          </Select>
        </FormControl>

        <Box className="transform-selector-swap-icon">
          <SwapHoriz />
        </Box>

        <FormControl size="small" className="transform-selector-form-control">
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
  );
};

export default TransformSelector;
