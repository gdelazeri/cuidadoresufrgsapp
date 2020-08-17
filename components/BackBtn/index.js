import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import IconChevron from '../Icons/IconChevron';
import colors from '../../constants/colors';
import styles from './styles';

const BackBtn = ({ navigation, color = colors.text }) => (
  <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} style={styles.backBtn}>
    <IconChevron side={'left'} color={color} />
  </TouchableOpacity>
)

BackBtn.propTypes = {
  navigation: PropTypes.object,
  color: PropTypes.string,
};

export default BackBtn;
