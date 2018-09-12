import { get } from 'axios';
import { SERVICES_URL } from '../../shared/config';
import {
  AUTH_ERROR,
  FLOOR_IMAGE_LOADING,
  FLOOR_IMAGE_SUCCESS,
  floorImageLoading,
  loadFloorImageSuccess,
  loadPositionsSuccess
} from '../actions/index';
import { handleAuthError } from './auth';

export const loadFloorImageFromServer = () =>
  (dispatch, getState) => {
    dispatch(floorImageLoading());

    const selectedFloor = getState().selectedFloor;
    get(`${SERVICES_URL}/floors/${selectedFloor}/image`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorizationToken')}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      const { image } = response.data;
      dispatch(loadFloorImageSuccess(image));
      dispatch(loadPositionsSuccess([]));
    }).catch((error) => {
      dispatch(handleAuthError(error));
    });
  };

const floorImage = (state = { image: {}, loading: false }, action) => {
  switch (action.type) {
    case FLOOR_IMAGE_SUCCESS:
      return {
        ...state, image: action.floorImage, loading: false
      };
    case FLOOR_IMAGE_LOADING:
      return {
        ...state, loading: true
      };
    case AUTH_ERROR:
      return {
        ...state, image: {}, loading: false
      };
    default:
      return state;
  }
};
export default floorImage;
