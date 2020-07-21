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

import styles from './styles';
import i18n from '../../i18n';
import Screen from '../../components/Screen';
import TextLabel from '../../components/TextLabel';
import FormTextInput from '../../components/FormTextInput';

const btnWidth = Dimensions.get('window').width * 0.5 - 25;

class ClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
      fetchError: false,
      animatedValue: new Animated.Value(0),
      user: {
        
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

  save = async () => {
    this.props.setLoader(true);
  }

  render() {
    const { user } = this.state;
    return (
      <Screen loading={this.state.loading} error={this.state.fetchError} navigation={this.props.navigation}>
        <View style={styles.wrapper}>
          <View style={styles.logoView}>
            <Image
              source={require('../../assets/images/icon.png')}
              style={{ height: Dimensions.get('window').height * 0.1, width: Dimensions.get('window').height * 0.1 }}
              resizeMode={'contain'}
            />
          </View>
          <ScrollView contentContainerStyle={styles.scroll}>
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
                value={user.cpf}
                onChangeText={(cpf) => this.setState({ user: { ...user, cpf } })}
                masked={true}
                options={{ format: '999.999.999-99' }}
                type={'cpf'}
              />
            </View>
          </ScrollView>
        </View>
      </Screen>
    )
  }
}

ClientForm.propTypes = {
  navigation: PropTypes.object,
  setModalConfirm: PropTypes.func,
  setLoader: PropTypes.func,
};

export default ClientForm;
