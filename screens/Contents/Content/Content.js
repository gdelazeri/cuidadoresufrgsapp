import React from 'react';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import {
  View,
  ScrollView,
  Image,
  RefreshControl,
  ImageBackground,
} from 'react-native';

import styles from './styles';
import formatDate from '../../../utils/formatDate';
import IconChevron from '../../../components/Icons/IconChevron';
import Screen from '../../../components/Screen';
import TextLabel from '../../../components/TextLabel';
import ContentService from '../../../services/ContentService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../../constants/colors';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fetchError: false,
      refreshing: false,
      content: {},
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
    const _id = this.props.navigation.getParam('_id');
    const response = await ContentService.get(_id);
    if (response.success) {
      const content = response.result;
      this.setState({ content, refreshing: false, loading: false, fetchError: false });
    } else {
      this.setState({ refreshing: false, loading: false, fetchError: false });
    }
  }

  renderBody = (body) => {
    switch (body.type) {
      case 'TEXT':
        return <TextLabel type={'text'} style={styles.text}>{body.text}</TextLabel>
      case 'IMAGE':
        return <View>
          <Image source={{ uri: body.url }} style={styles.image} />
          <TextLabel type={'subtitle'} style={styles.textImage}>{body.text}</TextLabel>
        </View>
      return null;
    }
  }

  render() {
    return (
      <Screen loading={this.state.loading} navigation={this.props.navigation} error={this.state.fetchError}>
        <View style={{ height: Constants.statusBarHeight }} />
        <ScrollView
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.load(true)} />}
          contentContainerStyle={styles.wrapper}
        >
          <ImageBackground
            source={{ uri: this.state.content.imageUrl }}
            style={styles.image}
          >
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
              <IconChevron side={'left'} color={colors.text} />
            </TouchableOpacity>
          </ImageBackground>
   
        
          <View style={styles.contentHeader}>
            <TextLabel type={'title'}>{this.state.content.title}</TextLabel>
            <View style={styles.source}>
              {typeof this.state.content.source === 'string' && <TextLabel type={'subtitle'}>{this.state.content.source}</TextLabel>}
              <TextLabel type={'subtitle'}>{formatDate(this.state.content.createdAt)}</TextLabel>
            </View>
            {typeof this.state.content.subtitle === 'string' && <View style={styles.source}>
              <TextLabel type={'subtitle'} bold style={styles.textSubtitle}>{this.state.content.subtitle}</TextLabel>
            </View>}
          </View>
          {Array.isArray(this.state.content.body) && this.state.content.body.map((body, index) => <View key={`body${index}`}>
            {this.renderBody(body)}
          </View>)}
        </ScrollView>
      </Screen>
    );
  }
}

Content.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
};

export default Content;
