import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import ListTabNavigator from './ListTabNavigator';

export default createAppContainer(
  createSwitchNavigator({
    List: ListTabNavigator,
  })
);
