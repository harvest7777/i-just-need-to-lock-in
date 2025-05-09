"use client";
import { PropsWithChildren } from "react";
import { useState, useEffect } from "react";
import PreLoader from "./_components/PreLoader";

export interface CustomColor {
  cssVariableName: string;
  defaultValue: string;
}
export const defaultColors: CustomColor[] = [
  {
    cssVariableName: "app-highlight",
    defaultValue: "#009966",
  },
  {
    cssVariableName: "app-fg",
    defaultValue: "#f9fbfc",
  },
  {
    cssVariableName: "app-bg",
    defaultValue: "#d7dde1",
  },
  {
    cssVariableName: "app-text",
    defaultValue: "#242129",
  },
];

export const darkColors: CustomColor[] = [
  {
    cssVariableName: "app-highlight",
    defaultValue: "#009966",
  },
  {
    cssVariableName: "app-fg",
    defaultValue: "#323336",
  },
  {
    cssVariableName: "app-bg",
    defaultValue: "#1a1a1a",
  },
  {
    cssVariableName: "app-text",
    defaultValue: "#cdcfd1",
  },
];

const ThemeProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [themeLoaded, setThemeLoaded] = useState<boolean>(false);
  useEffect(() => {
    //initialize array of default colors
    for (const colorData of defaultColors) {
      const storedColor =
        localStorage.getItem(`${colorData.cssVariableName}`) ||
        colorData.defaultValue;
      document.documentElement.style.setProperty(
        `--color-${colorData.cssVariableName}`,
        storedColor
      );
    }
    //weird bug with recharts, need to manually set muted
    const storedMuted = localStorage.getItem("app-text") || "#cdcfd1";
    document.documentElement.style.setProperty(
      "--color-muted-foreground",
      storedMuted
    );
    setThemeLoaded(true);
    console.log("loaded thmee");
  }, []);
  if (!themeLoaded) {
    return <PreLoader />;
  }
  return <>{children}</>;
};

export default ThemeProvider;
