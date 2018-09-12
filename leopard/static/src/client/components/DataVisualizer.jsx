// @flow
import React from 'react';
import { Col, Row, Tabs } from 'antd';
import Date from '../components/Date';
import Customer from './Customer';
import Place from './Place';
import DateRange from './DateRange';
import FilterButton from './FilterButton';
import VisitsOverTimeChart from './charts/VisitsOverTimeChart';
import Floor from './Floor';
import FloorCanvas from './FloorCanvas';
import VisitsCountCard, { DAY, MONTH, WEEK, YEAR } from './VisitsCountCard';
import VisitsCountReportCard from './VisitsHourlyCountReportCard';

const TabPane = Tabs.TabPane;

const tabStyles = {
  margin: '30px'
};

const tabStyle = {
  background: '#f0f2f5'
};

export default class DataVisualizer extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Tabs tabPosition="top" style={tabStyles} type="card">
          <TabPane tab="Visits Over Time" key="1">
            <div className="filterBar">
              <Customer />
              <Place />
              <DateRange />
              <FilterButton target="visitsOverTime" />
            </div>
            <VisitsOverTimeChart />
          </TabPane>
          <TabPane tab="Daily Heatmap" key="2">
            <div className="filterBar">
              <Customer />
              <Place />
              <Floor />
              <Date target="heatmap" />
              <FilterButton target="heatmap" />
            </div>
            <FloorCanvas />
          </TabPane>
          <TabPane tab="Visit Counts Rollup" key="3">
            <div className="filterBar">
              <Customer />
              <Place />
              <Date target="rollup" />
              <FilterButton target="rollup" />
            </div>
            <div className="cardsBar">
              <Row type="flex" justify="center" align="middle">
                <Col span={4}><VisitsCountCard type={DAY} /></Col>
                <Col span={4}><VisitsCountCard type={WEEK} /></Col>
                <Col span={4}><VisitsCountCard type={MONTH} /></Col>
                <Col span={4}><VisitsCountCard type={YEAR} /></Col>
              </Row>
              <Row type="flex" justify="center" align="middle">
                <Col span={16}><VisitsCountReportCard /></Col>
              </Row>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
