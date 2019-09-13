import React from "react";
import { Text } from "react-native";
import { render } from "react-native-testing-library";

import { ListItem } from "../ListItem";

describe("<ListItem />", () => {
  it("renders a list item correctly", () => {
    const { queryByTestId, queryByText } = render(
      <ListItem>
        <Text>Test Item</Text>
      </ListItem>
    );
    expect(queryByTestId("list-item")).toBeTruthy();
    expect(queryByText("Test Item")).toBeTruthy();
  });
});
