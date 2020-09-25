import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import Constants from 'expo-constants';

import styles from './styles';
import i18n from '../../../i18n';
import colors from '../../../constants/colors';
import BackBtn from '../../../components/BackBtn';
import Screen from '../../../components/Screen';
import TextLabel from '../../../components/TextLabel';
import FormTextInput from '../../../components/FormTextInput';
import CustomBtn from '../../../components/CustomBtn';
import UserService from '../../../services/UserService';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
      fetchError: false,
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
    const response = await UserService.passwordRules();
    if (response.success) {
      this.setState({ passwordRules: response.result });
    }
  }

  save = async () => {
    this.props.setLoader(true);
    const response = await UserService.changePassword(this.state.password);
    this.props.setLoader(false);
    if (response.success) {
      this.props.navigation.goBack();
    } else {
      let error = i18n.t('ChangePassword.saveError');
      console.log(response);
      if (Array.isArray(response.errors) && response.errors.length > 0) {
        error = response.errors.map((err) => i18n.t('ModalError.errorCodeMessage', { code: err.code, message: err.message })).join('\n');
      }
      this.props.setModalConfirm({
        text: error,
        btnSuccessText: i18n.t('ChangePassword.btnError'),
      });
    }
  }

  render() {
    return (
      <Screen loading={this.state.loading} error={this.state.fetchError} navigation={this.props.navigation}>
        <View style={{ height: Constants.statusBarHeight }} />
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <BackBtn navigation={this.props.navigation} color={colors.blue.spec3} backgroundColor={colors.background} />
          </View>
          <View style={styles.info}>
            <Image
              source={require('../../../assets/images/icon.png')}
              style={styles.iconImage}
              resizeMode={'contain'}
            />
            <View style={styles.field}>
              <TextLabel type={'subtitle'} color={colors.blue.spec3}>{i18n.t('ChangePassword.password')}</TextLabel>
              <FormTextInput
                inputType={'form'}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                secureTextEntry={true}
                autoCapitalize={'none'}
                textContentType={'password'}
              />
            </View>
            <View style={styles.field}>
              <TextLabel type={'subtitle'} color={colors.blue.spec3}>{i18n.t('ChangePassword.passwordConfirm')}</TextLabel>
              <FormTextInput
                inputType={'form'}
                value={this.state.passwordConfirm}
                onChangeText={(passwordConfirm) => this.setState({ passwordConfirm })}
                secureTextEntry={true}
                autoCapitalize={'none'}
                textContentType={'password'}
              />
            </View>
            {this.state.passwordRules !== undefined && <View style={styles.passwordRules}>
              <TextLabel bold type={'subtitle'}>{this.state.passwordRules.title}</TextLabel>
              {Array.isArray(this.state.passwordRules.rules) && this.state.passwordRules.rules.map((text) => <TextLabel key={text} type={'subtitle'}>{text}</TextLabel>)}
            </View>}
            <View style={styles.btnCenter}>
              <CustomBtn
                text={i18n.t('ChangePassword.btnSave')}
                onPress={this.save}
                disabled={!(this.state.password.length > 0 && this.state.password === this.state.passwordConfirm)}
              />
            </View>
          </View>
        </View>
      </Screen>
    )
  }
}

ChangePassword.propTypes = {
  navigation: PropTypes.object,
  setModalConfirm: PropTypes.func,
  setLoader: PropTypes.func,
};

export default ChangePassword;
