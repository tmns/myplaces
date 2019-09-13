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
