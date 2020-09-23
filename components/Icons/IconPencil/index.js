import React from 'react';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import colors from '../../../constants/colors';

const IconPencil = ({ size = 22, containerStyle, color = colors.grey }) => (
  <Icon
    type={'material-community'}
    name={'pencil'}
    size={size}
    color={color}
    containerStyle={containerStyle}
  />
)

IconPencil.propTypes = {
  size: PropTypes.number,
  containerStyle: PropTypes.object,
  color: PropTypes.string,
};

export default IconPencil;
