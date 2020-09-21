import { StyleSheet } from 'react-native';
import colors from '../../../constants/colors';

export default StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 30,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  fields: {
    width: '100%',
  },
  field: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  btnCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
});
