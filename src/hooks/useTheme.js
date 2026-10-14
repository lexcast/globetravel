import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const prefersDark = () =>
  window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;

// Persisted "light" | "dark" theme, defaulting to the system preference.
// Keep the key and default in sync with the inline script in index.html.
const useTheme = () => {
  const [theme, setTheme] = useLocalStorage(
    "@globetravel.theme",
    prefersDark() ? "dark" : "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return [theme, setTheme];
};

export default useTheme;
