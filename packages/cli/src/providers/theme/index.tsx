import { homedir } from "node:os";
import { join } from "node:path";
import { DEFAULT_THEME, THEMES, type Theme } from "../../theme";
import { readFileSync } from "node:fs";

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
