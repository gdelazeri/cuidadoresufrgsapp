import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image } from 'react-native';

import styles from './styles';
import TextLabel from '../TextLabel';

const FormItem = ({ item, onPress }) => <TouchableOpacity style={styles.wrapper} activeOpacity={0.7} onPress={onPress}>
  <Image
    source={{ uri: item.imageUrl }}
    style={styles.image}
  />
  <View style={styles.text}>
    <TextLabel type={'title'} numberOfLines={1}>{item.title}</TextLabel>
    <TextLabel type={'subtitle'} numberOfLines={2}>{item.description}</TextLabel>
  </View>
</TouchableOpacity>

FormItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
};

export default FormItem;
