import { combineReducers } from 'redux';

import locationReducer from './locationReducer';
import placesReducer from './placesReducer';

const rootReducer = combineReducers({
  location: locationReducer,
  places: placesReducer
});

export default rootReducer;