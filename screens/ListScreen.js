import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { connect } from "react-redux";

import { ListItem } from "../components/ListItem";

function ListScreen({ places }) {
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
