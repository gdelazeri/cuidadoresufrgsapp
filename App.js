import React from 'react';
import { Platform, StatusBar, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading, Linking } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

import AppNavigator from './navigation/AppNavigator';
import NavigationService from './navigation/NavigationService';
import ModalLoading from './components/Modals/ModalLoading';
import ModalConfirm from './components/Modals/ModalConfirm';
import store from './store';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/bg.jpg'),
        require('./assets/images/icon.png'),
        require('./assets/images/splash.png'),
        require('./assets/images/logo.png'),
      ]),
      Font.loadAsync({
        "Material Design Icons": require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
        "MaterialCommunityIcons": require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
        "Material Icons": require('react-native-vector-icons/Fonts/MaterialIcons.ttf'),
        "MaterialIcons": require('react-native-vector-icons/Fonts/MaterialIcons.ttf'),
        "Ionicons": require('react-native-vector-icons/Fonts/Ionicons.ttf'),
      }),
    ]);
  };

  _handleLoadingError = (error) => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return <AppLoading
        startAsync={this._loadResourcesAsync}
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading}
      />
    } else {
      try {
        const prefix = Linking.makeUrl('/');
        return <Provider store={store}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {Platform.OS === 'ios' && <StatusBar barStyle='light-content' />}
            <AppNavigator
              ref={(navigatorRef) => NavigationService.setTopLevelNavigator(navigatorRef)}
              uriPrefix={prefix}
            />
            <ModalLoading />
            <ModalConfirm />
          </View>
        </Provider>
      } catch(e) {
        return <Text>{JSON.stringify(e)}</Text>
      }
    }
  }
}
