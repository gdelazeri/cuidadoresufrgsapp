import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image, Dimensions } from 'react-native';

import styles from './styles';
import TextLabel from '../TextLabel';

const HomeItem = ({ item, onPress, width = Dimensions.get('window').width * 0.6 }) => <TouchableOpacity style={[styles.wrapper, { width }]} activeOpacity={0.7} onPress={onPress}>
  {typeof item.imageUrl === 'string' && item.imageUrl.length > 0 && <Image
    source={{ uri: item.imageUrl }}
    style={[styles.image, { width }]}
  />}
  <View style={styles.text}>
    {item.category && <TextLabel type={'subtitle'}>{item.category.name}</TextLabel>}
    <TextLabel type={'title'} numberOfLines={1}>{item.title}</TextLabel>
  </View>
</TouchableOpacity>

HomeItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
  width: PropTypes.number,
};

export default HomeItem;
