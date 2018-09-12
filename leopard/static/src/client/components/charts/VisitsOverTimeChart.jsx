import React from 'react';
import { map, mapKeys } from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  VictoryAxis, VictoryChart, VictoryContainer, VictoryLabel, VictoryLine, VictoryScatter,
  VictoryTheme
} from 'victory';
import { Spin } from 'antd';


const VisitsOverTimeChartComponent = ({
  chartData = [], loading = false, tickXValues, tickYValues, minMax
}) => (
  <div className="visitChart">
    <div className={loading ? 'hidden' : ''}>
      <VictoryChart
        width={1000}
        height={600}
        theme={VictoryTheme.material}
        containerComponent={<VictoryContainer responsive={false} height={700} />}
      >
        <VictoryAxis
          label="Date"
          style={{
            axisLabel: {
              fontSize: 15,
              padding: 60,
              fontWeight: 'bold'
            },
            tickLabels: {
              fill: d => (minMax[3] && new Date(d).getTime() === new Date(minMax[3]).getTime() ? '#038DFF' : null),
              fontSize: 12,
              fontWeight: d => (minMax[3] && new Date(d).getTime() === new Date(minMax[3]).getTime() ? 'bold' : null)
            },
            grid: { stroke: '#E1E1E1' }

          }}
          tickFormat={x => (moment(x).format('D[\n]ddd').toUpperCase()) + (minMax[3] && new Date(x).getTime() === new Date(minMax[3]).getTime() ? '\nHIGHEST\nTRAFFIC' : '')}
          tickValues={tickXValues}
          fixLabelOverlap
        />
        <VictoryAxis
          dependentAxis
          label="Visits"
          style={{
            axisLabel: { fontSize: 15, padding: 35, fontWeight: 'bold' },
            grid: { stroke: '#E1E1E1' }
          }}
          tickValues={tickYValues}
        />
        <VictoryLine
          style={{
            data: { stroke: '#038DFF' },
            parent: { border: '1px solid #ccc' },
            labels: {
              fontSize: 15,
              fill: d => (d.y === minMax[1] ? '#038DFF' : '#000000')
            },
            tickLabels: { fill: d => (d.x === minMax[1] ? '#038DFF' : '#000000') }
          }}
          data={chartData}
          x="date"
          y="count"
          labels={datum => (datum.y > 0 ? datum.y : '')}
          labelComponent={<VictoryLabel renderInPortal dy={-20} />}
        />
        <VictoryScatter
          x="date"
          y="count"
          data={chartData}
        />
      </VictoryChart>
    </div>
    <div className={!loading ? 'hidden' : ''}>
      <Spin className="loading" size="large" />
    </div>
  </div>

);

const getChartData = (visits) => {
  // YYYYMMDD : NumOfVisits
  const chartData = [];
  if (visits) {
    Object.entries(visits).forEach(([date, count]) => {
      const countVal = parseInt(count, 10) || 0; // Because count may be null;
      const dateVal = moment(date, 'YYYYMMDD').toDate();
      chartData.push({ date: dateVal, count: countVal });
    });
  }
  return chartData;
};

const getMinMaxValues = (visits) => {
  let maxCount = 0;
  let minCount = 0;
  let minDate = null;
  let maxDate = null;
  if (visits) {
    Object.entries(visits).forEach(([date, count]) => {
      const countInt = parseInt(count, 10) || 0;
      const dateVal = moment(date, 'YYYYMMDD').toDate();
      if (countInt > maxCount) {
        maxCount = countInt;
        maxDate = dateVal;
      }
      if (countInt < minCount) {
        minCount = countInt;
        minDate = dateVal;
      }
    });
  }
  const result = [minCount, maxCount, minDate, maxDate];
  return result;
};

const getTickYValues = (visits) => {
  if (visits) {
    const minMax = getMinMaxValues(visits);
    let maxCount = minMax[0];
    let minCount = minMax[1];
    Object.entries(visits).forEach(([, count]) => {
      const countInt = parseInt(count, 10) || 0;
      if (countInt > maxCount) maxCount = countInt;
      if (countInt < minCount) minCount = countInt;
    });
    const result = [];
    result.push(0);
    result.push(minCount);
    result.push(parseInt(maxCount / 4, 10));
    result.push(parseInt(maxCount / 2, 10));
    result.push(parseInt(maxCount * 0.75, 10));
    result.push(parseInt(maxCount, 10));
    result.push(parseInt(maxCount + result[2], 10));
    return result;
  }
  return [0, 1, 5, 10];
};

const getTickXValues = (visits) => {
  if (visits) {
    const result = [];
    Object.entries(visits).forEach(([date]) => {
      result.push(moment(date, 'YYYYMMDD').toDate());
    });
    return result;
  }
  return [];
};


const mapStateToProps = state => ({
  chartData: getChartData(state.chartData.visits),
  loading: state.chartData.loading,
  tickXValues: getTickXValues(state.chartData.visits),
  tickYValues: getTickYValues(state.chartData.visits),
  minMax: getMinMaxValues(state.chartData.visits)
});

const mapDispatchToProps = () => ({
  handleZoom: () => false
});

export default connect(mapStateToProps, mapDispatchToProps)(VisitsOverTimeChartComponent);

