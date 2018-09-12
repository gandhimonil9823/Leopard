import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Login from './Login';

const BaseRouteComponent = ({ auth, AppComponent }) =>
  <Route
    exact
    path="/"
    render={() => (
      auth ? (<Route component={AppComponent} />) : (<Route component={Login} />)
    )}
  />;

BaseRouteComponent.propTypes = {
  auth: PropTypes.bool.isRequired,
  AppComponent: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  AppComponent: ownProps.App
});

const mapStateToProps = state => ({
  auth: state.auth.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseRouteComponent);
