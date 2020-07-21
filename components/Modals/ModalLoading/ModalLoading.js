import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import PropTypes from 'prop-types';

import styles from './styles';
import colors from '../../../constants/colors';

const ModalLoading = ({ loading }) => (
  <Overlay height={100} width={100} isVisible={loading}>
    <View style={styles.center}>
      <ActivityIndicator size={'large'} color={colors.grey} />
    </View>
  </Overlay>
)

ModalLoading.propTypes = {
  loading: PropTypes.bool,
};

export default ModalLoading;
