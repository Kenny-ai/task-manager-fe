"use client";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import Icon from "./Icon";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSetTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const setLightTheme = () => {
    setTheme("light");
  };
  const setDarkTheme = () => {
    setTheme("dark");
  };

  return (
    <div className="bg-light-main-bg dark:bg-dark-main-bg py-4 rounded-xl flex justify-around items-center w-60">
      <Icon
        src="/assets/icon-light-theme.svg"
        alt="light-mode"
        className="cursor-pointer"
        onClick={setLightTheme}
      />

      <div
        className="bg-color-purple w-12 p-1 rounded-full cursor-pointer"
        onClick={handleSetTheme}
      >
        <div
          className={`${
            theme === `dark` ? `translate-x-6` : ``
          } bg-color-white rounded-full h-4 w-4 duration-300`}
        ></div>
      </div>

      <Icon
        src="/assets/icon-dark-theme.svg"
        alt="dark-mode"
        className="cursor-pointer"
        onClick={setDarkTheme}
      />
    </div>
  );
};

export default ThemeChanger;
