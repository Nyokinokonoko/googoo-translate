// Translation service using LLM provider
// Handles the actual translation requests using the configured LLM endpoint

import type { LlmProviderConfig, LlmChatRequest } from "./types";
import { sendChatCompletion } from "./llmProvider";
import type { TranslationTarget } from "../translationTargets";
import { translationTargets } from "../translationTargets";
import { promptMap } from "../prompts";
import type { LlmDebugInfo } from "../components/LlmDebugDialog";

// Generate system prompt for translation based on target style
export const generateTranslationPrompt = (
  target: TranslationTarget
): string => {
  return (
    promptMap[target.identifier] ||
    "You are a helpful translator. Translate the given text accurately while preserving the original meaning and tone."
  );
};

export interface TranslationResult {
  text: string;
  debugInfo: LlmDebugInfo;
}

// Main translation function
export const translateText = async (
  inputText: string,
  targetIdentifier: string,
  llmConfig: Omit<LlmProviderConfig, "systemPrompt">
): Promise<TranslationResult> => {
  if (!inputText.trim()) {
    throw new Error("Input text cannot be empty");
  }

  // Find the translation target
  const target = translationTargets.find(
    (t) => t.identifier === targetIdentifier
  );
  if (!target) {
    throw new Error(`Translation target "${targetIdentifier}" not found`);
  }

  // Generate appropriate system prompt
  const systemPrompt = generateTranslationPrompt(target);

  // Create full config with system prompt
  const config: LlmProviderConfig = {
    ...llmConfig,
    systemPrompt,
  };

  // Create translation request
  const request: LlmChatRequest = {
    userPrompt: inputText,
    temperature: 0.3, // Lower temperature for more consistent translations
    maxTokens: 1024, // Allow for longer translations
    topP: 0.9,
  };

  const debugInfo: LlmDebugInfo = {
    request: {
      systemPrompt,
      userPrompt: inputText,
      model: config.model,
      temperature: request.temperature!,
      maxTokens: request.maxTokens!,
      topP: request.topP!,
    },
    response: {
      content: null,
    },
  };

  try {
    const response = await sendChatCompletion(config, request);
    debugInfo.response.content = response.content;
    
    return {
      text: response.content || "",
      debugInfo,
    };
  } catch (error: any) {
    console.error("Translation failed:", error);
    debugInfo.response.error = error instanceof Error ? error.message : "Unknown error";
    
    // Capture the raw error for debugging
    if (error.originalError) {
      debugInfo.response.rawError = error.originalError;
    } else {
      debugInfo.response.rawError = error;
    }
    
    const result: TranslationResult = {
      text: `Error: ${debugInfo.response.error}`,
      debugInfo,
    };
    
    throw { ...error, debugInfo: result.debugInfo };
  }
};
