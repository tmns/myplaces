import { combineReducers } from "redux";

import locationReducer from "./locationReducer";
import placesReducer from "./placesReducer";
import darkModeReducer from "./darkModeReducer";

const rootReducer = combineReducers({
  location: locationReducer,
  places: placesReducer,
  darkMode: darkModeReducer
});

export default rootReducer;