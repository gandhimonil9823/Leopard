import { SELECT_DATE } from '../actions';

const selectedDate = (state = { default: '' }, action) => {
  switch (action.type) {
    case SELECT_DATE:
      return { ...state, [action.target || 'default']: action.date };
    default:
      return state;
  }
};
export default selectedDate;
