import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

import colors from '../../constants/colors';
import styles from './styles';

const CustomBtn = ({
  text,
  onPress,
  disabled,
  secondary,
  loading,
  textStyle,
  customStyle,
  width,
  iconRight,
  icon,
}) => {
  let titleStyle = styles.textPrimary;
  let loadingStyle = { color: '#fff' };
  let buttonStyle = styles.btnPrimary;
  const height = 48;
  if (secondary) {
    titleStyle = styles.textSecondary;
    loadingStyle = { color: colors.green };
    buttonStyle = styles.btnSecondary;
  }
  buttonStyle = {
    ...buttonStyle,
    ...customStyle,
    borderRadius: 20,
    width: '100%',
    height,
  }
  titleStyle = {
    ...titleStyle,
    ...textStyle,
    paddingBottom: 0,
    paddingTop: 0,
    margin: 0,
    lineHeight: 20,
    borderColor: '#fff',
    textAlignVertical: 'center',
  }
  return <View style={styles.center}>
    <Button
      loadingProps={loadingStyle}
      loading={loading}
      onPress={onPress}
      title={text.toUpperCase()}
      titleStyle={titleStyle}
      buttonStyle={buttonStyle}
      containerStyle={{ height, width: width || 188, marginLeft: 0, marginRight: 0 }}
      disabled={disabled}
      disabledStyle={styles.btnSecondary}
      disabledTitleStyle={styles.textDisabled}
      activeOpacity={0.7}
      icon={icon}
      iconRight={iconRight}
    />
  </View>
}

CustomBtn.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  secondary: PropTypes.bool,
  loading: PropTypes.bool,
  textStyle: PropTypes.object,
  customStyle: PropTypes.object,
  width: PropTypes.number,
  iconRight: PropTypes.bool,
  icon: PropTypes.element,
};

export default CustomBtn;
