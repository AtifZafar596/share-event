import { LanguageProvider } from "@/contexts/LanguageContext";
import { db } from "@/firebaseConfig";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import * as Network from "expo-network";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Linking, Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  const getVersion = async () => {
    const docRef = doc(db, "app-config", "version-info");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("docSnap.data()", docSnap.data());
      const data = docSnap.data();
      return data;
    } else {
      console.log("No such document!");
      return null;
    }
  };

  useEffect(() => {
    //version check
    const checkNetworkAndVersion = async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();
        console.log("networkState ", networkState);
        if (networkState.isConnected && networkState.isInternetReachable) {
          const currentVersion = Constants.expoConfig?.version;
          console.log("current version", currentVersion);
          const versionData = await getVersion();
          console.log("versionData ", versionData, currentVersion);
          if (versionData && currentVersion !== versionData["latest-version"]) {
            setUpdateMessage(
              versionData.message ||
                "A new version is available. Please update to continue."
            );
            setShowUpdateAlert(true);
          }
        }
      } catch (error) {
        console.log("Network check failed:", error);
      }
    };
    checkNetworkAndVersion();
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <LanguageProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        
        {/* Custom Update Alert Modal with White Background */}
        <Modal
          visible={showUpdateAlert}
          transparent={true}
          animationType="fade"
          statusBarTranslucent={true}
          onRequestClose={() => setShowUpdateAlert(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.alertContainer}>
              <Text style={styles.alertTitle}>Update Available</Text>
              <Text style={styles.alertMessage}>{updateMessage}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setShowUpdateAlert(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.updateButton]}
                  onPress={() => {
                    setShowUpdateAlert(false);
                    Linking.openURL(
                      "https://play.google.com/store/apps/details?id=com.atifdev.eventplanner"
                    );
                  }}
                >
                  <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ThemeProvider>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0, // Ensure it covers the entire screen
    marginTop: 0,
  },
  alertContainer: {
    backgroundColor: '#FFFFFF', // Always white background
    borderRadius: 12,
    padding: 20,
    margin: 20,
    minWidth: 280,
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000', // Always black text
    marginBottom: 12,
    textAlign: 'center',
  },
  alertMessage: {
    fontSize: 16,
    color: '#333333', // Dark gray text
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  updateButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
