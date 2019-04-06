/*
包含n个reducer函数：根据最老的state和指定的action返回一个新的state
 */


import {combineReducers} from 'redux';
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    POSTS_SUCCESS,
    DLEPOSTS_SUCCESS,
    COMMENT_SUCCESS,
    EMAIL_SUCCESS,
    VALIDATE_SUCCESS,
    ADDPOSTS_SUCCESS,
    ADDCOMMENT_SUCCESS
} from './action-types'

import {getRedirectTo} from "../utils";
//产生user状态的reducer
const initUser = {
    username:'',
    email:'',
    msg:'',//错误提示信息
    redirectTo:''//需要自动重定向的路由路径
};
const initPost = {
    username:'',
    title:'',
    content:'',
    time:'',
    msg:'',
    isDeleted:false,
    _id:''
};
const initComment = {
    username:'',
    title:'',
    content:'',
    time:'',
    _id:''
};

function user(state = initUser,action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const {username} = action.data;
            //console.log(action.data);
            return {...action.data,redirectTo:getRedirectTo(username)};
        case ERROR_MSG:
            return {...state,msg: action.data};
        case RECEIVE_USER:
            return {...action.data};
        case RESET_USER:
            return {...initUser,msg: action.data};
        case VALIDATE_SUCCESS:
            return {...action.data};
        case EMAIL_SUCCESS:
            return {...action.data};
        default:
            return state;
    }
}

function posts(state = initPost,action) {
    switch (action.type) {
        case POSTS_SUCCESS:
            return {...action.data};
        case ADDPOSTS_SUCCESS:
            return {...action.data};
        case DLEPOSTS_SUCCESS:
            return {...action.data};
        case ERROR_MSG:
            return {...state,msg: action.data};
        default:
            return state;
    }

}
function comments(state = initComment,action) {
    switch (action.type) {
        case COMMENT_SUCCESS:
            return {...action.data};
        case ADDCOMMENT_SUCCESS:
            return {...action.data};
        case ERROR_MSG:
            return {...state,msg: action.data};
        default:
            return state;
    }

}
export default combineReducers({
    user,
    posts,
    comments
})

//向外暴露状态的结构