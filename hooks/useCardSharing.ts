import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { useRef, useState } from "react";
import { Alert } from "react-native";
import ViewShot from "react-native-view-shot";

interface Event {
  id: string;
  name: string;
  category: string;
  rating: number;
  date: string;
}

export const useCardSharing = () => {
  const [isCreating, setIsCreating] = useState(false);
  const viewShotRef = useRef<ViewShot>(null);

  const captureAndShare = async (event: Event, onComplete?: () => void) => {
    try {
      setIsCreating(true);

      if (!viewShotRef.current) {
        throw new Error("ViewShot reference not available");
      }

      // Capture the card as an image
      const uri = await (viewShotRef.current as any).capture();

      // Request media library permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant permission to save event cards to your photo library.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Settings",
              onPress: () => MediaLibrary.requestPermissionsAsync(),
            },
          ]
        );
        return;
      }

      // Save to media library
      await MediaLibrary.saveToLibraryAsync(uri);

      // Share the image
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: "image/png",
          dialogTitle: `Share ${event.name}`,
          UTI: "public.png",
        });
      } else {
        Alert.alert(
          "Sharing Not Available",
          "Sharing is not available on this device. The card has been saved to your photo library.",
          [{ text: "OK" }]
        );
      }

      Alert.alert(
        "Success!",
        `"${event.name}" has been saved to your photo library and shared successfully!`,
        [{ text: "OK" }]
      );

      // Call the completion callback if provided
      onComplete?.();
    } catch (error) {
      console.error("Error capturing/sharing card:", error);
      Alert.alert(
        "Error",
        "Failed to capture and share the card. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsCreating(false);
    }
  };

  const captureCardOnly = async (event: Event): Promise<string | null> => {
    try {
      if (!viewShotRef.current) {
        throw new Error("ViewShot reference not available");
      }

      const uri = await (viewShotRef.current as any).capture();
      return uri;
    } catch (error) {
      console.error("Error capturing card:", error);
      Alert.alert("Error", "Failed to capture the card. Please try again.");
      return null;
    }
  };

  return {
    isCreating,
    viewShotRef,
    captureAndShare,
    captureCardOnly,
  };
};
