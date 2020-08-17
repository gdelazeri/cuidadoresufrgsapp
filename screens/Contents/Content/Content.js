import React from 'react';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import {
  View,
  ScrollView,
  Image,
  RefreshControl,
  ImageBackground,
  Dimensions,
} from 'react-native';

import styles from './styles';
import formatDate from '../../../utils/formatDate';
import Screen from '../../../components/Screen';
import TextLabel from '../../../components/TextLabel';
import ContentService from '../../../services/ContentService';
import BackBtn from '../../../components/BackBtn';

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

  calcWidthHeight = () => {
    const { width } = Dimensions.get('window');
    const widthYoutube = 727;
    const heightYoutube = 409;
    const resp = {
      width: width,
      height: (width*heightYoutube) / widthYoutube,
    }
    return resp;
  }

  renderBody = (body) => {
    switch (body.type) {
      case 'TEXT':
        return <View>
          {typeof body.topic === 'string' && body.topic.length > 0 && <TextLabel type={'text'} bold style={styles.text}>{body.topic}</TextLabel>}
          <TextLabel type={'text'} style={styles.text}>{body.text}</TextLabel>
        </View>
      case 'IMAGE':
        return <View>
          <Image source={{ uri: body.url }} style={styles.image} />
          <TextLabel type={'subtitle'} style={styles.textImage}>{body.text}</TextLabel>
        </View>
    }
    return null;
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
            <BackBtn navigation={this.props.navigation} />
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
