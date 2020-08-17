import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import jwtDecode from 'jwt-decode';

import styles from './styles';
import i18n from '../../i18n';
import Request from '../../middlewares/request';
import Screen from '../../components/Screen';
import FormTextInput from '../../components/FormTextInput';
import TextLabel from '../../components/TextLabel';
import CustomBtn from '../../components/CustomBtn';
import UserService from '../../services/UserService';
import NavigationService from '../../navigation/NavigationService';

const { width } = Dimensions.get('window');

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
    header: null,
  }

  componentDidMount = () => {
    this.loginToken();
  }

  loginToken = async () => {
    const token = await UserService.getToken();
    if (token) {
      Request.setToken(token);
      console.log(jwtDecode(token));
      const response = await UserService.refreshToken();
      if (response.success) {
        await UserService.setToken(response.result.token);
        Request.setToken(response.result.token);
        console.log(jwtDecode(response.result.token));
        this.props.setUser(jwtDecode(response.result.token));
        this.setState({ loading: false });
        NavigationService.reset('LoggedNavigator');
      }
    } else {
      this.setState({ loading: false });
    }
  }

  login = async () => {
    const { email, password } = this.state;
    this.setState({ processing: true });

    if (!this.isEmailValid(email) || password.length === 0) {
      this.setState({ processing: false });
      this.props.setModalConfirm({
        text: i18n.t('Login.errorCredentialsMessage'),
        btnSuccessText: i18n.t('Login.btnError'),
      });
      return;
    }

    const response = await UserService.login(email, password);
    if (response.success) {
      await UserService.setToken(response.result.token);
      Request.setToken(response.result.token);
      this.props.setUser(jwtDecode(response.result.token));
      this.setState({ processing: false });
      NavigationService.reset('LoggedNavigator');
    } else {
      this.setState({ processing: false });
      this.props.setModalConfirm({
        text: i18n.t('Login.errorGeneric'),
        btnSuccessText: i18n.t('Login.btnError'),
      });
    }
  }

  isEmailValid = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

  render() {
    return (
      <Screen loading={this.state.loading} navigation={this.props.navigation}>
        <View style={styles.wrapper}>
          <View style={styles.form}>
            <TextLabel type={'login'}>{i18n.t('Login.email')}</TextLabel>
            <FormTextInput
              inputType={'login'}
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
              keyboardType={'email-address'}
              autoCapitalize={'none'} 
              textContentType={'username'}
              onSubmitEditing={this.login}
            />
            <TextLabel type={'login'}>{i18n.t('Login.password')}</TextLabel>
            <FormTextInput
              inputType={'login'}
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              keyboardType='visible-password'
              autoCapitalize={'none'} 
              textContentType={'password'}
              secureTextEntry={true}
              onSubmitEditing={this.login}
            />
          </View>
        
          <View style={styles.btnCenter}>
            <CustomBtn
              text={i18n.t('Login.btnContinue')}
              onPress={this.login}
              loading={this.state.processing}
              width={(width * 0.7) - 30}
            />
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={{ marginTop: 20 }} activeOpacity={0.7}>
              <TextLabel type={'login'}>{i18n.t('Login.btnRegister')}</TextLabel>
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
