/*
包含ngeaction creator
异步action
同步action
 */

//注册异步
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    POSTS_SUCCESS,
    DLEPOSTS_SUCCESS,
    COMMENT_SUCCESS,
    VALIDATE_SUCCESS,
    EMAIL_SUCCESS,
    ADDPOSTS_SUCCESS,
    ADDCOMMENT_SUCCESS
}from './action-types'
import {
    reqRegister, reqLogin, reqUpdateUser, reqUser,reqValidate,reqEmail,
    reqPosts,reqAddPosts,reqPostsById,reqPostsByUsername,reqDeleteByid,
    reqAddComment,reqCommentById

} from "../api";

//授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS,data:user});
//接受用户的同步action
const receiveUser = (user) =>({type:RECEIVE_USER,data:user});

const validateSuccess = (user) => ({type:VALIDATE_SUCCESS,data:user});

const emailSuccess = (user) => ({type:EMAIL_SUCCESS,data:user});

const errorMsg = (msg) => ({type: ERROR_MSG,data:msg});

const postsSuccess = (posts) => ({type:POSTS_SUCCESS,data:posts});
const AddPostsSuccess = (posts) => ({type:ADDPOSTS_SUCCESS,data:posts});

export const dleposts_sucess = (posts) => ({type:DLEPOSTS_SUCCESS,data:posts});

const CommentsSuccess = (comments) => ({type:COMMENT_SUCCESS,data:comments});

const AddCommentsSuccess = (comments) => ({type:ADDCOMMENT_SUCCESS,data:comments});



//发送邮箱验证码成功
export const emailSend = (user) =>{
    return async dispatch =>{
        const response = await reqEmail(user);
        const result = response.data;
        //console.log(result);
        if(result.code ===0){
            dispatch(emailSuccess(result.data));
        }else{
            dispatch(errorMsg(result.msg));
        }
    }
};
//验证码验证成功
export const validateCode = (user) =>{
    return async dispatch =>{
        const response = await reqValidate(user);
        const result = response.data;
        //console.log(result);
        if(result.code ===0){
            dispatch(validateSuccess(result.data));
        }else{
            dispatch(errorMsg(result.msg));
        }
    }
};


//重置用户的同步action
export const resetUser = (msg) =>({type:RESET_USER,data:msg});

//注册
export const register = (user)=>{
    const {username ,password,email} =user;
    //表单前台验证
    /*console.log(phone.length);*/
    return async dispatch =>{
        //发送注册的异步请求
        const response =  await reqRegister({username ,password,email});
        const result = response.data;
        if(result.code ===0){
            //分发成功的action
            dispatch(authSuccess(result.data));
        }else {
            //分发错误提示信息的同步action
            dispatch(errorMsg(result.msg));
        }
    };
};

//登录
export const login = (user)=>{
    return async dispatch =>{
        //发送登录的异步请求
        const response =  await reqLogin(user);
        const result = response.data;
        if(result.code ===0){
            //分发成功的action
            //console.log(result);
            dispatch(authSuccess(result.data));
        }else {
            //分发错误提示信息的同步action
            dispatch(errorMsg(result.msg));
        }
    };
};

// 更新用户异步action
export const updateUser = (user) => {
    return async dispatch => {
        const respose =await reqUpdateUser(user);
        const result =respose.data;
        if(result.code ===0){
            dispatch(receiveUser(result.data));
        }else {
            dispatch(resetUser(result.msg));
        }
    }
};

// 获取用户异步action
export const getUser = (userid) =>{
    return async dispatch =>{
        const response = await  reqUser(userid);
        const result = response.data;
        if(result.code ===0){
            dispatch(receiveUser(result.data));
        }else{
            dispatch(errorMsg(result.msg));
        }
    }
};

//获取posts
export const getPosts = (page) =>{
    return async dispatch =>{
        const response = await reqPosts(page);
        const result = response.data;
        //console.log(result);
        if(result.code ===0){
            dispatch(postsSuccess(result.data));
        }else{
            dispatch(errorMsg(result.msg));
        }
    }
};

//获取postsbyid
export const getPostsById = (id) =>{
    return async dispatch =>{
        const response = await reqPostsById(id);
        const result = response.data;
        //console.log(result);
        if(result.code ===0){
            dispatch(postsSuccess(result.data));
        }else{
            dispatch(errorMsg(result.msg));
        }
    }
};
//发帖子
export const addPosts = (post) =>{
    return async dispatch =>{
        const response = await  reqAddPosts(post);
        const result = response.data;
        //console.log(result);
        if(result.code ===0){
            dispatch(AddPostsSuccess(result.data));
        }else{
            dispatch(errorMsg(result.msg));
        }
    }
};
//发评论
export const addComments = (comment) =>{
    return async dispatch =>{
        const response = await  reqAddComment(comment);
        const result = response.data;
        //console.log(result);
        if(result.code ===0){
            dispatch(AddCommentsSuccess(result.data));
        }else{
            dispatch(errorMsg(result.msg));
        }
    }
};
//获取评论通过文章id
export const getCommentsById = (comments) =>{
    return async dispatch =>{
        const response = await  reqCommentById(comments);
        const result = response.data;
        //console.log(result);
        if(result.code ===0){
            dispatch(CommentsSuccess(result.data));
        }else{
            dispatch(errorMsg(result.msg));
    }
    }
};

//删除自己的帖子byid
export const deletePostById = (id) =>{
    return async dispatch =>{
        await reqDeleteByid(id);
    }
};

//获取用户自己的帖子
export const getPostsByUsername = (username) =>{
    return async dispatch =>{
        const response = await reqPostsByUsername(username);
        const result = response.data;
        //console.log(result);
        if(result.code ===0){
            dispatch(postsSuccess(result.data));
        }else{
            dispatch(errorMsg(result.msg));
        }
    }
};


