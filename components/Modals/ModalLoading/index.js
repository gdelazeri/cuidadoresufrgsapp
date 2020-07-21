import React from 'react';
import { connect } from 'react-redux';

import ModalLoading from './ModalLoading';

const mapStateToProps = ({ modals }) => {
  const loading = modals.loading;
  return { loading };
};

export default connect(
  mapStateToProps,
  null,
)(ModalLoading);