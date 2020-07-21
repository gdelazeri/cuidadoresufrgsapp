import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scroll: {
    paddingTop: 0,
    padding: 20,
  },
  logoView: {
    height: Dimensions.get('window').height * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    marginBottom: 30,
  },
});
