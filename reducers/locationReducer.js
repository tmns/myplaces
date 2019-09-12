const INITIAL_STATE = {
  data: {},
  granted: false
}

const locationReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'SET_LOCATION':
      return {
        ...state,
        data: action.payload,
        granted: true
      }
    default:
      return state;
  }
}

export default locationReducer;