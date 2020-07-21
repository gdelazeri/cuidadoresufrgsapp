import * as React from 'react';
import { TextInput, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import styles from './styles';
import colors from '../../constants/colors';
import TextLabel from '../../components/TextLabel';

const FormTextInput = (props) => {
  if (props.editable === false) {
    const style = { ...styles.formInput };
    if (!props.value) style.color = colors.light;
    return <View style={styles.formInputView}>
      <TextLabel style={style}>{props.value ? props.value : props.placeholder}</TextLabel>
    </View>
  } else if (props.masked) {
    return <TextInputMask
      underlineColorAndroid={'transparent'}
      placeholderTextColor={colors.light}
      style={styles[props.inputType]}
      {...props}
    />
  } else {
    return <TextInput
      underlineColorAndroid={'transparent'}
      placeholderTextColor={colors.light}
      style={styles[props.inputType]}
      {...props}
    />
  }
}

export default FormTextInput;