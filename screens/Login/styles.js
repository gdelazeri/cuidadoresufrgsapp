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
    width: 85,
    height: 85,
    marginTop: -50,
  },
  form: {
    width: '100%',
    paddingHorizontal: 40,
  },
  formContent: {
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 22,
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
    marginTop: 80,
  },
  forgotPasswordView: {
    alignItems: 'flex-end',
  },
  clickHere: {
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
