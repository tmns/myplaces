import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";

import { setLocation } from "../actions/locationActions";
import { setDarkMode } from "../actions/darkModeActions";

export function HomeScreen({
  navigation,
  location,
  setLocation,
  darkMode,
  setDarkMode
}) {
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  //  Retrieve user's preferred darkMode setting from AsyncStorage
  useEffect(() => {
    async function retrieveUserSetting() {
      try {
        const userDarkMode = await AsyncStorage.getItem("darkmode");
        setDarkMode(JSON.parse(userDarkMode));
      } catch (err) {
        console.log(err);
      }
    }
    retrieveUserSetting();
  }, []);

  // determine darkmode icon name
  let darkModeIcon;
  if (darkMode) {
    darkModeIcon = Platform.OS === "ios" ? "ios-sunny" : "md-sunny";
  } else {
    darkModeIcon = Platform.OS === "ios" ? "ios-moon" : "md-moon";
  }

  // Attempt to determine user's lcoation
  // 1) Ask user for location permissions
  // 2) If granted, determine coordinates and store them in Redux
  // 3) Else, set an error / info message for the user
  useEffect(() => {
    async function findCurrentLocation() {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== "granted") {
        setError(true);
      } else {
        setLoading(true);
        try {
          const geoData = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true
          });
          setLocation({
            latitude: geoData.coords.latitude,
            longitude: geoData.coords.longitude
          });
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    }
    findCurrentLocation();
  }, []);

  return (
    <View style={darkMode ? styles.containerDark : styles.container}>
      <ScrollView
        style={darkMode ? styles.containerDark : styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.welcomeContainer} testID="welcome-container">
          <TouchableOpacity
            accessibility={true}
            accessibilityLabel="Tap me to toggle dark mode!"
            onPress={async () => {
              setDarkMode(!darkMode);
            }}
            testID="set-darkmode-btn"
          >
            <Ionicons
              accessibilityRole="button"
              name={darkModeIcon}
              size={24}
              color={darkMode ? "#fff" : "#000"}
            />
          </TouchableOpacity>
          <Image
            source={
              darkMode
                ? require("../assets/images/globeDark.png")
                : require("../assets/images/globe.png")
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>Welcome to MyPlaces!</Text>
        </View>

        <View style={styles.buttonContainer}>
          {isLoading ? (
            <>
              <Text style={styles.getStartedText}>Determining Location</Text>
              <View style={{ flex: 1, padding: 20 }}>
                <ActivityIndicator />
              </View>
            </>
          ) : (
            <TouchableOpacity
              accessibility={true}
              accessibilityLabel="Tap me to see your list of places!"
              onPress={() => navigation.navigate("List", { location })}
              style={styles.buttonText}
            >
              <Button hitSlop title="Get started!" testID="get-started-btn" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.errorContainer}>
          {error && (
            <Text style={styles.getStartedText}>
              Note: Since you have not allowed location access, the app will not
              be able to sort your places based on proximity!
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  title: "MyPlaces",
  headerBackTitle: "Home"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  containerDark: {
    flex: 1,
    backgroundColor: "#082016"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 200,
    height: 180,
    resizeMode: "contain",
    marginTop: 3
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  getStartedText: {
    fontSize: 20,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center"
  },
  buttonText: {
    padding: 30
  },
  errorContainer: {
    marginTop: 80,
    alignItems: "center",
    padding: 20
  }
});

const mapStateToProps = state => ({
  location: state.location.data,
  darkMode: state.darkMode.isEnabled
});

const mapDispatchToProps = {
  setLocation,
  setDarkMode
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
