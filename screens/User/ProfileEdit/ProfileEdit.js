import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Image, Keyboard, View, Platform, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import styles from './styles';
import i18n from '../../../i18n';
import colors from '../../../constants/colors';
import Request from '../../../middlewares/request';
import BackBtn from '../../../components/BackBtn';
import Screen from '../../../components/Screen';
import TextLabel from '../../../components/TextLabel';
import FormTextInput from '../../../components/FormTextInput';
import CustomBtn from '../../../components/CustomBtn';
import isEmailValid from '../../../utils/isEmailValid';
import UserService from '../../../services/UserService';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
      fetchError: false,
      animatedValue: new Animated.Value(0),
      user: {
        name: '',
        cpf: '',
        email: '',
        birthDate: '',
        city: '',
        uf: '',
      },
    }
  }

  static navigationOptions = {
    headerStyle: { elevation: 0, shadowOpacity: 0 },
    header: null,
  }

  componentDidMount = () => {
    this.load();
  }

  load = async () => {
    const response = await UserService.get();
    if (response.success) {
      const user = {
        ...response.result,
        birthDate: moment(response.result.birthDate).format('DD/MM/YYYY'),
      }
      this.setState({ loading: false, user });
    } else {
      this.setState({ loading: false, fetchError: true });
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
  };

  save = async () => {
    this.props.setLoader(true);
    const { user } = this.state;
    const split = user.birthDate.split('/');
    const userObj = {
      ...user,
      birthDate: moment(`${split[2]}-${split[1]}-${split[0]}`).format(),
    }
    let response = await UserService.put(userObj);
    if (response.success) {
      this.props.setUser(user);
      response = await UserService.refreshToken();
      if (response.success) Request.setToken(response.result.token);
      this.props.setLoader(false);
      this.props.navigation.goBack();
    } else {
      this.props.setLoader(false);
      this.props.setModalConfirm({
        text: i18n.t('ProfileEdit.saveError'),
        btnSuccessText: i18n.t('ProfileEdit.btnError'),
      });
    }
  }

  render() {
    const { user, animatedValue } = this.state;
    return (
      <Screen loading={this.state.loading} error={this.state.fetchError} navigation={this.props.navigation}>
        <View style={{ height: Constants.statusBarHeight }} />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.wrapper}>
            <Animated.View style={{ marginTop: animatedValue }}>
              <View style={styles.header}>
                <BackBtn navigation={this.props.navigation} color={colors.blue.spec3} backgroundColor={colors.background} />
              </View>
            </Animated.View>
            <View style={styles.info}>
              <Image
                source={require('../../../assets/images/icon.png')}
                style={styles.iconImage}
                resizeMode={'contain'}
              />
              <View style={styles.field}>
                <TextLabel type={'subtitle'} color={colors.blue.spec3}>{i18n.t('Profile.name')}</TextLabel>
                <FormTextInput
                  inputType={'form'}
                  value={user.name}
                  onChangeText={(name) => this.setState({ user: { ...user, name } })}
                />
              </View>
              <View style={styles.field}>
                <TextLabel type={'subtitle'} color={colors.blue.spec3}>{i18n.t('Profile.cpf')}</TextLabel>
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
                <TextLabel type={'subtitle'} color={colors.blue.spec3}>{i18n.t('Profile.email')}</TextLabel>
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
                <TextLabel type={'subtitle'} color={colors.blue.spec3}>{i18n.t('Profile.birthDate')}</TextLabel>
                <FormTextInput
                  inputType={'form'}
                  value={user.birthDate}
                  onChangeText={(birthDate) => this.setState({ user: { ...user, birthDate } })}
                  masked={true}
                  options={{ format: '99/99/9999' }}
                  type={'datetime'}
                  placeholder={i18n.t('Profile.birthDatePlaceholder')}
                />
              </View>
              <View style={styles.fieldsInline}>
                <View style={styles.field70}>
                  <TextLabel type={'subtitle'} color={colors.blue.spec3}>{i18n.t('Profile.city')}</TextLabel>
                  <FormTextInput
                    inputType={'form'}
                    value={user.city}
                    onChangeText={(city) => this.setState({ user: { ...user, city } })}
                  />
                </View>
                <View style={styles.field30}>
                  <TextLabel type={'subtitle'} color={colors.blue.spec3}>{i18n.t('Profile.uf')}</TextLabel>
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
                  text={i18n.t('ProfileEdit.btnSave')}
                  onPress={this.save}
                  disabled={!(user.name.length > 3 && user.cpf.length === 14 && isEmailValid(user.email) && user.birthDate.length === 10 && user.birthDate.split('/').length === 3 && user.city.length > 0 && user.uf.length === 2)}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <KeyboardSpacer onToggle={this.onKeyboardToggle} />
      </Screen>
    )
  }
}

ProfileEdit.propTypes = {
  navigation: PropTypes.object,
  setModalConfirm: PropTypes.func,
  setLoader: PropTypes.func,
  setUser: PropTypes.func,
};

export default ProfileEdit;
