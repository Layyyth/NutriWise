import { createContext, useContext, useState } from "react";
import { getFromLocal, saveToLocal } from "../helpers/functions";

const themeContext = createContext("");

const systemSetting =
  (window.matchMedia("(prefers-color-scheme: dark)")?.matches && "dark") ||
  (window.matchMedia("(prefers-color-scheme: light)")?.matches && "light");
// console.log(systemSetting);

function ThemeProvider({ children }) {
  const [theme, setThemeR] = useState(
    getFromLocal("themeColor") || systemSetting || "dark"
  );

  function setTheme(newTheme) {
    setThemeR(newTheme);
    saveToLocal("themeColor", newTheme);
  }

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(themeContext);
  if (!context) return null;
  return context;
}

export { ThemeProvider, useTheme };
