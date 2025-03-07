import React, { useEffect, useState } from "react";
import { THEME_LOCAL_STORAGE_KEY } from "../../constants";
import Btn from "../Shared/Btn";
import "./styles.css"

const ThemeToggler: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, newTheme);
  };

  return (
    <Btn onClick={toggleTheme} className="theme-toggle">
      {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </Btn>
  );
};

export default ThemeToggler;
