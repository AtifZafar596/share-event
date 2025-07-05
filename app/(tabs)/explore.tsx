import { useLanguage } from "@/contexts/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export default function ExploreScreen() {
  const { t } = useLanguage();

  const features = [
    {
      id: "1",
      title: t("explore.features.createCards.title"),
      description: t("explore.features.createCards.description"),
      icon: "create",
      color: "#4361EE",
    },
    {
      id: "2",
      title: t("explore.features.categories.title"),
      description: t("explore.features.categories.description"),
      icon: "grid",
      color: "#10B981",
    },
    {
      id: "3",
      title: t("explore.features.rating.title"),
      description: t("explore.features.rating.description"),
      icon: "star",
      color: "#F59E0B",
    },
    {
      id: "4",
      title: t("explore.features.sharing.title"),
      description: t("explore.features.sharing.description"),
      icon: "share-social",
      color: "#8B5CF6",
    },
    {
      id: "5",
      title: t("explore.features.design.title"),
      description: t("explore.features.design.description"),
      icon: "phone-portrait",
      color: "#EF4444",
    },
    {
      id: "6",
      title: t("explore.features.crossPlatform.title"),
      description: t("explore.features.crossPlatform.description"),
      icon: "globe",
      color: "#06B6D4",
    },
  ];

  const tips = [
    t("explore.howToUse.tips.0"),
    t("explore.howToUse.tips.1"),
    t("explore.howToUse.tips.2"),
    t("explore.howToUse.tips.3"),
    t("explore.howToUse.tips.4"),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="bulb" size={moderateScale(32)} color="#4361EE" />
          <Text style={styles.headerTitle}>{t("explore.header.title")}</Text>
          <Text style={styles.headerSubtitle}>
            {t("explore.header.subtitle")}
          </Text>
        </View>

        <View style={styles.content}>
          {/* Features Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t("explore.features.title")}
            </Text>
            <View style={styles.featuresGrid}>
              {features.map((feature) => (
                <View key={feature.id} style={styles.featureCard}>
                  <View
                    style={[
                      styles.featureIcon,
                      { backgroundColor: feature.color },
                    ]}
                  >
                    <Ionicons
                      name={feature.icon as any}
                      size={moderateScale(24)}
                      color="#FFF"
                    />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* How to Use Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t("explore.howToUse.title")}
            </Text>
            <View style={styles.tipsContainer}>
              {tips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <View style={styles.tipNumber}>
                    <Text style={styles.tipNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Social Media Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("explore.social.title")}</Text>
            <Text style={styles.socialDescription}>
              {t("explore.social.description")}
            </Text>

            <View style={styles.socialPlatforms}>
              <View style={styles.platformItem}>
                <Ionicons
                  name="logo-instagram"
                  size={moderateScale(32)}
                  color="#E4405F"
                />
                <Text style={styles.platformName}>
                  {t("explore.social.platforms.instagram")}
                </Text>
              </View>
              <View style={styles.platformItem}>
                <Ionicons
                  name="logo-facebook"
                  size={moderateScale(32)}
                  color="#1877F2"
                />
                <Text style={styles.platformName}>
                  {t("explore.social.platforms.facebook")}
                </Text>
              </View>
              <View style={styles.platformItem}>
                <Ionicons
                  name="logo-twitter"
                  size={moderateScale(32)}
                  color="#1DA1F2"
                />
                <Text style={styles.platformName}>
                  {t("explore.social.platforms.twitter")}
                </Text>
              </View>
              <View style={styles.platformItem}>
                <Ionicons
                  name="logo-tiktok"
                  size={moderateScale(32)}
                  color="#000000"
                />
                <Text style={styles.platformName}>
                  {t("explore.social.platforms.tiktok")}
                </Text>
              </View>
            </View>
          </View>

          {/* App Info */}
          <View style={styles.section}>
            <View style={styles.appInfoCard}>
              <Ionicons
                name="information-circle"
                size={moderateScale(48)}
                color="#4361EE"
              />
              <Text style={styles.appInfoTitle}>
                {t("explore.appInfo.title")}
              </Text>
              <Text style={styles.appInfoVersion}>
                {t("explore.appInfo.version")}
              </Text>
              <Text style={styles.appInfoDescription}>
                {t("explore.appInfo.description")}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    alignItems: "center",
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(20),
  },
  headerTitle: {
    fontSize: moderateScale(28),
    fontWeight: "bold",
    color: "#4361EE",
    marginTop: verticalScale(8),
  },
  headerSubtitle: {
    fontSize: moderateScale(16),
    color: "#6B7280",
    marginTop: verticalScale(4),
    textAlign: "center",
  },
  content: {
    paddingHorizontal: scale(20),
  },
  section: {
    marginBottom: verticalScale(30),
  },
  sectionTitle: {
    fontSize: moderateScale(22),
    fontWeight: "bold",
    color: "#374151",
    marginBottom: verticalScale(16),
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(12),
  },
  featureCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(12),
    padding: scale(16),
    width: (width - scale(52)) / 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  featureIcon: {
    width: scale(48),
    height: scale(48),
    borderRadius: moderateScale(24),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(12),
  },
  featureTitle: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: "#374151",
    textAlign: "center",
    marginBottom: verticalScale(4),
  },
  featureDescription: {
    fontSize: moderateScale(12),
    color: "#6B7280",
    textAlign: "center",
    lineHeight: moderateScale(16),
  },
  tipsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(12),
    padding: scale(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  tipNumber: {
    width: scale(28),
    height: scale(28),
    borderRadius: moderateScale(14),
    backgroundColor: "#4361EE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(12),
  },
  tipNumberText: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  tipText: {
    fontSize: moderateScale(16),
    color: "#374151",
    flex: 1,
    lineHeight: moderateScale(22),
  },
  socialDescription: {
    fontSize: moderateScale(16),
    color: "#6B7280",
    lineHeight: moderateScale(24),
    marginBottom: verticalScale(20),
  },
  socialPlatforms: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(12),
    padding: scale(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  platformItem: {
    alignItems: "center",
  },
  platformName: {
    fontSize: moderateScale(12),
    fontWeight: "600",
    color: "#374151",
    marginTop: verticalScale(8),
  },
  appInfoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(16),
    padding: scale(24),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  appInfoTitle: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    color: "#374151",
    marginTop: verticalScale(12),
  },
  appInfoVersion: {
    fontSize: moderateScale(14),
    color: "#6B7280",
    marginTop: verticalScale(4),
  },
  appInfoDescription: {
    fontSize: moderateScale(16),
    color: "#6B7280",
    textAlign: "center",
    lineHeight: moderateScale(24),
    marginTop: verticalScale(16),
  },
});
