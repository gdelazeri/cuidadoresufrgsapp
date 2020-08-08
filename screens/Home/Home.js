import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
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
    // header: null,
  }

  render() {
    return (
      <Screen loading={this.state.loading} navigation={this.props.navigation}>
        <View style={styles.wrapper}>
          <TextLabel>Teste</TextLabel>
        </View>
      </Screen>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
