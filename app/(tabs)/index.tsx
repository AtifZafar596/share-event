import { useCardSharing } from "@/hooks/useCardSharing";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
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
}

export default function HomeScreen() {
  const [activities, setEvents] = useState<Event[]>([]);
  const [activityName, setEventName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [customDate, setCustomDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedEventForSharing, setSelectedEventForSharing] =
    useState<Event | null>(null);

  const { isCreating, viewShotRef, captureAndShare } = useCardSharing();

  const categories = [
    {
      id: "fitness",
      name: "Fitness",
      icon: "fitness",
      gradient: ["#FF6B6B", "#FF8E53"],
    },
    {
      id: "running",
      name: "Running",
      icon: "walk",
      gradient: ["#4ECDC4", "#44A08D"],
    },
    {
      id: "party",
      name: "Party",
      icon: "wine",
      gradient: ["#A8E6CF", "#7FCDCD"],
    },
    {
      id: "workout",
      name: "Workout",
      icon: "barbell",
      gradient: ["#FFD93D", "#FF6B6B"],
    },
    {
      id: "yoga",
      name: "Yoga",
      icon: "body",
      gradient: ["#6C5CE7", "#A29BFE"],
    },
    {
      id: "swimming",
      name: "Swimming",
      icon: "water",
      gradient: ["#74B9FF", "#0984E3"],
    },
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
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
    if (!activityName.trim()) {
      Alert.alert("Error", "Please enter an activity name");
      return;
    }
    if (!selectedCategory) {
      Alert.alert("Error", "Please select a category");
      return;
    }
    if (selectedRating === 0) {
      Alert.alert("Error", "Please select a rating");
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      name: activityName.trim(),
      category: selectedCategory,
      rating: selectedRating,
      date: formatDate(customDate),
      customDate: customDate,
    };

    setEvents([newEvent, ...activities]);
    setEventName("");
    setSelectedCategory("");
    setSelectedRating(0);
    setCustomDate(new Date());
    Alert.alert("Success", "Event card created successfully!");
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.icon || "help-circle";
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.name || "Event";
  };

  const getCategoryGradient = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.gradient || ["#4361EE", "#3F37C9"];
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
    const gradient = getCategoryGradient(activity.category);

    return (
      <View key={activity.id} style={styles.activityCard}>
        <View style={[styles.cardHeader, { backgroundColor: gradient[0] }]}>
          <View style={styles.cardHeaderContent}>
            <View style={styles.categoryBadge}>
              <Ionicons
                name={getCategoryIcon(activity.category) as any}
                size={moderateScale(16)}
                color="#FFF"
              />
              <Text style={styles.categoryText}>
                {getCategoryName(activity.category)}
              </Text>
            </View>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>{activity.name}</Text>
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
                <Text style={styles.detailText}>Activity Date</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons
                  name="star"
                  size={moderateScale(16)}
                  color="#6B7280"
                />
                <Text style={styles.detailText}>Rating</Text>
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
                  ? "Creating..."
                  : "Share Card"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIconContainer}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={{
                width: moderateScale(64),
                height: moderateScale(64),
                resizeMode: "contain",
                borderRadius: moderateScale(32),
                backgroundColor: "#fff",
              }}
            />
          </View>
          <Text style={styles.headerTitle}>Activity Post</Text>
          <Text style={styles.headerSubtitle}>
            Create & share beautiful activity cards
          </Text>
        </View>

        <View style={styles.content}>
          {/* Control Panel */}
          <View style={styles.controlPanel}>
            <Text style={styles.panelTitle}>Create Activity</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Activity Name</Text>
              <TextInput
                style={styles.input}
                value={activityName}
                onChangeText={setEventName}
                placeholder="Enter activity name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoryGrid}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category.id &&
                        styles.categoryButtonActive,
                    ]}
                    onPress={() => handleCategorySelect(category.id)}
                  >
                    <Ionicons
                      name={category.icon as any}
                      size={moderateScale(20)}
                      color={
                        selectedCategory === category.id ? "#FFF" : "#4361EE"
                      }
                    />
                    <Text
                      style={[
                        styles.categoryButtonText,
                        selectedCategory === category.id &&
                          styles.categoryButtonTextActive,
                      ]}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Activity Date</Text>
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
              <Text style={styles.label}>Rating</Text>
              {renderStars(selectedRating, true, handleRatingSelect)}
            </View>

            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateEvent}
            >
              <Ionicons
                name="add-circle"
                size={moderateScale(24)}
                color="#FFF"
              />
              <Text style={styles.createButtonText}>Create Activity Card</Text>
            </TouchableOpacity>
          </View>

          {/* Events Section */}
          <View style={styles.activitiesSection}>
            <View style={styles.activitiesHeader}>
              <Text style={styles.activitiesTitle}>Your Activities</Text>
              <View style={styles.activitiesCount}>
                <Text style={styles.activitiesCountText}>
                  {activities.length} activities
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
                  No activities created yet
                </Text>
                <Text style={styles.noEventsSubtitle}>
                  Create your first activity using the panel above
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
                  backgroundColor: getCategoryGradient(
                    selectedEventForSharing.category
                  )[0],
                },
              ]}
            >
              <View style={styles.captureHeaderContent}>
                <View style={styles.captureCategoryBadge}>
                  <Ionicons
                    name={
                      getCategoryIcon(selectedEventForSharing.category) as any
                    }
                    size={moderateScale(16)}
                    color="#FFF"
                  />
                  <Text style={styles.captureCategoryText}>
                    {getCategoryName(selectedEventForSharing.category)}
                  </Text>
                </View>
                <Text style={styles.captureTitle}>
                  {selectedEventForSharing.name}
                </Text>
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
              <View style={styles.captureRatingContainer}>
                {renderStars(selectedEventForSharing.rating)}
                <Text style={styles.captureRatingText}>
                  {selectedEventForSharing.rating}.0
                </Text>
              </View>
              <View style={styles.captureFooter}>
                <Text style={styles.captureFooterText}>
                  Created with Instant share
                </Text>
                <View style={styles.captureLogo}>
                  <Image
                    source={require("../../assets/images/logo.png")}
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
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(10),
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(8),
    minWidth: scale(80),
    justifyContent: "center",
    gap: scale(4),
  },
  categoryButtonActive: {
    backgroundColor: "#4361EE",
  },
  categoryButtonText: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#4361EE",
  },
  categoryButtonTextActive: {
    color: "#FFFFFF",
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
    fontSize: moderateScale(14),
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
    flex: 1,
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
  captureTitle: {
    fontSize: moderateScale(26),
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: verticalScale(4),
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
});
