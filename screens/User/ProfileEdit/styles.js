import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  info: {
    paddingHorizontal: 20,
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
  field50: {
    width: '48%',
    marginBottom: 30,
  },
  field: {
    marginBottom: 15,
  },
  btnCenter: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
