import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    paddingBottom: 15,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.3,
    resizeMode: 'cover',
  },
  contentHeader: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textImage: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 12,
  },
  source: {
    marginTop: 10,
  },
});
