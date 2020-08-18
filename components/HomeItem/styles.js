import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    backgroundColor: colors.light,
    overflow: 'hidden',
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.55,
  },
  image: {
    resizeMode: 'cover',
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.4,
  },
  text: {
    height: Dimensions.get('window').width * 0.15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  }
});
