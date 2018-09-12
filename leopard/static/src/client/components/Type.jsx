import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { selectType } from '../actions/index';

const TypeComponent = ({ types, onChange, selected }) => (
  <div>
    <span>Type&nbsp;&nbsp;</span>
    <Select
      placeholder="Select a type"
      onChange={onChange}
      defaultValue={selected}
      optionFilterProp="children"
      filterOption={(input, option) =>
      option.props.children
        .toLowerCase()
        .indexOf(input.toLowerCase()) >= 0
      }
    >
      {types.map(e => (
        <Select.Option value={e.id} key={e.id}>
          {e.name}
        </Select.Option>
                ))}
    </Select>
  </div>
);

TypeComponent.propTypes = {
  types: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }))
    .isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  types: state.types,
  selected: state.selectedType || state.types[0].id
});

const mapDispatchToProps = dispatch => ({
  onChange: (e) => {
    dispatch(selectType(e));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(TypeComponent);
