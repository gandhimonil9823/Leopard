import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VisitsCountsChart from './charts/VisitsDayHourlyCountsChart';

const VisitsHourlyCountReportCardComponent = ({ loading }) =>
  (
    <div className="visitsHourlyCountReportCard">
      <Card title="Visits Hourly Count" loading={loading} style={{ width: 1170 }}>
        <VisitsCountsChart />
      </Card>
    </div>
  );


VisitsHourlyCountReportCardComponent.propTypes = {
  loading: PropTypes.bool
};

VisitsHourlyCountReportCardComponent.defaultProps = {
  loading: false
};


const mapStateToProps = state => ({
  loading: state.chartData.loading
});

export default connect(mapStateToProps)(VisitsHourlyCountReportCardComponent);
