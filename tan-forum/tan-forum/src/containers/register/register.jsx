import React,{Component} from 'react';
import {connect} from "react-redux";
import {register} from '../../redux/actions';
import {Redirect} from "react-router-dom";
import {
    Menu, Layout,  Card , Form, Input, Icon,Button, AutoComplete,Alert
} from 'antd';
const { Header,Footer } = Layout;

const AutoCompleteOption = AutoComplete.Option;

class Register extends Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        username:'',
        email:'',
        password:'',
        password2:''
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.register({username:values.username,email:values.email,password:values.password});

            }
        });
    }


    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不相同！');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['@qq.com', '@163.com', '@gmail.com','@yahoo.com'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    render() {
        const {msg,redirectTo} = this.props.user;
        if(redirectTo){
            return <Redirect  to={redirectTo}/>
        }
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        return (
            <Layout className="layout">
                <Header>

                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px',textAlign:"center" ,fontSize:"32px"}}
                    >
                        <Menu.Item  key="tan-forum">{"TAN-FORUM"}</Menu.Item>

                    </Menu>
                </Header>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:'600px'}}>
                <Card
                    style={{ width: 400}}
                    title="注册"
                    extra={<div>
                        <a href="#/login">登录</a> or <a href='#/findpsw'>忘记密码</a>
                    </div>
                        }>
                    <Form  onSubmit={this.handleSubmit}>
                        {msg ? (<div><Alert type="warning" showIcon message={msg} /></div>):null}
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入您的用户名！', whitespace: true }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                            )}
                        </Form.Item>
                        <Form.Item>

                            {getFieldDecorator('email', {rules: [{
                                    type: 'email', message: '请确保邮箱可正常使用！',
                                }, {
                                    required: true, message: '请确保邮箱可正常使用！',}],
                            })(<AutoComplete
                                    dataSource={websiteOptions}
                                    onChange={this.handleWebsiteChange}>
                                    <Input placeholder="邮箱" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                </AutoComplete>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {rules: [{
                                    required: true, message: '请输入您的密码！',
                                }, {
                                    validator: this.validateToNextPassword,
                                }],})(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="密码" type="password" />)}

                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password2', {rules: [{
                                    required: true, message: '请确认您的密码！',
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input.Password  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  type="password" placeholder="密码确认" onBlur={this.handleConfirmBlur} />
                            )}
                        </Form.Item>
                        <Form.Item >
                            <Button  type="primary"  block htmlType="submit">注册</Button>
                        </Form.Item>
                    </Form>

                </Card>
            </div>
                <Footer style={{ textAlign: 'center',backgroundColor:'white'}}>
                    tan-forum Design ©2019 Created by Tan Runpeng
                </Footer>
            </Layout>
        );
    }
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);

export default connect(
    state =>({user:state.user}),
    {register}
)(WrappedRegistrationForm);