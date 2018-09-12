import { post } from "axios";
import { API_URL } from "../../shared/config";
import {
  LOAD_FLOORS_SUCCESS,
  loadFloorImageSuccess,
  loadFloorsSuccess,
  LOADING_FLOORS,
  loadingFloors,
  selectFloor
} from "../actions/index";
import { handleAuthError } from "./auth";

export const loadFloorsFromServer = () =>
  (dispatch, getState) => {
    dispatch(selectFloor(''));
    dispatch(loadingFloors());
    dispatch(loadFloorImageSuccess());
    post(API_URL, {
      type: 'floor',
      query: 'floors',
      placeid: getState().selectedPlace
    }).then((result) => {
      const floors = result.data;
      dispatch(loadFloorsSuccess(floors));
    }).catch((error) => {
      dispatch(handleAuthError(error));
      throw (error);
    });
  };

const floors = (state = { loading: false }, action) => {
  switch (action.type) {
    case LOAD_FLOORS_SUCCESS:
      return { ...state, floors: action.floors, loading: false };
    case LOADING_FLOORS:
      return { ...state, loading: true };
    default:
      return state;
  }
};
export default floors;
