import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const TextLabel = (props) => (
  <Text
    style={[
      styles[props.type],
      props.uppercase ? styles.uppercase : null,
      props.textCenter ? styles.textCenter : null,
      props.bold ? styles.textBold : null,
      props.color ? { color: props.color } : null,
      props.style ? { ...props.style } : null,
    ]}
    numberOfLines={props.numberOfLines}
  >
    {props.children}
  </Text>
);

TextLabel.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
  uppercase: PropTypes.bool,
  textCenter: PropTypes.bool,
  bold: PropTypes.bool,
  color: PropTypes.string,
  style: PropTypes.object,
  numberOfLines: PropTypes.number,
};

export default TextLabel;
