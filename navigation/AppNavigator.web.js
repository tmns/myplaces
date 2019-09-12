import { createBrowserApp } from '@react-navigation/web';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import ListTabNavigator from './ListTabNavigator';

const switchNavigator = createStackNavigator({
  Home: HomeScreen,
  List: ListTabNavigator,
});
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
