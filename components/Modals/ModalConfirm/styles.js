import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  overlay: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 15,
  },
  twoButtons: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  oneButton: {
    width: Dimensions.get('window').width * 0.7 - 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
