import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { selectPlace, selectFloor } from '../actions/index';
import { loadFloorsFromServer } from '../reducers/floors';

const PlaceComponent = ({
  places, onChange, selected, loading, disabled
}) => (
  <div>
    <span>Place&nbsp;&nbsp;</span>
    <Select
      disabled={loading || disabled}
      showSearch
      defaultActiveFirstOption
      value={loading ? 'Loading...' : selected}
      style={{ width: 180 }}
      placeholder="Select a place"
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) =>
      option.props.children
        .toLowerCase()
        .indexOf(input.toLowerCase()) >= 0
      }
    >
      {Object.keys(places).map(key =>
        <Select.Option key={key} value={key}>
          {places[key]}
        </Select.Option>)}
    </Select>
  </div>
);

PlaceComponent.defaultProps = {
  places: {},
  loading: false,
  disabled: false
};

PlaceComponent.propTypes = {
  places: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool
};

const mapStateToProps = state => ({
  places: state.places.places,
  selected: state.selectedPlace,
  loading: state.places.loading,
  disabled: state.chartData.loading
});

const mapDispatchToProps = dispatch => ({
  onChange: (e) => {
    dispatch(selectPlace(e));
    dispatch(loadFloorsFromServer());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceComponent);
