import React from 'react';
import { createStackNavigator } from 'react-navigation'

import LoginStack from './stacks/LoginStack';
import LoggedStack from './stacks/LoggedStack';
import NeedUpdate from '../screens/NeedUpdate';

export default createStackNavigator({
  LoginNavigator: { screen: LoginStack },
  LoggedNavigator: { screen: LoggedStack },
  NeedUpdateNavigator: { screen: NeedUpdate }
}, {
  headerMode: 'none',
});
