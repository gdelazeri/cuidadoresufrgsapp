import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  login: {
    height: 30,
    color: colors.blue.spec3,
    fontFamily: 'quicksand',
    fontSize: 16,
    borderColor: colors.blue.spec2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
    marginTop: 20,
    paddingBottom: 16,
  },
  form: {
    height: 30,
    color: colors.blue.spec3,
    fontFamily: 'quicksand',
    fontSize: 16,
    borderColor: colors.blue.spec2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  formInput: {
    color: colors.blue.spec3,
    fontFamily: 'quicksand',
    fontSize: 16,
    lineHeight: 30,
  },
  formInputView: {
    height: 30,
    borderColor: colors.blue.spec2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
