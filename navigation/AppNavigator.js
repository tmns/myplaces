import { createAppContainer, createStackNavigator } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import ListTabNavigator from "./ListTabNavigator";

export default createAppContainer(
  createStackNavigator(
    {
      Home: HomeScreen,
      List: ListTabNavigator
    },
    {
      initialRouteName: "Home"
    }
  )
);
