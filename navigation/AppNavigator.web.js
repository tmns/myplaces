import { createBrowserApp } from "@react-navigation/web";
import { createStackNavigator } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import ListTabNavigator from "./ListTabNavigator";

const stackNavigator = createStackNavigator(
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
);
stackNavigator.path = "";

export default createBrowserApp(stackNavigator, { history: "hash" });
