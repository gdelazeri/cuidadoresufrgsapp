import { connect } from 'react-redux';

import ModalConfirm from './ModalConfirm';
import { setModalConfirm } from '../../../store/actions/creators/modals';

const mapStateToProps = ({ modals }) => {
  const modalConfirm = modals.modalConfirm;
  return { modalConfirm };
};

const mapDispatchToProps = {
  setModalConfirm,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalConfirm);