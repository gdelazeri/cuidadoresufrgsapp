import React from 'react';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import {
  View,
  FlatList,
  RefreshControl,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

import styles from './styles';
import colors from '../../../constants/colors';
import formatDate from '../../../utils/formatDate';
import Screen from '../../../components/Screen';
import TextLabel from '../../../components/TextLabel';
import BackBtn from '../../../components/BackBtn';
import HomeList from '../../../components/HomeList';
import WebViewAutoHeight from '../../../components/WebViewAutoHeight';
import i18n from '../../../i18n';
import ContentService from '../../../services/ContentService';
const SIMILARS_SIZE = 4;

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fetchError: false,
      refreshing: false,
      content: {},
      similars: [],
    }
  }

  static navigationOptions = {
    headerStyle: { elevation: 0, shadowOpacity: 0 },
    header: null,
  }

  componentDidMount = () => {
    this.load();
  }

  componentDidUpdate = () => {
    const _id = this.props.navigation.getParam('_id');
    if (_id !== this._id) {
      this.reload();
      this.refs.FlatList.scrollToOffset({x: 0, y: 0, animated: true});
    }
  }

  load = async (refreshing = false, loading = false) => {
    this.setState({ refreshing });
    this._id = this.props.navigation.getParam('_id');
    let response = await ContentService.get(this._id);
    if (response.success) {
      const content = response.result;
      this.setState({ content, refreshing: false, loading: false, fetchError: false });
      
      response = await ContentService.list(0, SIMILARS_SIZE, content.title);
      if (response.success) {
        const similars = response.result.filter(r => r._id !== this._id);
        this.setState({ similars });
      }
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

  renderHeader = (content) => <View>
    <ImageBackground
      source={{ uri: content.imageUrl }}
      style={styles.image}
    >
      <BackBtn navigation={this.props.navigation} />
    </ImageBackground>
    <View style={styles.contentHeader}>
      <TextLabel type={'titleHighlight'}>{content.title}</TextLabel>
      <View style={styles.source}>
        {typeof content.source === 'string' && <TextLabel type={'subtitle'}>{content.source}</TextLabel>}
        <TextLabel type={'subtitle'}>{formatDate(content.createdAt)}</TextLabel>
      </View>
      {typeof content.subtitle === 'string' && <View style={styles.source}>
        <TextLabel type={'subtitle'} bold style={styles.textSubtitle}>{content.subtitle}</TextLabel>
      </View>}
    </View>
  </View>

  renderBody = (body) => {
    switch (body.type) {
      case 'TEXT':
        return <View>
          {typeof body.topic === 'string' && body.topic.length > 0 && <TextLabel type={'text'} bold style={styles.text}>{body.topic}</TextLabel>}
          {typeof body.text === 'string' && body.text.length > 0 && <TextLabel type={'text'} style={styles.text}>{body.text}</TextLabel>}
        </View>
      case 'IMAGE':
        return <View>
          {typeof body.topic === 'string' && body.topic.length > 0 && <TextLabel type={'text'} bold style={styles.text}>{body.topic}</TextLabel>}
          {typeof body.url === 'string' && body.url.length > 0 && <AutoHeightImage source={{ uri: body.url }} width={Dimensions.get('window').width} />}
          {typeof body.text === 'string' && body.text.length > 0 && <TextLabel type={'subtitle'} style={styles.textImage}>{body.text}</TextLabel>}
        </View>
    }
    return null;
  }

  reload = () => {
    this.setState({ loading: true });
    this.load();
  }

  render() {
    return (
      <Screen loading={this.state.loading} navigation={this.props.navigation} error={this.state.fetchError} reload={this.reload} backgroundColor={colors.white}>
        <View style={{ height: Constants.statusBarHeight }} />
        {typeof this.state.content.text !== 'string' && <FlatList
          ref={'FlatList'}
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.load(true)} />}
          ListHeaderComponent={this.renderHeader(this.state.content)}
          data={this.state.content.body}
          renderItem={({ item }) => this.renderBody(item)}
          keyExtractor={(item, index) => `body${index}`}
          ListFooterComponent={this.state.similars.length > 0 && <View style={styles.similars}>
            <HomeList
              list={this.state.similars}
              title={i18n.t('Content.similars')}
              seeAll={false}
              itemScreen={'Content'}
              navigation={this.props.navigation}
            />
          </View>}
        />}
        {typeof this.state.content.text === 'string' && <ScrollView>
          {this.renderHeader(this.state.content)}
          <View style={styles.contentBody}>
            <WebViewAutoHeight html={this.state.content.text} padding={30} />
          </View>
          {this.state.similars.length > 0 && <View style={styles.similars}>
            <HomeList
              list={this.state.similars}
              title={i18n.t('Content.similars')}
              seeAll={false}
              itemScreen={'Content'}
              navigation={this.props.navigation}
            />
          </View>}
        </ScrollView>}
      </Screen>
    );
  }
}

Content.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
};

export default Content;
