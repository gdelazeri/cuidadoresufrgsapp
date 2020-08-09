import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image } from 'react-native';

import styles from './styles';
import TextLabel from '../TextLabel';

const ContentHome = ({ content, onPress }) => <TouchableOpacity style={styles.wrapper} activeOpacity={0.7} onPress={onPress}>
  <Image
    source={{ uri: content.imageUrl }}
    style={styles.image}
  />
  <View style={styles.text}>
    <TextLabel type={'subtitle'}>{'Categoria'}</TextLabel>
    <TextLabel type={'title'} numberOfLines={1}>{content.title}</TextLabel>
  </View>
</TouchableOpacity>

ContentHome.propTypes = {
  content: PropTypes.object,
};

export default ContentHome;
