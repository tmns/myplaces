import { combineReducers } from 'redux';

import placesReducer from './placesReducer';

const rootReducer = combineReducers({
  places: placesReducer
});

export default rootReducer;