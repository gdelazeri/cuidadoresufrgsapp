import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';

import styles from './styles';
import i18n from '../../i18n';
import colors from '../../constants/colors';
import BackBtn from '../../components/BackBtn';
import Screen from '../../components/Screen';
import TextLabel from '../../components/TextLabel';
import CustomBtn from '../../components/CustomBtn';
import UserService from '../../services/UserService';
import formatDate from '../../utils/formatDate';
import NavigationService from '../../navigation/NavigationService';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fetchError: false,
      user: {
        name: '',
        cpf: '',
        email: '',
        birthDate: '',
      }
    }
  }

  static navigationOptions = {
    headerStyle: { elevation: 0, shadowOpacity: 0 },
    header: null,
  }

  componentDidMount = () => {
    this.loadUser();
  }

  loadUser = async () => {
    try {
      const response = await UserService.get();
      if (response.success) {
        this.setState({ loading: false, user: response.result });
      } else {
        this.setState({ loading: false, fetchError: true });
      }
    } catch (e) {
      console.log(e);
    }
  }

  logout = async () => {
    this.props.setLoader(true);
    await AsyncStorage.clear();
    this.props.setLoader(false);
    NavigationService.reset('LoginNavigator');
  }

  logoutPress = () => {
    this.props.setModalConfirm({
      text: i18n.t('Profile.logoutText'),
      btnCancelText: i18n.t('Profile.logoutCancel'),
      btnCancel: () => this.props.setModalConfirm({}),
      btnSuccessText: i18n.t('Profile.logoutSuccess'),
      btnSuccess: () => {
        this.props.setModalConfirm({});
        this.logout();
      },
    })
  }

  removePress = () => {
    this.props.setModalConfirm({
      text: i18n.t('Profile.removeText'),
      btnCancelText: i18n.t('Profile.removeCancel'),
      btnCancel: () => this.props.setModalConfirm({}),
      btnSuccessText: i18n.t('Profile.removeSuccess'),
      btnSuccess: () => {
        this.props.setModalConfirm({});
        this.remove();
      },
    })
  }
  
  remove = async () => {
    this.props.setLoader(true);
    const response = await UserService.delete();
    if (response.success) {
      await AsyncStorage.clear();
      this.props.setLoader(false);
      NavigationService.reset('LoginNavigator');
    } else {
      this.props.setLoader(false);
      this.props.setModalConfirm({
        text: i18n.t('Profile.removeError'),
      });
    }
  }

  render() {
    return (
      <Screen loading={this.state.loading} navigation={this.props.navigation} error={this.state.fetchError}>
        <View style={{ height: Constants.statusBarHeight }} />
        <BackBtn navigation={this.props.navigation} color={colors.blue.spec3} backgroundColor={colors.background} />
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.info}>
              <Image
                source={require('../../assets/images/icon.png')}
                style={styles.iconImage}
              />
              <View style={styles.field}>
                <TextLabel type={'subtitle'} color={colors.blue.spec3}>{i18n.t('Profile.name')}</TextLabel>
                <TextLabel type={'text'} color={colors.blue.spec3}>{this.state.user.name}</TextLabel>
              </View>
              <View style={styles.field}>
                <TextLabel type={'subtitle'} color={colors.blue.spec3}>{i18n.t('Profile.cpf')}</TextLabel>
                <TextLabel type={'text'} color={colors.blue.spec3}>{this.state.user.cpf}</TextLabel>
              </View>
              <View style={styles.field}>
                <TextLabel type={'subtitle'} color={colors.blue.spec3}>{i18n.t('Profile.email')}</TextLabel>
                <TextLabel type={'text'} color={colors.blue.spec3}>{this.state.user.email}</TextLabel>
              </View>
              <View style={styles.field}>
                <TextLabel type={'subtitle'} color={colors.blue.spec3}>{i18n.t('Profile.password')}</TextLabel>
                <TextLabel type={'text'} color={colors.blue.spec3}>******</TextLabel>
              </View>
              <View style={styles.field}>
                <TextLabel type={'subtitle'} color={colors.blue.spec3}>{i18n.t('Profile.birthDate')}</TextLabel>
                <TextLabel type={'text'} color={colors.blue.spec3}>{formatDate(this.state.user.birthDate)}</TextLabel>
              </View>
              <View style={styles.field}>
                <TextLabel type={'subtitle'} color={colors.blue.spec3}>{i18n.t('Profile.city')}</TextLabel>
                <TextLabel type={'text'} color={colors.blue.spec3}>{this.state.user.city}</TextLabel>
              </View>
              <View style={styles.field}>
                <TextLabel type={'subtitle'} color={colors.blue.spec3}>{i18n.t('Profile.uf')}</TextLabel>
                <TextLabel type={'text'} color={colors.blue.spec3}>{this.state.user.uf}</TextLabel>
              </View>
            </View>
            <CustomBtn
              secondary
              text={i18n.t('Profile.logout')}
              onPress={this.logoutPress}
              customStyle={styles.field}
            />
            <TouchableOpacity onPress={this.removePress} style={{ marginTop: 30 }} activeOpacity={0.7}>
              <TextLabel textCenter type={'text'} color={colors.light}>{i18n.t('Profile.remove')}</TextLabel>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Screen>
    );
  }
}

Profile.propTypes = {
  navigation: PropTypes.object,
  setModalConfirm: PropTypes.func,
  setLoader: PropTypes.func,
};

export default Profile;
