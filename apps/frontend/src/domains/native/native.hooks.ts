import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { useEffect } from "react";

type Platform = "web" | "ios" | "android";

export const usePlatform = () => {
  return Capacitor.getPlatform() as Platform;
};

const statusBarColorMap = {
  dark: Style.Dark,
  light: Style.Light,
  default: Style.Default,
} as const;

/** Sets status bar color on native devices */
export const useStatusBarColor = (color: keyof typeof statusBarColorMap) => {
  useEffect(() => {
    StatusBar.setStyle({ style: statusBarColorMap[color] }).catch(() => {
      // fallback for web
    });
  }, [color]);
};
