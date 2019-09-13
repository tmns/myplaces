import React from "react";
import { render } from "react-native-testing-library";

import TabBarIcon from "../TabBarIcon";

describe("<TabBarIcon />", () => {
  it("renders a tab bar icon correctly", () => {
    const { queryByTestId } = render(
      <TabBarIcon name="md-sunny" focused={true} />
    );
    expect(queryByTestId("ion-icon")).toBeTruthy();
  });
});


