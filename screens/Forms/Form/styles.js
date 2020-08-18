import { StyleSheet } from 'react-native';
import colors from '../../../constants/colors';

export default StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 30,
  },
  description: {
    paddingTop: 10,
  },
  box: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.light,
    padding: 15,
    marginHorizontal: 15,
  },
  question: {
    paddingHorizontal: 15,
    marginBottom: 15,
    marginTop: 15,
  },
  option: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 15,
  },
  selected: {
    backgroundColor: colors.light,
  },
  pagination: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
