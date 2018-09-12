import { SELECT_PLACE, AUTH_ERROR } from '../actions';

const selectedPlace = (state = '', action) => {
  switch (action.type) {
    case SELECT_PLACE:
      return action.selected;
    case AUTH_ERROR:
      return '';
    default:
      return state;
  }
};

export default selectedPlace;
