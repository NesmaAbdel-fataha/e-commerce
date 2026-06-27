import { useMemo, useState } from "react";
import { languageContext } from "./languageContext";

export function LanguageProvider({ children, defaultLanguage = "en-US" }) {
  const [language, setLanguage] = useState(defaultLanguage);
  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <languageContext.Provider value={value}>{children}</languageContext.Provider>
  );
}

