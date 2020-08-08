import Register from './Register';
import { connect } from 'react-redux';

import { setUser } from '../../store/actions/creators/appSettings';
import { setModalConfirm, setLoader } from '../../store/actions/creators/modals';

const mapDispatchToProps = {
  setUser,
  setModalConfirm,
  setLoader,
};

export default connect(
  null,
  mapDispatchToProps,
)(Register);
