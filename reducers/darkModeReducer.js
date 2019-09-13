const INITIAL_STATE = {
  isEnabled: false
};

const darkModeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_DARKMODE":
      return {
        ...state,
        isEnabled: action.payload
      };
    default:
      return state;
  }
};

export default darkModeReducer;
