import placesReducer from "../placesReducer";

describe("placesReducer", () => {
  it("returns a new state with data set to action.payload value and when given action.type SET_PLACES", () => {
    const newState = placesReducer(
      { data: [] },
      { type: "SET_PLACES", payload: [ "place" ] }
    );
    expect(newState).toStrictEqual({
      data: [ "place" ]
    });
  });
});
