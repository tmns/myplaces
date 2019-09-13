import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import ListScreen from "../screens/ListScreen";
import MapScreen from "../screens/MapScreen";

const platformConfig = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const config = {
  ...platformConfig,
  defaultNavigationOptions: {
    headerTitleStyle: {
      fontFamily: "Pacifico",
      color: "rgba(37, 204, 247, 1)",
      fontSize: 22
    }
  }
};

const ListStack = createStackNavigator(
  {
    List: ListScreen
  },
  config
);

ListStack.navigationOptions = {
  tabBarLabel: "List",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-list${focused ? "" : "-box"}`
          : `md-list${focused ? "" : "-box"}`
      }
    />
  )
};

ListStack.path = "";

const MapStack = createStackNavigator(
  {
    Map: MapScreen
  },
  config
);

MapStack.navigationOptions = {
  tabBarLabel: "Map",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-map" : "md-map"}
    />
  )
};

MapStack.path = "";

const tabNavigator = createBottomTabNavigator(
  {
    ListStack,
    MapStack
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "#082016"
      }
    }
  }
);

tabNavigator.path = "";

export default tabNavigator;
