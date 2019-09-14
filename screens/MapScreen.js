import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";

import {
  DEFAULT_LAT,
  DEFAULT_LON,
  DEFAULT_LAT_DELT,
  DEFAULT_LON_DELT
} from "../constants/Config";

export function MapScreen({ navigation, places, darkMode }) {
  let selected = navigation.getParam("place");

  const animate = data => {
    mapView.root.animateToRegion(data, 2000);
  };

  // Call animate function every time user selects a place
  useEffect(() => {
    if (selected) {
      animate({
        latitude: parseFloat(selected.latitude) || DEFAULT_LAT,
        longitude: parseFloat(selected.longitude) || DEFAULT_LON,
        latitudeDelta: 1,
        longitudeDelta: 1
      });
    }
  }, [selected]);

  return (
    <View style={styles.container}>
      <MapView
        region={{
          latitude: DEFAULT_LAT,
          longitude: DEFAULT_LON,
          latitudeDelta: DEFAULT_LAT_DELT,
          longitudeDelta: DEFAULT_LON_DELT
        }}
        style={styles.map}
        ref={ref => (mapView = ref)}
        testID="map-view"
        clusterColor={darkMode ? "#082016" : "#F5F5F5"}
        clusterTextColor={darkMode ? "rgba(37, 204, 247, 1)" : "#FF5252"}
        clusterBorderColor={darkMode ? "rgba(37, 204, 247, 1)" : "#FF5252"}
      >
        {places.map(place => (
          <Marker
            coordinate={{
              latitude: parseFloat(place.latitude),
              longitude: parseFloat(place.longitude)
            }}
            key={place.id}
            testID="map-marker"
          />
        ))}
      </MapView>
    </View>
  );
}

MapScreen.navigationOptions = {
  title: "MyMap"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  map: {
    width: "100%",
    height: "100%"
  }
});

const mapStateToProps = state => ({
  places: state.places.data,
  darkMode: state.darkMode.isEnabled
});

export default connect(mapStateToProps)(MapScreen);
