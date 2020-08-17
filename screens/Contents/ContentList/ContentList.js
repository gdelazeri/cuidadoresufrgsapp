import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Platform, Keyboard } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Constants from 'expo-constants';

import styles from './styles';
import i18n from '../../../i18n';
import Screen from '../../../components/Screen';
import TextLabel from '../../../components/TextLabel';
import ContentItem from '../../../components/ContentItem';
import BackBtn from '../../../components/BackBtn';
import ContentService from '../../../services/ContentService';
import colors from '../../../constants/colors';
const PAGE_SIZE = 10;
const WAIT_INTERVAL = 400;  // ms

class ContentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fetchError: false,
      refreshing: false,
      contents: [],
      search: '',
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
    const { search } = this.state;
    const response = await ContentService.listAll(search);
    if (response.success) {
      const contents = response.result;
      this.setState({ contents, refreshing: false, loading: false, fetchError: false });
    } else {
      this.setState({ refreshing: false, loading: false, fetchError: false });
    }
  }
  
  async updateSearch(search) {
    clearTimeout(this.timer);
    this.setState({ search });
    if (!search || search.length === 0) {
      this.load();
      Keyboard.dismiss();
    } else {
      this.timer = setTimeout(async () => {
        const response = await ContentService.listAll(search);
        if (response.success) {
          this.setState({ contents: response.result });
        }
      }, WAIT_INTERVAL);
    }
  }

  render() {
    return (
      <Screen loading={this.state.loading} navigation={this.props.navigation} error={this.state.fetchError}>
        <View style={{ height: Constants.statusBarHeight }} />
        <View style={styles.header}>
          <BackBtn navigation={this.props.navigation} />
          <TextLabel type={'titleHighlight'}>{i18n.t('ContentList.contents')}</TextLabel>
        </View>
        <SearchBar
          platform={Platform.OS}
          placeholder={i18n.t('Search.placeholder')}
          onChangeText={(search) => this.updateSearch(search)}
          value={this.state.search}
          round={true}
          lightTheme={true}
          containerStyle={{ backgroundColor: 'white' }}
          inputContainerStyle={{ backgroundColor: colors.light, padding: 0, margin: 0, borderRadius: 10 }}
          containerStyle={
            Platform.OS === 'android' ?
            { marginLeft: 0, marginRight: 0, paddingLeft: 10, paddingRight: 10, backgroundColor: 'white' } :
            { margin: 0, padding: 0, paddingLeft: 5, backgroundColor: 'white' }
          }
          onClear={() => this.updateSearch('')}
          onCancel={() => this.updateSearch('')}
          cancelButtonTitle={i18n.t('Search.cancel')}
          cancelButtonProps={{ buttonTextStyle: { fontSize: 16 } }}
          inputStyle={{ fontSize: 16, color: colors.text }}
        />
        <FlatList
          data={this.state.contents}
          contentContainerStyle={styles.contents}
          renderItem={({ item }) => <ContentItem content={item} onPress={() => this.props.navigation.navigate('Content', { _id: item._id })} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item) => item._id}
        />
      </Screen>
    );
  }
}

ContentList.propTypes = {
  navigation: PropTypes.object,
};

export default ContentList;
