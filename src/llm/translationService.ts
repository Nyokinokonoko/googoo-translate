// Translation service using LLM provider
// Handles the actual translation requests using the configured LLM endpoint

import type { LlmProviderConfig, LlmChatRequest } from "./types";
import { sendChatCompletion } from "./llmProvider";
import type { TranslationTarget } from "../translationTargets";
import { translationTargets } from "../translationTargets";

// Generate system prompt for translation based on target style
export const generateTranslationPrompt = (
  target: TranslationTarget
): string => {
  const basePrompts: Record<string, string> = {
    // Japanese variants
    ja_kind:
      "You are a translator. Translate the given text to Japanese using a kind, gentle tone. Be polite and considerate in your translation.",
    ja_formal_friendly:
      "You are a translator. Translate the given text to Japanese using formal but friendly language. Maintain politeness while being approachable.",
    ja_formal_aggr:
      "You are a translator. Translate the given text to Japanese using formal, assertive language. Be direct and authoritative while maintaining proper keigo.",
    ja_twitter:
      "You are a translator. Translate the given text to Japanese using casual Twitter/social media style. Use modern slang and abbreviations where appropriate.",
    ja_n1:
      "You are a translator. Translate the given text to Japanese at JLPT N1 level. Use advanced vocabulary and complex grammar structures.",
    ja_n2:
      "You are a translator. Translate the given text to Japanese at JLPT N2 level. Use intermediate-advanced vocabulary and grammar.",
    ja_n3:
      "You are a translator. Translate the given text to Japanese at JLPT N3 level. Use intermediate vocabulary and grammar structures.",
    ja_n4:
      "You are a translator. Translate the given text to Japanese at JLPT N4 level. Use basic-intermediate vocabulary and simple grammar.",
    ja_n5:
      "You are a translator. Translate the given text to Japanese at JLPT N5 level. Use basic vocabulary and simple grammar structures.",

    // English variants
    en_casual:
      "You are a translator. Translate the given text to casual, conversational English. Use informal language and contractions.",
    en_formal:
      "You are a translator. Translate the given text to formal English. Use proper grammar and avoid contractions.",
    en_formal_friendly:
      "You are a translator. Translate the given text to formal yet friendly English. Be professional but approachable.",
    en_internet:
      "You are a translator. Translate the given text to internet/online English. Use modern slang, abbreviations, and casual web language.",
    en_offensive_internet:
      "You are a translator. Translate the given text to offensive internet English. Use strong language and aggressive tone typical of online arguments.",
  };

  return (
    basePrompts[target.identifier] ||
    "You are a helpful translator. Translate the given text accurately while preserving the original meaning and tone."
  );
};

// Main translation function
export const translateText = async (
  inputText: string,
  targetIdentifier: string,
  llmConfig: Omit<LlmProviderConfig, "systemPrompt">
): Promise<string> => {
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

  try {
    const response = await sendChatCompletion(config, request);
    return response.content || "";
  } catch (error) {
    console.error("Translation failed:", error);
    throw error;
  }
};
