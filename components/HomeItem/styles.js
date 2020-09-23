import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    backgroundColor: colors.card,
    overflow: 'hidden',
    height: Dimensions.get('window').width * 0.48,
  },
  image: {
    resizeMode: 'cover',
    height: Dimensions.get('window').width * 0.33,
  },
  text: {
    height: Dimensions.get('window').width * 0.15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-around',
  }
});
