import { GET_TYPES } from '../actions';

const types = (state = [], action) => {
  switch (action.type) {
    case GET_TYPES:
      // TODO load from server? are they exist on server side?
      return [
        { id: 'place', name: 'Place' },
        { id: 'zone', name: 'Zone' }];
    default:
      return state;
  }
};
export default types;
