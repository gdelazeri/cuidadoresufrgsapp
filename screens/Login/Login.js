import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  AsyncStorage,
} from 'react-native';

import styles from './styles';
import i18n from '../../i18n';
import Request from '../../middlewares/request';
import Screen from '../../components/Screen';
import FormTextInput from '../../components/FormTextInput';
import TextLabel from '../../components/TextLabel';
import CustomBtn from '../../components/CustomBtn';
import UserService from '../../services/UserService';

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
    const jwtToken = await AsyncStorage.getItem('jwtToken');
    if (jwtToken) {
      Request.setToken(jwtToken);
      const response = await UserService.refreshToken();
      
    }
    this.setState({ loading: false });
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
    this.setState({ processing: false });
    
  }

  setUser = (user) => {
    this.props.setUser({
      id: user.id,
      email: user.email,
      name: user.name,
    })
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
              disabled={true}
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
