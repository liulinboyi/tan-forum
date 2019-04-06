import React,{Component} from 'react';
import {connect} from "react-redux";
import {login} from '../../redux/actions';
import {Redirect} from "react-router-dom";
import {
    Menu, Layout,  Card , Form, Input, Icon,Button,message,Alert
} from 'antd';
import Cookies from "js-cookie";
const { Header,Footer } = Layout;

//提示信息
message.config({
    top: 100,
    maxCount:1,
});

class Login extends Component {
    state = {
        confirmDirty: false,
        username:'',
        password:'',
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.login({username:values.username,password:values.password});
            }
        });
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    componentWillUnmount() {
        message.destroy();
    }

    render() {
        const {msg,redirectTo} = this.props.user;
        const userid = Cookies.get('user_id');
        if(redirectTo && userid){
            return (<div>
                <Redirect to={redirectTo} />
            </div>);
        }
        const { getFieldDecorator } = this.props.form;


        return (
            <Layout className="layout">
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px',textAlign:"center" ,fontSize:"32px"}}>

                        <Menu.Item  key="tan-forum">{"TAN-FORUM"}</Menu.Item>
                    </Menu>
                </Header>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:'600px'}}>
                    <Card
                        style={{ width: 400}}
                        title="登录"
                        extra={
                            <div><a href="#/register">注册</a> or <a href='#/findpsw'>忘记密码</a></div>
                        }>
                        <Form  onSubmit={this.handleSubmit}>
                            {msg ? (<div><Alert type="warning" showIcon message={msg} /></div>):null}
                            <Form.Item>
                                {getFieldDecorator('username', {rules: [{ required: true, message: '请输入您的用户名！', whitespace: true }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名/邮箱   " />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {rules: [{required: true, message: '请输入您的密码！',},
                                        {validator: this.validateToNextPassword,
                                        }],})(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                     placeholder="密码" type="password" />)}

                            </Form.Item>

                            <Form.Item >
                                <Button  type="primary" block htmlType="submit">登录</Button>
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
const WrappedRegistrationForm = Form.create({ name: 'login' })(Login);

export default connect(
    state =>({user:state.user}),
    {login}
)(WrappedRegistrationForm);