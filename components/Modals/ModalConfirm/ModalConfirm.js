import React from 'react';
import { View, Dimensions } from 'react-native';
import { Overlay } from 'react-native-elements';
import PropTypes from 'prop-types';

import styles from './styles';
import i18n from '../../../i18n';
import TextLabel from '../../TextLabel';
import CustomBtn from '../../CustomBtn';

const btnWidth = (Dimensions.get('window').width * 0.7 / 2) - 20;
const overlayWidth = Dimensions.get('window').width * 0.75;

const ModalConfirm = ({
  modalConfirm,
  setModalConfirm,
}) => (
  <Overlay height={'auto'} isVisible={Object.keys(modalConfirm).length > 0} width={overlayWidth} overlayStyle={styles.overlay}>
    <View>
      <View style={styles.text}>
        <TextLabel type={'text'} textCenter>{modalConfirm.text || i18n.t('ModalConfirm.text')}</TextLabel>
      </View>
      {modalConfirm.btnSuccess && modalConfirm.btnCancel && <View style={styles.twoButtons}>
        <CustomBtn
          secondary
          text={modalConfirm.btnCancelText || i18n.t('ModalConfirm.cancel')}
          onPress={modalConfirm.btnCancel}
          width={btnWidth}
        />
        <CustomBtn
          text={modalConfirm.btnSuccessText || i18n.t('ModalConfirm.success')}
          onPress={modalConfirm.btnSuccess}
          width={btnWidth}
        />
      </View>}
      {modalConfirm.btnSuccess && !modalConfirm.btnCancel && <View style={styles.oneButton}>
        <CustomBtn
          text={modalConfirm.btnSuccessText || i18n.t('ModalConfirm.success')}
          onPress={modalConfirm.btnSuccess}
          width={btnWidth}
        />
      </View>}
      {!modalConfirm.btnSuccess && !modalConfirm.btnCancel && <View style={styles.oneButton}>
        <CustomBtn
          text={modalConfirm.btnSuccessText || i18n.t('ModalConfirm.success')}
          onPress={() => setModalConfirm({})}
          width={btnWidth}
        />
      </View>}
    </View>
  </Overlay>
)

ModalConfirm.propTypes = {
  modalConfirm: PropTypes.object,
  setModalConfirm: PropTypes.func,
};

export default ModalConfirm;
