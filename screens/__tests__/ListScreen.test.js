import React from "react";
import { render, fireEvent } from "react-native-testing-library";

import { ListScreen } from "../ListScreen";

describe("<ListScreen />", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("renders the list container", () => {
    fetch.mockResponse(
      JSON.stringify([
        {
          id: "1",
          latitude: "23",
          longitude: "43",
          address: "Test Address 1"
        }
      ])
    );
    const location = { longitude: 23, latitude: 53 };
    const setPlaces = jest.fn();
    const { queryByTestId } = render(
      <ListScreen granted={true} location={location} setPlaces={setPlaces} />
    );

    expect(queryByTestId("list-container")).toBeTruthy();
  });

  it("makes a fetch call for API places data", () => {
    fetch.mockResponse(
      JSON.stringify([
        {
          id: "1",
          latitude: "23",
          longitude: "43",
          address: "Test Address 1"
        }
      ])
    );
    const location = { longitude: 23, latitude: 53 };
    const setPlaces = jest.fn();
    const { queryByTestId } = render(
      <ListScreen granted={true} location={location} setPlaces={setPlaces} />
    );

    expect(fetch).toBeCalled();
  });

  it("renders a single list item when data returned from fetch", () => {
    fetch.mockResponse(
      JSON.stringify([
        {
          id: "1",
          latitude: "23",
          longitude: "43",
          address: "Test Address 1"
        }
      ])
    );
    const places = [
      {
        id: "1",
        latitude: "23",
        longitude: "43",
        address: "Test Address 1"
      }
    ];
    const location = { longitude: 23, latitude: 53 };
    const setPlaces = jest.fn();
    const { queryByTestId } = render(
      <ListScreen granted={true} location={location} setPlaces={setPlaces} places={places} />
    );

    expect(queryByTestId("list-item")).toBeTruthy();
  });

  it("renders a single list item address when data returned from fetch", () => {
    fetch.mockResponse(
      JSON.stringify([
        {
          id: "1",
          latitude: "23",
          longitude: "43",
          address: "Test Address 1"
        }
      ])
    );
    const places = [
      {
        id: "1",
        latitude: "23",
        longitude: "43",
        address: "Test Address 1"
      }
    ];
    const location = { longitude: 23, latitude: 53 };
    const setPlaces = jest.fn();
    const { queryByTestId } = render(
      <ListScreen granted={true} location={location} setPlaces={setPlaces} places={places} />
    );

    expect(queryByTestId("item-address")).toBeTruthy();
  });

  it("renders a single list item distance when data returned from fetch", () => {
    fetch.mockResponse(
      JSON.stringify([
        {
          id: "1",
          latitude: "23",
          longitude: "43",
          address: "Test Address 1"
        }
      ])
    );
    const places = [
      {
        id: "1",
        latitude: "23",
        longitude: "43",
        address: "Test Address 1"
      }
    ];
    const location = { longitude: 23, latitude: 53 };
    const setPlaces = jest.fn();
    const { queryByTestId } = render(
      <ListScreen granted={true} location={location} setPlaces={setPlaces} places={places} />
    );

    expect(queryByTestId("item-distance")).toBeTruthy();
  });

  it("calls navigation.navigate when list item is pressed", () => {
    fetch.mockResponse(
      JSON.stringify([
        {
          id: "1",
          latitude: "23",
          longitude: "43",
          address: "Test Address 1"
        }
      ])
    );
    const places = [
      {
        id: "1",
        latitude: "23",
        longitude: "43",
        address: "Test Address 1"
      }
    ];
    const location = { longitude: 23, latitude: 53 };
    const setPlaces = jest.fn();
    const navigation = {
      navigate: jest.fn()
    }
    const { queryByTestId } = render(
      <ListScreen granted={true} location={location} setPlaces={setPlaces} places={places} navigation={navigation} />
    );

    fireEvent.press(queryByTestId("list-item"));
    expect(navigation.navigate).toHaveBeenCalled();
  });
});