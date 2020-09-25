import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  info: {
    width: width * 0.9,
    marginBottom: 15,
  },
  iconImage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: 30,
  },
  fieldsInline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  field30: {
    width: '28%',
    marginBottom: 30,
  },
  field70: {
    width: '68%',
    marginBottom: 30,
  },
  field: {
    marginBottom: 30,
  },
  fieldBtn: {
    marginBottom: 15,
  },
  iconEdit: {
    justifyContent: 'center',
    width: 30,
    height: 30,
    margin: 15
  },
  remove: {
    marginBottom: 15,
  }
});
