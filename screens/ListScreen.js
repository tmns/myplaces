import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { connect } from "react-redux";

import { ListItem } from "../components/ListItem";
import { PLACES_URL } from "../constants/Urls";

function ListScreen({ places }) {
  const [loading, setLoading] = useState("true");
  const [error, setError] = useState("");
  
  useEffect(() => {
    async function fetchPlaces() {
      setLoading("true");
      try {
        const response = await fetch(PLACES_URL);
        const data = await response.json();  
      } catch(err) {
        console.log(err);
        setError("Sorry, there was an error loading your places.");
      }
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ExpoLinksView />
      <FlatList
        data={places}
        renderItem={({ item }) => (
          <ListItem>
            <Text style={styles.item}>{item.key}</Text>
          </ListItem>
        )}
        keyExtractor={item => item.key}
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
    color: "red"
  }
});

const mapStateToProps = state => ({
  places: state.places.data
});

export default connect(mapStateToProps)(ListScreen);
