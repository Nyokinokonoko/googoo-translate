// LLM provider types and interfaces
// Defines the structure for LLM provider configurations and requests

export type LlmProviderType = "OpenAI" | "OpenRouter" | "Custom";

export interface LlmProviderConfig {
  provider: LlmProviderType;
  baseUrl: string;
  apiKey: string;
  model: string;
  systemPrompt: string;
}

export interface LlmChatRequest {
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  stop?: string[];
}

export interface LlmChatResponse {
  content: string | null;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}
