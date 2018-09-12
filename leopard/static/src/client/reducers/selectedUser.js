import { SELECT_USER } from '../actions';

const selectedUser = (state = '', action) => {
  switch (action.type) {
    case SELECT_USER:
      return action.selected;
    default:
      return state;
  }
};
export default selectedUser;
