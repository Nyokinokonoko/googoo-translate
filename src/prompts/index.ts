// Japanese prompts
import { ja_kind_prompt } from './ja_kind';
import { ja_formal_friendly_prompt } from './ja_formal_friendly';
import { ja_formal_aggr_prompt } from './ja_formal_aggr';
import { ja_twitter_prompt } from './ja_twitter';
import { ja_n1_prompt } from './ja_n1';
import { ja_n2_prompt } from './ja_n2';
import { ja_n3_prompt } from './ja_n3';
import { ja_n4_prompt } from './ja_n4';
import { ja_n5_prompt } from './ja_n5';

// English prompts
import { en_casual_prompt } from './en_casual';
import { en_formal_prompt } from './en_formal';
import { en_formal_friendly_prompt } from './en_formal_friendly';
import { en_internet_prompt } from './en_internet';
import { en_offensive_internet_prompt } from './en_offensive_internet';

// Re-export all prompts
export {
  ja_kind_prompt,
  ja_formal_friendly_prompt,
  ja_formal_aggr_prompt,
  ja_twitter_prompt,
  ja_n1_prompt,
  ja_n2_prompt,
  ja_n3_prompt,
  ja_n4_prompt,
  ja_n5_prompt,
  en_casual_prompt,
  en_formal_prompt,
  en_formal_friendly_prompt,
  en_internet_prompt,
  en_offensive_internet_prompt,
};

// Prompt mapping
export const promptMap: Record<string, string> = {
  ja_kind: ja_kind_prompt,
  ja_formal_friendly: ja_formal_friendly_prompt,
  ja_formal_aggr: ja_formal_aggr_prompt,
  ja_twitter: ja_twitter_prompt,
  ja_n1: ja_n1_prompt,
  ja_n2: ja_n2_prompt,
  ja_n3: ja_n3_prompt,
  ja_n4: ja_n4_prompt,
  ja_n5: ja_n5_prompt,
  en_casual: en_casual_prompt,
  en_formal: en_formal_prompt,
  en_formal_friendly: en_formal_friendly_prompt,
  en_internet: en_internet_prompt,
  en_offensive_internet: en_offensive_internet_prompt,
};