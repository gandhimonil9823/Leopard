import { post } from 'axios';
import { API_URL } from '../../shared/config';
import { LOAD_ZONES_SUCCESS, selectZone, loadZonesSuccess } from '../actions';
import { handleAuthError } from './auth';
import { LOADING_ZONES, loadingZones } from '../actions/index';

export const loadZonesFromServer = () =>
  (dispatch, getState) => {
    dispatch(loadingZones());
    post(API_URL, {
      type: 'zone',
      query: 'zones',
      placeId: getState().selectedPlace.visitOverTime // TODO !!!
    }).then((result) => {
      const zones = result.data;
      dispatch(loadZonesSuccess(zones));
    }).catch((error) => {
      dispatch(handleAuthError(error));
      throw (error);
    });
  };

const zones = (state = { loading: false }, action) => {
  switch (action.type) {
    case LOAD_ZONES_SUCCESS:
      return { ...state, zones: action.zones, loading: false };
    case LOADING_ZONES:
      return { ...state, loading: true };
    default:
      return state;
  }
};
export default zones;
