import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import Constants from 'expo-constants';

import styles from './styles';
import i18n from '../../../i18n';
import Screen from '../../../components/Screen';
import TextLabel from '../../../components/TextLabel';
import CustomBtn from '../../../components/CustomBtn';
import FormTextInput from '../../../components/FormTextInput';
import BackBtn from '../../../components/BackBtn';
import UserService from '../../../services/UserService';
import isEmailValid from '../../../utils/isEmailValid';
import NavigationService from '../../../navigation/NavigationService';

const { width } = Dimensions.get('window');

class ForgotPasswordUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fetchError: false,
      email: undefined,
      token: undefined,
      password: '',
      passwordConfirm: '',
      passwordRules: undefined,
    }
  }

  static navigationOptions = {
    headerStyle: { elevation: 0, shadowOpacity: 0 },
    header: null,
  }

  componentDidMount = async () => {
    const email = this.props.navigation.getParam('email');
    const token = this.props.navigation.getParam('token');
    this.setState({ email, token });
    const response = await UserService.passwordRules();
    if (response.success) {
      this.setState({ passwordRules: response.result, loading: false });
    } else {
      this.setState({ loading: false });
    }
  }

  generateToken = async () => {
    this.props.setLoader(true);
    const response = await UserService.passwordUpdate(this.state.email, this.state.token, this.state.password, this.state.passwordConfirm);
    this.props.setLoader(false);
    if (response.success) {
      this.props.setModalConfirm({
        text: i18n.t('ForgotPasswordUpdate.passwordUpdated'),
        btnSuccessText: i18n.t('ForgotPasswordUpdate.btnLogin'),
        btnSuccess: () => {
          this.props.setModalConfirm({});
          NavigationService.reset('LoginNavigator', { email: this.state.email });
        }
      });
    } else {
      let error = i18n.t('ForgotPasswordUpdate.error');
      if (Array.isArray(response.errors) && response.errors.length > 0) {
        error = response.errors.map((err) => i18n.t('ModalError.errorCodeMessage', { code: err.code, message: err.message })).join('\n');
      }
      this.props.setModalConfirm({
        text: error,
        btnSuccessText: i18n.t('ForgotPasswordUpdate.btnError'),
      });
    }
  }


  render() {
    return (
      <Screen loading={this.state.loading} navigation={this.props.navigation} error={this.state.fetchError}>
        <View style={{ height: Constants.statusBarHeight }} />
        <BackBtn navigation={this.props.navigation} />
        <View style={styles.header}>
          <TextLabel type={'title'}>{i18n.t('ForgotPasswordUpdate.title')}</TextLabel>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.fields}>
            <View style={styles.field}>
              <TextLabel type={'subtitle'}>{i18n.t('ForgotPasswordUpdate.passwordInput')}</TextLabel>
              <FormTextInput
                inputType={'form'}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                autoCapitalize={'none'} 
                secureTextEntry={true}
              />
            </View>
            <View style={styles.field}>
              <TextLabel type={'subtitle'}>{i18n.t('ForgotPasswordUpdate.passwordConfirmInput')}</TextLabel>
              <FormTextInput
                inputType={'form'}
                value={this.state.passwordConfirm}
                onChangeText={(passwordConfirm) => this.setState({ passwordConfirm })}
                autoCapitalize={'none'} 
                secureTextEntry={true}
              />
            </View>
            {this.state.passwordRules !== undefined && <View style={styles.passwordRules}>
              <TextLabel bold type={'subtitle'}>{this.state.passwordRules.title}</TextLabel>
              {Array.isArray(this.state.passwordRules.rules) && this.state.passwordRules.rules.map((text) => <TextLabel key={text} type={'subtitle'}>{text}</TextLabel>)}
            </View>}
          </View>
          <View style={styles.btnCenter}>
            <CustomBtn
              text={i18n.t('ForgotPasswordUpdate.btnContinue')}
              onPress={this.generateToken}
              width={(width * 0.7) - 30}
              disabled={!(this.state.password.length > 0 && this.state.passwordConfirm.length > 0 && this.state.password === this.state.passwordConfirm)}
            />
          </View>
        </View>
      </Screen>
    );
  }
}

ForgotPasswordUpdate.propTypes = {
  navigation: PropTypes.object,
  setModalConfirm: PropTypes.func,
  setLoader: PropTypes.func,
};

export default ForgotPasswordUpdate;
