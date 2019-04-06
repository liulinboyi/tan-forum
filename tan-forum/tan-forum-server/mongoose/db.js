const  mongoose =require('mongoose');

mongoose.connect('mongodb://localhost:27017/tan_forum',{useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("mongoDB connnected !");
});

//user
const userSchema = mongoose.Schema({

    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String},
    header:{type:String},
    description:{type:String}

});

// post
const postSchema = mongoose.Schema({

    username:{type:String,required:true},
    title:{type:String,required:true},
    content:{type:String,required:true},
    time:{type:Date,default:new Date().getTime()},
    isDeleted:{type:Boolean,default: false}

});



//comment
const commentSchema = mongoose.Schema({

    postid:{type:String,required:true},
    content:{type:String,required:true},
    username:{type:String,required:true},
    time:{type:Date,default:new Date().getTime()},
    isDeleted:{type:Boolean,default: false}

});



const UserModel = mongoose.model('user',userSchema);
const PostModel = mongoose.model('post',postSchema);
const CommentModel = mongoose.model('comment',commentSchema);

exports.UserModel = UserModel;
exports.PostModel = PostModel;
exports.CommentModel = CommentModel;

