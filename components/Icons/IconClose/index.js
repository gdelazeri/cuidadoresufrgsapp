import React from 'react';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import colors from '../../../constants/colors';

const IconClose = ({ size = 25, containerStyle, color = colors.grey }) => (
  <Icon
    type={'material-community'}
    name={'close'}
    size={size}
    color={color}
    containerStyle={containerStyle}
  />
)

IconClose.propTypes = {
  size: PropTypes.number,
  containerStyle: PropTypes.object,
  color: PropTypes.string,
};

export default IconClose;
