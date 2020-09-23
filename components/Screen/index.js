import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';

import styles from './styles';
import i18n from '../../i18n';
import colors from '../../constants/colors';
import TextLabel from '../../components/TextLabel';
import CustomBtn from '../CustomBtn';

const Error = ({ reload }) => <View style={styles.center}>
  <TextLabel type='fetchError'>{i18n.t('Screen.fetchError')}</TextLabel>
  <CustomBtn text={i18n.t('Screen.retry')} onPress={reload} />
</View>

const Screen = ({
  loading,
  error,
  navigation,
  reload,
  backgroundColor = colors.background,
  children,
})  => <View style={[styles.wrapper, { backgroundColor }]}>
  {loading && <View style={styles.center}>
    <ActivityIndicator size="large" color={colors.grey} />
  </View>}
  {!loading && error && <Error reload={reload} />}
  {!loading && !error && children}
</View>

Screen.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  navigation: PropTypes.object,
  reload: PropTypes.func,
  backgroundColor: PropTypes.string,
};

export default Screen;
