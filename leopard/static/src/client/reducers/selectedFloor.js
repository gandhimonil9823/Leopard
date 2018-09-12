import { SELECT_FLOOR, AUTH_ERROR } from '../actions';

const selectedFloor = (state = '', action) => {
  switch (action.type) {
    case SELECT_FLOOR:
      return action.selected;
    case AUTH_ERROR:
      return '';
    default:
      return state;
  }
};
export default selectedFloor;
