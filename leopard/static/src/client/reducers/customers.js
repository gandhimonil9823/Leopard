import { post } from 'axios';
import { API_URL } from '../../shared/config';
import { LOAD_CUSTOMERS_SUCCESS, LOADING_CUSTOMERS, loadingCustomers, loadCustomersSuccess } from '../actions/index';
import { handleAuthError } from './auth';

export const loadCustomersFromServer = () =>
  (dispatch) => {
    dispatch(loadingCustomers());
    post(API_URL, {
      type: 'customer',
      query: 'customers'
    }).then((result) => {
      const customers = result.data;
      dispatch(loadCustomersSuccess(customers));
    }).catch((error) => {
      dispatch(handleAuthError(error));
      throw (error);
    });
  };

const customers = (state = { loading: false }, action) => {
  switch (action.type) {
    case LOAD_CUSTOMERS_SUCCESS:
      return { ...state, customers: action.customers, loading: false };
    case LOADING_CUSTOMERS:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default customers;
