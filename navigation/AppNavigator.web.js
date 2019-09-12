import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import ListTabNavigator from './ListTabNavigator';

const switchNavigator = createSwitchNavigator({
  List: ListTabNavigator,
});
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
