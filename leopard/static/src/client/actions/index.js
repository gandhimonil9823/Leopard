import moment from 'moment';
import { dateFormat } from '../../shared/config';

export const GET_TYPES = 'GET_TYPES';

export const LOAD_CUSTOMERS_SUCCESS = 'LOAD_CUSTOMERS_SUCCESS';
export const LOAD_PLACES_SUCCESS = 'LOAD_PLACES_SUCCESS';
export const LOAD_ZONES_SUCCESS = 'LOAD_ZONES_SUCCESS';
export const LOAD_FLOORS_SUCCESS = 'LOAD_FLOORS_SUCCESS';

export const LOADING_CUSTOMERS = 'LOADING_CUSTOMERS';
export const LOADING_PLACES = 'LOADING_PLACES';
export const LOADING_ZONES = 'LOADING_ZONES';
export const LOADING_FLOORS = 'LOADING_FLOORS';

export const CHART_DATA_LOADING = 'CHART_DATA_LOADING';
export const POSITIONS_SUCCESS = 'POSITIONS_SUCCESS';
export const TOTAL_VISITS_BY_DAY_SUCCESS = 'TOTAL_VISITS_BY_DAY_SUCCESS';
export const ROLLUP_VISITS_COUNT_SUCCESS = 'ROLLUP_VISITS_COUNT_SUCCESS';
export const DAY_HOURLY_VISITS_SUCCESS = 'DAY_HOURLY_VISITS_SUCCESS';

export const FLOOR_IMAGE_SUCCESS = 'FLOOR_IMAGE_SUCCESS';
export const FLOOR_IMAGE_LOADING = 'FLOOR_IMAGE_LOADING';

export const SELECT_TYPE = 'SELECT_TYPE';
export const SELECT_CUSTOMER = 'SELECT_CUSTOMER';
export const SELECT_PLACE = 'SELECT_PLACE';
export const SELECT_USER = 'SELECT_USER';
export const SELECT_ZONE = 'SELECT_ZONE';
export const SELECT_FLOOR = 'SELECT_FLOOR';

export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export const SELECT_DATE = 'SELECT_DATE';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const getTypes = () => ({
  type: GET_TYPES
});

export const selectType = type => ({
  type: SELECT_TYPE,
  selected: type
});

export const selectCustomer = customer => ({
  type: SELECT_CUSTOMER,
  selected: customer
});

export const selectPlace = place => ({
  type: SELECT_PLACE,
  selected: place
});

export const selectUser = user => ({
  type: SELECT_USER,
  selected: user
});

export const selectZone = zone => ({
  type: SELECT_ZONE,
  selected: zone
});

export const selectFloor = floor => ({
  type: SELECT_FLOOR,
  selected: floor
});

export const setDateRange = (start = (moment().subtract(7, 'days').format(dateFormat)), end = (moment().format(dateFormat))) => ({
  type: SET_DATE_RANGE,
  start,
  end
});

export const selectDate = (date = (moment().format(dateFormat)), target) => ({
  type: SELECT_DATE,
  date,
  target
});

export const loadCustomersSuccess = customers => ({
  type: LOAD_CUSTOMERS_SUCCESS,
  customers
});

export const loadPlacesSuccess = places => ({
  type: LOAD_PLACES_SUCCESS,
  places
});

export const loadZonesSuccess = zones => ({
  type: LOAD_ZONES_SUCCESS,
  zones
});

export const loadFloorsSuccess = floors => ({
  type: LOAD_FLOORS_SUCCESS,
  floors
});

export const loadingCustomers = () => ({
  type: LOADING_CUSTOMERS
});

export const loadingPlaces = () => ({
  type: LOADING_PLACES
});

export const loadingZones = () => ({
  type: LOADING_ZONES
});

export const loadingFloors = () => ({
  type: LOADING_FLOORS
});

export const loadDayHourlyVisitsSuccess = visits => ({
  type: DAY_HOURLY_VISITS_SUCCESS,
  visits
});

export const loadTotalVisitsByDaySuccess = visits => ({
  type: TOTAL_VISITS_BY_DAY_SUCCESS,
  visits
});

export const chartDataLoading = () => ({
  type: CHART_DATA_LOADING
});

export const loadRollupVisitsCountSuccess = visits => ({
  type: ROLLUP_VISITS_COUNT_SUCCESS,
  visits
});

export const loadPositionsSuccess = xyData => ({
  type: POSITIONS_SUCCESS,
  xyData
});

export const loadFloorImageSuccess = floorImage => ({
  type: FLOOR_IMAGE_SUCCESS,
  floorImage
});

export const floorImageLoading = () => ({
  type: FLOOR_IMAGE_LOADING
});

export const authSuccess = () => ({
  type: AUTH_SUCCESS
});

export const authError = error => ({
  type: AUTH_ERROR,
  error
});

export const authLoading = () => ({
  type: AUTH_LOADING
});


export const authLogout = () => ({
  type: AUTH_LOGOUT
});

// default required by eslint:
export default getTypes();

