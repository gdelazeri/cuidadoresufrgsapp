import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Constants from 'expo-constants';

import styles from './styles';
import Screen from '../../components/Screen';
import TextLabel from '../../components/TextLabel';
import NavigationService from '../../navigation/NavigationService';

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
          <TouchableOpacity onPress={async () => {
            await AsyncStorage.clear();
            NavigationService.reset('LoginNavigator');
          }}>
            <TextLabel>Sair</TextLabel>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
