import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconImage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    marginTop: -24,
  },
  text: {
    marginTop: 24,
  },
  btnUpdate: {
    marginTop: 24,
  },
});
