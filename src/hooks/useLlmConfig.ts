// React hook for managing LLM configuration
// Provides state management and persistence for LLM settings

import { useState, useEffect, useCallback } from "react";
import type { LlmProviderConfig } from "../llm/types";
import { getDefaultBaseUrl, validateLlmConfig } from "../llm/llmProvider";

export type LlmProviderType = "openai" | "openrouter" | "custom";

export interface UseLlmConfigReturn {
  // Configuration state
  provider: LlmProviderType;
  baseUrl: string;
  apiKey: string;
  model: string;

  // Actions
  setProvider: (provider: LlmProviderType) => void;
  setBaseUrl: (url: string) => void;
  setApiKey: (key: string) => void;
  setModel: (model: string) => void;

  // Computed properties
  isConfigured: boolean;
  configErrors: string[];
  getConfig: () => Omit<LlmProviderConfig, "systemPrompt">;
}

const STORAGE_KEYS = {
  PROVIDER: "llm_provider",
  BASE_URL: "llm_base_url",
  API_KEY: "llm_api_key",
  MODEL: "llm_model",
} as const;

export const useLlmConfig = (): UseLlmConfigReturn => {
  // Initialize state from localStorage or defaults
  const [provider, setProviderState] = useState<LlmProviderType>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.PROVIDER);
    return (stored as LlmProviderType) || "openai";
  });

  const [baseUrl, setBaseUrlState] = useState<string>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.BASE_URL);
    return stored || getDefaultBaseUrl("OpenAI");
  });

  const [apiKey, setApiKeyState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.API_KEY) || "";
  });

  const [model, setModelState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.MODEL) || "gpt-4o-mini";
  });

  // Update baseUrl when provider changes
  useEffect(() => {
    if (provider !== "custom") {
      const defaultUrl = getDefaultBaseUrl(
        provider === "openai"
          ? "OpenAI"
          : provider === "openrouter"
          ? "OpenRouter"
          : "Custom"
      );
      setBaseUrlState(defaultUrl);
    }
  }, [provider]);

  // Persistence handlers
  const setProvider = useCallback((newProvider: LlmProviderType) => {
    setProviderState(newProvider);
    localStorage.setItem(STORAGE_KEYS.PROVIDER, newProvider);
  }, []);

  const setBaseUrl = useCallback((url: string) => {
    setBaseUrlState(url);
    localStorage.setItem(STORAGE_KEYS.BASE_URL, url);
  }, []);

  const setApiKey = useCallback((key: string) => {
    setApiKeyState(key);
    localStorage.setItem(STORAGE_KEYS.API_KEY, key);
  }, []);

  const setModel = useCallback((newModel: string) => {
    setModelState(newModel);
    localStorage.setItem(STORAGE_KEYS.MODEL, newModel);
  }, []);

  // Computed properties
  const getConfig = useCallback((): Omit<LlmProviderConfig, "systemPrompt"> => {
    const providerMap = {
      openai: "OpenAI" as const,
      openrouter: "OpenRouter" as const,
      custom: "Custom" as const,
    };

    return {
      provider: providerMap[provider],
      baseUrl:
        provider === "custom"
          ? baseUrl
          : getDefaultBaseUrl(providerMap[provider]),
      apiKey,
      model,
    };
  }, [provider, baseUrl, apiKey, model]);

  const configErrors = validateLlmConfig(getConfig());
  const isConfigured = configErrors.length === 0;

  return {
    provider,
    baseUrl,
    apiKey,
    model,
    setProvider,
    setBaseUrl,
    setApiKey,
    setModel,
    isConfigured,
    configErrors,
    getConfig,
  };
};
