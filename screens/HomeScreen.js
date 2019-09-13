import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import React, { useState, useEffect } from "react";
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

import { setLocation } from '../actions/locationActions';
import { setDarkMode } from '../actions/darkModeActions';

function HomeScreen({ navigation, location, setLocation, darkMode, setDarkMode }) {
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function findCurrentLocation() {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== "granted") {
        setError(true);
      } else {
        setLoading(true);
        const geoData = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true
        });
        setLocation({
          latitude: geoData.coords.latitude,
          longitude: geoData.coords.longitude
        });
        setLoading(false);
      }
    }
    findCurrentLocation();
  }, []);

  // determine darkmode icon name
  if (darkMode) {
    darkModeIcon = Platform.OS === 'ios' ? "ios-sunny" : "md-sunny" 
  } else {
    darkModeIcon = Platform.OS === 'ios' ? "ios-moon" : "md-moon"
  }

  return (
    <View style={darkMode ? styles.containerDark : styles.container}>
      <ScrollView
        style={darkMode ? styles.containerDark : styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.welcomeContainer}>
          <TouchableOpacity onPress={() => {
            setDarkMode(!darkMode);
          }
          }>
            <Ionicons
              name={darkModeIcon}
              size={24}
              color={darkMode ? "#fff" : "#000"}
            />
          </TouchableOpacity>
          <Image
            source={darkMode ? require("../assets/images/globeDark.png") : require("../assets/images/globe.png")}
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
              onPress={() => navigation.navigate("List", { location })}
              style={styles.buttonText}
            >
              <Button hitSlop title="Get started!" />
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
  headerBackTitle: "Home",
}

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
    marginTop: 3,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  getStartedText: {
    fontSize: 17,
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLocation,
      setDarkMode
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
