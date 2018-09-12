import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadPositions, loadTotalVisitsByDay, loadRollupVisitsCount, loadDayHourlyVisits } from '../reducers/chartData';

const FilterButtonComponent = ({ onClick, loading }) => (
  <Button type="primary" onClick={onClick} disabled={loading}>
    Show data
  </Button>
);

FilterButtonComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    if (ownProps.target === 'visitsOverTime') {
      dispatch(loadTotalVisitsByDay());
    } else if (ownProps.target === 'heatmap') {
      dispatch(loadPositions());
    } else if (ownProps.target === 'rollup') {
      dispatch(loadRollupVisitsCount());
      dispatch(loadDayHourlyVisits());
    }
  }
});

const mapStateToProps = state => ({
  loading: state.chartData.loading || state.floorImage.loading || state.floors.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterButtonComponent);
