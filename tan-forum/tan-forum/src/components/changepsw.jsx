import React,{Component} from 'react';
import {Redirect} from "react-router-dom";
import Cookies from 'js-cookie';
import {
    Layout,  Card , Form, Input, Icon,Button,message
} from 'antd';

message.config({
    top: 100,
    maxCount:1,
});

class ChangePsw extends Component {
    state = {
        confirmDirty: false,
        password1:'',
        password2:'',
    };
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password1')) {
            callback('两次输入的密码不相同！');
        } else {
            callback();
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const hide = message.loading('修改成功，请稍等', 0);
                // Dismiss manually and asynchronously
                setTimeout(hide, 2000);
                this.props.updateUser({password:values.password1});
                setTimeout(()=>{
                    Cookies.remove('user_id');
                    this.props.tologin();
                },1000);


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
        const { getFieldDecorator } = this.props.form;

        return (
            <Layout className="layout">

                <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:'500px'}}>
                    <Card
                        style={{ width: 400}}
                        title="修改密码"
                        extra={<a href="#/register">忘记密码</a>}>
                        <Form  onSubmit={this.handleSubmit}>
                            <Form.Item>
                                {getFieldDecorator('password1', {rules: [{ required: true, message: '请输入您的新密码！', whitespace: true },
                                        {validator: this.validateToNextPassword,
                                        }],
                                })(
                                    <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入您的新密码" type="password"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password2', {rules: [{required: true, message: '请再次确认您的新密码！',},
                                        {
                                            validator: this.compareToFirstPassword,
                                        }],})(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                     placeholder="请再次确认您的新密码" type="password" />)}
                            </Form.Item>

                            <Form.Item >
                                <Button  type="primary" block htmlType="submit">修改</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </Layout>
        );
    }
}
const WrappedRegistrationForm = Form.create({ name: 'login' })(ChangePsw);

export default WrappedRegistrationForm