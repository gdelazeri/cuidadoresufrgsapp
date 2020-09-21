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

const { width } = Dimensions.get('window');

class ForgotPasswordEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fetchError: false,
      email: '',
    }
  }

  static navigationOptions = {
    headerStyle: { elevation: 0, shadowOpacity: 0 },
    header: null,
  }

  componentDidMount = () => {
    const email = this.props.navigation.getParam('email') || '';
    this.setState({ email });
  }

  generateToken = async () => {
    this.props.setLoader(true);
    const response = await UserService.passwordRecoverToken(this.state.email);
    this.props.setLoader(false);
    if (response.success) {
      this.props.navigation.navigate('ForgotPasswordToken', { email: this.state.email });
    } else {
      let error = i18n.t('ForgotPasswordEmail.error');
      if (Array.isArray(response.errors) && response.errors.length > 0) {
        error = response.errors.map((err) => i18n.t('ModalError.errorCodeMessage', { code: err.code, message: err.message })).join('\n');
      }
      this.props.setModalConfirm({
        text: error,
        btnSuccessText: i18n.t('ForgotPasswordEmail.btnError'),
      });
    }
  }


  render() {
    return (
      <Screen loading={this.state.loading} navigation={this.props.navigation} error={this.state.fetchError}>
        <View style={{ height: Constants.statusBarHeight }} />
        <BackBtn navigation={this.props.navigation} />
        <View style={styles.header}>
          <TextLabel type={'title'}>{i18n.t('ForgotPasswordEmail.title')}</TextLabel>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.field}>
            <TextLabel type={'subtitle'}>{i18n.t('ForgotPasswordEmail.emailInput')}</TextLabel>
            <FormTextInput
              inputType={'form'}
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
              keyboardType={'email-address'}
              autoCapitalize={'none'} 
              textContentType={'username'}
            />
          </View>
          <View style={styles.btnCenter}>
            <CustomBtn
              text={i18n.t('ForgotPasswordEmail.btnContinue')}
              onPress={this.generateToken}
              disabled={!isEmailValid(this.state.email)}
              width={(width * 0.7) - 30}
            />
          </View>
        </View>
      </Screen>
    );
  }
}

ForgotPasswordEmail.propTypes = {
  navigation: PropTypes.object,
  setModalConfirm: PropTypes.func,
  setLoader: PropTypes.func,
};

export default ForgotPasswordEmail;
