import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  login: {
    color: colors.grey,
    fontSize: 16,
  },
  title: {  // text style 2
    color: colors.text,
    fontSize: 16,
  },
  subtitle: {  // text style 3
    color: colors.grey,
    fontSize: 15,
  },
  menu: {  // text style 4
    color: colors.grey,
    fontSize: 18,
  },
  fetchError: {
    color: colors.grey,
    fontSize: 16,
    marginBottom: 20,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  textCenter: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: '700',
  },
});
