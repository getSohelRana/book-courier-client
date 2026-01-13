import React, { useEffect, useState } from "react";
import { GoSun } from "react-icons/go";
import { GoMoon } from "react-icons/go";
const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };
  return (
    <button onClick={toggleTheme} className="cursor-pointer" title="to click change theme">
        {theme === "light" ? (
                <GoSun size={25}/>
              ) : (
                <GoMoon size={25} className="text-black" />
              )}
    </button>
  );
};

export default ThemeSwitcher;
