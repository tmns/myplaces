import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { render } from "react-native-testing-library";

import App, { handleFinishLoading } from "../App";

jest.mock("expo", () => ({
  AppLoading: "AppLoading"
}));

jest.mock("../navigation/AppNavigator", () => "AppNavigator");

describe("<App />", () => {
  jest.useFakeTimers();

  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the loading screen", () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId("app-loading")).toBeTruthy();
  });

  it("renders the root without loading screen", () => {
    const { queryByTestId } = render(<App skipLoadingScreen />);
    expect(queryByTestId("app-loading")).toBeFalsy();
  });

  it("sets isLoadingComplete", () => {
    const isLoadingComplete = false;
    const setLoadingComplete = jest.fn(() => !isLoadingComplete);

    const { queryByTestId } = render(<App />);
    expect(queryByTestId("app-loading")).toBeTruthy();

    handleFinishLoading(setLoadingComplete);
    expect(setLoadingComplete).toHaveBeenCalled();
  });
});
