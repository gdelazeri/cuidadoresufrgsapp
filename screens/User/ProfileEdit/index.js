import ProfileEdit from './ProfileEdit';

import { connect } from 'react-redux';

import { setUser } from '../../../store/actions/creators/appSettings';
import { setModalConfirm, setLoader } from '../../../store/actions/creators/modals';

const mapDispatchToProps = { setModalConfirm, setLoader, setUser };

export default connect(
  null,
  mapDispatchToProps,
)(ProfileEdit);
