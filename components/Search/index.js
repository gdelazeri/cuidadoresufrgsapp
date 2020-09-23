import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';

import i18n from '../../i18n';
import colors from '../../constants/colors';

const Search = ({ updateSearch, searchText }) => <SearchBar
  platform={Platform.OS}
  placeholder={i18n.t('Search.placeholder')}
  onChangeText={(search) => updateSearch(search)}
  value={searchText}
  round={true}
  lightTheme={true}
  containerStyle={{ backgroundColor: colors.background }}
  inputContainerStyle={{ backgroundColor: colors.card, padding: 0, margin: 0, borderRadius: 10 }}
  containerStyle={
    Platform.OS === 'android' ?
    { marginLeft: 0, marginRight: 0, paddingLeft: 10, paddingRight: 10, backgroundColor: colors.background } :
    { margin: 0, padding: 0, paddingLeft: 5, backgroundColor: colors.background }
  }
  onClear={() => updateSearch('')}
  onCancel={() => updateSearch('')}
  cancelButtonTitle={i18n.t('Search.cancel')}
  cancelButtonProps={{ buttonTextStyle: { fontSize: 16 } }}
  inputStyle={{ fontSize: 16, color: colors.text }}
/>

Search.propTypes = {
  updateSearch: PropTypes.func,
  searchText: PropTypes.string,
};

export default Search;

