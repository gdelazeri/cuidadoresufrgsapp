import Home from './Home';

import { connect } from 'react-redux';

const mapStateToProps = ({ appSettings }) => {
  const { user } = appSettings;
  return { user };
};

export default connect(
  mapStateToProps,
  null,
)(Home);
