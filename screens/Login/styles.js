import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconImage: {
    resizeMode: 'contain',
    width: width * 0.7,
    height: height * 0.35,
  },
  form: {
    width: width * 0.7,
    padding: 15,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  btnCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  forgotPasswordView: {
    alignItems: 'flex-end',
  },
  clickHere: {
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
