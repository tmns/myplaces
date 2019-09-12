import * as WebBrowser from "expo-web-browser";
import { Constants, Location, Permissions } from "expo";
import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View
} from "react-native";

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    async function findCurrentLocation() {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== "granted") {
        setError(true);
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.latitude,
        longitude: location.longitude
      });
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
          {error && (
            <Text style={styles.getStartedText}>
              Since you did not allow location access, the app will not be able to sort your places based on proximity.
            </Text>
          )}
          <Text style={styles.getStartedText}>Welcome to MyPlaces!</Text>

          <Text style={styles.getStartedText}>
            Get started by pressing the button below!
          </Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("List", {
                location
              })
            }
            style={styles.helpLink}
          >
            <Button hitSlop title="Get started!" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes"
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
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
