import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import jwtDecode from 'jwt-decode';

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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      processing: false,
      email: '',
      password: '',
    }
  }

  static navigationOptions = {
    headerStyle: { elevation: 0, shadowOpacity: 0 },
    header: null,
  }

  componentDidMount = () => {
    this.loginToken();
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

  render() {
    return (
      <Screen loading={this.state.loading} navigation={this.props.navigation}>
        <View style={styles.wrapper}>
          <View style={styles.form}>
            <Image
              source={require('../../assets/images/icon.png')}
              style={styles.iconImage}
            />
            <FormTextInput
              placeholder={i18n.t('Login.email')}
              placeholderTextColor={colors.blue.spec3}
              inputType={'login'}
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
              keyboardType={'email-address'}
              autoCapitalize={'none'} 
              textContentType={'username'}
              onSubmitEditing={this.login}
            />
            <FormTextInput
              placeholder={i18n.t('Login.password')}
              placeholderTextColor={colors.blue.spec3}
              inputType={'login'}
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              keyboardType='visible-password'
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
        </View>
      </Screen>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.object,
  setUser: PropTypes.func,
};

export default Login;
