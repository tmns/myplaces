import { setPlaces } from "../placesActions";

describe("setPlaces", () => {
  it("returns type of SET_PLACES and a places payload when passed places object", () => {
    const result = setPlaces({ place: "place" });
    expect(result).toStrictEqual({ type: "SET_PLACES", payload: {place: "place"} });
  });
});
