import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  // to run only once on the initial render
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("ih-theme") || "dark";
  });
  useEffect(
    function () {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("ih-theme", theme);
    },
    [theme],
  );

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("ThemeContext must be used within ThemeProvider");
  return context;
}

export { ThemeProvider, useTheme };
