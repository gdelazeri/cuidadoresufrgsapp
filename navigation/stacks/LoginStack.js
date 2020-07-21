import { createStackNavigator } from 'react-navigation';

import defaultNavigationOptions from './defaultNavigationOptions';
import colors from '../../constants/colors';
import Login from '../../screens/Login';
import Register from '../../screens/Register';

const LoginStack = createStackNavigator({
  Login,
  Register,
}, {
  mode: 'card', 
  headerLayoutPreset: 'center',
  cardStyle: { backgroundColor: colors.background },
  defaultNavigationOptions,
});

export default LoginStack;
