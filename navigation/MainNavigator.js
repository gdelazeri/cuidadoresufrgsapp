import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'

import LoginStack from './stacks/LoginStack';
// import ClientStack from './stacks/ClientStack';
// import colors from '../constants/colors';

// const LoggedStack = createDrawerNavigator({
//   Clients: { screen: ClientStack },
// }, {
//   drawerWidth,
//   overlayColor: 'rgba(0, 0, 0, 0.7)',
//   cardStyle: { backgroundColor: colors.background },
//   contentComponent: ({ navigation }) => <Menu navigation={navigation} />,
// })

export default createStackNavigator({
  LoginNavigator: { screen: LoginStack },
  // LoggedNavigator: { screen: LoggedStack },
}, {
  headerMode: 'none',
});
