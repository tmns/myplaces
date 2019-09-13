import { createAppContainer, createStackNavigator } from "react-navigation";
import React from 'react';
import { connect } from 'react-redux';

import HomeScreen from "../screens/HomeScreen";
import ListTabNavigator from "./ListTabNavigator";

let AppContainer = createAppContainer(
  createStackNavigator(
    {
      Home: HomeScreen,
      List: ListTabNavigator
    },
    {
      initialRouteName: "Home",
      defaultNavigationOptions: {
        headerTitleStyle: {
          fontFamily: "Pacifico",
          color: "rgba(37, 204, 247, 1)",
          fontSize: 22
        }
      }
    }
  )
);

const mapStateToProps = state => ({
  darkMode: state.darkMode.isEnabled
})

const containerWithTheme = ({ darkMode }) => <AppContainer theme={darkMode ? "dark" : "light"} />

export default connect(mapStateToProps)(containerWithTheme);