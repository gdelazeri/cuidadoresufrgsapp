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
    alignSelf: 'center',
    width: width * 0.3,
    height: width * 0.3,
    marginTop: -width * 0.15,
  },
  form: {
    width: width * 0.7,
    paddingHorizontal: 15,
    // paddingTop: 55,
    paddingBottom: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.blue.spec2,
    backgroundColor: colors.white,
  },
  formSpace: {
    height: 20,
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
