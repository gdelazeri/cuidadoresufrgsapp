import { connect } from 'react-redux';

import ForgotPasswordToken from './ForgotPasswordToken';
import { setModalConfirm, setLoader } from '../../../store/actions/creators/modals';

const mapDispatchToProps = { setModalConfirm, setLoader };

export default connect(
  null,
  mapDispatchToProps,
)(ForgotPasswordToken);
