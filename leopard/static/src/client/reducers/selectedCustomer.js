import { SELECT_CUSTOMER, AUTH_ERROR } from '../actions';

const selectedCustomer = (state = '', action) => {
  switch (action.type) {
    case SELECT_CUSTOMER:
      return action.selected;
    case AUTH_ERROR:
      return '';
    default:
      return state;
  }
};

export default selectedCustomer;
