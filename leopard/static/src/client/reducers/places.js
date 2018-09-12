import { post } from 'axios';
import { API_URL } from '../../shared/config';
import { LOAD_PLACES_SUCCESS, LOADING_PLACES, loadingPlaces, loadPlacesSuccess, selectPlace } from '../actions/index';
import { loadZonesFromServer } from './zones';
import { handleAuthError } from './auth';

export const loadPlacesFromServer = () =>
  (dispatch, getState) => {
    dispatch(selectPlace(''));
    dispatch(loadingPlaces());
    post(API_URL, {
      type: 'place',
      query: 'places',
      custid: getState().selectedCustomer
    }).then((result) => {
      const places = result.data;
      dispatch(loadPlacesSuccess(places));
    }).catch((error) => {
      dispatch(handleAuthError(error));
      throw (error);
    });
  };

const places = (state = { loading: false }, action) => {
  switch (action.type) {
    case LOAD_PLACES_SUCCESS:
      return { ...state, places: action.places, loading: false };
    case LOADING_PLACES:
      return { ...state, loading: true };
    default:
      return state;
  }
};
export default places;
