import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  textPrimary: {
    color: '#fff',
    fontFamily: 'quicksand',
    fontSize: 14,
  },
  textSecondary: {
    color: colors.blue.spec2,
    fontFamily: 'quicksand',
    fontSize: 14,
  },
  btnPrimary: {
    height: 48,
    paddingHorizontal: 10,
    backgroundColor: colors.blue.spec3,
    borderColor: colors.blue.spec3,
    borderWidth: 1,
  },
  btnSecondary: {
    height: 48,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    borderColor: colors.blue.spec2,
    borderWidth: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDisabled: {
    color: colors.blue.spec2,
  },
});
