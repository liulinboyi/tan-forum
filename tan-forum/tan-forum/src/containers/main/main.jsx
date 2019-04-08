import React,{Component} from 'react';

import ChangePsw from '../../components/changepsw';
import Posts from  '../../components/posts';
import PersonalPost from '../../components/personnalpost';
import Cookies from 'js-cookie';
import  './main.css';
import {Redirect,Switch,Route} from "react-router-dom";
import {
    getUser,getPosts,addPosts,getPostsById,getCommentsById,addComments,getPostsByUsername,deletePostById,updateUser,
} from "../../redux/actions";
import {connect} from "react-redux";

import {
    Layout, Menu, Breadcrumb, Icon, Modal, Button, Input, Form, Avatar,notification
} from 'antd';
const { TextArea } = Input;
const { SubMenu } = Menu;
const {
    Header, Content, Footer, Sider,
} = Layout;



class Mains extends Component{
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
    changeOnce =()=>{
        this.setState({title:'1111'}
        )
    };

    //发帖子
    handleOk = (e) => {

        const pathPost = this.props.location.pathname;
        const comparepath = pathPost.slice(0,14);

        if(comparepath==='/getpostsbyId/'){
            //console.log('s');
            this.props.history.replace('/posts/1');

        }
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.username = this.props.user.username;
                this.props.addPosts(values);
                this.props.getPosts(1);
                    this.setState({ loading: false, visible: false });
                //console.log('Received values of form: ', values);
            }
        });

    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
            this.setState({
                visible: true,
            });
        };
        callback();
    };

    pageNavigate (path) {
        setTimeout(() => {
            this.props.history.push(path)
        }, 0)
    }

    handleCancel = () => {
        this.setState({ visible: false });
    };
    //替换路径实现回复功能
    replace = (href)=>{
        this.props.history.replace('/getpostsbyId/'+href);
        const userid = Cookies.get('user_id');
        this.props.getUser(userid);
        //this.props.history.go('/getpostsbyId/'+href);
        //this.props.getPostsById(href);
    };
    tologin=()=>{
        this.props.history.replace('/login');
    }



    componentDidMount() {

        //挂载完后用户有cookie 但是页面无用户信息则获取
        const userid = Cookies.get('user_id');
        //console.log(userid);
        const {_id} = this.props.user;
        //console.log(_id);
        if(userid && !_id){
            this.props.getUser(userid);
        }
        const pathPost = this.props.location.pathname;     //文章id
        const comparepath = pathPost.slice(0,14);
        const {user} = this.props;
        if(!user.username){
            this.props.getUser(userid);
        }

        if(comparepath ==='/getpostsbyId/'){
            console.log('s');
            const postId = pathPost.slice(14);
            this.props.getPostsById(postId);
            this.props.getCommentsById(postId);
        }else if(pathPost==='/getpostbyusername'){
            if(!user.username){

                this.props.getUser(userid);
                this.props.getPostsByUsername(this.props.username);
            }else{
                this.props.getPostsByUsername(this.props.username);
            }


        }else{
            const post_id = this.props.posts.postDoc;
            if(!post_id) {
                //console.log('i');
                this.props.getPosts(1);
            }
        }



   }


    render(){
        //console.log(this.props);
        const { getFieldDecorator } = this.props.form;
        // 如果用户没有cookie则未登录，跳转登录页面
        const userid = Cookies.get('user_id');
        if(!userid){
            notification.open({
                message: '您现在是未登录状态！',
                description: '您现在是未登录状态，请您再重新登录！',
                icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
            });
            return <Redirect to='/login'/>
        }
        const {user} = this.props;


        var { visible, loading } = this.state;
        // 页面跳转
        if(this.props.location.pathname==='/') {
            this.props.history.replace('/posts/1');
            this.props.getPosts(1);
        }
        const posts = this.props.posts.postDoc;
        const pathPost = this.props.location.pathname;
        const comparepath = pathPost.slice(0,14)

        if(comparepath==='/getpostsbyId/'){
            var comments = this.props.comments.commentDoc;
        }
        return(
            <div>
                <Layout>
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
                    <Content style={{ padding: '0 50px',height:"620px" }}>
                        <Breadcrumb style={{ margin: '16px 0' ,paddingLeft:'16px'}}>
                            <Breadcrumb.Item>
                                <Avatar style={{backgroundColor:"black",marginRight:'10px'}}>{user.username}</Avatar>
                                {user.username}，欢迎您使用TAN-FORUM</Breadcrumb.Item>
                        </Breadcrumb>
                        <Layout style={{ padding: '24px 0', background: '#fff',height:"550px" }}>
                            <Sider width={200} style={{ background: '#fff' }}>
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    style={{ height: '100%' }}
                                >
                                    <Menu.Item  onClick={()=>this.props.history.replace('/')} key="1">
                                        <span><Icon type="appstore" />论坛首页</span>
                                    </Menu.Item>
                                    <Menu.Item  onClick={this.showModal} key="2">
                                        <span><Icon type="schedule" />我要发帖</span>
                                    </Menu.Item>
                                    <SubMenu key="sub1" title={<span><Icon type="user" />个人中心</span>}>
                                        <Menu.Item onClick={()=>this.props.history.replace('/changepsw')} key="3">修改密码</Menu.Item>
                                        <Menu.Item onClick={()=>{
                                            Cookies.remove('user_id');
                                            this.props.history.replace('./login')
                                        }} key="4">
                                               退出登录
                                        </Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" title={<span><Icon type="laptop" />帖子管理</span>}>
                                        <Menu.Item onClick={()=>{
                                            this.props.history.replace('/getpostbyusername');
                                            this.props.getPostsByUsername(user.username);
                                        }} key="5">我要删帖子</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub3" title={<span><Icon type="delete" />回收站</span>}>
                                        <Menu.Item key="6" onClick={()=>{
                                            notification.open({
                                                message: '待优化！',
                                                description: '回收站功能待优化敬请期待！',
                                                icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
                                            });
                                        }}>已删除帖子</Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            <Content style={{ padding: '0 24px', minHeight: 280 }}>

                                <Switch>

                                    <Route path='/posts'>
                                        <Posts  posts={posts} replace={this.replace} path={pathPost}/>
                                    </Route>
                                    <Route path='/getpostbyusername'  >
                                        <Posts posts={posts}
                                               path={pathPost}
                                               deletePostById={this.props.deletePostById}
                                               getPostsByUsername={this.props.getPostsByUsername}
                                        />
                                    </Route>
                                    <Route path='/getpostsbyId/:id'>
                                        <PersonalPost posts={posts}
                                                      comments={comments}
                                                      username={user.username}
                                                      addComments={this.props.addComments}
                                                      getCommentsById={this.props.getCommentsById}
                                                      getPostsById={this.props.getPostsById}
                                                      replace={this.replace}
                                                      changeOnce={this.changeOnce}
                                        />
                                    </Route>
                                    <Route path='/ChangePsw'>
                                        <ChangePsw tologin={this.tologin} updateUser={this.props.updateUser}/>
                                    </Route>

                                </Switch>


                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: 'center'}}>
                        tan-forum Design ©2019 Created by Tan Runpeng
                        <div>
                            <Form onSubmit={this.handleOk}>
                            <Modal
                                visible={visible}
                                onCancel={this.handleCancel}
                                title="请输入您要发表的内容"
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>取消</Button>,
                                    <Button key="submit" type="primary" loading={loading}  htmlType="submit" onClick={this.handleOk} >
                                        发表
                                    </Button>,
                                ]}
                            >
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: '输入您的标题',whitespace: true },],
                                })(
                                    <input style={{width:'100%'}}

                                           placeholder="输入您的标题"
                                           prefix={<Icon type="tags" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    />
                                )}
                                {getFieldDecorator('content', {
                                    rules: [{ required: true, message: '输入您内容' }, {validator: this.validateToNextPassword}],
                                })(
                                    <TextArea
                                        placeholder="今天真开心！"
                                        style={{marginTop:'20px'}} rows={4}/>
                                )}


                            </Modal>
                            </Form>
                        </div>
                    </Footer>
                </Layout>

            </div>

        );
    }

}
const Main = Form.create({ name: 'coordinated' })(Mains);
export default connect(
    state =>({
        user:state.user,posts:state.posts,comments:state.comments
    }),
    {
        getUser,getPosts,addPosts,getPostsById,addComments,getCommentsById,getPostsByUsername,deletePostById,updateUser
    }
)(Main)