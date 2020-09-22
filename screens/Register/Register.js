import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Image,
  Dimensions,
  Animated,
  ScrollView,
  View,
} from 'react-native';
import jwtDecode from 'jwt-decode';

import styles from './styles';
import i18n from '../../i18n';
import Screen from '../../components/Screen';
import TextLabel from '../../components/TextLabel';
import FormTextInput from '../../components/FormTextInput';
import CustomBtn from '../../components/CustomBtn';
import isEmailValid from '../../utils/isEmailValid';
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
        birthDate: '',
        city: '',
        uf: '',
        email: '',
        password: '',
      },
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
    const { user } = this.state;
    const split = user.birthDate.split('/');
    const userObj = {
      ...user,
      birthDate: moment(`${split[2]}-${split[1]}-${split[0]}`).format(),
    }
    let response = await UserService.post(userObj);
    if (response.success) {
      response = await UserService.login(user.email, user.password);
      await UserService.setToken(response.result.token);
      Request.setToken(response.result.token);
      const userDecoded = jwtDecode(response.result.token);
      this.props.setUser(userDecoded);
      this.props.setLoader(false);
      if (response.result.consentTermAcceptedAt) {
        NavigationService.reset('LoggedNavigator');
      } else {
        this.props.navigation.navigate('ConsentTerm', { userId: userDecoded._id });
      }
    } else {
      this.props.setLoader(false);
      let error = i18n.t('Register.error');
      if (Array.isArray(response.errors) && response.errors.length > 0) {
        error = response.errors.map((err) => i18n.t('ModalError.errorCodeMessage', { code: err.code, message: err.message })).join('\n');
      }
      this.props.setModalConfirm({
        text: error,
        btnSuccessText: i18n.t('Register.btnError'),
      });
    }
  }

  render() {
    const { user, passwordConfirm } = this.state;
    return (
      <Screen loading={this.state.loading} error={this.state.fetchError} navigation={this.props.navigation}>
        <View style={styles.wrapper}>
          <View style={styles.logoView}>
            <Image
              source={require('../../assets/images/icon.png')}
              style={{
                height: Dimensions.get('window').height * 0.15,
                width: Dimensions.get('window').height * 0.15,
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
                <FormTextInput
                  inputType={'form'}
                  value={user.birthDate}
                  onChangeText={(birthDate) => this.setState({ user: { ...user, birthDate } })}
                  masked={true}
                  options={{ format: '99/99/9999' }}
                  type={'datetime'}
                  placeholder={i18n.t('Register.birthDatePlaceholder')}
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
                    onChangeText={(uf) => this.setState({ user: { ...user, uf: uf.toUpperCase() } })}
                    maxLength={2}
                  />
                </View>
              </View>
              <View style={styles.btnCenter}>
                <CustomBtn
                  text={i18n.t('Register.next')}
                  onPress={() => this.setState({ step: 1 })}
                  width={btnWidth}
                  disabled={!(user.name.length > 3 && user.cpf.length === 14 && user.birthDate.length === 10 && user.birthDate.split('/').length === 3 && user.city.length > 0 && user.uf.length === 2)}
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
                  keyboardType={'email-address'}
                  autoCapitalize={'none'} 
                  textContentType={'username'}
                />
              </View>
              <View style={styles.field}>
                <TextLabel type={'subtitle'}>{i18n.t('Register.password')}</TextLabel>
                <FormTextInput
                  inputType={'form'}
                  value={user.password}
                  onChangeText={(password) => this.setState({ user: { ...user, password } })}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.field}>
                <TextLabel type={'subtitle'}>{i18n.t('Register.passwordConfirm')}</TextLabel>
                <FormTextInput
                  inputType={'form'}
                  value={this.state.passwordConfirm}
                  onChangeText={(passwordConfirm) => this.setState({ passwordConfirm })}
                  secureTextEntry={true}
                />
              </View>
              {this.state.passwordRules !== undefined && <View style={styles.passwordRules}>
                <TextLabel bold type={'subtitle'}>{this.state.passwordRules.title}</TextLabel>
                {Array.isArray(this.state.passwordRules.rules) && this.state.passwordRules.rules.map((text) => <TextLabel key={text} type={'subtitle'}>{text}</TextLabel>)}
              </View>}
              <View style={styles.btnCenter}>
                <CustomBtn
                  text={i18n.t('Register.next')}
                  onPress={this.save}
                  width={btnWidth}
                  disabled={!(isEmailValid(user.email) && user.password.length > 0 && user.password === passwordConfirm)}
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
