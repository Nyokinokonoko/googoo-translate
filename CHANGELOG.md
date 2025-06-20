# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.5] - 2025-06-16

### Changed

- Updated build configuration and TypeScript settings to reduce bundle size

## [1.0.4] - 2025-06-16

### Fixed

- Build errors due to unused imports and variables in SettingsDialog component
- Removed unused TypeScript imports: Autocomplete, CircularProgress
- Removed unused state variables: openRouterModels, modelsLoading, modelsError
- Removed unused useEffect hook and getOpenRouterModelIds import

## [1.0.3] - 2025-06-16

### Added

- Model selection dialog for OpenAI and OpenRouter providers
- Automatic model discovery and listing from provider APIs
- Search functionality in model selection dialog
- Model details display (context length, pricing for OpenRouter)
- ModelSelectionDialog component with provider-specific features

### Changed

- Settings dialog now shows "Select" button for OpenAI/OpenRouter instead of manual text input
- Model identifier field is read-only for OpenAI/OpenRouter providers
- Custom provider still allows manual model identifier input
- Enhanced SettingsDialog with integrated model selection workflow

### Fixed

- OpenAI model fetching requires API key authentication
- OpenRouter model fetching works without authentication
- Proper error handling for model fetching failures

## [1.0.2] - 2025-06-16

### Added

- Debug button in translation output box when LLM errors occur
- LlmDebugDialog component for displaying LLM request/response details side by side
- Enhanced error handling with detailed debug information

### Changed

- Translation service now returns debug information with all requests
- Error messages now include debug button for troubleshooting
- Improved error state management in TranslationBox component

## [1.0.1] - 2025-06-16

### Added

- CHANGELOG.md file for tracking project changes
- Loading overlay to TranslationBox

### Changed

- Update .gitignore to exclude .claude/ directory

## [1.0.0] - 2025-06-16

### Added

- Initial release of Googoo Translate
- Translation functionality with multiple language targets
- OpenRouter integration for LLM-powered translations
- Multiple translation styles and prompts
- Settings dialog with model configuration
- Dark/light theme support
- GitHub Pages deployment
