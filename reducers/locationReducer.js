const INITIAL_STATE = {
  data: {}
}

const locationReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'SET_LOCATION':
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
}

export default locationReducer;