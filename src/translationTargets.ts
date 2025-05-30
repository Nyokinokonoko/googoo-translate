export interface TranslationTarget {
  identifier: string;
  baseLang: string;
  dispEn: string;
  dispJa: string;
}

export const translationTargets: TranslationTarget[] = [
  // Japanese variants
  {
    identifier: 'ja_kind',
    baseLang: 'ja',
    dispEn: 'Japanese (Kind)',
    dispJa: '日本語 (優しく)'
  },
  {
    identifier: 'ja_formal_friendly',
    baseLang: 'ja',
    dispEn: 'Japanese (Formal yet Friendly)',
    dispJa: '日本語 (丁寧でフレンドリー)'
  },
  {
    identifier: 'ja_formal_aggr',
    baseLang: 'ja',
    dispEn: 'Japanese (Formally Aggressive)',
    dispJa: '日本語 (丁寧に攻撃的)'
  },
  {
    identifier: 'ja_twitter',
    baseLang: 'ja',
    dispEn: 'Japanese (Twitter)',
    dispJa: '日本語 (Twitter)'
  },
  {
    identifier: 'ja_n1',
    baseLang: 'ja',
    dispEn: 'Japanese (N1)',
    dispJa: '日本語 (N1)'
  },
  {
    identifier: 'ja_n2',
    baseLang: 'ja',
    dispEn: 'Japanese (N2)',
    dispJa: '日本語 (N2)'
  },
  {
    identifier: 'ja_n3',
    baseLang: 'ja',
    dispEn: 'Japanese (N3)',
    dispJa: '日本語 (N3)'
  },
  {
    identifier: 'ja_n4',
    baseLang: 'ja',
    dispEn: 'Japanese (N4)',
    dispJa: '日本語 (N4)'
  },
  {
    identifier: 'ja_n5',
    baseLang: 'ja',
    dispEn: 'Japanese (N5)',
    dispJa: '日本語 (N5)'
  },
  // English variants
  {
    identifier: 'en_casual',
    baseLang: 'en',
    dispEn: 'English (Casual)',
    dispJa: '英語 (カジュアル)'
  },
  {
    identifier: 'en_formal',
    baseLang: 'en',
    dispEn: 'English (Formal)',
    dispJa: '英語 (フォーマル)'
  },
  {
    identifier: 'en_formal_friendly',
    baseLang: 'en',
    dispEn: 'English (Formal yet Friendly)',
    dispJa: '英語 (フォーマルでフレンドリー)'
  },
  {
    identifier: 'en_internet',
    baseLang: 'en',
    dispEn: 'English (Internet)',
    dispJa: '英語 (インターネット)'
  },
  {
    identifier: 'en_offensive_internet',
    baseLang: 'en',
    dispEn: 'English (Offensive Internet)',
    dispJa: '英語 (攻撃的インターネット)'
  }
];

// Helper function to get translation target by identifier
export const getTranslationTargetById = (identifier: string): TranslationTarget | undefined => {
  return translationTargets.find(target => target.identifier === identifier);
};

// Helper function to get translation targets by base language
export const getTranslationTargetsByLang = (baseLang: string): TranslationTarget[] => {
  return translationTargets.filter(target => target.baseLang === baseLang);
};

// Special detection option
export const detectTranslationTarget: TranslationTarget = {
  identifier: 'detect',
  baseLang: 'auto',
  dispEn: 'Detect style',
  dispJa: 'スタイル検出'
};
