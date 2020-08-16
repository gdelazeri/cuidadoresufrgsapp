import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList,
} from 'react-native';
import Constants from 'expo-constants';

import styles from './styles';
import i18n from '../../i18n';
import Screen from '../../components/Screen';
import TextLabel from '../../components/TextLabel';
import ContentService from '../../services/ContentService';
import ContentItemHome from '../../components/ContentItemHome';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fetchError: false,
      refreshing: false,
      contents: [],
    }
  }

  static navigationOptions = {
    headerStyle: { elevation: 0, shadowOpacity: 0 },
    header: null,
  }

  componentDidMount = () => {
    this.load();
  }

  load = async (refreshing = false) => {
    this.setState({ refreshing });
    const response = await ContentService.list(0, 5, undefined, true);
    if (response.success) {
      const contents = response.result;
      this.setState({ contents, refreshing: false, loading: false, fetchError: false });
    } else {
      this.setState({ refreshing: false, loading: false, fetchError: false });
    }
  }

  render() {
    return (
      <Screen loading={this.state.loading} navigation={this.props.navigation} error={this.state.fetchError}>
        <View style={{ height: Constants.statusBarHeight }} />
        <View style={styles.header}>
          <TextLabel type={'title'}>{i18n.t('Home.hi')}</TextLabel>
          <TextLabel type={'titleHighlight'}>{this.props.user.name.split(' ')[0]}</TextLabel>
        </View>
        <TextLabel type={'title'} style={styles.contentsTitle}>{i18n.t('Home.contents')}</TextLabel>
        <FlatList
          data={this.state.contents}
          contentContainerStyle={styles.contents}
          renderItem={({item}) => <ContentItemHome content={item} onPress={() => this.props.navigation.navigate('Content', { _id: item._id })} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </Screen>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
};

export default Home;
