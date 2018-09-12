import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { selectZone } from '../actions/index';

const ZoneComponent = ({
  zones, onChange, selected, loading, disabled
}) => (
  <div>
    <span>Zone&nbsp;</span>
    <Select
      disabled={loading || disabled}
      style={{ width: 180 }}
      placeholder="Select a zone"
      onChange={onChange}
      defaultActiveFirstOption
      value={loading ? 'Loading...' : selected}
      optionFilterProp="children"
      filterOption={(input, option) =>
      option.props.children
        .toLowerCase()
        .indexOf(input.toLowerCase()) >= 0
      }
    >
      {Object.keys(zones).map(key =>
        <Select.Option key={key} value={key}>
          {zones[key]}
        </Select.Option>)}
    </Select>
  </div>
);

ZoneComponent.defaultProps = {
  zones: {},
  loading: false,
  disabled: false
};

ZoneComponent.propTypes = {
  zones: PropTypes.objectOf(PropTypes.any),
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool
};


const mapStateToProps = state => ({
  zones: state.zones.zones,
  selected: state.selectedZone,
  loading: state.zones.loading,
  disabled: state.chartData.loading
});

const mapDispatchToProps = dispatch => ({
  onChange: (e) => {
    dispatch(selectZone(e));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(ZoneComponent);
