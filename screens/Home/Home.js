import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Constants from 'expo-constants';
import { NavigationEvents } from 'react-navigation';

import styles from './styles';
import i18n from '../../i18n';
import Screen from '../../components/Screen';
import TextLabel from '../../components/TextLabel';
import HomeList from '../../components/HomeList';
import ContentService from '../../services/ContentService';
import FormService from '../../services/FormService';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fetchError: false,
      refreshing: false,
      contents: [],
      forms: [],
    }
  }

  static navigationOptions = {
    headerStyle: { elevation: 0, shadowOpacity: 0 },
    header: null,
  }

  load = async (refreshing = false) => {
    this.setState({ refreshing });
    const responseContent = await ContentService.list(0, 5, undefined, true);
    const responseForm = await FormService.list(this.props.user._id, 0, 5, undefined, true);
    if (responseContent.success && responseForm.success) {
      const contents = responseContent.result;
      const forms = responseForm.result;
      this.setState({ contents, forms, refreshing: false, loading: false, fetchError: false });
    } else {
      this.setState({ refreshing: false, loading: false, fetchError: false });
    }
  }

  render() {
    return (
      <View>
        <NavigationEvents onDidFocus={this.load} />
        <Screen loading={this.state.loading} navigation={this.props.navigation} error={this.state.fetchError}>
          <View style={{ height: Constants.statusBarHeight }} />
          <View style={styles.header}>
            <TextLabel type={'title'}>{i18n.t('Home.hi')}</TextLabel>
            <TextLabel type={'titleHighlight'}>{this.props.user.name.split(' ')[0]}</TextLabel>
          </View>
          <HomeList
            list={this.state.forms}
            listScreen={'FormList'}
            itemScreen={'Form'}
            title={i18n.t('Home.forms')}
            navigation={this.props.navigation}
          />
          <View style={{ height: 20 }} />
          <HomeList
            list={this.state.contents}
            listScreen={'ContentList'}
            itemScreen={'Content'}
            title={i18n.t('Home.contents')}
            navigation={this.props.navigation}
          />
        </Screen>
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
};

export default Home;
