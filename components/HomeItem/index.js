import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';
import TextLabel from '../TextLabel';
import colors from '../../constants/colors';

const HomeItem = ({ item, onPress, width = Dimensions.get('window').width * 0.6 }) => <TouchableOpacity style={[styles.wrapper, { width }]} activeOpacity={0.7} onPress={onPress}>
  {typeof item.imageUrl === 'string' && item.imageUrl.length > 0 && <ImageBackground
    source={{ uri: item.imageUrl }}
    style={[styles.image, { width }]}
  >
    {item.finished && <View style={{ position: 'absolute', top: 5, right: 5, }}>
      <Icon type={'material-community'} name={'check-circle'} color={colors.green} />
    </View>}
  </ImageBackground>}
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
