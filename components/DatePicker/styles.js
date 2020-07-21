import { StyleSheet } from 'react-native';

import colors from '../../constants/colors';

export default StyleSheet.create({
  dateView: {
    paddingTop: 5,
    borderColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 4,
  },
  modalDate: {
    padding: 0,
  },
  centerBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
