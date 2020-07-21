import Login from './Login';

import { connect } from 'react-redux';

import { setUser } from '../../store/actions/creators/appSettings';
import { setModalConfirm } from '../../store/actions/creators/modals';

const mapDispatchToProps = {
  setUser,
  setModalConfirm,
};

export default connect(
  null,
  mapDispatchToProps,
)(Login);
