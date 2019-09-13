import darkModeReducer from "../darkModeReducer";

describe("darkModeReducer", () => {
  it("returns a new state with isEnabled set to action.payload value when given action.type SET_DARKMODE", () => {
    const newState = darkModeReducer(
      { isEnabled: false },
      { type: "SET_DARKMODE", payload: true }
    );
    expect(newState).toStrictEqual({ isEnabled: true });
  });
});
