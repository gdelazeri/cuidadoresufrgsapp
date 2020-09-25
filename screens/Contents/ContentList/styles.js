import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  list: {
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  separator: {
    height: 15,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inlineCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loadingMoreText: {
    marginLeft: 8,
  }
});
