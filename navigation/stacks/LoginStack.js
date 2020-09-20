import { createStackNavigator } from 'react-navigation';

import defaultNavigationOptions from './defaultNavigationOptions';
import colors from '../../constants/colors';
import Login from '../../screens/Login';
import Register from '../../screens/Register';
import ConsentTerm from '../../screens/ConsentTerm/ConsentTerm';

const LoginStack = createStackNavigator({
  Login,
  Register,
  ConsentTerm,
}, {
  mode: 'card', 
  headerLayoutPreset: 'center',
  cardStyle: { backgroundColor: colors.background },
  defaultNavigationOptions,
});

export default LoginStack;
