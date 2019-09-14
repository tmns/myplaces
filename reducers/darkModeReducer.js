import { AsyncStorage } from "react-native";

const setUserSetting = async darkMode => {
  try {
    await AsyncStorage.setItem("darkmode", JSON.stringify(darkMode));
  } catch (err) {
    console.log(err);
  }
};

const INITIAL_STATE = {
  isEnabled: false
};

const darkModeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_DARKMODE":
      setUserSetting(action.payload);
      return {
        ...state,
        isEnabled: action.payload
      };
    default:
      return state;
  }
};

export default darkModeReducer;
