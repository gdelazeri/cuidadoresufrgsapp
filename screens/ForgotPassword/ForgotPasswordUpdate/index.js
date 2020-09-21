import { connect } from 'react-redux';

import ForgotPasswordUpdate from './ForgotPasswordUpdate';
import { setModalConfirm, setLoader } from '../../../store/actions/creators/modals';

const mapDispatchToProps = { setModalConfirm, setLoader };

export default connect(
  null,
  mapDispatchToProps,
)(ForgotPasswordUpdate);
