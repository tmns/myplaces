import { setLocation } from "../locationActions";

describe("setLocation", () => {
  it("returns type of SET_LOCATION and a location payload when passed location object", () => {
    const result = setLocation({ location: "location" });
    expect(result).toStrictEqual({ type: "SET_LOCATION", payload: {location: "location"} });
  });
});
