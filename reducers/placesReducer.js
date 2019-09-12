const INITIAL_STATE = {
  data: [
    {key: "goodbye"},
    {key: "else"},
    {key: "hello"},
    {key: "something"}
  ]
}

const placesReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    default:
      return state;
  }
}

export default placesReducer;