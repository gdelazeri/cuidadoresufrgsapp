import { connect } from 'react-redux';

import ForgotPasswordEmail from './ForgotPasswordEmail';
import { setModalConfirm, setLoader } from '../../../store/actions/creators/modals';

const mapDispatchToProps = { setModalConfirm, setLoader };

export default connect(
  null,
  mapDispatchToProps,
)(ForgotPasswordEmail);
