import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';

import styles from './styles';
import i18n from '../../i18n';
import Screen from '../../components/Screen';
import TextLabel from '../../components/TextLabel';

class Home extends React.Component {
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

  render() {
    return (
      <Screen loading={this.state.loading} navigation={this.props.navigation}>
      <View style={{ height: Constants.statusBarHeight }} />
      <View style={styles.wrapper}>
        <TextLabel type={'title'}>{i18n.t('Home.hi')}</TextLabel>
        <TextLabel type={'titleHighlight'}>{this.props.user.name.split(' ')[0]}</TextLabel>
      </View>
      </Screen>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
};

export default Home;
