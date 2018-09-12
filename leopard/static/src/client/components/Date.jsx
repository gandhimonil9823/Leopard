import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DatePicker } from 'antd';
import { dateFormat } from '../../shared/config';
import { selectDate } from '../actions/index';

const DateComponent = ({
  selected, onChange, loading
}) => (
  <div>
    <span>Date&nbsp;&nbsp;</span>
    <DatePicker
      disabled={loading}
      defaultValue={moment(selected, dateFormat)}
      format={dateFormat}
      onChange={onChange}
    />
  </div>
);

DateComponent.propTypes = {
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  selected: state.selectedDate[ownProps.target] || state.selectedDate.default,
  loading: state.chartData.loading || state.floorImage.loading || state.floors.loading
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (momentDate, stringDate) => {
    dispatch(selectDate(stringDate, ownProps.target));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(DateComponent);

