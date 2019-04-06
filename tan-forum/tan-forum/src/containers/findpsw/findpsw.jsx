import React,{Component} from 'react';
import {connect} from "react-redux";
import {emailSend,validateCode} from '../../redux/actions';
import Cookies from "js-cookie";
import {Redirect} from "react-router-dom";
import {
    Menu, Layout,  Card , Form, Input, Icon,Button, AutoComplete,Alert
} from 'antd';
const { Header,Footer } = Layout;

const AutoCompleteOption = AutoComplete.Option;

class FindPsw extends Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        email:'',
        password:'',
        codePerson:'',
        visible:false,
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {
                console.log(this.props.user.msg);
                if(!this.state.visible){
                        this.props.emailSend(values);
                    this.setState({
                        visible:true

                    })
                }
                if(this.state.visible &&this.props.user.msg!=='邮箱未注册！'){
                    this.props.validateCode(values);
                }

            }
        });
    };


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
    };

    render() {
        const {msg} = this.props.user;
        if((msg==='邮箱未注册！')&& this.state.visible){
            this.setState({
                visible:false

            })
        }
        const userid = Cookies.get('user_id');
        if(userid){
            return (<div>
                <Redirect to={'/changepsw'} />
            </div>);
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
                        title="发送验证码！"
                        extra={<div>
                            <a href="#/login">登录</a> or <a href='#/register'>注册</a>
                        </div>
                        }>
                        <Form  onSubmit={this.handleSubmit}>
                            {msg ? (<div><Alert  showIcon message={msg}type="warning" /></div>):null}
                            <Form.Item>
                                {getFieldDecorator('email', {rules: [{
                                        type: 'email', message: '请输入您注册时使用的邮箱！',
                                    }, {
                                        required: true, message: '请输入您注册时使用的邮箱！',}],
                                })(<AutoComplete
                                        dataSource={websiteOptions}
                                        onChange={this.handleWebsiteChange}>
                                        <Input placeholder="请输入您注册时使用的邮箱！" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                    </AutoComplete>
                                )}
                            </Form.Item>
                            {this.state.visible?<Form.Item>

                                {getFieldDecorator('codePerson', {rules: [{
                                    message: '请输入您邮箱里的验证码！',
                                    }, {
                                        required: true, message: '请输入您邮箱里的验证码！',}],
                                })(<AutoComplete>
                                        <Input placeholder="请输入您邮箱里的验证码！" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                    </AutoComplete>
                                )}
                            </Form.Item>:null}

                            <Form.Item >
                                <Button  type="primary"   block htmlType="submit">确认发送</Button>
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
const WrappedRegistrationForm = Form.create({ name: 'findpsw' })(FindPsw);

export default connect(
    state =>({user:state.user}),
    {emailSend,validateCode}
)(WrappedRegistrationForm);