// Model selection service for fetching available models from providers
// Supports OpenAI and OpenRouter APIs for model discovery

export interface ModelInfo {
  id: string;
  name?: string;
  description?: string;
  owned_by?: string;
  created?: number;
  context_length?: number;
  pricing?: {
    prompt?: number;
    completion?: number;
  };
}

export interface ModelListResponse {
  models: ModelInfo[];
  error?: string;
}

// OpenRouter caching
let cachedOpenRouterModels: ModelInfo[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// OpenAI Models API
export const fetchOpenAIModels = async (apiKey: string): Promise<ModelListResponse> => {
  if (!apiKey.trim()) {
    return { models: [], error: "API key is required for OpenAI" };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/models", {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { models: [], error: `OpenAI API error: ${response.status} ${errorText}` };
    }

    const data = await response.json();
    
    const models: ModelInfo[] = data.data?.map((model: any) => ({
      id: model.id,
      owned_by: model.owned_by,
      created: model.created,
    })) || [];

    // Sort models by name, with OpenAI models first
    models.sort((a, b) => {
      const aIsOpenAI = a.owned_by === "openai";
      const bIsOpenAI = b.owned_by === "openai";
      
      if (aIsOpenAI && !bIsOpenAI) return -1;
      if (!aIsOpenAI && bIsOpenAI) return 1;
      
      return a.id.localeCompare(b.id);
    });

    return { models };
  } catch (error) {
    console.error("Failed to fetch OpenAI models:", error);
    return { 
      models: [], 
      error: `Failed to fetch models: ${error instanceof Error ? error.message : "Unknown error"}` 
    };
  }
};

// OpenRouter Models API with caching
export const fetchOpenRouterModels = async (): Promise<ModelListResponse> => {
  // Return cached models if they're still fresh
  if (cachedOpenRouterModels && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return { models: cachedOpenRouterModels };
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { models: [], error: `OpenRouter API error: ${response.status} ${errorText}` };
    }

    const data = await response.json();
    
    const models: ModelInfo[] = data.data?.map((model: any) => ({
      id: model.id,
      name: model.name,
      description: model.description,
      context_length: model.context_length,
      pricing: model.pricing ? {
        prompt: parseFloat(model.pricing.prompt),
        completion: parseFloat(model.pricing.completion),
      } : undefined,
    })) || [];

    // Sort models by name
    models.sort((a, b) => (a.name || a.id).localeCompare(b.name || b.id));

    // Cache the results
    cachedOpenRouterModels = models;
    cacheTimestamp = Date.now();

    return { models };
  } catch (error) {
    console.error("Failed to fetch OpenRouter models:", error);
    return { 
      models: [], 
      error: `Failed to fetch models: ${error instanceof Error ? error.message : "Unknown error"}` 
    };
  }
};

// Extract just the model IDs for autocomplete (backwards compatibility)
export const getOpenRouterModelIds = async (): Promise<string[]> => {
  const result = await fetchOpenRouterModels();
  if (result.error) {
    throw new Error(result.error);
  }
  return result.models.map(model => model.id);
};

// Generic model fetcher based on provider
export const fetchModels = async (provider: string, apiKey?: string): Promise<ModelListResponse> => {
  switch (provider) {
    case "OpenAI":
      return fetchOpenAIModels(apiKey || "");
    case "OpenRouter":
      return fetchOpenRouterModels();
    default:
      return { models: [], error: "Unsupported provider for model fetching" };
  }
};