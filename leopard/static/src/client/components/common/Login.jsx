import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Icon, Input, Spin } from 'antd';
import { login } from '../../reducers/auth';
import Logo from './Logo';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.onSubmit(values);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.loading = nextProps.loading;
    this.error = nextProps.error;
    this.onSubmit = nextProps.onSubmit;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return this.loading ?
      (<div className="login"><Spin className="loading" /></div>)
      :
      (<div className="login">
        <Logo />
        <h3>Dragon Data Visualizer</h3>
        <br />
        <span style={{ color: 'red' }}>{this.error}</span>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }]
              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }]
              })(<Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
            </Button>
          </FormItem>
        </Form>
      </div>
      );
  }
}

const Login = Form.create()(NormalLoginForm);


Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    dispatch(login(values));
  }
});

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
