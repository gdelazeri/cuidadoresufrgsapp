import { createStackNavigator } from 'react-navigation';

import defaultNavigationOptions from './defaultNavigationOptions';
import colors from '../../constants/colors';
import Home from '../../screens/Home';
import Content from '../../screens/Contents/Content';
import ContentList from '../../screens/Contents/ContentList';
import Form from '../../screens/Forms/Form';
import FormList from '../../screens/Forms/FormList';
import Profile from '../../screens/User/Profile';
import ProfileEdit from '../../screens/User/ProfileEdit';
import ChangePassword from '../../screens/User/ChangePassword';

const LoggedStack = createStackNavigator({
  Home,
  Content,
  ContentList,
  Form,
  FormList,
  Profile,
  ProfileEdit,
  ChangePassword,
}, {
  initialRouteKey: 'Home',
  mode: 'card', 
  headerLayoutPreset: 'center',
  cardStyle: { backgroundColor: colors.background },
  defaultNavigationOptions,
});

export default LoggedStack;
