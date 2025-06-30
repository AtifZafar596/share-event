import { useLanguage } from "@/contexts/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pt" : "en");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleLanguage}>
      <View style={styles.flagContainer}>
        <Text style={styles.flag}>{language === "en" ? "🇺🇸" : "🇧🇷"}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.languageText}>
          {language === "en" ? "English" : "Português"}
        </Text>
        <Text style={styles.switchText}>{t("app.name")}</Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={moderateScale(20)}
        color="#6B7280"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(12),
    padding: scale(12),
    marginHorizontal: scale(20),
    marginVertical: verticalScale(8),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flagContainer: {
    marginRight: scale(12),
  },
  flag: {
    fontSize: moderateScale(24),
  },
  textContainer: {
    flex: 1,
  },
  languageText: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#374151",
    marginBottom: verticalScale(2),
  },
  switchText: {
    fontSize: moderateScale(12),
    color: "#6B7280",
  },
});
