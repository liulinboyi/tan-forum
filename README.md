node.js+hapi.js+React+Redux+Mongoose



实现了论坛一些小功能：

用户登录、注册，忘记密码（邮箱验证），修改密码；

无刷新发帖、回帖；

权限管理：删除自己的帖子；

文章分页显示；

欢迎star，原文链接：https://github.com/NieZhuZhu/tan-forum

项目链接参考（没有买域名，先这样玩玩。大佬们不要攻击我服务器就好）：http://47.107.162.196:3000



本地项目启动：

前端：

cd tan-forum

npm install

npm start

后端：

cd tan-forum-server

npm install

npm start

后端路由接口文档：

http://localhost:5000/documentation




前端页面设计：

组件components：

posts.jsx：通过url实现论坛首页展示，和用户权限管理删除帖子页面显示；

personnalpost.jsx：显示某个文章主页面，可以增加评论；

changepsw.jsx：实现修改密码功能；




容器组件containers：

findpsw.jsx：输入邮箱后发送邮箱验证码，实现验证登录，登陆后修改密码；

login.jsx：实现用户登录功能；

register.jsx：实现用户注册功能；

main.jsx：实现layout ，上中下布局，左右布局。发帖、首页等功能

ajax请求接口api：

实现对所有请求接口的封装


前端UI使用antd：




redux状态管理：
action-types：包含声明多个action type常量；
actions：包含多个请求发送和定义antion type的action；
reducer：包含n个reducer函数：根据最老的state和指定的action返回一个新的state；
store：创建store将action和state通过connect发送到react组件视图；    





后台服务端：
mongoose：使用mongoose连接数据库；

route：对路由进行封装；

service：对请求进行逻辑处理，操作数据库，以及对response进行设置；

util：对忘记密码时，svg-captcha生成随机验证码，nodemailer代理发送带有验证码的邮件信息；

server.js：端口创建，插件注册，以及启动服务；

jio：验证用户请求的输入数据类型；

good：日志插件；

hapi-auto-route：路由插件；

boom：错误处理插件；

swagger：api接口文档插件；

