import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, TouchableOpacity } from 'react-native';

import styles from './styles';
import colors from '../../constants/colors';
import i18n from '../../i18n';
import TextLabel from '../TextLabel';
import HomeItem from '../HomeItem';

const HomeList = ({ list = [], listScreen, itemScreen, title, navigation, width }) => <View>
  <View style={styles.header}>
    <TextLabel type={'title'} color={colors.blue.spec3}>{title}</TextLabel>
    {typeof listScreen === 'string' && <TouchableOpacity onPress={() => navigation.navigate(listScreen)}>
      <TextLabel type={'subtitle'} bold>{i18n.t('Home.seeAll')}</TextLabel>
    </TouchableOpacity>}
  </View>
  <FlatList
    data={list}
    contentContainerStyle={styles.list}
    renderItem={({item}) => (
      <HomeItem
        item={item}
        onPress={() => navigation.navigate(itemScreen, { _id: item._id })}
        width={width}
      />
    )}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
    horizontal={true}
    keyExtractor={(item) => item._id}
    showsHorizontalScrollIndicator={false}
  />
</View>

HomeList.propTypes = {
  list: PropTypes.array,
  listScreen: PropTypes.string,
  itemScreen: PropTypes.string,
  title: PropTypes.string,
  navigation: PropTypes.object,
  width: PropTypes.number,
};

export default HomeList;
