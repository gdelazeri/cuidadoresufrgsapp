import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image } from 'react-native';

import styles from './styles';
import TextLabel from '../TextLabel';

const ContentItem = ({ item, onPress }) => <TouchableOpacity style={styles.wrapper} activeOpacity={0.7} onPress={onPress}>
  <Image
    source={{ uri: item.imageUrl }}
    style={styles.image}
  />
  <View style={styles.text}>
    {item.category && <TextLabel type={'subtitle'}>{item.category.name}</TextLabel>}
    <TextLabel type={'title'} numberOfLines={1}>{item.title}</TextLabel>
    <TextLabel type={'subtitle'} numberOfLines={1}>{item.description}</TextLabel>
  </View>
</TouchableOpacity>

ContentItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
};

export default ContentItem;
