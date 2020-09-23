import { StyleSheet, Dimensions } from 'react-native';
const overlayWidth = Dimensions.get('window').width * 0.75 - 40;

export default StyleSheet.create({
  overlay: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 20,
  },
  twoButtons: {
    width: overlayWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  oneButton: {
    width: Dimensions.get('window').width * 0.7 - 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
