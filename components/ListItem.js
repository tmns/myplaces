import React from 'react';
import { View, StyleSheet } from 'react-native';

export function ListItem(props) {
  return (
    <View style={styles.rowContainer}>{props.children}</View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    height: 100,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 4,
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: '#CCC',
    shadowOpacity: 1.0,
    shadowRadius: 1
  }
})
