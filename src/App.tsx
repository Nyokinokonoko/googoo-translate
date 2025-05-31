import { useState, useMemo, useEffect } from "react";
import { Container, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  translationTargets,
  detectTranslationTarget,
} from "./translationTargets";
import type { TranslationTarget } from "./translationTargets";
import { useLanguage, getLocalizedDisplayName } from "./languageContext";
import {
  Header,
  TransformSelector,
  TranslationBox,
  SettingsDialog,
  Footer,
  Disclaimer,
} from "./components";
import { useLlmConfig } from "./hooks/useLlmConfig";
import { translateText, detectTextStyle } from "./llm";
import "./styles/index.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [toTransform, setToTransform] = useState("ja_formal_aggr");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">(
    "system"
  );
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  // Use LLM configuration hook
  const llmConfig = useLlmConfig();

  // Use language context
  const { strings, currentLanguage, setLanguage } = useLanguage();

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemPrefersDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Determine actual dark mode based on theme mode
  const darkMode = useMemo(() => {
    switch (themeMode) {
      case "dark":
        return true;
      case "light":
        return false;
      case "system":
        return systemPrefersDark;
      default:
        return false;
    }
  }, [themeMode, systemPrefersDark]);
  // Create dynamic theme based on dark mode
  const customTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#1976d2",
          },
          background: {
            default: darkMode ? "#1a1a1a" : "#f5f5f5",
            paper: darkMode ? "#2d2d2d" : "#ffffff",
          },
          text: {
            primary: darkMode ? "#e0e0e0" : "rgba(0, 0, 0, 0.87)",
            secondary: darkMode ? "#b3b3b3" : "rgba(0, 0, 0, 0.6)",
          },
          divider: darkMode ? "#404040" : "rgba(0, 0, 0, 0.12)",
        },
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiInputBase-input": {
                  color: darkMode ? "#e0e0e0" : "rgba(0, 0, 0, 0.87)",
                },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                backgroundColor: darkMode ? "#404040" : "rgba(0, 0, 0, 0.08)",
                color: darkMode ? "#e0e0e0" : "rgba(0, 0, 0, 0.87)",
                border: darkMode
                  ? "1px solid #555"
                  : "1px solid rgba(0, 0, 0, 0.23)",
              },
            },
          },
        },
      }),
    [darkMode]
  );
  // Group targets by base language for better organization
  const japaneseTargets = translationTargets.filter(
    (target) => target.baseLang === "ja"
  );
  const englishTargets = translationTargets.filter(
    (target) => target.baseLang === "en"
  );

  const getDisplayName = (target: TranslationTarget) => {
    return getLocalizedDisplayName(target, currentLanguage);
  };
  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  const handleLanguageChange = (
    _event: React.MouseEvent<HTMLElement>,
    newLanguage: string | null
  ) => {
    if (newLanguage === "en" || newLanguage === "ja") {
      setLanguage(newLanguage);
    }
  };

  const handleThemeModeChange = (mode: "light" | "dark" | "system") => {
    setThemeMode(mode);
  };

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);
    try {
      let result: string;

      if (toTransform === "detect") {
        // Style detection mode
        result = await detectTextStyle(inputText, llmConfig.getConfig());
      } else {
        // Translation mode
        result = await translateText(
          inputText,
          toTransform,
          llmConfig.getConfig()
        );
      }

      setOutputText(result);
    } catch (error) {
      console.error("Translation failed:", error);
      setOutputText(
        `Error: ${
          error instanceof Error ? error.message : "Translation failed"
        }`
      );
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log("Share:", outputText);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <div data-theme={darkMode ? "dark" : "light"}>
        <Container maxWidth="lg" className="app-container">
          <Header
            title={strings.appTitle}
            onSettingsOpen={handleSettingsOpen}
          />
          <Paper elevation={1} className="app-paper">
            {" "}
            <TransformSelector
              fromLabel={strings.fromLabel}
              toLabel={strings.toLabel}
              autoDetect={strings.autoDetect}
              toTransform={toTransform}
              japaneseTargets={japaneseTargets}
              englishTargets={englishTargets}
              detectTarget={detectTranslationTarget}
              getDisplayName={getDisplayName}
              onTransformChange={setToTransform}
            />{" "}
            <TranslationBox
              inputText={inputText}
              outputText={outputText}
              inputPlaceholder={strings.inputPlaceholder}
              outputPlaceholder={strings.outputPlaceholder}
              translateButton={strings.translateButton}
              characterCount={strings.characterCount}
              onInputChange={setInputText}
              onClear={handleClear}
              onTranslate={handleTranslate}
              onCopy={handleCopy}
              onShare={handleShare}
              isLlmConfigured={llmConfig.isConfigured}
              llmNotConfiguredTooltip={strings.llmEndpointNotConfigured}
              isTranslating={isTranslating}
            />
          </Paper>
          <Disclaimer text={strings.disclaimerText} />
          <Footer />{" "}
          <SettingsDialog
            open={settingsOpen}
            onClose={handleSettingsClose}
            settingsTitle={strings.settingsTitle}
            generalSection={strings.generalSection}
            languageSettings={strings.languageSettings}
            themeSettings={strings.themeSettings}
            closeButton={strings.closeButton}
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            themeMode={themeMode}
            onThemeModeChange={handleThemeModeChange}
            llmProvider={llmConfig.provider}
            onLlmProviderChange={llmConfig.setProvider}
            baseUrl={llmConfig.baseUrl}
            onBaseUrlChange={llmConfig.setBaseUrl}
            apiKey={llmConfig.apiKey}
            onApiKeyChange={llmConfig.setApiKey}
            modelIdentifier={llmConfig.model}
            onModelIdentifierChange={llmConfig.setModel}
          />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
