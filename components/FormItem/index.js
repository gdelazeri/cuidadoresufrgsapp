import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';
import TextLabel from '../TextLabel';
import colors from '../../constants/colors';

const FormItem = ({ item, onPress }) => <TouchableOpacity style={styles.wrapper} activeOpacity={0.7} onPress={onPress}>
  {typeof item.imageUrl === 'string' && item.imageUrl.length > 0 && <ImageBackground
    source={{ uri: item.imageUrl }}
    style={styles.image}
  >
    {item.finished && <View style={{ position: 'absolute', top: 5, right: 5, }}>
      <Icon type={'material-community'} name={'check-circle'} color={colors.green} />
    </View>}
  </ImageBackground>}
  <View style={styles.text}>
    <TextLabel type={'title'} numberOfLines={1}>{item.title}</TextLabel>
    <TextLabel type={'subtitle'} numberOfLines={1}>{item.description}</TextLabel>
  </View>
</TouchableOpacity>

FormItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
};

export default FormItem;
