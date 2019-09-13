import React from "react";
import { render, fireEvent } from "react-native-testing-library";

import { HomeScreen } from "../HomeScreen";

describe("<HomeScreen />", () => {
  it("renders the welcome container with the welcome text", () => {
    const { queryByTestId, queryByText } = render(<HomeScreen />);
    expect(queryByTestId("welcome-container")).toBeTruthy();
    expect(queryByText("Welcome to MyPlaces!")).toBeTruthy();
  });

  it("renders the welcome container with the get started button", () => {
    const { queryByTestId } = render(<HomeScreen />);
    expect(queryByTestId("welcome-container")).toBeTruthy();
    expect(queryByTestId("get-started-btn")).toBeTruthy();
  });

  it("renders setDarkMode button which toggles darkMode", () => {
    const darkMode = false;
    const setDarkMode = jest.fn(() => !darkMode);
    const { queryByTestId } = render(
      <HomeScreen darkMode={darkMode} setDarkMode={setDarkMode} />
    );

    fireEvent.press(queryByTestId("set-darkmode-btn"));
    expect(setDarkMode).toHaveBeenCalled();
  });

  it("calls navigation function when get started button pressed", () => {
    const navigation = {
      navigate: jest.fn()
    };
    const { queryByTestId } = render(<HomeScreen navigation={navigation} />);
    fireEvent.press(queryByTestId("get-started-btn"));
    expect(navigation.navigate).toHaveBeenCalled();
  });
});
