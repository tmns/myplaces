import locationReducer from "../locationReducer";

describe("locationReducer", () => {
  it("returns a new state with data set to action.payload value and granted set to true when given action.type SET_LOCATION", () => {
    const newState = locationReducer(
      { data: {}, granted: false },
      { type: "SET_LOCATION", payload: { location: "location" } }
    );
    expect(newState).toStrictEqual({
      data: { location: "location" },
      granted: true
    });
  });
});
