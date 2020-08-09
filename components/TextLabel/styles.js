import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  login: {
    color: colors.grey,
    fontFamily: 'quicksand',
    fontSize: 16,
  },
  title: {  // text style 2
    color: colors.text,
    fontFamily: 'quicksand-bold',
    fontSize: 20,
  },
  titleHighlight: {  // text style 2
    color: colors.text,
    fontFamily: 'quicksand-bold',
    fontSize: 24,
  },
  subtitle: {  // text style 3
    color: colors.grey,
    fontFamily: 'quicksand',
    fontSize: 14,
  },
  text: {  // text style 3
    color: colors.text,
    fontFamily: 'quicksand',
    fontSize: 16,
  },
  menu: {  // text style 4
    color: colors.grey,
    fontFamily: 'quicksand',
    fontSize: 18,
  },
  fetchError: {
    color: colors.grey,
    fontFamily: 'quicksand',
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
    fontFamily: 'quicksand-bold',
  },
});
