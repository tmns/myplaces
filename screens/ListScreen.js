import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { SearchBar } from "react-native-elements";
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
  // A state of all places are kept local to the component for filtering search results
  const [allPlaces, setAllPlaces] = useState([]);
  const [search, setSearch] = useState("");

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
        setAllPlaces(sortedData); // local
        setPlaces(sortedData); // redux
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPlaces();
  }, []);

  const updateSearch = search => {
    setSearch(search);
  };

  // Filter displayed results based on search query
  useEffect(() => {
    if (allPlaces) {
      setPlaces(
        allPlaces.filter(place =>
          place.address.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  return (
    <View style={darkMode ? styles.containerDark : styles.container}>
      <SearchBar
        placeholder="Search places..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={
          darkMode 
            ? styles.searchContainerDark 
            : styles.searchContainer
        }
        inputContainerStyle={
          darkMode
            ? styles.searchInputContainerDark
            : styles.searchInputContainer
        }
        inputStyle={styles.searchInput}
        autoCorrect={false}
        testID="search-container"
      />
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
    backgroundColor: "#fff"
  },
  containerDark: {
    flex: 1,
    backgroundColor: "#000"
  },
  searchContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#CCC",
    shadowOpacity: 1.0,
    shadowRadius: 1
  },
  searchInputContainer: {
    backgroundColor: "#fff"
  },
  searchContainerDark: {
    backgroundColor: "#000"
  },
  searchInputContainerDark: {
    backgroundColor: "#082016"
  },
  searchInput: {
    color: "rgba(96,100,109, 1)"
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

const mapDispatchToProps = {
  setPlaces
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListScreen);
