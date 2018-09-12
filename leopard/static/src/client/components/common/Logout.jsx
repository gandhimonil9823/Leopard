import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { authLogout } from '../../actions/index';

const LogoutButton = ({ auth, onClick }) => (
  { auth } ?
    <div className="logout">
      <a href="#" onClick={onClick}>
      Logout
      </a>
    </div>
    : 'Not logged'
);

LogoutButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(authLogout());
  }
});

const mapStateToProps = state => ({
  auth: state.auth.auth
});


export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
