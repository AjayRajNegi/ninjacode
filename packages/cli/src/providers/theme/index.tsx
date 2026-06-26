import { homedir } from "node:os";
import { join } from "node:path";
import {
  DEFAULT_THEME,
  THEMES,
  type Theme,
  type ThemeColors,
} from "../../theme";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createContext, useContext } from "react";

const CONFIG_DIR = join(homedir(), ".ninjacode");
const THEME_PREFRENCES_PATH = join(CONFIG_DIR, "prefernces.json");

type ThemePreferences = {
  themeName: string;
};

function getInitialTheme(): Theme {
  try {
    const prefernces = JSON.parse(
      readFileSync(THEME_PREFRENCES_PATH, "utf8"),
    ) as Partial<ThemePreferences>;

    const savedTheme = THEMES.find(
      (theme) => theme.name === prefernces.themeName,
    );

    return savedTheme ?? DEFAULT_THEME;
  } catch (error) {
    return DEFAULT_THEME;
  }
}

function persistTheme(theme: Theme) {
  try {
    mkdirSync(CONFIG_DIR, { recursive: true });
    writeFileSync(
      THEME_PREFRENCES_PATH,
      JSON.stringify(
        { themeName: theme.name } satisfies ThemePreferences,
        null,
        2,
      ),
      "utf8",
    );
  } catch (error) {}
}

type ThemeContextValue = {
  colors: ThemeColors;
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return value;
}
