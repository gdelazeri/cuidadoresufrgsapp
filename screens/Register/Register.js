import React from 'react';
import PropTypes from 'prop-types';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  Platform,
  Dimensions,
  Animated,
  ScrollView,
  View,
  Image,
} from 'react-native';
import jwtDecode from 'jwt-decode';

import styles from './styles';
import i18n from '../../i18n';
import Screen from '../../components/Screen';
import TextLabel from '../../components/TextLabel';
import FormTextInput from '../../components/FormTextInput';
import DatePicker from '../../components/DatePicker';
import CustomBtn from '../../components/CustomBtn';
import UserService from '../../services/UserService';
import Request from '../../middlewares/request';
import NavigationService from '../../navigation/NavigationService';

const btnWidth = Dimensions.get('window').width * 0.7;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
      fetchError: false,
      animatedValue: new Animated.Value(0),
      step: 0,
      passwordConfirm: '',
      user: {
        name: '',
        cpf: '',
        birthDate: undefined,
        city: '',
        uf: '',
        email: '',
        password: '',
      },
    }
  }

  static navigationOptions = {
    header: null,
  }

  onKeyboardToggle = (active) => {
    if (Platform.OS === 'ios') {
      Animated.spring(this.state.animatedValue, {
        toValue: active ? -75 : 0,
        duration: 250,
      }).start();
    }
  }

  isUserInvalid = () => {
    const { user } = this.state;
    return (
      user.name.length < 3
      || user.cpf.length < 14
      || !user.birthDate
      || user.city.length === 0
      || user.uf.length === 0
    )
  }

  isCredentialInvalid = () => {
    const { user, passwordConfirm } = this.state;
    return (
      user.email.length < 3
      || !user.email.includes('@')
      || user.password !== passwordConfirm
    )
  }

  next = () => {
    if (this.state.step === 0 && !this.isUserInvalid()) {
      this.setState({ step: 1 });
    } else if (!this.isCredentialInvalid()) {
      this.save();
    }
  }

  save = async () => {
    this.props.setLoader(true);
    const { user } = this.state;
    let response = await UserService.post(user);
    if (response.success) {
      response = await UserService.login(user.email, user.password);
      await UserService.setToken(response.result.token);
      Request.setToken(response.result.token);
      this.props.setUser(jwtDecode(response.result.token));
      this.props.setLoader(false);
      NavigationService.reset('LoggedNavigator');
    } else {
      this.props.setLoader(false);
      let error = i18n.t('Register.error');
      if (Array.isArray(response.errors) && response.errors.length > 0) {
        error = response.errors.map((err) => `Erro ${err.code}: ${err.message}`).join('\n');
      }
      this.props.setModalConfirm({
        text: error,
        btnSuccessText: i18n.t('Register.btnError'),
      });
    }
  }

  render() {
    const { user } = this.state;
    return (
      <Screen loading={this.state.loading} error={this.state.fetchError} navigation={this.props.navigation}>
        <View style={styles.wrapper}>
          <View style={styles.logoView}>
            <Image
              source={require('../../assets/images/icon.png')}
              style={{
                height: Dimensions.get('window').height * 0.1,
                width: Dimensions.get('window').height * 0.1,
              }}
              resizeMode={'contain'}
            />
          </View>
          <ScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={styles.scroll}>
            {this.state.step === 0 && <View>
              <View style={styles.field}>
                <TextLabel type={'subtitle'}>{i18n.t('Register.name')}</TextLabel>
                <FormTextInput
                  inputType={'form'}
                  value={user.name}
                  onChangeText={(name) => this.setState({ user: { ...user, name } })}
                />
              </View>
              <View style={styles.field}>
                <TextLabel type={'subtitle'}>{i18n.t('Register.cpf')}</TextLabel>
                <FormTextInput
                  inputType={'form'}
                  value={user.cpf}
                  onChangeText={(cpf) => this.setState({ user: { ...user, cpf } })}
                  masked={true}
                  options={{ format: '999.999.999-99' }}
                  type={'cpf'}
                />
              </View>
              <View style={styles.field}>
                <TextLabel type={'subtitle'}>{i18n.t('Register.birthDate')}</TextLabel>
                <DatePicker
                  date={user.birthDate}
                  maxDate={new Date()}
                  handleDate={(birthDate) => this.setState({ user: { ...user, birthDate } })}
                />
              </View>
              <View style={styles.fieldsInline}>
                <View style={styles.field70}>
                  <TextLabel type={'subtitle'}>{i18n.t('Register.city')}</TextLabel>
                  <FormTextInput
                    inputType={'form'}
                    value={user.city}
                    onChangeText={(city) => this.setState({ user: { ...user, city } })}
                  />
                </View>
                <View style={styles.field30}>
                  <TextLabel type={'subtitle'}>{i18n.t('Register.uf')}</TextLabel>
                  <FormTextInput
                    inputType={'form'}
                    value={user.uf}
                    onChangeText={(uf) => this.setState({ user: { ...user, uf } })}
                  />
                </View>
              </View>
              <View style={styles.btnCenter}>
                <CustomBtn
                  text={i18n.t('Register.next')}
                  onPress={this.next}
                  width={btnWidth}
                />
              </View>
            </View>}
            {this.state.step === 1 && <View>
              <View style={styles.field}>
                <TextLabel type={'subtitle'}>{i18n.t('Register.email')}</TextLabel>
                <FormTextInput
                  inputType={'form'}
                  value={user.email}
                  onChangeText={(email) => this.setState({ user: { ...user, email } })}
                />
              </View>
              <View style={styles.field}>
                <TextLabel type={'subtitle'}>{i18n.t('Register.password')}</TextLabel>
                <FormTextInput
                  inputType={'form'}
                  value={user.password}
                  onChangeText={(password) => this.setState({ user: { ...user, password } })}
                />
              </View>
              <View style={styles.field}>
                <TextLabel type={'subtitle'}>{i18n.t('Register.password')}</TextLabel>
                <FormTextInput
                  inputType={'form'}
                  value={this.state.passwordConfirm}
                  onChangeText={(passwordConfirm) => this.setState({ passwordConfirm })}
                />
              </View>
              <View style={styles.btnCenter}>
                <CustomBtn
                  text={i18n.t('Register.next')}
                  onPress={this.next}
                  width={btnWidth}
                />
              </View>
            </View>}
          </ScrollView>
        </View>
      </Screen>
    )
  }
}

Register.propTypes = {
  navigation: PropTypes.object,
  setModalConfirm: PropTypes.func,
  setLoader: PropTypes.func,
  setUser: PropTypes.func,
};

export default Register;
