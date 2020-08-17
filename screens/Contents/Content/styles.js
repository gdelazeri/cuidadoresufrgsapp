import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.4,
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
  similars: {
    marginTop: 10,
    paddingVertical: 15
  },
});
