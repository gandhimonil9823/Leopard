import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DatePicker } from 'antd';
import { dateFormat } from '../../shared/config';
import { setDateRange } from '../actions/index';

const RangePicker = DatePicker.RangePicker;

const DateRangeComponent = ({
  start, end, onChange, loading
}) => (
  <div>
    <span>Date Range&nbsp;&nbsp;</span>
    <RangePicker
      disabled={loading}
      defaultValue={[
        moment(start, dateFormat),
        moment(end, dateFormat)
      ]}
      format={dateFormat}
      onChange={onChange}
    />
  </div>
);

DateRangeComponent.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  start: state.dateRange.start,
  end: state.dateRange.end,
  loading: state.chartData.loading
});

const mapDispatchToProps = dispatch => ({
  onChange: (momentDates, stringDates) => {
    dispatch(setDateRange(stringDates[0], stringDates[1]));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(DateRangeComponent);
