import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Platform } from 'react-native';
import * as Linking from 'expo-linking'

import styles from './styles';
import i18n from '../../i18n';
import Screen from '../../components/Screen';
import TextLabel from '../../components/TextLabel';
import CustomBtn from '../../components/CustomBtn';

class NeedUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  static navigationOptions = {
    headerStyle: { elevation: 0, shadowOpacity: 0 },
    header: null,
  }

  download = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('https://apps.apple.com/br/app/di%C3%A1logos-de-carreira/id1470622568');
    } else {
      Linking.openURL('market://details?id=com.produtive.dialogos');
    }
  }

  render = () => (
    <Screen loading={this.state.loading} navigation={this.props.navigation}>
      <View style={styles.wrapper}>
        <Image
          source={require('../../assets/images/icon.png')}
          style={styles.iconImage}
        />
        <TextLabel style={styles.text} type={'text'}>{i18n.t('NeedUpdate.text')}</TextLabel>
        <CustomBtn
          text={i18n.t('NeedUpdate.btnUpdate')}
          customStyle={styles.btnUpdate}
          onPress={this.download}
        />
      </View>
    </Screen>
  );
}

NeedUpdate.propTypes = {
  navigation: PropTypes.object,
  setUser: PropTypes.func,
};

export default NeedUpdate;
