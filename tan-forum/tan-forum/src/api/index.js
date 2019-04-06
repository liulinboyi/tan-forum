/*
包含了n个请求接口的函数
返回值为promise
 */

import ajax from './ajax'


//注册接口
export const reqRegister = (user) =>ajax('/register',user,'POST');
//登录接口
export  const reqLogin = ({username,password}) => ajax('/login',{username,password},'POST');
//更新用户接口
export const reqUpdateUser = (user) =>ajax('/resetuser',user,'POST');
//获取用户信息接口
export const reqUser = (userid) => ajax('/user',userid);
//验证验证码
export const reqValidate = (user) =>ajax('/findpsw',user,'POST');
//发送邮箱验证码
export const reqEmail = (user) =>ajax('/sendemail',user,'POST');


//-------
//获取帖子信息接口
export const reqPosts = (page) => ajax('/posts',page);
//获取帖子通过帖子id
export const reqPostsById = (id) => ajax('/getpostsbyId',id);
//发布帖子
export const reqAddPosts = (post) => ajax('/addposts',post,'POST');
//获取用户自己的帖子
export const reqPostsByUsername = (username) => ajax('/getpostbyusername',username);
//删除自己的帖子byid
export const reqDeleteByid = (id) => ajax('/deletepost',id,'POST');


//--------
//获取评论通过文章id
export const reqCommentById = (id) => ajax('/getcommentbyid',id);
//发表评论
export const reqAddComment = (comment) => ajax('/addcomment',comment,'POST');
