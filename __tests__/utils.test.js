import { getDistance } from "../utils";

describe("getDistance", () => {
  it("returns the correct distance", () => {
    const distance = getDistance({
      lat1: 39.234,
      lon1: 54.123,
      lat2: 48.133,
      lon2: 67.1919
    });
    expect(distance).toEqual("1439.7");
  });
});
