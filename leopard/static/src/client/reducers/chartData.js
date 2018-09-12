import { post } from 'axios';
import moment from 'moment';
import { API_URL } from '../../shared/config';
import {
  CHART_DATA_LOADING,
  chartDataLoading, loadDayHourlyVisitsSuccess,
  loadPositionsSuccess,
  loadRollupVisitsCountSuccess,
  loadTotalVisitsByDaySuccess,
  POSITIONS_SUCCESS,
  ROLLUP_VISITS_COUNT_SUCCESS,
  TOTAL_VISITS_BY_DAY_SUCCESS,
  DAY_HOURLY_VISITS_SUCCESS
} from '../actions/index';
import { handleAuthError } from './auth';
import { getWeekStartEndDates } from '../../shared/util';

export const loadTotalVisitsByDay = () =>
  (dispatch, getState) => {
    dispatch(chartDataLoading());
    post(API_URL, {
      type: getState().selectedType,
      query: getState().selectedType === 'place' ? 'total_visits_by_day' : 'total_visits',
      start: moment(getState().dateRange.start).format('YYYY-MM-DD 00:00:00'),
      end: moment(getState().dateRange.end).format('YYYY-MM-DD 23:59:59'),
      placeid: getState().selectedPlace.visitsOverTime
    }).then((result) => {
      let visits = [];
      if (result && result.data && result.data.visits) {
        visits = result.data.visits;
      }
      dispatch(loadTotalVisitsByDaySuccess(visits));
    }).catch((error) => {
      dispatch(handleAuthError(error));
      throw (error);
    });
  };

export const loadDayHourlyVisits = () =>
  (dispatch, getState) => {
    dispatch(chartDataLoading());
    post(API_URL, {
      type: 'place',
      query: 'day_hourly_visits',
      date: moment(getState().selectedDate.rollup).format('YYYY-MM-DD'),
      placeid: getState().selectedPlace.rollup
    }).then((result) => {
      let visits = [];
      if (result && result.data && result.data) {
        visits = result.data;
      }
      dispatch(loadDayHourlyVisitsSuccess(visits));
    }).catch((error) => {
      dispatch(handleAuthError(error));
      throw (error);
    });
  };


export const loadRollupVisitsCount = () =>
  (dispatch, getState) => {
    dispatch(chartDataLoading());
    const date = getState().selectedDate.rollup || new Date();
    const weekDates = getWeekStartEndDates(date);
    const selectedDate = moment(date);
    post(API_URL, {
      type: getState().selectedType,
      query: 'total_visits_by_day',
      start: selectedDate.format('YYYY-01-01 00:00:00'),
      end: selectedDate.format('YYYY-12-31 23:59:59'),
      placeid: getState().selectedPlace.rollup
    }).then((result) => {
      const rollupVisits = {
        dayCount: 0,
        weekCount: 0,
        monthCount: 0,
        yearCount: 0
      };
      if (result && result.data && result.data.visits) {
        const visits = result.data.visits;
        Object.entries(visits).forEach(([visitDate, visitCount]) => {
          const countVal = parseInt(visitCount, 10) || 0; // Because count may be null;
          const dateVal = moment(visitDate, 'YYYYMMDD');
          rollupVisits.yearCount += countVal;
          if (selectedDate.month() + 1 === dateVal.month() + 1) {
            rollupVisits.monthCount += countVal;
            if (selectedDate.date() === dateVal.date()) {
              rollupVisits.dayCount += countVal;
            }
          }
          if (dateVal.isAfter(weekDates[0]) && dateVal.isBefore(weekDates[1])) {
            rollupVisits.weekCount += countVal;
          }
        });
      }
      dispatch(loadRollupVisitsCountSuccess(rollupVisits));
    }).catch((error) => {
      dispatch(handleAuthError(error));
      throw (error);
    });
  };


export const loadPositions = () =>
  (dispatch, getState) => {
    dispatch(chartDataLoading());
    const date = getState().selectedDate.heatmap || getState().selectedDate.default;
    post(API_URL, {
      type: 'position',
      query: 'xy_data',
      start: moment(date).format('YYYY-MM-DD 00:00:00'),
      end: moment(date).format('YYYY-MM-DD 23:59:59'),
      placeid: getState().selectedPlace.heatmap,
      floorid: getState().selectedFloor
    }).then((result) => {
      let positions = [];
      if (result && result.data && result.data.xy_data) {
        positions = result.data.xy_data;
      }
      dispatch(loadPositionsSuccess(positions));
    }).catch((error) => {
      throw (error);
    });
  };


const chartData = (state = { loading: false }, action) => {
  switch (action.type) {
    case TOTAL_VISITS_BY_DAY_SUCCESS:
      return { ...state, visits: action.visits, loading: false };
    case POSITIONS_SUCCESS:
      return { ...state, xyData: action.xyData, loading: false };
    case CHART_DATA_LOADING:
      return { ...state, loading: true };
    case ROLLUP_VISITS_COUNT_SUCCESS:
      return { ...state, rollup: action.visits, loading: false };
    case DAY_HOURLY_VISITS_SUCCESS:
      return { ...state, dayHourlyVisits: action.visits, loading: false };
    default:
      return state;
  }
};
export default chartData;
