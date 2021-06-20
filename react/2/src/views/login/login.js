import React from 'react';
import './login.css'

import { Card, Form, Icon, Input, Button, Checkbox } from 'antd';
import { Redirect } from "react-router-dom";
import { store } from '../../store/store'

class NormalLoginForm extends React.Component {
    state = { redirectToMain: false }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                store.dispatch({
                    type: 'setUser',
                    filter: values
                })
                setTimeout(() => {
                    this.setState({ redirectToMain: true });
                }, 1000)
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        if (this.state.redirectToMain) return <Redirect to="/main" />;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入用户名"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请输入密码"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>自动登录</Checkbox>)}
                    <a className="login-form-forgot" href="/">忘记密码?</a>
                    <Button type="primary" htmlType="submit" className="login-button">登录</Button>
                    没有账号?<a href="/">现在注册!</a>
                </Form.Item>
            </Form>
        );
    }
}
const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

class Login extends React.Component {
    render() {
        return (
            <div className="login">
                <div className="login-container">
                    <Card title="XX后台管理系统" style={{ width: 300, borderRadius: 5 }}>
                        <LoginForm />
                    </Card>
                </div>
            </div>
        )
    }
}


export default Login;