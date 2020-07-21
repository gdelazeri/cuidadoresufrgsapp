import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  textPrimary: {
    color: '#fff',
    fontSize: 16,
  },
  textSecondary: {
    color: colors.grey,
    fontSize: 16,
  },
  btnPrimary: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: colors.grey,
  },
  btnSecondary: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    borderColor: colors.grey,
    borderWidth: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDisabled: {
    color: colors.grey,
  },
});
