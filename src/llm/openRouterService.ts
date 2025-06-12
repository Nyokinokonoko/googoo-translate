// OpenRouter API service for fetching available models
// Used for autocomplete functionality in the settings dialog

export interface OpenRouterModel {
  id: string;
  name: string;
  description: string;
  context_length: number;
  pricing: {
    prompt: string;
    completion: string;
  };
}

export interface OpenRouterModelsResponse {
  data: OpenRouterModel[];
}

let cachedModels: OpenRouterModel[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const fetchOpenRouterModels = async (): Promise<OpenRouterModel[]> => {
  // Return cached models if they're still fresh
  if (cachedModels && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedModels;
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/models');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.status} ${response.statusText}`);
    }

    const data: OpenRouterModelsResponse = await response.json();
    
    // Cache the results
    cachedModels = data.data;
    cacheTimestamp = Date.now();
    
    return data.data;
  } catch (error) {
    console.error('Error fetching OpenRouter models:', error);
    throw new Error(
      `Failed to fetch OpenRouter models: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

// Extract just the model IDs for autocomplete
export const getOpenRouterModelIds = async (): Promise<string[]> => {
  const models = await fetchOpenRouterModels();
  return models.map(model => model.id);
};