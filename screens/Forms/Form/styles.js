import { StyleSheet, Dimensions } from 'react-native';
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
    paddingVertical: 0,
    marginHorizontal: 15,
    height: Dimensions.get('window').height * 0.5,
  },
  question: {
    paddingHorizontal: 15,
    marginBottom: 15,
    marginTop: 15,
  },
  introductionTitle: {
    marginBottom: 10,
    marginTop: 15,
  },
  introductionText: {
    marginBottom: 15,
  },
  resultTitle: {
    marginBottom: 10,
    marginTop: 15,
  },
  resultDomain: {
    marginBottom: 10,
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
    paddingVertical: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  paginationBtn: {
    padding: 10,
  },
});
