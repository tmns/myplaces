const INITIAL_STATE = {
  data: []
}

const placesReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'SET_PLACES':
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
}

export default placesReducer;