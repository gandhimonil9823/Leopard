import { combineReducers } from 'redux';
import types from './types';
import selectedType from './selectedType';
import customers from './customers';
import places from './places';
import selectedCustomer from './selectedCustomer';
import selectedPlace from './selectedPlace';
import dateRange from './dateRange';
import selectedUser from './selectedUser';
import selectedZone from './selectedZone';
import zones from './zones';
import chartData from './chartData';
import floors from './floors';
import selectedFloor from './selectedFloor';
import selectedDate from './selectedDate';
import auth from './auth';
import floorImage from './floorImage';

export default combineReducers({
  types,
  customers,
  places,
  zones,
  floors,
  chartData,
  dateRange,
  selectedDate,
  selectedCustomer,
  selectedPlace,
  selectedType,
  selectedUser,
  selectedZone,
  selectedFloor,
  auth,
  floorImage
});
