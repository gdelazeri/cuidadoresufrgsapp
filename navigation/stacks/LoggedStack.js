import { createStackNavigator } from 'react-navigation';

import defaultNavigationOptions from './defaultNavigationOptions';
import colors from '../../constants/colors';
import Home from '../../screens/Home';
import Content from '../../screens/Contents/Content';
import ContentList from '../../screens/Contents/ContentList';
import Form from '../../screens/Forms/Form';
import FormList from '../../screens/Forms/FormList';

const LoggedStack = createStackNavigator({
  Home,
  Content,
  ContentList,
  Form,
  FormList,
}, {
  initialRouteKey: 'Home',
  mode: 'card', 
  headerLayoutPreset: 'center',
  cardStyle: { backgroundColor: colors.background },
  defaultNavigationOptions,
});

export default LoggedStack;
