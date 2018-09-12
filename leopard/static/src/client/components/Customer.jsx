import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { selectCustomer, selectPlace, selectFloor, loadFloorsSuccess } from '../actions/index';
import { loadPlacesFromServer } from '../reducers/places';

const CustomerComponent = ({
  customers, onChange, selected, loading, disabled
}) => (
  <div>
    <span>Customer&nbsp;&nbsp;</span>
    <Select
      disabled={loading || disabled}
      showSearch
      defaultActiveFirstOption
      value={loading ? 'Loading...' : selected}
      style={{ width: 180 }}
      placeholder="Select a customer"
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) =>
      option.props.children
        .toLowerCase()
        .indexOf(input.toLowerCase()) >= 0
      }
    >
      {Object.keys(customers).map(key =>
        <Select.Option key={key} value={key}>
          {customers[key]}
        </Select.Option>)}
    </Select>
  </div>
);

CustomerComponent.defaultProps = {
  customers: {},
  loading: false,
  disabled: false
};

CustomerComponent.propTypes = {
  customers: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool
};

const mapStateToProps = state => ({
  customers: state.customers.customers,
  selected: state.selectedCustomer,
  loading: state.customers.loading,
  disabled: state.chartData.loading
});

const mapDispatchToProps = dispatch => ({
  onChange: (e) => {
    dispatch(selectCustomer(e));
    dispatch(loadPlacesFromServer());
    dispatch(loadFloorsSuccess([]));
    dispatch(selectPlace(''));
    dispatch(selectFloor(''));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerComponent);
