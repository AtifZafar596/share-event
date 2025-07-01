import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCardSharing } from "@/hooks/useCardSharing";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import ViewShot from "react-native-view-shot";

interface Event {
  id: string;
  name: string;
  category: string;
  rating: number;
  date: string;
  customDate: Date;
  gradient: string[];
}

interface Activity {
  id: number;
  name: string;
  icon: string;
  category: string;
  color: string;
}

interface Category {
  id: string;
  name: string;
  label: string;
}

interface ActivitiesData {
  categories: Category[];
  activities: Activity[];
}

export default function HomeScreen() {
  const { t, getActivityTranslation, getCategoryTranslation, language } =
    useLanguage();
  const [activities, setEvents] = useState<Event[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [selectedRating, setSelectedRating] = useState(0);
  const [customDate, setCustomDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedEventForSharing, setSelectedEventForSharing] =
    useState<Event | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [starred, setStarred] = useState<Set<number>>(new Set());
  const [selectedGradient, setSelectedGradient] = useState<string[]>([
    "#FF6B6B",
    "#FF8E53",
  ]);
  const [activitiesData, setActivitiesData] = useState<ActivitiesData>({
    categories: [],
    activities: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const { isCreating, viewShotRef, captureAndShare } = useCardSharing();
  const scrollViewRef = useRef<ScrollView>(null);

  // Load activities data from JSON file
  useEffect(() => {
    const loadActivitiesData = async () => {
      try {
        const data = require("../assets/data/activities.json");
        setActivitiesData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading activities data:", error);
        setIsLoading(false);
      }
    };

    loadActivitiesData();
  }, []);

  // Color gradient options for cards
  const gradientColors = [
    ["#FF6B6B", "#FF8E53"],
    ["#4ECDC4", "#44A08D"],
    ["#A8E6CF", "#7FCDCD"],
    ["#FFD93D", "#FF6B6B"],
    ["#6C5CE7", "#A29BFE"],
    ["#74B9FF", "#0984E3"],
    ["#FD79A8", "#FDCB6E"],
    ["#00B894", "#00CEC9"],
    ["#E84393", "#FD79A8"],
    ["#FDCB6E", "#E17055"],
    ["#6C5CE7", "#A29BFE"],
    ["#00B894", "#00CEC9"],
    ["#FD79A8", "#FDCB6E"],
    ["#74B9FF", "#0984E3"],
    ["#A8E6CF", "#7FCDCD"],
  ];

  const getRandomGradient = () => {
    const randomIndex = Math.floor(Math.random() * gradientColors.length);
    return gradientColors[randomIndex];
  };

  const categoriesList = useMemo(() => {
    const fallbackCategories = [
      { label: "All Categories", value: "all" },
      { label: "Sports", value: "Sports" },
      { label: "Fitness", value: "Fitness" },
      { label: "Water Sports", value: "Water Sports" },
      { label: "Martial Arts", value: "Martial Arts" },
      { label: "Dance", value: "Dance" },
      { label: "Extreme Sports", value: "Extreme Sports" },
      { label: "Indoor Games", value: "Indoor Games" },
      { label: "Intimacy", value: "Intimacy" },
      { label: "Emotional", value: "Emotional" },
      { label: "Other", value: "Other" },
    ];

    if (!activitiesData.categories || activitiesData.categories.length === 0) {
      return fallbackCategories;
    }

    return [
      { label: t("categories.all"), value: "all" },
      ...activitiesData.categories.map((cat: any) => {
        const translatedLabel = cat.translations?.[language] || cat.label;
        return {
          label: translatedLabel,
          value: cat.name,
        };
      }),
    ];
  }, [activitiesData.categories, t, language]);

  const filteredActivities = useMemo(() => {
    if (!activitiesData.activities) return [];

    return activitiesData.activities.filter((a) => {
      const activityName = getActivityTranslation(a.name, "name");
      const matchesSearch = activityName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || a.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [
    search,
    categoryFilter,
    activitiesData.activities,
    getActivityTranslation,
  ]);

  const handleCategorySelect = (categoryId: string) => {
    if (!activitiesData.activities) return;

    setSelectedActivity(
      activitiesData.activities.find((a) => a.category === categoryId) || null
    );
  };

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleDateChange = (activity: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setCustomDate(selectedDate);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCreateEvent = () => {
    if (!selectedActivity) {
      Alert.alert(
        t("alerts.noActivitySelected.title"),
        t("alerts.noActivitySelected.message")
      );
      return;
    }
    if (selectedRating === 0) {
      Alert.alert(
        t("alerts.noRatingSelected.title"),
        t("alerts.noRatingSelected.message")
      );
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      name: selectedActivity.name,
      category: selectedActivity.category,
      rating: selectedRating,
      date: formatDate(customDate),
      customDate: customDate,
      gradient: selectedGradient,
    };

    setEvents([newEvent, ...activities]);
    setSelectedActivity(null);
    setSelectedRating(0);
    setCustomDate(new Date());
    Alert.alert(t("alerts.success.title"), t("alerts.success.message"));
  };

  const getCategoryName = (categoryId: string) => {
    if (categoryId === "Other") {
      return t("categories.other");
    }
    return getCategoryTranslation(categoryId);
  };

  const getCategoryGradient = (categoryId: string) => {
    // For existing events, this will be overridden by the stored gradient
    return getRandomGradient();
  };

  const renderStars = (
    rating: number,
    interactive = false,
    onPress?: (rating: number) => void
  ) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => interactive && onPress?.(star)}
            disabled={!interactive}
            style={styles.starButton}
          >
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={moderateScale(24)}
              color={star <= rating ? "#FFD700" : "#E0E0E0"}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleShareEvent = async (activity: Event) => {
    setSelectedEventForSharing(activity);
    // Small delay to ensure state is updated before capture
    setTimeout(() => {
      captureAndShare(activity, () => {
        setSelectedEventForSharing(null);
      });
    }, 100);
  };

  const renderEventCard = (activity: Event) => {
    const gradient =
      activity.gradient || getCategoryGradient(activity.category);

    return (
      <View key={activity.id} style={styles.activityCard}>
        <View style={[styles.cardHeader, { backgroundColor: gradient[0] }]}>
          <View style={styles.cardHeaderContent}>
            <View style={styles.categoryBadge}>
              <Text style={{ fontSize: 16, marginRight: 4 }}>
                {activitiesData.activities?.find(
                  (a) => a.name === activity.name
                )?.icon || "🎯"}
              </Text>
              <Text style={styles.categoryText}>
                {getCategoryName(activity.category)}
              </Text>
            </View>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>
                {getActivityTranslation(activity.name, "name")}
              </Text>
              <Text style={styles.cardDate}>{activity.date}</Text>
            </View>
            <View style={styles.cardDecoration}>
              <View style={styles.decorationCircle} />
              <View style={styles.decorationLine} />
            </View>
          </View>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.ratingContainer}>
            {renderStars(activity.rating)}
            <Text style={styles.ratingText}>{activity.rating}.0</Text>
          </View>
          <View style={styles.cardFooter}>
            <View style={styles.activityDetails}>
              <View style={styles.detailItem}>
                <Ionicons
                  name="calendar"
                  size={moderateScale(16)}
                  color="#6B7280"
                />
                <Text style={styles.detailText}>{t("card.activityDate")}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons
                  name="star"
                  size={moderateScale(16)}
                  color="#6B7280"
                />
                <Text style={styles.detailText}>{t("card.rating")}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.shareButton, { backgroundColor: gradient[1] }]}
              onPress={() => handleShareEvent(activity)}
              disabled={isCreating}
            >
              <Ionicons
                name="share-social"
                size={moderateScale(20)}
                color="#FFF"
              />
              <Text style={styles.shareButtonText}>
                {isCreating && selectedEventForSharing?.id === activity.id
                  ? t("card.creating")
                  : t("card.shareButton")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const handleCategoryFilterChange = (value: string) => {
    setCategoryFilter(value);
    // Scroll to the beginning when category changes
    scrollViewRef.current?.scrollTo({ x: 0, animated: true });
  };

  // Debug: Log categoriesList and categoryFilter
  console.log(
    "categoriesList:",
    categoriesList,
    "categoryFilter:",
    categoryFilter
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, color: "#6B7280" }}>{t("loading")}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIconContainer}>
            <Image
              source={require("../assets/images/logo.png")}
              style={{
                width: moderateScale(64),
                height: moderateScale(64),
                resizeMode: "contain",
                borderRadius: moderateScale(32),
                backgroundColor: "#fff",
              }}
            />
          </View>
          <Text style={styles.headerTitle}>{t("app.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("app.subtitle")}</Text>
        </View>

        {/* --- Advanced Activities Grid --- */}
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: 16,
            margin: 12,
            padding: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              width: "100%",
              maxWidth: 500,
              alignSelf: "center",
              marginBottom: 8,
              minHeight: 48,
            }}
          >
            <View style={{ flex: 2, minWidth: 0 }}>
              <TextInput
                style={{
                  width: "100%",
                  height: 48,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  marginRight: 8,
                }}
                placeholder={t("search.placeholder")}
                value={search}
                onChangeText={setSearch}
                placeholderTextColor="#6b7280"
                numberOfLines={1}
                maxLength={50}
                textAlignVertical="center"
              />
            </View>
            <View
              style={{
                flex: 1,
                minWidth: 120,
                maxWidth: 180,
                backgroundColor: "#fff",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                overflow: "visible",
                zIndex: 10,
              }}
            >
              <Picker
                selectedValue={categoryFilter}
                onValueChange={handleCategoryFilterChange}
                style={{ width: "100%", height: 48 }}
                {...(Platform.OS === "ios"
                  ? { itemStyle: { fontSize: 16 } }
                  : {})}
                dropdownIconColor="#2563eb"
                mode="dropdown"
              >
                {categoriesList.map((cat) => (
                  <Picker.Item
                    key={cat.value}
                    label={
                      typeof cat.label === "string" && cat.label.trim()
                        ? cat.label
                        : "Category"
                    }
                    value={cat.value}
                  />
                ))}
              </Picker>
            </View>
          </View>
          {filteredActivities.length === 0 ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 40,
              }}
            >
              <Text style={{ fontSize: 48, marginBottom: 8 }}>🔍</Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: 4,
                }}
              >
                {t("search.noResults.title")}
              </Text>
              <Text
                style={{ color: "#6b7280", fontSize: 14, textAlign: "center" }}
              >
                {t("search.noResults.subtitle")}
              </Text>
            </View>
          ) : (
            <ScrollView
              ref={scrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: "row",
                alignItems: "flex-start",
                paddingVertical: 8,
                gap: 8,
              }}
            >
              {filteredActivities.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    width: 160,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    borderRadius: 16,
                    padding: 16,
                    marginRight: 12,
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3,
                    borderWidth: 1,
                    borderColor: "#f3f4f6",
                    position: "relative",
                  }}
                  activeOpacity={0.85}
                  onPress={() => {
                    setSelectedActivity(item);
                  }}
                >
                  {/* Like/Star actions */}
                  <View
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      flexDirection: "row",
                      gap: 4,
                      zIndex: 2,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        backgroundColor: liked.has(item.id)
                          ? "#ef4444"
                          : "#fff",
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#e5e7eb",
                        marginRight: 2,
                      }}
                      onPress={() =>
                        setLiked((prev) => {
                          const next = new Set(prev);
                          next.has(item.id)
                            ? next.delete(item.id)
                            : next.add(item.id);
                          return next;
                        })
                      }
                    >
                      <Text style={{ fontSize: 16 }}>
                        {liked.has(item.id) ? "❤️" : "🤍"}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        backgroundColor: starred.has(item.id)
                          ? "#f59e0b"
                          : "#fff",
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#e5e7eb",
                      }}
                      onPress={() =>
                        setStarred((prev) => {
                          const next = new Set(prev);
                          next.has(item.id)
                            ? next.delete(item.id)
                            : next.add(item.id);
                          return next;
                        })
                      }
                    >
                      <Text style={{ fontSize: 16 }}>
                        {starred.has(item.id) ? "⭐" : "☆"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 16,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 10,
                      backgroundColor: item.color + "20",
                      marginTop: 8,
                    }}
                  >
                    <Text style={{ fontSize: 36 }}>{item.icon}</Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#1f2937",
                      marginBottom: 2,
                      textAlign: "center",
                    }}
                  >
                    {getActivityTranslation(item.name, "name")}
                  </Text>
                  <Text
                    style={{
                      backgroundColor: "rgba(255,255,255,0.6)",
                      color: "#374151",
                      paddingHorizontal: 10,
                      paddingVertical: 2,
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: "500",
                      marginBottom: 4,
                    }}
                  >
                    {getCategoryTranslation(item.category)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          {/* Stats Footer */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#2563eb" }}
              >
                {activitiesData.activities?.length || 0}
              </Text>
              <Text style={{ fontSize: 12, color: "#6b7280" }}>
                {t("stats.totalActivities")}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#2563eb" }}
              >
                {activitiesData.categories.length}
              </Text>
              <Text style={{ fontSize: 12, color: "#6b7280" }}>
                {t("stats.categories")}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#2563eb" }}
              >
                {filteredActivities.length}
              </Text>
              <Text style={{ fontSize: 12, color: "#6b7280" }}>
                {t("stats.showingResults")}
              </Text>
            </View>
          </View>
        </View>
        {/* --- End Advanced Activities Grid --- */}

        <View style={styles.content}>
          {/* Control Panel */}
          <View style={styles.controlPanel}>
            {selectedActivity && (
              <View style={styles.selectedActivityContainer}>
                <Text style={styles.label}>{t("form.selectedActivity")}</Text>
                <View style={styles.selectedActivityCard}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: selectedActivity.color + "20",
                      marginRight: 12,
                    }}
                  >
                    <Text style={{ fontSize: 24 }}>
                      {selectedActivity.icon}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.selectedActivityName}>
                      {getActivityTranslation(selectedActivity.name, "name")}
                    </Text>
                    <Text style={styles.selectedActivityCategory}>
                      {getCategoryTranslation(selectedActivity.category)}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            <View style={styles.formGroup}>
              <Text style={styles.label}>{t("form.cardColor")}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  flexDirection: "row",
                  gap: 8,
                  paddingVertical: 8,
                }}
              >
                {gradientColors.map((gradient, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: 60,
                      height: 40,
                      borderRadius: 8,
                      borderWidth: 3,
                      borderColor:
                        selectedGradient[0] === gradient[0]
                          ? "#2563eb"
                          : "#e5e7eb",
                      overflow: "hidden",
                    }}
                    onPress={() => setSelectedGradient(gradient)}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: gradient[0],
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: gradient[1],
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>{t("form.activityDate")}</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={showDatePickerModal}
              >
                <Ionicons
                  name="calendar-outline"
                  size={moderateScale(20)}
                  color="#4361EE"
                />
                <Text style={styles.dateButtonText}>
                  {formatDate(customDate)}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={moderateScale(16)}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>{t("form.rating")}</Text>
              {renderStars(selectedRating, true, handleRatingSelect)}
            </View>

            <TouchableOpacity
              style={[
                styles.createButton,
                !selectedActivity && styles.createButtonDisabled,
              ]}
              onPress={handleCreateEvent}
              disabled={!selectedActivity}
            >
              <Ionicons
                name="add-circle"
                size={moderateScale(24)}
                color="#FFF"
              />
              <Text style={styles.createButtonText}>
                {t("form.createButton")}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Events Section */}
          <View style={styles.activitiesSection}>
            <View style={styles.activitiesHeader}>
              <Text style={styles.activitiesTitle}>
                {t("activities.title")}
              </Text>
              <View style={styles.activitiesCount}>
                <Text style={styles.activitiesCountText}>
                  {activities.length} {t("activities.count")}
                </Text>
              </View>
            </View>

            {activities.length === 0 ? (
              <View style={styles.noEvents}>
                <Ionicons
                  name="calendar-outline"
                  size={moderateScale(64)}
                  color="#E5E7EB"
                />
                <Text style={styles.noEventsTitle}>
                  {t("activities.noActivities.title")}
                </Text>
                <Text style={styles.noEventsSubtitle}>
                  {t("activities.noActivities.subtitle")}
                </Text>
              </View>
            ) : (
              <View style={styles.activitiesContainer}>
                {activities.map(renderEventCard)}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={customDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {/* Hidden ViewShot for capturing cards */}
      <ViewShot
        ref={viewShotRef}
        style={styles.hiddenCard}
        options={{
          format: "png",
          quality: 0.9,
        }}
      >
        {selectedEventForSharing && (
          <View style={styles.captureCard}>
            <View
              style={[
                styles.captureHeader,
                {
                  backgroundColor:
                    selectedEventForSharing.gradient?.[0] ||
                    getCategoryGradient(selectedEventForSharing.category)[0],
                },
              ]}
            >
              <View style={styles.captureHeaderContent}>
                <View style={styles.captureCategoryBadge}>
                  <Text style={styles.captureCategoryText}>
                    {getCategoryName(selectedEventForSharing.category)}
                  </Text>
                </View>
                <Text style={styles.captureDate}>
                  {selectedEventForSharing.date}
                </Text>
                <View style={styles.captureDecoration}>
                  <View style={styles.captureDecorationCircle} />
                  <View style={styles.captureDecorationLine} />
                </View>
              </View>
            </View>
            <View style={styles.captureBody}>
              {/* Activity Card Preview */}
              <View style={styles.captureActivityCard}>
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:
                      (activitiesData.activities?.find(
                        (a) => a.name === selectedEventForSharing.name
                      )?.color || "#3B82F6") + "20",
                    marginRight: 16,
                  }}
                >
                  <Text style={{ fontSize: 36 }}>
                    {activitiesData.activities?.find(
                      (a) => a.name === selectedEventForSharing.name
                    )?.icon || "🎯"}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.captureActivityName}>
                    {getActivityTranslation(
                      selectedEventForSharing.name,
                      "name"
                    )}
                  </Text>
                  <Text style={styles.captureActivityCategory}>
                    {getCategoryTranslation(selectedEventForSharing.category)}
                  </Text>
                </View>
              </View>

              <View style={styles.captureRatingContainer}>
                {renderStars(selectedEventForSharing.rating)}
                <Text style={styles.captureRatingText}>
                  {selectedEventForSharing.rating}.0
                </Text>
              </View>
              <View style={styles.captureFooter}>
                <Text style={styles.captureFooterText}>
                  {t("card.createdWith")}
                </Text>
                <View style={styles.captureLogo}>
                  <Image
                    source={require("../assets/images/logo.png")}
                    style={{
                      width: moderateScale(20),
                      height: moderateScale(20),
                      borderRadius: moderateScale(10),
                      resizeMode: "cover",
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </ViewShot>
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
  headerIconContainer: {
    width: scale(64),
    height: scale(64),
    borderRadius: moderateScale(32),
    backgroundColor: "#EDF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(12),
  },
  headerTitle: {
    fontSize: moderateScale(28),
    fontWeight: "bold",
    color: "#4361EE",
    marginBottom: verticalScale(4),
  },
  headerSubtitle: {
    fontSize: moderateScale(16),
    color: "#6B7280",
    textAlign: "center",
  },
  content: {
    paddingHorizontal: scale(20),
  },
  controlPanel: {
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(16),
    padding: scale(20),
    marginBottom: verticalScale(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  panelTitle: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: "#4361EE",
    marginBottom: verticalScale(20),
  },
  formGroup: {
    marginBottom: verticalScale(20),
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#374151",
    marginBottom: verticalScale(8),
  },
  input: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(16),
    color: "#374151",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    gap: scale(8),
  },
  dateButtonText: {
    fontSize: moderateScale(16),
    color: "#374151",
    flex: 1,
  },
  starsContainer: {
    flexDirection: "row",
    gap: scale(4),
  },
  starButton: {
    padding: scale(2),
  },
  createButton: {
    backgroundColor: "#4361EE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(10),
    gap: scale(8),
    shadowColor: "#4361EE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  createButtonText: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  activitiesSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(16),
    padding: scale(20),
    marginBottom: verticalScale(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  activitiesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  activitiesTitle: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: "#4361EE",
  },
  activitiesCount: {
    backgroundColor: "#EDF2FF",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(20),
  },
  activitiesCountText: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#4361EE",
  },
  noEvents: {
    alignItems: "center",
    paddingVertical: verticalScale(40),
  },
  noEventsTitle: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: "#6B7280",
    marginTop: verticalScale(16),
  },
  noEventsSubtitle: {
    fontSize: moderateScale(14),
    color: "#9CA3AF",
    marginTop: verticalScale(8),
    textAlign: "center",
  },
  activitiesContainer: {
    gap: verticalScale(16),
  },
  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(16),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    padding: scale(20),
    position: "relative",
  },
  cardHeaderContent: {
    position: "relative",
    zIndex: 2,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(12),
    alignSelf: "flex-start",
    marginBottom: verticalScale(12),
    gap: scale(4),
  },
  categoryText: {
    fontSize: moderateScale(12),
    fontWeight: "600",
    color: "#FFFFFF",
  },
  cardTitleContainer: {
    marginBottom: verticalScale(8),
  },
  cardTitle: {
    fontSize: moderateScale(22),
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: verticalScale(4),
  },
  cardDate: {
    fontSize: moderateScale(16),
    color: "rgba(255, 255, 255, 0.9)",
  },
  cardDecoration: {
    position: "absolute",
    top: -10,
    right: -10,
    zIndex: 1,
  },
  decorationCircle: {
    width: scale(40),
    height: scale(40),
    borderRadius: moderateScale(20),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: verticalScale(8),
  },
  decorationLine: {
    width: scale(2),
    height: verticalScale(20),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignSelf: "center",
  },
  cardBody: {
    padding: scale(20),
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(20),
    gap: scale(8),
  },
  ratingText: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#374151",
  },
  cardFooter: {
    gap: verticalScale(12),
  },
  activityDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(8),
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
  },
  detailText: {
    fontSize: moderateScale(12),
    color: "#6B7280",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(8),
    gap: scale(8),
  },
  shareButtonText: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#FFFFFF",
  },
  hiddenCard: {
    position: "absolute",
    left: -1000,
    top: -1000,
  },
  captureCard: {
    width: scale(400),
    height: scale(400),
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(16),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  captureHeader: {
    padding: scale(20),
    flex: 0.3,
    position: "relative",
  },
  captureHeaderContent: {
    position: "relative",
    zIndex: 2,
  },
  captureCategoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(12),
    alignSelf: "flex-start",
    marginBottom: verticalScale(12),
    gap: scale(4),
  },
  captureCategoryText: {
    fontSize: moderateScale(12),
    fontWeight: "600",
    color: "#FFFFFF",
  },
  captureDate: {
    fontSize: moderateScale(16),
    color: "rgba(255, 255, 255, 0.9)",
  },
  captureDecoration: {
    position: "absolute",
    top: -10,
    right: -10,
    zIndex: 1,
  },
  captureDecorationCircle: {
    width: scale(40),
    height: scale(40),
    borderRadius: moderateScale(20),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: verticalScale(8),
  },
  captureDecorationLine: {
    width: scale(2),
    height: verticalScale(20),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignSelf: "center",
  },
  captureBody: {
    padding: scale(20),
    flex: 1,
    justifyContent: "space-between",
  },
  captureActivityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(12),
    padding: scale(16),
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  captureActivityName: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: "#374151",
    marginBottom: verticalScale(4),
  },
  captureActivityCategory: {
    fontSize: moderateScale(12),
    color: "#6B7280",
    backgroundColor: "#E5E7EB",
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(1),
    borderRadius: moderateScale(6),
    alignSelf: "flex-start",
  },
  captureRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  captureRatingText: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: "#374151",
  },
  captureFooter: {
    alignItems: "center",
    paddingTop: verticalScale(16),
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "center",
    gap: scale(8),
  },
  captureFooterText: {
    fontSize: moderateScale(12),
    color: "#6B7280",
    fontStyle: "italic",
  },
  captureLogo: {
    width: scale(24),
    height: scale(24),
    borderRadius: moderateScale(12),
    backgroundColor: "#EDF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedActivityContainer: {
    marginBottom: verticalScale(20),
  },
  selectedActivityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: moderateScale(12),
    padding: scale(16),
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  selectedActivityName: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: "#374151",
    marginBottom: verticalScale(4),
  },
  selectedActivityCategory: {
    fontSize: moderateScale(14),
    color: "#6B7280",
    backgroundColor: "#E5E7EB",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(8),
    alignSelf: "flex-start",
  },
  createButtonDisabled: {
    backgroundColor: "#9CA3AF",
    shadowColor: "#9CA3AF",
  },
});
