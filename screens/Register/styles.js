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
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 85,
    height: 85,
  },
  field: {
    marginBottom: 55,
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
  passwordRules: {
    marginBottom: 20,
  },
  btnCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
