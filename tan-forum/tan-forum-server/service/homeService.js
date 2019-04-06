
const {UserModel,PostModel,CommentModel}  = require('../mongoose/db');
const filter = {password:0,__v:0};


//发帖
exports.addPosts = async (request,h)=>{

    return new Promise((resolve, reject) =>{
        //读取请求参数数据
        const {username,title,content} = request.payload;
        //console.log(userid,title,comment);
        new PostModel({username, title, content,time:new Date().getTime()}).save(function (error, postDoc) {

                if (error) {
                    return resolve({code: 1,msg:"发帖失败" });
                }else{
                    //console.log(postDoc);
                    const data = {_id:postDoc._id,username:postDoc.username, title, content,time:postDoc.time,msg:"发帖成功！"};
                    return resolve({code: 0, data});

                }
            });

    })
};


//获取帖子
exports.getPosts = async (request,h)=>{

    return new Promise((resolve, reject) =>{
        //读取请求参数数据
        const {page} = request.params;
        //console.log(userid,title,comment);
        PostModel.find({isDeleted:false},filter,function (error,postDoc) {

            if (error) {
                return resolve({code: 1,msg:"获取失败" });
            }else{
                //console.log(postDoc);
                const data = {postDoc,msg:"获取成功！"};
                return resolve({code: 0, data});

            }
        }).skip((page-1) * 30)
            .limit(30).sort({'time':-1});

    })
};
//获取帖子byid
exports.getPostsById = async (request,h)=>{

    return new Promise((resolve, reject) =>{
        const {id} = request.params;
        //console.log(userid,title,comment);
        PostModel.find({_id:id,isDeleted:false},filter,function (error,postDoc) {
            if (error) {
                return resolve({code: 1,msg:"获取失败" });
            }else{
                //console.log(postDoc);
                const data = {postDoc,msg:"获取成功！"};
                return resolve({code: 0, data});

            }
        })
    })
};

//发表评论
exports.addComment = async (request,h)=>{

    return new Promise((resolve, reject) =>{
        //读取请求参数数据
        const {username,postid,content} = request.payload;
        //console.log(userid,title,comment);
        new CommentModel({username, postid, content,time:new Date().getTime()}).save(function (error, commentDoc) {
            //生成cookie
            if (error) {
                return resolve({code: 1,msg:"发帖失败" });
            }else{
                //console.log(postDoc);
                const data = {msg:"发帖成功！"};
                return resolve({code: 0, data});

            }
        });
    })
};
//获取评论通过文章id
exports.getcommentbyid = async (request,h)=>{

    return new Promise((resolve, reject) =>{
        //读取请求参数数据
        const {postid} = request.params;
        //console.log(userid,title,comment);
        CommentModel.find({postid:postid,isDeleted:false},filter,function (error,commentDoc) {
            if (error) {
                return resolve({code: 1,msg:"获取失败" });
            }else{
                //console.log(postDoc);
                const data = {commentDoc,msg:"获取成功！"};
                return resolve({code: 0, data});

            }
        }).sort({'time':-1});
    })
};
//获取帖子通过用户名字
exports.getpostbyusername = async (request,h)=>{

    return new Promise((resolve, reject) =>{
        //读取请求参数数据
        const {username} = request.params;
        //console.log(userid,title,comment);
        PostModel.find({username,isDeleted:false},filter,function (error,postDoc) {
            if (error) {
                return resolve({code: 1,msg:"获取失败" });
            }else{
                //console.log(postDoc);
                const data = {postDoc,msg:"获取成功！"};
                return resolve({code: 0, data});

            }
        }).sort({'time':-1});
    })
};
//删除帖子通过文章id
exports.deletepost = async (request,h)=>{

    return new Promise((resolve, reject) =>{
        //读取请求参数数据
        const postid = request.payload.postid;
        //console.log(postid);
        //console.log(userid,title,comment);
        PostModel.updateOne({_id:postid},{isDeleted: true},function (error,postDoc) {
            if (error) {
                return resolve({code: 1,msg:"删除失败" });
            }else{
                //console.log(postDoc);
                const data = {msg:"删除成功！"};
                return resolve({code: 0, data});
            }
        });
    })
};