import { createStackNavigator } from 'react-navigation';

import defaultNavigationOptions from './defaultNavigationOptions';
import colors from '../../constants/colors';
import Login from '../../screens/Login';
import Register from '../../screens/Register';
import ConsentTerm from '../../screens/ConsentTerm/ConsentTerm';
import ForgotPasswordEmail from '../../screens/ForgotPassword/ForgotPasswordEmail';
import ForgotPasswordToken from '../../screens/ForgotPassword/ForgotPasswordToken';
import ForgotPasswordUpdate from '../../screens/ForgotPassword/ForgotPasswordUpdate';

const LoginStack = createStackNavigator({
  Login,
  Register,
  ConsentTerm,
  ForgotPasswordEmail,
  ForgotPasswordToken,
  ForgotPasswordUpdate,
}, {
  mode: 'card', 
  headerLayoutPreset: 'center',
  cardStyle: { backgroundColor: colors.background },
  defaultNavigationOptions,
});

export default LoginStack;
