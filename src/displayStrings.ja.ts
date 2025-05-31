// Japanese translations for display strings
// 日本語表示文字列

import type { DisplayStrings } from "./displayStrings";

export const displayStringsJa: DisplayStrings = {
  // App title and branding
  appTitle: "Googoo Translate",

  // Form labels and placeholders
  fromLabel: "元の言語",
  toLabel: "変換先",
  autoDetect: "自動",
  inputPlaceholder: "変換したいテキストを入力してください...",
  outputPlaceholder: "変換結果がここに表示されます...",

  // Button labels
  translateButton: "変換",
  closeButton: "閉じる",

  // Status and feedback
  characterCount: "文字",

  // Settings
  settingsTitle: "設定",
  generalSection: "一般",
  languageSettings: "言語設定",
  themeSettings: "テーマ設定",
  // Theme options
  darkMode: "ダークモード",
  lightMode: "ライトモード",
  systemDefault: "システムデフォルト",
  // LLM Endpoint settings
  llmEndpointSection: "LLMエンドポイント",
  llmProvider: "プロバイダー",
  llmProviderTooltip: "OpenAI互換のエンドポイントのみ使用できます。",
  baseUrl: "ベースURL",
  apiKey: "APIキー",
  modelIdentifier: "モデル識別子",
  openaiProvider: "OpenAI",
  openrouterProvider: "OpenRouter",
  customProvider: "カスタム",
  showPassword: "表示",
  hidePassword: "非表示",
  llmEndpointDisclaimer:
    "設定で提供されたエンドポイント情報はローカルに保存されます。このページは提供されたエンドポイントと直接通信し、これらの情報を他のサーバーに送信することはありません。",
  // Validation and error messages
  llmEndpointNotConfigured:
    "LLMエンドポイントが設定されていません。設定でAPIキーとエンドポイントを設定してください。",

  // Footer and metadata
  footerText: "AI駆動 • クリエイティブなテキスト変換",
  disclaimerText:
    "このプロジェクトは主に娯楽目的です。翻訳（テキスト変換）はLLMによって提供されています。LLMは不正確な応答を提供する可能性があります。出力は責任を持って慎重に使用してください。",
};
