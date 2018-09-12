import React from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getWeekStartEndDates } from '../../shared/util';

export const DAY = 'DAY';
export const WEEK = 'WEEK';
export const MONTH = 'MONTH';
export const YEAR = 'YEAR';

const getTypeData = (type, date, rollupData = {
  dayCount: 0, weekCount: 0, monthCount: 0, yearCount: 0, date: '2001-01-01'
}) => {
  const dateMoment = moment(date);
  const weekDates = getWeekStartEndDates(date);
  switch (type) {
    case YEAR:
      return {
        type, title: 'Year', count: rollupData.yearCount, date: dateMoment.format('YYYY')
      };

    case MONTH:
      return {
        type, title: 'Month', count: rollupData.monthCount, date: dateMoment.format('MMMM YYYY')
      };

    case WEEK:
      return {
        type,
        title: 'Week',
        count: rollupData.weekCount,
        date: `${weekDates[0].format('MMM. Do')} - ${weekDates[1].format('MMM. Do, YYYY')}`
      };

    case DAY:
      return {
        type, title: 'Day', count: rollupData.dayCount, date: dateMoment.format('dddd, MMM. Do, YYYY')
      };

    default:
      return {
        type, title: 'Unknown', count: -1, date: 'no date'
      };
  }
};


const VisitsCountCardComponent = ({ typeData, loading }) =>
  (
    <Card title={typeData.title} style={{ width: 250, height: 220 }} loading={loading}>
      <p>{typeData.date}</p>
      <br />
      <p>Visits Count</p>
      <p>{typeData.count}</p>
    </Card>
  );


VisitsCountCardComponent.propTypes = {
  typeData: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool
};

VisitsCountCardComponent.defaultProps = {
  typeData: {},
  loading: false
};


const mapStateToProps = (state, ownProps) => ({
  typeData: getTypeData(ownProps.type, state.selectedDate.rollup, state.chartData.rollup),
  loading: state.chartData.loading
});

export default connect(mapStateToProps)(VisitsCountCardComponent);
