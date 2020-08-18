import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image } from 'react-native';

import styles from './styles';
import TextLabel from '../TextLabel';

const HomeItem = ({ item, onPress }) => <TouchableOpacity style={styles.wrapper} activeOpacity={0.7} onPress={onPress}>
  <Image
    source={{ uri: item.imageUrl }}
    style={styles.image}
  />
  <View style={styles.text}>
    {item.category && <TextLabel type={'subtitle'}>{item.category.name}</TextLabel>}
    <TextLabel type={'title'} numberOfLines={1}>{item.title}</TextLabel>
  </View>
</TouchableOpacity>

HomeItem.propTypes = {
  item: PropTypes.object,
};

export default HomeItem;
