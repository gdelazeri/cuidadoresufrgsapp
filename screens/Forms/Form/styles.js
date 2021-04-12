import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../constants/colors';

export default StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    marginTop: 8,
    marginBottom: 24,
  },
  description: {
    paddingTop: 8,
  },
  box: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.blue.spec2,
    padding: 15,
    paddingVertical: 0,
    marginHorizontal: 15,
    backgroundColor: colors.white,
  },
  question: {
    paddingHorizontal: 15,
    marginBottom: 15,
    marginTop: 54,
  },
  introductionTitle: {
    paddingHorizontal: 15,
    marginBottom: 15,
    marginTop: 15,
  },
  introductionText: {
    marginBottom: 15,
  },
  resultTitle: {
    paddingHorizontal: 15,
    marginBottom: 15,
    marginTop: 15,
  },
  resultDomain: {
    marginBottom: 10,
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  image: {
    height: Dimensions.get('window').height * 0.15,
    width: Dimensions.get('window').width - 30,
  },
  option: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.blue.spec2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 15,
  },
  text: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: Dimensions.get('window').height * 0.3,
    color: colors.text,
    fontFamily: 'quicksand',
    fontSize: 16,
  },
  selected: {
    backgroundColor: colors.light,
    borderColor: colors.light,
  },
  pagination: {
    height: 48,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttons: {
    height: 80,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  paginationBtn: {
    padding: 10,
  },
});
