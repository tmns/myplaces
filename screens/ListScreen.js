import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ListItem } from "../components/ListItem";
import { PLACES_URL } from "../constants/Config";
import { setPlaces } from "../actions/placesActions";

function ListScreen({ location, places, setPlaces }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  console.log(location);

  useEffect(() => {
    async function fetchPlaces() {
      setLoading(true);
      try {
        const response = await fetch(PLACES_URL);
        const data = await response.json();
        setPlaces(data);
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
    <View style={styles.container}>
      {loading && (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )}
      {error && (
        <Text style={styles.error}>Sorry, there was an error loading your places.</Text>
      )}
      <FlatList
        data={places}
        renderItem={({ item }) => (
          <ListItem>
            <Text style={styles.item}>Address: {item.address}</Text>
            <Text style={styles.item}>Latitude: {item.latitude}</Text>
            <Text style={styles.item}>Longitude: {item.longitude}</Text>
          </ListItem>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

ListScreen.navigationOptions = {
  title: "List"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  item: {
    width: "100%",
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
  },
  error: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
  }
});

const mapStateToProps = state => ({
  places: state.places.data,
  location: state.location.data
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
