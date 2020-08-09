import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    backgroundColor: colors.light,
    overflow: 'hidden',
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.6,
  },
  image: {
    resizeMode: 'cover',
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.4,
  },
  text: {
    height: Dimensions.get('window').width * 0.2,
    padding: 10,
  }
});
