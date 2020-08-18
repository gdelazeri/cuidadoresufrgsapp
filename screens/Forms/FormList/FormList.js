import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, RefreshControl, Keyboard } from 'react-native';
import Constants from 'expo-constants';

import styles from './styles';
import i18n from '../../../i18n';
import Screen from '../../../components/Screen';
import TextLabel from '../../../components/TextLabel';
import FormItem from '../../../components/FormItem';
import BackBtn from '../../../components/BackBtn';
import Search from '../../../components/Search';
import FormService from '../../../services/FormService';
const WAIT_INTERVAL = 400;  // ms

class FormList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fetchError: false,
      refreshing: false,
      forms: [],
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
    const response = await FormService.listAll(search);
    if (response.success) {
      const forms = response.result;
      this.setState({ forms, refreshing: false, loading: false, fetchError: false });
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
        const response = await FormService.listAll(search);
        if (response.success) {
          this.setState({ forms: response.result });
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
          <TextLabel type={'titleHighlight'}>{i18n.t('FormList.forms')}</TextLabel>
        </View>
        <Search
          searchText={this.state.search}
          updateSearch={(search) => this.updateSearch(search)}
        />
        <FlatList
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.load(true)} />}
          data={this.state.forms}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <FormItem item={item} onPress={() => this.props.navigation.navigate('Form', { _id: item._id })} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={() => <View style={styles.center}>
            <TextLabel type={'subtitle'} textCenter>{i18n.t('FormList.empty')}</TextLabel>
          </View>}
        />
      </Screen>
    );
  }
}

FormList.propTypes = {
  navigation: PropTypes.object,
};

export default FormList;
