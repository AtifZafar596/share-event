import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "pt";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getActivityTranslation: (
    activityName: string,
    field: "name" | "category"
  ) => string;
  getCategoryTranslation: (categoryName: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [translations, setTranslations] = useState<any>(null);
  const [activitiesData, setActivitiesData] = useState<any>(null);

  useEffect(() => {
    loadLanguage();
    loadTranslations();
    loadActivitiesData();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pt")) {
        setLanguageState(savedLanguage as Language);
      }
    } catch (error) {
      console.error("Error loading language:", error);
    }
  };

  const loadTranslations = async () => {
    try {
      console.log("Loading English translations...");
      const enTranslations = require("../assets/data/en.json");
      console.log("English translations loaded successfully");

      console.log("Loading Portuguese translations...");
      const ptTranslations = require("../assets/data/pt.json");
      console.log("Portuguese translations loaded successfully");

      setTranslations({ en: enTranslations, pt: ptTranslations });
    } catch (error: any) {
      console.error("Error loading translations:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
  };

  const loadActivitiesData = async () => {
    try {
      console.log("Loading activities data...");
      const data = require("../assets/data/activities.json");
      console.log("Activities data loaded successfully");
      console.log(
        "Loaded activities data:",
        data.categories?.length || 0,
        "categories"
      );
      setActivitiesData(data);
    } catch (error: any) {
      console.error("Error loading activities data:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem("language", lang);
      setLanguageState(lang);
    } catch (error) {
      console.error("Error saving language:", error);
    }
  };

  const t = (key: string): string => {
    if (!translations) return key;

    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key; // Return the key if translation not found
      }
    }

    return typeof value === "string" ? value : key;
  };

  const getActivityTranslation = (
    activityName: string,
    field: "name" | "category"
  ): string => {
    if (!activitiesData || !activitiesData.activities) return activityName;

    const activity = activitiesData.activities.find(
      (a: any) => a.name === activityName
    );
    if (!activity || !activity.translations) return activityName;

    if (field === "name") {
      return activity.translations[language] || activityName;
    } else if (field === "category") {
      const category = activitiesData.categories?.find(
        (c: any) => c.name === activity.category
      );
      if (category && category.translations) {
        return category.translations[language] || activity.category;
      }
      return activity.category;
    }

    return activityName;
  };

  const getCategoryTranslation = (categoryName: string): string => {
    if (!activitiesData || !activitiesData.categories) return categoryName;

    const category = activitiesData.categories.find(
      (c: any) => c.name === categoryName
    );
    if (category && category.translations) {
      return category.translations[language] || categoryName;
    }

    return categoryName;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    getActivityTranslation,
    getCategoryTranslation,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
