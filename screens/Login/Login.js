import React from 'react';
import PropTypes from 'prop-types';
import { Image, Keyboard, View, TouchableOpacity, Platform, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import jwtDecode from 'jwt-decode';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import styles from './styles';
import i18n from '../../i18n';
import colors from '../../constants/colors';
import Request from '../../middlewares/request';
import Screen from '../../components/Screen';
import FormTextInput from '../../components/FormTextInput';
import TextLabel from '../../components/TextLabel';
import CustomBtn from '../../components/CustomBtn';
import UserService from '../../services/UserService';
import NavigationService from '../../navigation/NavigationService';
import isEmailValid from '../../utils/isEmailValid';
import AppSettingService from '../../services/AppSettingService';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      processing: false,
      animatedValue: new Animated.Value(0),
      email: '',
      password: '',
    }
  }

  static navigationOptions = {
    headerStyle: { elevation: 0, shadowOpacity: 0 },
    header: null,
  }

  componentDidMount = async () => {
    const response = await AppSettingService.needUpdate(Constants.manifest.version);
    if (response.success && response.result) {
      NavigationService.reset('NeedUpdateNavigator');
    } else {
      this.loginToken();
    }
  }

  getNotificationToken = async (userId) => {
    try {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        return;
      }
      const notificationToken = await Notifications.getExpoPushTokenAsync();
      await UserService.put({ _id: userId, notificationToken })
    } catch (e) {
      console.log(e);
    }
  }

  loginToken = async () => {
    const token = await UserService.getToken();
    if (token) {
      Request.setToken(token);
      const response = await UserService.refreshToken();
      if (response.success) {
        await UserService.setToken(response.result.token);
        Request.setToken(response.result.token);
        const user = jwtDecode(response.result.token);
        this.props.setUser(user);
        await this.getNotificationToken(user._id);
        this.setState({ loading: false });
        if (response.result.consentTermAcceptedAt) {
          NavigationService.reset('LoggedNavigator');
        } else {
          this.props.navigation.navigate('ConsentTerm', { userId: user._id });
        }
      } else {
        this.setState({ loading: false });
      }
    } else {
      const email = this.props.navigation.getParam('email');
      this.setState({ loading: false, email });
    }
  }

  login = async () => {
    const { email, password } = this.state;
    this.setState({ processing: true });

    if (!isEmailValid(email) || password.length === 0) {
      this.setState({ processing: false });
      return;
    }

    const response = await UserService.login(email, password);
    if (response.success) {
      await UserService.setToken(response.result.token);
      Request.setToken(response.result.token);
      const user = jwtDecode(response.result.token);
      this.props.setUser(user);
      await this.getNotificationToken(user._id);
      this.setState({ processing: false });
      if (response.result.consentTermAcceptedAt) {
        NavigationService.reset('LoggedNavigator');
      } else {
        this.props.navigation.navigate('ConsentTerm', { userId: user._id });
      }
    } else {
      this.setState({ processing: false });
      let error = i18n.t('Login.errorGeneric');
      if (Array.isArray(response.errors) && response.errors.length > 0) {
        error = response.errors[0].message;
      }
      this.props.setModalConfirm({
        text: error,
        btnSuccessText: i18n.t('Login.btnError'),
      });
    }
  }

  onKeyboardToggle = (active) => {
    if (Platform.OS === 'ios') {
      Animated.spring(this.state.animatedValue, {
        toValue: active ? -112 : 0,
        duration: 250,
      }).start();
    } else {
      Animated.timing(this.state.animatedValue, {
        toValue: active ? -112 : 0,
        duration: 100,
        easing: Easing.ease,
        delay: 0,
      }).start();
    }
  }

  render() {
    return (
      <Screen loading={this.state.loading} navigation={this.props.navigation}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.wrapper}>
            <View style={styles.form}>
              <Animated.View style={{ marginTop: this.state.animatedValue }}>
                <View style={styles.logoView}>
                  <Image
                    source={require('../../assets/images/icon.png')}
                    style={styles.iconImage}
                    inputType={'login'}
                    resizeMode={'contain'}
                  />
                </View>
              </Animated.View>
              <View style={styles.formContent}>
                <FormTextInput
                  placeholder={i18n.t('Login.email')}
                  placeholderTextColor={colors.blue.spec3}
                  value={this.state.email}
                  onChangeText={(email) => this.setState({ email })}
                  keyboardType={'email-address'}
                  autoCapitalize={'none'} 
                  textContentType={'username'}
                  onSubmitEditing={this.login}
                  inputType={'login'}
                />
                <FormTextInput
                  placeholder={i18n.t('Login.password')}
                  placeholderTextColor={colors.blue.spec3}
                  inputType={'login'}
                  value={this.state.password}
                  onChangeText={(password) => this.setState({ password })}
                  autoCapitalize={'none'} 
                  textContentType={'password'}
                  secureTextEntry={true}
                  onSubmitEditing={this.login}
                />
                <View style={styles.forgotPasswordView}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPasswordEmail', { email: this.state.email })} activeOpacity={0.7}>
                    <TextLabel type={'subtitle'} color={colors.blue.spec3}>{i18n.t('Login.forgotPassword')}</TextLabel>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          
            <View style={styles.btnCenter}>
              <CustomBtn
                text={i18n.t('Login.btnContinue')}
                onPress={this.login}
                loading={this.state.processing}
                disabled={!(isEmailValid(this.state.email) && this.state.password.length > 0)}
              />
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={{ marginTop: 30 }} activeOpacity={0.7}>
                <TextLabel textCenter type={'subtitle'} color={colors.light}>{i18n.t('Login.firstAccess')}</TextLabel>
                <TextLabel textCenter type={'subtitle'} color={colors.light} style={styles.clickHere}>{i18n.t('Login.firstAccessClickHere')}</TextLabel>
              </TouchableOpacity>
            </View>
            <KeyboardSpacer onToggle={this.onKeyboardToggle} />
          </View>
        </TouchableWithoutFeedback>
      </Screen>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.object,
  setUser: PropTypes.func,
};

export default Login;
