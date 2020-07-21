import React from 'react';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import colors from '../../../constants/colors';

const IconChevron = ({ size = 25, containerStyle, side, color = colors.grey }) => (
  <Icon
    type={'material-community'}
    name={`chevron-${side}`}
    size={size}
    color={color}
    containerStyle={containerStyle}
  />
)

IconChevron.propTypes = {
  size: PropTypes.number,
  containerStyle: PropTypes.object,
  side: PropTypes.string,
  color: PropTypes.string,
};

export default IconChevron;
