import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';

import styles from './styles';
import i18n from '../../i18n';
import colors from '../../constants/colors';
import TextLabel from '../../components/TextLabel';
import CustomBtn from '../CustomBtn';

const Error = (props) => <View style={styles.center}>
  <TextLabel type='fetchError'>{i18n.t('Screen.fetchError')}</TextLabel>
  <CustomBtn text={i18n.t('Screen.retry')} onPress={props.reload} />
</View>

const Screen = (props)  => <View style={styles.wrapper}>
  {props.loading && <View style={styles.center}>
    <ActivityIndicator size="large" color={colors.grey} />
  </View>}
  {!props.loading && props.error && <Error props />}
  {!props.loading && !props.error && props.children}
</View>

Screen.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  navigation: PropTypes.object,
};

export default Screen;
