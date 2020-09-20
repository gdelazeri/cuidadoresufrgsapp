import { connect } from 'react-redux';

import ConsentTerm from './ConsentTerm';
import { setModalConfirm } from '../../store/actions/creators/modals';

const mapDispatchToProps = { setModalConfirm };

export default connect(
  null,
  mapDispatchToProps,
)(ConsentTerm);
