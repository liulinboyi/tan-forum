const Fs = require('fs');
const Stream = require('stream');
const B64 = require('b64');
const Code = require('code');
const {UserModel} = require('../mongoose/db');
const md5 = require('blueimp-md5');
const {
    code,transporter
} = require('../util/email');
var {mailOptions} = require('../util/email');

const filter = {password:0,__v:0};     //指定过滤的属性


//register
exports.register = async (request,h)=>{
    return new Promise((resolve, reject) =>{
        //读取请求参数数据
        const {username,password,email} = request.payload;
        //console.log({username,password,email});
        //判断是否已经存在，根据username来查询
        UserModel.findOne({username},function (err,userDoc) {
            //如果userDoc有值则已存在
            if(userDoc){
                return resolve({code:1,msg:"用户名已存在！"});
            }else{
                UserModel.findOne({email},function (err,userDoc) {
                    if (userDoc) {
                        return resolve({code: 1, msg: "邮箱已注册，请换一个邮箱！"});
                    } else {
                        new UserModel({username, password: md5(password), email}).save(function (error, userDoc) {
                            //生成cookie
                            if (userDoc) {
                                const data = {username, email, _id: userDoc._id,msg:"注册成功并登录！"};  //响应数据中不能携带密码
                                h.state("user_id", userDoc._id.toString("hex"), {
                                    ttl: 24 * 60 * 60 * 1000,     // One day
                                    path: '/',
                                    encoding: 'none',
                                    isSameSite:false,
                                    isHttpOnly: false,
                                    isSecure: false,
                                    config: {
                                        state: {
                                            cors: {
                                                origin: [
                                                    '*'
                                                ],
                                                headers: ["Access-Control-Allow-Headers", "Access-Control-Allow-Origin","Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
                                                additionalHeaders: ["Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"],
                                                credentials: true
                                            },
                                            parse: true,        // 解析 cookies 并储存在 request.state
                                            failAction: 'error', // 也可以为 'ignore' 或者 'log'
                                        }
                                    }
                                });
                                //h.header('Access-Control-Allow-Origin', '*');
                              //  h.response.header('set-cookie',userDoc._id);
                                //res.cookie('userid',userDoc._id,{maxAge:1000*60*60*24});
                                return resolve({code: 0, data});
                            }else{
                                return reject('注册数据库失败');
                            }

                        });
                    }
                });

            }
        });
})
};

//login
exports.login = async (request,h)=>{
    return new Promise((resolve, reject) =>{
        //读取请求参数数据
        const {username,password} = request.payload;
        //console.log({username,password,email});
        //判断是否已经存在，根据username来查询
        UserModel.findOne({"$or":[{username:username},{email:username}],password:md5(password)},filter,function (err,userDoc) {
            //如果userDoc有值则已存在
            if(!userDoc){
                return resolve({code:1,msg:"登录名或密码错误！"});
            }else{
                    const data = {username:userDoc.username, email:userDoc.email, _id: userDoc._id,msg:"登录成功！"};  //响应数据中不能携带密码
                    //console.log(userDoc._id);
                    h.state("user_id", userDoc._id.toString("hex"), {
                        ttl: 24 * 60 * 60 * 1000,     // One day
                        path: '/',
                        encoding: 'none',
                        isSameSite:false,
                        Sucure:false,
                        isHttpOnly: false,
                        isSecure: false,
                        config: {
                            state: {
                                cors: {
                                    origin: [
                                        '*'
                                    ],
                                    headers: ["Access-Control-Allow-Headers", "Access-Control-Allow-Origin","Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
                                    additionalHeaders: ["Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"],
                                    credentials: true
                                },
                                parse: true,        // 解析 cookies 并储存在 request.state
                                failAction: 'error', // 也可以为 'ignore' 或者 'log'

                            }
                        }
                    });
                    return resolve({code: 0, data});
              }
                });

            });
};
//user
exports.user = async (request,h)=>{
    return new Promise((resolve, reject) =>{
        //请求的cookie得到userid
        //const  userid = decodeURIComponent(request.state.user_id).match(/"(\S*)"/)[1];
        const  userid =  request.state.user_id.toString()  ;
        //console.log(userid);

        if(!userid){
            return resolve({code:1,msg:'请先登录'});
        }

        UserModel.findOne({_id:userid},filter,function (error,user) {
            if(user){
                return resolve({code:0,data:user});
            }else{
                return resolve({code:1,msg:'用户不存在'});
            }
        })

    });
};
//修改用户密码
exports.resetuser = async (request,h)=>{
    return new Promise((resolve, reject) =>{
        //请求的cookie得到userid
        const  userid =  request.state.user_id;
        const {password} = request.payload;
        //console.log(userid);
        if(!userid){
            return resolve({code:1,msg:'请先登录'});
        }

        UserModel.updateOne({_id:userid},{password:md5(password)},function (error,user) {
            if(user){
                h.unstate('user_id');
                return resolve({code:0,msg:"修改成功"});
            }else{
                return resolve({code:1,msg:'用户不存在'});
            }
        })

    });
};
//给用户发送邮件验证码
exports.sendeamil = async (request,h)=>{
    return new Promise((resolve, reject) =>{
        const {email} = request.payload;
        UserModel.findOne({email},filter,function (error,user) {
            if(user){
                mailOptions.to=email;
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {

                        return resolve({code:1,msg:'发送邮箱失败！'});
                    }
                    console.log('邮件发送成功 ID：', info.messageId);})

                    return resolve({code: 0,msg:'邮箱发送成功！请注意查收！'});
            }else{
                return resolve({code:1,msg:'邮箱未注册！'});
            }
        })

    });
};
//忘记密码时验证用户的验证码是否正确
exports.iscode = async (request,h)=>{
    return new Promise((resolve, reject) =>{
        const {codePerson,email} = request.payload;
        if(codePerson===code){
            UserModel.findOne({email},filter,function (error,user) {
                if(user){
                    const data = {user,msg:'验证成功！'};
                    h.state("user_id", user._id.toString("hex"), {
                        ttl: 24 * 60 * 60 * 1000,     // One day
                        path: '/',
                        encoding: 'none',
                        isSameSite:false,
                        Sucure:false,
                        isHttpOnly: false,
                        isSecure: false,
                        config: {
                            state: {
                                cors: {
                                    origin: [
                                        '*'
                                    ],
                                    headers: ["Access-Control-Allow-Headers", "Access-Control-Allow-Origin","Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
                                    additionalHeaders: ["Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"],
                                    credentials: true
                                },
                                parse: true,        // 解析 cookies 并储存在 request.state
                                failAction: 'error', // 也可以为 'ignore' 或者 'log'

                            }
                        }
                    });
                    return resolve({code: 0, data});
                }else{
                    return resolve({code:1,msg:'邮箱未注册！'});
                }
            })

        }else{
            const msg = '您的验证码输入错误！';
            return resolve({code:1,msg});
        }
    });
};


