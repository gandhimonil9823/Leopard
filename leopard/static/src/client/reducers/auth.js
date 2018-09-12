import { post } from 'axios';
import { AUTH_ERROR, AUTH_LOADING, AUTH_LOGOUT, AUTH_SUCCESS, authError, authLoading, authSuccess } from '../actions';
import { SERVICES_URL } from '../../shared/config';

export const login = values =>
  (dispatch) => {
    dispatch(authLoading());
    post(`${SERVICES_URL}/login`, {
      app: 'facilities',
      userid: values.userName,
      password: values.password
    }).then((response) => {
      localStorage.setItem(
        'authorizationToken',
        response.data.authorizationToken
      );
      dispatch(authSuccess());
    }).catch((error) => {
      dispatch(authError(error.response.status === 401 ? 'Invalid Username or password!' : error.message));
      throw (error);
    });
  };

export const handleAuthError = error =>
  (dispatch) => {
    if (error.response && error.response.status && error.response.status === 401) {
      dispatch(authError());
    }
  };

export const checkLogin = () => localStorage.getItem('authorizationToken') !== null;
export const clearLogin = () => localStorage.removeItem('authorizationToken');

const auth = (state = { auth: checkLogin(), loading: false, error: '' }, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state, auth: checkLogin(), loading: false, error: ''
      };
    case AUTH_ERROR:
      return {
        ...state, auth: false, loading: false, error: action.error
      };
    case AUTH_LOADING:
      return {
        ...state, auth: false, loading: true, error: ''
      };
    case AUTH_LOGOUT:
      clearLogin();
      return {
        ...state, auth: false, loading: false, error: ''
      };
    default:
      return state;
  }
};


export default auth;
