import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ListItem } from "../components/ListItem";
import { PLACES_URL } from "../constants/Config";
import { setPlaces } from "../actions/placesActions";
import { getDistance } from "../utils";

export function ListScreen({
  navigation,
  granted,
  location,
  places,
  setPlaces,
  darkMode
}) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Attempt to fetch places from API endpoint and store them in Redux
  // 1) Fetch places from API endpoint
  // 2) If location permissions granted, for each location
  //   a) Calculate distance between user location and retrieved location
  //   b) Sort places based on distance
  // 3) Else, for each location
  //   a) Sort places alphabetically based on address
  // 4) Store in redux
  // 5) If error, display error message to user
  useEffect(() => {
    async function fetchPlaces() {
      setLoading(true);
      try {
        const response = await fetch(PLACES_URL);
        const data = await response.json();
        let dataWithDistance, sortedData;
        if (granted) {
          dataWithDistance = data.map(item => ({
            ...item,
            distance: getDistance({
              lat1: location.latitude,
              lat2: item.latitude,
              lon1: location.longitude,
              lon2: item.longitude
            })
          }));
          sortedData = dataWithDistance.sort((a, b) => a.distance - b.distance);
        } else {
          sortedData = data.sort((a, b) => {
            let aLower = a.address.toLowerCase();
            let bLower = b.address.toLowerCase();
            if (aLower < bLower) return -1;
            if (aLower > bLower) return 1;
            return 0;
          });
        }
        setPlaces(sortedData);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPlaces();
  }, []);

  return (
    <View style={darkMode ? styles.containerDark : styles.container}>
      {isLoading && (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )}
      {error && (
        <Text style={styles.error}>
          Sorry, there was an error loading your places.
        </Text>
      )}
      <FlatList
        testID="list-container"
        data={places}
        renderItem={({ item }) => (
          <TouchableOpacity
            accessibility={true}
            accessibilityLabel="Tap me to see this place on the map!"
            onPress={() => navigation.navigate("Map", { place: item })}
          >
            <ListItem
              darkMode={darkMode}
              testID="list-item"
              accessibilityRole="button"
            >
              <Text style={styles.itemAddress} testID="item-address">
                {item.address}
              </Text>
              <Text style={styles.itemDistance} testID="item-distance">
                {granted ? item.distance + " km" : ""}
              </Text>
            </ListItem>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

ListScreen.navigationOptions = {
  title: "MyList"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  containerDark: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#000"
  },
  itemAddress: {
    textAlign: "center",
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    color: "rgba(96,100,109, 1)",
    lineHeight: 24
  },
  itemDistance: {
    textAlign: "center",
    width: "100%",
    fontSize: 20,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24
  },
  error: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24
  }
});

const mapStateToProps = state => ({
  places: state.places.data,
  location: state.location.data,
  granted: state.location.granted,
  darkMode: state.darkMode.isEnabled
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setPlaces
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListScreen);
