import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  VictoryAxis, VictoryChart, VictoryContainer, VictoryLabel, VictoryLine, VictoryScatter,
  VictoryTheme
} from 'victory';

const defaultYValues = [0, 1, 5, 10];

const VisitsDayHourlyCountsChartComponent = ({ chartData, tickYValues, minMax }) => (
  <VictoryChart
    width={1100}
    height={500}
    theme={VictoryTheme.material}
    containerComponent={<VictoryContainer responsive={false} height={600} />}
  >
    <VictoryAxis
      label="Hours"
      fixLabelOverlap
      tickFormat={x => x + (minMax[3] && x === minMax[3] ? '\nHIGHEST\nTRAFFIC' : '')}
      height={400}
      style={{
        axisLabel: {
          fontSize: 15,
          padding: 60,
          fontWeight: 'bold'
        },
        tickLabels: {
          fill: x => (parseInt(x, 0) - 1 === parseInt(minMax[3], 0) ? '#038DFF' : null),
          fontSize: 12,
          fontWeight: x => (parseInt(x, 0) - 1 === parseInt(minMax[3], 0) ? 'bold' : null)
        },

        grid: { stroke: '#E1E1E1' }
      }}
    />
    <VictoryAxis
      dependentAxis
      label="Visits"
      tickValues={tickYValues}
      style={{
        axisLabel: {
          fontSize: 15,
          padding: 38,
          fontWeight: 'bold'
        },
        grid: { stroke: '#E1E1E1' }
      }}
    />
    <VictoryLine
      x="hour"
      y="count"
      data={chartData}
      labels={datum => (datum.y > 0 ? datum.y : '')}
      labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
      style={{
        tickLabels: { fill: d => (d.x === minMax[1] ? '#038DFF' : '#000000') },
        data: { stroke: '#038DFF' },
        parent: { border: '1px solid #ccc' },
        labels: {
          fontSize: 15,
          fill: d => (d.y === minMax[1] ? '#038DFF' : '#000000')
        }
      }}
    />
    <VictoryScatter
      x="hour"
      y="count"
      data={chartData}
    />
  </VictoryChart>
);

const getDefaultVisits = () => {
  const values = {};
  for (let i = 0; i < 24; i += 1) {
    values[i] = 0;
  }
  return values;
};

VisitsDayHourlyCountsChartComponent.propTypes = {
  chartData: PropTypes.arrayOf(PropTypes.any),
  tickYValues: PropTypes.arrayOf(PropTypes.any),
  minMax: PropTypes.arrayOf(PropTypes.any)
};

const getChartData = (visits) => {
  // hour : count of visits
  const chartData = [];
  Object.entries(visits).forEach(([hourVal, countVal]) => {
    chartData.push({ hour: hourVal, count: countVal });
  });
  return chartData;
};

VisitsDayHourlyCountsChartComponent.defaultProps = {
  chartData: null,
  tickYValues: defaultYValues,
  minMax: [0, 0, 0, 0]
};

const getMinMaxValues = (visits) => {
  let maxCount = 0;
  let minCount = 0;
  let minHour = 0;
  let maxHour = 0;
  if (visits) {
    Object.entries(visits).forEach(([hour, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxHour = hour;
      }
      if (count < minCount) {
        minCount = count;
        minHour = hour;
      }
    });
  }
  const result = [minCount, maxCount, minHour, maxHour];
  console.log(result);
  return result;
};


const getTickYValues = (visits) => {
  if (visits) {
    const minMax = getMinMaxValues(visits);
    let minCount = minMax[0];
    let maxCount = minMax[1];
    if (maxCount === 0 || maxCount === Number.MAX_SAFE_INTEGER) {
      return defaultYValues;
    }
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
  return defaultYValues;
};

const mapStateToProps = state => ({
  chartData: getChartData(state.chartData.dayHourlyVisits || getDefaultVisits()),
  tickYValues: getTickYValues(state.chartData.dayHourlyVisits || getDefaultVisits()),
  minMax: getMinMaxValues(state.chartData.dayHourlyVisits || getDefaultVisits())
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(VisitsDayHourlyCountsChartComponent);

