import { useContext } from "react";
import { languageContext } from "./languageContext";

export function useLanguage() {
  const ctx = useContext(languageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

