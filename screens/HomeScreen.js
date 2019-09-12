import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
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

function HomeScreen({ navigation, location, setLocation }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function findCurrentLocation() {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== "granted") {
        alert(
          "Hey! You might want to enable location services to fully benefit from this app!"
        );
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

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.welcomeContainer}>
          <Image
            source={require("../assets/images/robot-dev.png")}
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>Welcome to MyPlaces!</Text>

          <Text style={styles.getStartedText}>
            Get started by pressing the button below!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          {loading ? (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
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
    marginTop: 15,
    alignItems: "center"
  },
  buttonText: {
    padding: 30
  },
  errorContainer: {
    marginTop: 100,
    alignItems: "center",
    padding: 20
  }
});

const mapStateToProps = state => ({
  location: state.location.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLocation
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
