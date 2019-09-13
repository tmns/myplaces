import React from "react";
import { render } from "react-native-testing-library";

import { MapScreen } from "../MapScreen";

jest.mock("react-native-maps", () => {
  const { View } = require("react-native");
  const MockMapView = (props: any) => {
    return <View>{props.children}</View>;
  };
  const MockMarker = (props: any) => {
    return <View>{props.children}</View>;
  };
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker
  };
});

describe("<MapScreen />", () => {
  it("renders the MapView", () => {
    const navigation = {
      getParam: jest.fn()
    };
    const places = [
      {
        id: "1",
        latitude: "23",
        longitude: "43",
        address: "Test Address 1"
      }
    ];

    const { queryByTestId } = render(
      <MapScreen navigation={navigation} places={places} />
    );
    expect(queryByTestId("map-view")).toBeTruthy();
  });
});
