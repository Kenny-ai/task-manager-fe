"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
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

  return (
    <button
      className={`w-fit absolute right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 bg-slate-200 dark:bg-[#212933]`}
      onClick={handleSetTheme}
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
};
