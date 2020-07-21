import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import IconChevron from '../Icons/IconChevron';
import colors from '../../constants/colors';

const BackBtn = ({ navigation, color = colors.primary }) => (
  <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
    <IconChevron containerStyle={{ paddingHorizontal: 10 }} side={'left'} color={color} />
  </TouchableOpacity>
)

BackBtn.propTypes = {
  navigation: PropTypes.object,
  color: PropTypes.string,
};

export default BackBtn;
