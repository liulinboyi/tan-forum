import React,{Component} from 'react';
import {
    Icon,Avatar,List,Divider,Comment,Tooltip, Modal, Button ,Input,Form
} from "antd";

const { TextArea } = Input;
const moment = require('moment');


const IconText = ({ type, text }) => (
    <span >
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);


class PersonalPosts extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            title:'',
            content:'',
            fresh:1
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    //发帖子
    handleOk = (e) => {
        setTimeout(()=>{
            this.setState({ loading: false, visible: false });
        },1);
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //values.username = this.props.user.username;
                values.username = this.props.username;
                const data = this.props.posts;
                values.postid = data[0]._id;
                console.log(values);
                this.props.addComments(values);
                //this.props.getCommentsById(values.postid);
                //this.props.getPostsById(values.postid);
                //this.props.changeOnce();
                this.props.replace(values.postid);


                //console.log(this.props.addComments);
                //console.log('Received values of form: ', values);
            }
        });

    };

    handleCancel = () => {
        this.setState({ visible: false });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        var { visible, loading } = this.state;
        const data = this.props.posts;
        const comments = this.props.comments;
        //console.log(comments);
        if(comments){
            var len = comments.length;
            //console.log(len);
            var listData = [];
            for (let i = 0; i < len; i++) {
                listData.push({
                    href: comments[i]._id,   //原文链接
                    username: comments[i].username,   //用户名
                    avatar: comments[i].username,   //头像
                    title:comments[i].title,
                    content: comments[i].content,
                    time:comments[i].time,
                });
            }
        }

        if(data) {
                return (
                <div>
                    <List itemLayout="vertical" size="large">
                        <List.Item key={data[0].username}
                                   actions={[<Button size='small' onClick={this.showModal}>回复</Button>,
                                       <IconText type="star-o" text="0" />,
                                       <IconText type="like-o" text="0" />,
                                       <IconText type="message" text="0" >
                                       </IconText>,
                                       <Tooltip title={moment(data[0].time).format('YYYY-MM-DD HH:mm:ss')}>
                                           <span>{moment(data[0].time).fromNow()}</span>
                                       </Tooltip>
                                      ]}>
                            <List.Item.Meta
                                avatar={<Avatar style={{backgroundColor: "black"}}>{data[0].username}</Avatar>}
                                title={data[0].username}

                                description={data[0].title}>

                            </List.Item.Meta>
                            <div>
                                <Form onSubmit={this.handleOk}>
                                    <Modal
                                        visible={visible}
                                        onCancel={this.handleCancel}
                                        title="请输入您要发表的内容"
                                        footer={[
                                            <Button key="back" onClick={this.handleCancel}>取消</Button>,
                                            <Button key="submit" type="primary" loading={loading}  htmlType="submit" onClick={this.handleOk}>
                                                发表
                                            </Button>,
                                        ]}
                                    >{getFieldDecorator('content', {
                                        rules: [{ required: true, message: '输入您内容' }],
                                    })(
                                        <TextArea
                                            placeholder="你真的好棒！"
                                            rows={4}/>
                                    )}
                                    </Modal>
                                </Form>
                            </div>
                            {data[0].content}
                        </List.Item>
                    </List>
                    <Divider />
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                if(page ===(len*3)){
                                };
                            },
                            pageSize: 3,
                        }}
                        dataSource={listData}

                        renderItem={item => (
                            <Comment
                                author={<span>{item.username}</span>}
                                avatar={(
                                    <Avatar href='#' style={{backgroundColor:"black"}}>{item.username}</Avatar>
                                )}
                                content={(
                                    <p>{item.content}</p>
                                )}
                                datetime={(
                                    <Tooltip title={moment(item.time).format('YYYY-MM-DD HH:mm:ss')}>
                                        <span>{moment(item.time).fromNow()}</span>
                                    </Tooltip>
                                )}>
                                <Divider />

                            </Comment>
                        )}
                    />,
                </div>
            );
        }else{
            return null;
        }
    }

}
const PersonalPost = Form.create({ name: 'coordinated' })(PersonalPosts);
export default  PersonalPost;