import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    backgroundColor: colors.card,
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').width * 0.4,
  },
  text: {
    height: Dimensions.get('window').width * 0.2,
    padding: 10,
  }
});
