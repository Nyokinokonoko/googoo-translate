// LLM provider service for handling OpenAI-compatible API requests
// Supports OpenAI, OpenRouter, and custom OpenAI-compatible endpoints

import OpenAI from "openai";
import type {
  LlmProviderConfig,
  LlmChatRequest,
  LlmChatResponse,
} from "./types";

export const createOpenAIClient = (config: LlmProviderConfig): OpenAI => {
  return new OpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseUrl, // supports OpenRouter and custom endpoints
  });
};

export const sendChatCompletion = async (
  config: LlmProviderConfig,
  request: LlmChatRequest
): Promise<LlmChatResponse> => {
  try {
    const client = createOpenAIClient(config);

    const response = await client.chat.completions.create({
      model: config.model,
      messages: [
        { role: "system", content: config.systemPrompt },
        { role: "user", content: request.userPrompt },
      ],
      temperature: request.temperature ?? 1.0,
      max_tokens: request.maxTokens ?? 512,
      top_p: request.topP ?? 1.0,
      stop: request.stop,
    });

    return {
      content: response.choices[0]?.message?.content || null,
      usage: response.usage
        ? {
            promptTokens: response.usage.prompt_tokens,
            completionTokens: response.usage.completion_tokens,
            totalTokens: response.usage.total_tokens,
          }
        : undefined,
    };
  } catch (error) {
    console.error("LLM API request failed:", error);
    throw new Error(
      `Failed to get response from LLM: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

// Utility function to validate LLM configuration
export const validateLlmConfig = (
  config: Partial<LlmProviderConfig>
): string[] => {
  const errors: string[] = [];

  if (!config.apiKey?.trim()) {
    errors.push("API Key is required");
  }

  if (!config.model?.trim()) {
    errors.push("Model identifier is required");
  }

  if (config.provider === "Custom" && !config.baseUrl?.trim()) {
    errors.push("Base URL is required for custom provider");
  }

  return errors;
};
