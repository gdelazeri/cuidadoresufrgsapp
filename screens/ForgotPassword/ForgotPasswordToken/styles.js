import { StyleSheet } from 'react-native';
import colors from '../../../constants/colors';

export default StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 30,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  field: {
    width: '100%',
    padding: 20,
    marginBottom: 30,
  },
  btnCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  form: {
    textAlign: 'center',
    letterSpacing: 5,
    height: 40,
    color: colors.text,
    fontFamily: 'quicksand-bold',
    fontSize: 20,
    borderColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});
