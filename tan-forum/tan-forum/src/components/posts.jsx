import React,{Component} from 'react';
import {
    Icon, Avatar, List,  Tooltip,message,Button
} from "antd";
const moment = require('moment');




const IconText = ({ type, text }) => (
    <span >
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);


export default  class Posts extends Component{

    componentDidMount() {


        //this.props.getPostById()

    }

    render(){
        const data = this.props.posts;
        if(data){
            var len = data.length;
            //console.log(len);
            var listData = [];
            for (let i = 0; i < len; i++) {
                listData.push({
                    href: data[i]._id,   //原文链接
                    username: data[i].username,   //用户名
                    avatar: data[i].username,   //头像
                    title:data[i].title,
                    content: data[i].content,
                    time:data[i].time,
                    isDeleted:data[i].isDeleted,
                });
            }
        }

        return(
            <div>
                {this.props.path==='/getpostbyusername'?<List
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

                        <List.Item
                            key={item.username}
                            actions={[
                                    <Button size='small' onClick={()=>{
                                        this.props.deletePostById({'postid':item.href});
                                        message.success('删除成功', 3);
                                        this.props.getPostsByUsername(item.username);
                                    }


                                    }
                                        >删除
                                        </Button>,
                                <IconText type="star-o" text="0" />,
                                <IconText type="like-o" text="0" />,
                                <IconText type="message" text="0" >
                                </IconText>,
                                <Tooltip title={moment(item.time).format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment(item.time).fromNow()}</span>
                                </Tooltip>]}
                            //extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                        >
                            <List.Item.Meta
                                avatar={<Avatar style={{backgroundColor:"black"}}>{item.avatar}</Avatar>}
                                title={item.username}
                                description={item.title}/>
                            {item.content}
                        </List.Item>
                    )}>

                </List>:
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
                        <List.Item
                            key={item.username}
                            actions={[
                                <Button  size='small' onClick={()=>{this.props.replace(item.href)}}>回复</Button>,
                                <IconText type="star-o" text="0" />,
                                <IconText type="like-o" text="0" />,
                                <IconText type="message" text="0" >
                                </IconText>,
                                <Tooltip title={moment(item.time).format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment(item.time).fromNow()}</span>
                                </Tooltip>]}
                            //extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                        >
                            <List.Item.Meta
                                avatar={<Avatar style={{backgroundColor:"black"}}>{item.avatar}</Avatar>}
                                title={item.username}
                                description={item.title}/>
                            {item.content}
                        </List.Item>
                    )}
                />}


            </div>
        );
    }

}
