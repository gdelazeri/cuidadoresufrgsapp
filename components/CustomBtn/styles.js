import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  textPrimary: {
    color: '#fff',
    fontFamily: 'quicksand',
    fontSize: 15,
  },
  textSecondary: {
    color: colors.blue.spec2,
    fontFamily: 'quicksand',
    fontSize: 15,
  },
  btnPrimary: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: colors.blue.spec3,
    borderColor: colors.blue.spec3,
    borderWidth: 1,
  },
  btnSecondary: {
    height: 40,
    paddingHorizontal: 20,
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
