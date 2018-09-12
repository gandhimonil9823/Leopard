import { SET_DATE_RANGE } from '../actions';

const dateRange = (state = {}, action) => {
  switch (action.type) {
    case SET_DATE_RANGE:
      return { start: action.start, end: action.end };
    default:
      return state;
  }
};
export default dateRange;
