import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { loadFloorImageFromServer } from '../reducers/floorImage';
import { selectFloor } from '../actions/index';

const FloorComponent = ({
  floors, onChange, selected, loading, disabled
}) => (
  <div>
    <span>Floor&nbsp;&nbsp;</span>
    <Select
      disabled={loading || disabled}
      style={{ width: 180 }}
      placeholder="Select a floor"
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
      {Object.keys(floors).map(key =>
        <Select.Option key={key} value={key}>
          {floors[key]}
        </Select.Option>)}
    </Select>
  </div>
);

FloorComponent.propTypes = {
  floors: PropTypes.objectOf(PropTypes.any),
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool
};

FloorComponent.defaultProps = {
  floors: {},
  loading: false,
  disabled: false
};

const mapStateToProps = state => ({
  floors: state.floors.floors,
  selected: state.selectedFloor,
  loading: state.floors.loading,
  disabled: state.chartData.loading || state.floorImage.loading
});

const mapDispatchToProps = dispatch => ({
  onChange: (e) => {
    dispatch(selectFloor(e));
    dispatch(loadFloorImageFromServer());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FloorComponent);

