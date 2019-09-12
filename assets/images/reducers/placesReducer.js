const INITIAL_STATE = {
  data: {
    hello: "goodbye",
    something: "else"
  }
}

const placesReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    default:
      return state;
  }
}

export default placesReducer;