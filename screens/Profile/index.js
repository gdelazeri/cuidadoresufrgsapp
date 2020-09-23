import Profile from './Profile';

import { connect } from 'react-redux';

import { setModalConfirm, setLoader } from '../../store/actions/creators/modals';

const mapDispatchToProps = { setModalConfirm, setLoader };

export default connect(
  null,
  mapDispatchToProps,
)(Profile);
