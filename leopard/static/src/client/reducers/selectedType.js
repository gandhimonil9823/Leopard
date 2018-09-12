import { SELECT_TYPE } from '../actions';

const selectedType = (state = '', action) => {
  switch (action.type) {
    case SELECT_TYPE:
      return action.selected;
    default:
      return state;
  }
};
export default selectedType;
