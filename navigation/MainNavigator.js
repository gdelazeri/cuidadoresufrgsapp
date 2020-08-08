import React from 'react';
import { createStackNavigator } from 'react-navigation'

import LoginStack from './stacks/LoginStack';
import LoggedStack from './stacks/LoggedStack';

export default createStackNavigator({
  LoginNavigator: { screen: LoginStack },
  LoggedNavigator: { screen: LoggedStack },
}, {
  headerMode: 'none',
});
