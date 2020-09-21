import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import Constants from 'expo-constants';

import styles from './styles';
import i18n from '../../../i18n';
import Screen from '../../../components/Screen';
import TextLabel from '../../../components/TextLabel';
import CustomBtn from '../../../components/CustomBtn';
import BackBtn from '../../../components/BackBtn';
import FormTextInput from '../../../components/FormTextInput';
import UserService from '../../../services/UserService';

const { width } = Dimensions.get('window');

class ForgotPasswordToken extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fetchError: false,
      email: undefined,
      token: '',
    }
  }

  static navigationOptions = {
    headerStyle: { elevation: 0, shadowOpacity: 0 },
    header: null,
  }
  
  componentDidMount = () => {
    const email = this.props.navigation.getParam('email');
    this.setState({ email });
  }

  checkToken = async () => {
    this.props.setLoader(true);
    const response = await UserService.passwordRecoverTokenCheck(this.state.email, this.state.token);
    this.props.setLoader(false);
    if (response.success) {
      this.props.navigation.navigate('ForgotPasswordUpdate', { email: this.state.email, token: this.state.token });
    } else {
      let error = i18n.t('ForgotPasswordToken.error');
      if (Array.isArray(response.errors) && response.errors.length > 0) {
        error = response.errors.map((err) => i18n.t('ModalError.errorCodeMessage', { code: err.code, message: err.message })).join('\n');
      }
      this.props.setModalConfirm({
        text: error,
        btnSuccessText: i18n.t('ForgotPasswordToken.btnError'),
      });
    }
  }


  render() {
    return (
      <Screen loading={this.state.loading} navigation={this.props.navigation} error={this.state.fetchError}>
        <View style={{ height: Constants.statusBarHeight }} />
        <BackBtn navigation={this.props.navigation} />
        <View style={styles.header}>
          <TextLabel type={'title'}>{i18n.t('ForgotPasswordToken.title')}</TextLabel>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.field}>
            <TextLabel type={'subtitle'}>{i18n.t('ForgotPasswordToken.tokenInput')}</TextLabel>
            <FormTextInput
              inputType={'form'}
              value={this.state.token}
              onChangeText={(token) => this.setState({ token })}
              style={styles.form}
              keyboardType={'numeric'}
              maxLength={6}
            />
          </View>
          <View style={styles.btnCenter}>
            <CustomBtn
              text={i18n.t('ForgotPasswordToken.btnContinue')}
              onPress={this.checkToken}
              disabled={this.state.token.length !== 6}
              width={(width * 0.7) - 30}
            />
          </View>
        </View>
      </Screen>
    );
  }
}

ForgotPasswordToken.propTypes = {
  navigation: PropTypes.object,
  setModalConfirm: PropTypes.func,
  setLoader: PropTypes.func,
};

export default ForgotPasswordToken;
