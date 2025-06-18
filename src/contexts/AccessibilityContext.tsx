
import React, { createContext, useContext, useEffect, useState } from "react";

type FontFamily = "inter" | "open-sans" | "roboto" | "lato" | "source-sans";
type FontSize = "small" | "medium" | "large" | "extra-large";

interface AccessibilityContextType {
  fontFamily: FontFamily;
  fontSize: FontSize;
  highContrast: boolean;
  reducedMotion: boolean;
  setFontFamily: (font: FontFamily) => void;
  setFontSize: (size: FontSize) => void;
  setHighContrast: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontFamily, setFontFamily] = useState<FontFamily>(() => {
    const saved = localStorage.getItem("hopecore-font-family");
    return (saved as FontFamily) || "inter";
  });

  const [fontSize, setFontSize] = useState<FontSize>(() => {
    const saved = localStorage.getItem("hopecore-font-size");
    return (saved as FontSize) || "medium";
  });

  const [highContrast, setHighContrast] = useState(() => {
    const saved = localStorage.getItem("hopecore-high-contrast");
    return saved === "true";
  });

  const [reducedMotion, setReducedMotion] = useState(() => {
    const saved = localStorage.getItem("hopecore-reduced-motion");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("hopecore-font-family", fontFamily);
    document.documentElement.setAttribute("data-font-family", fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem("hopecore-font-size", fontSize);
    document.documentElement.setAttribute("data-font-size", fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("hopecore-high-contrast", highContrast.toString());
    document.documentElement.setAttribute("data-high-contrast", highContrast.toString());
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem("hopecore-reduced-motion", reducedMotion.toString());
    document.documentElement.setAttribute("data-reduced-motion", reducedMotion.toString());
  }, [reducedMotion]);

  return (
    <AccessibilityContext.Provider value={{
      fontFamily,
      fontSize,
      highContrast,
      reducedMotion,
      setFontFamily,
      setFontSize,
      setHighContrast,
      setReducedMotion,
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
};
