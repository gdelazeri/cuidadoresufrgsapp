import Form from './Form';

import { connect } from 'react-redux';
import { setLoader } from '../../../store/actions/creators/modals';

const mapStateToProps = ({ appSettings }) => {
  const { user } = appSettings;
  return { user };
};

const mapDispatchToProps = {
  setLoader,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
