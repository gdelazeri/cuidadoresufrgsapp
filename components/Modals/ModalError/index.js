import React from 'react';
import PropTypes from 'prop-types';
import { View, Platform, StatusBar, Dimensions } from 'react-native';

import styles from './styles';
import i18n from '../../../i18n';
import TextLabel from '../../../components/TextLabel';
import CustomBtn from '../../../components/CustomBtn';

class ModalError extends React.Component {
  static navigationOptions = {
    headerShown: false,
  }
  
  render = () => {
    const modalTitle = this.props.title || i18n.t('ModalError.title');
    const modalText = this.props.text || i18n.t('ModalError.text');
    return <View style={styles.wrapper}>
      {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
      <TextLabel type={'label'} textCenter style={styles.title}>{modalTitle}</TextLabel>
      <TextLabel type={'subtitle'} textCenter style={styles.text}>{modalText}</TextLabel>
      <View style={styles.btnContinue}>
        <CustomBtn
          text={i18n.t('ModalError.btnContinue')}
          width={Dimensions.get('window').width * 0.6}
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    </View>
  }
}

ModalError.propTypes = {
  navigation: PropTypes.object,
  title: PropTypes.string,
  text: PropTypes.string,
}

export default ModalError;
