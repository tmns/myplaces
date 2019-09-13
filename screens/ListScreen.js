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

function ListScreen({
  navigation,
  granted,
  location,
  places,
  setPlaces,
  darkMode
}) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
        data={places}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Map", { place: item })}
          >
            <ListItem darkMode={darkMode}>
              <Text style={styles.itemAddress}>{item.address}</Text>
              <Text style={styles.itemDistance}>
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
