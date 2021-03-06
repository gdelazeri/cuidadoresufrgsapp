import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import Constants from 'expo-constants';

import styles from './styles';
import i18n from '../../i18n';
import Screen from '../../components/Screen';
import CustomBtn from '../../components/CustomBtn';
import TextLabel from '../../components/TextLabel';
import UserService from '../../services/UserService';
import NavigationService from '../../navigation/NavigationService';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');

class ConsentTerm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      processing: false,
      fetchError: false,
      consentTerm: '',
    }
  }

  static navigationOptions = {
    headerStyle: { elevation: 0, shadowOpacity: 0 },
    header: null,
  }

  componentDidMount = async () => {
    const userId = this.props.navigation.getParam('userId');
    const response = await UserService.getConsentTerm(userId);
    if (response.success) {
      this.setState({ loading: false, consentTerm: response.result });
    } else {
      this.setState({ loading: false, fetchError: true });
    }
  }

  accept = async () => {
    this.setState({ processing: true });
    const userId = this.props.navigation.getParam('userId');
    const response = await UserService.acceptConsentTerm(userId);
    this.setState({ processing: false });
    if (response.success) {
      NavigationService.reset('LoggedNavigator');
    } else {
      this.props.setModalConfirm({
        text: i18n.t('ConsentTerm.acceptError'),
        btnSuccessText: i18n.t('ConsentTerm.btnError'),
      });
    }
  }

  render() {
    return (
      <Screen loading={this.state.loading} navigation={this.props.navigation} error={this.state.fetchError} backgroundColor={colors.white}>
        <View style={{ height: Constants.statusBarHeight }} />
        <View style={styles.wrapper}>
          <WebView
            source={{ html: this.state.consentTerm }}
            style={styles.webView}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            scalesPageToFit={true}
          />
          <View style={styles.btnCenter}>
            <CustomBtn
              text={i18n.t('ConsentTerm.btnContinue')}
              onPress={this.accept}
              loading={this.state.processing}
              width={(width * 0.7) - 30}
            />
          </View>
        </View>
      </Screen>
    );
  }
}

ConsentTerm.propTypes = {
  navigation: PropTypes.object,
  setModalConfirm: PropTypes.func,
};

export default ConsentTerm;
