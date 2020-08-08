import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  login: {
    height: 30,
    color: colors.text,
    fontFamily: 'quicksand',
    fontSize: 16,
    borderColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
  form: {
    height: 30,
    color: colors.text,
    fontFamily: 'quicksand',
    fontSize: 16,
    borderColor: colors.light,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  formInput: {
    color: colors.text,
    fontFamily: 'quicksand',
    fontSize: 16,
    lineHeight: 30,
  },
  formInputView: {
    height: 30,
    borderColor: colors.text,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
