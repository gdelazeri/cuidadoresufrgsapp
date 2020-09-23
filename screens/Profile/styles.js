import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
  },
  info: {
    width: width * 0.9,
    marginBottom: 15,
  },
  iconImage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: 30,
  },
  field: {
    marginBottom: 15,
  }
});
