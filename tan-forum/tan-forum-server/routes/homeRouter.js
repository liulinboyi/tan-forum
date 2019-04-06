// routes/home.js
'use strict';
const homeService = require('../service/homeService');
const Joi = require('joi');


module.exports = [
    {
        method: 'GET',
        path: '/posts/{page}',
        options: {
            handler: homeService.getPosts,
            description: '获取第几页的帖子信息',
            tags: ['api'], // ADD THIS TAG
            validate: {
                params:{
                    page:Joi.number().integer().required().description('获取第几页的帖子信息'),
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/addposts',
        options: {
            handler: homeService.addPosts,
            description: '发帖',
            tags: ['api'], // ADD THIS TAG
            validate: {
                payload:{
                    username:Joi.string().required().description('用户id'),
                    title:Joi.string().required().description('文章标题'),
                    content:Joi.string().required().description('文章内容'),

                }
            }
        },
    },
    {
        method: 'GET',
        path: '/getpostsbyId/{id}',
        options: {
            handler: homeService.getPostsById,
            description: '根据文章id获取帖子',
            tags: ['api'], // ADD THIS TAG
            validate: {
                params:{
                    id:Joi.string().required().description('文章id'),

                }
            }
        },
    },
    {
        method: 'POST',
        path: '/addcomment',
        options: {
            handler: homeService.addComment,
            description: '回帖子，评论',
            tags: ['api'], // ADD THIS TAG
            validate: {
                payload:{
                    username :Joi.string().required().description('用户名'),
                    postid:Joi.string().required().description('文章id'),
                    content:Joi.string().required().description('评论内容'),


                }
            }
        },
    },
    {
        method: 'GET',
        path: '/getcommentbyid/{postid}',
        options: {
            handler: homeService.getcommentbyid,
            description: '根据文章id获取评论',
            tags: ['api'], // ADD THIS TAG
            validate: {
                params:{
                    postid :Joi.string().required().description('文章id'),
                }
            }
        },
    },
    {
        method: 'GET',
        path: '/getpostbyusername/{username}',
        options: {
            handler: homeService.getpostbyusername,
            description: '获取用户自己的帖子',
            tags: ['api'], // ADD THIS TAG
            validate: {
                params:{
                    username :Joi.string().required().description('用户名字'),
                }
            }
        }
        },
    {
        method: 'POST',
        path: '/deletepost',
        options: {
            handler: homeService.deletepost,
            description: '删除用户自己的帖子通过文章id',
            tags: ['api'], // ADD THIS TAG
            validate: {
                payload:{
                    postid :Joi.string().required().description('文章id'),
                }
            }
        },

    }




]