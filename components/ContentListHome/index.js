import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, TouchableOpacity } from 'react-native';

import styles from './styles';
import i18n from '../../i18n';
import TextLabel from '../../components/TextLabel';
import ContentItemHome from '../../components/ContentItemHome';

const ContentListHome = ({ list = [], seeAll = true, title = i18n.t('Home.contents'), navigation }) => <View>
  <View style={styles.contentsHeader}>
    <TextLabel type={'title'}>{title}</TextLabel>
    {seeAll && <TouchableOpacity onPress={() => navigation.navigate('ContentList')}>
      <TextLabel type={'subtitle'} bold>{i18n.t('Home.seeAll')}</TextLabel>
    </TouchableOpacity>}
  </View>
  <FlatList
    data={list}
    contentContainerStyle={styles.contents}
    renderItem={({item}) => <ContentItemHome content={item} onPress={() => navigation.navigate('Content', { _id: item._id })} />}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
    horizontal={true}
    keyExtractor={(item) => item._id}
    showsHorizontalScrollIndicator={false}
  />
</View>

ContentListHome.propTypes = {
  list: PropTypes.array,
  seeAll: PropTypes.bool,
  title: PropTypes.string,
  navigation: PropTypes.object,
};

export default ContentListHome;
