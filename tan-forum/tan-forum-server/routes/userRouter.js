// routes/user.js
'use strict';
const userService = require('../service/userService');
const Joi = require('joi');


module.exports = [
    {
        method: 'POST',
        path: '/register',
        options: {
            cors: {
                origin: [
                    '*'
                ],
                headers: ["Access-Control-Allow-Headers", "Access-Control-Allow-Origin","Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
                additionalHeaders: ["Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"],
                credentials: true
            },
            handler: userService.register,
            description: '用户注册',
            tags: ['api'], // ADD THIS TAG
            validate: {
                payload:{
                    username:Joi.string().required().description('用户名'),
                    password:Joi.string().required().description('密码'),
                    email:Joi.string().required().description('邮箱'),
                }
            }
        },
    },
    {
        method: 'POST',
        path: '/login',
        options: {
            cors: {
                origin: [
                    '*'
                ],
                headers: ["Access-Control-Allow-Headers", "Access-Control-Allow-Origin","Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
                additionalHeaders: ["Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"],
                credentials: true
            },
            handler: userService.login,
            description: '用户登录',
            tags: ['api'], // ADD THIS TAG
            validate: {
                payload:{
                    username:Joi.string().required().description('用户名'),
                    password:Joi.string().required().description('密码'),
                }
            }
        },
    },
    {
        method: 'GET',
        path: '/user/{userid}',
        options: {
            cors: {
                origin: [
                    '*'
                ],
                headers: ["Access-Control-Allow-Headers", "Access-Control-Allow-Origin","Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
                additionalHeaders: ["Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"],
                credentials: true
            },
            handler: userService.user,
            description: '根据cookie中的userid获取用户信息',
            tags: ['api'], // ADD THIS TAG,
            validate: {
                params:{
                    userid:Joi.string().required().description('用户id'),
                }
            }

        },
    }, {
        method: 'POST',
        path: '/resetuser',
        options: {
            cors: {
                origin: [
                    '*'
                ],
                headers: ["Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
                additionalHeaders: ["Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"],
                credentials: true
            },
            handler: userService.resetuser,
            description: '修改用户密码',
            tags: ['api'], // ADD THIS TAG,
            validate: {
                payload: {
                    password: Joi.string().required().description('用户密码'),

                }

            },
        },
    },
    {
        method: 'POST',
        path: '/findpsw',
        options: {
            handler: userService.iscode,
            description: '忘记密码时验证用户的验证码是否正确',
            tags: ['api'], // ADD THIS TAG,
            validate: {
                payload: {
                    email: Joi.string().required().description('用户输入的邮箱'),
                    codePerson: Joi.string().required().description('用户输入的验证码'),

                }

            },
        },
    },
    {
        method: 'POST',
        path: '/sendemail',
        options: {
            handler: userService.sendeamil,
            description: '给用户发送邮件验证码',
            tags: ['api'], // ADD THIS TAG,
            validate: {
                payload: {
                    email: Joi.string().required().description('用户输入的邮箱'),

                }

            },
        },
    },


]