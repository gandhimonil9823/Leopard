import { SELECT_ZONE } from '../actions';

const selectedZone = (state = '', action) => {
  switch (action.type) {
    case SELECT_ZONE:
      return action.selected;
    default:
      return state;
  }
};
export default selectedZone;
