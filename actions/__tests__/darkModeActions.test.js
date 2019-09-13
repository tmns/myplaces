import { setDarkMode } from "../darkModeActions";

describe("setDarkMode", () => {
  it("returns type SET_DARKMODE and a payload of true when passed true", () => {
    const result = setDarkMode(true);
    expect(result).toStrictEqual({ type: "SET_DARKMODE", payload: true });
  });
});
