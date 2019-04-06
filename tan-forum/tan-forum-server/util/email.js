const nodemailer = require('nodemailer'); //发送邮件的node插件
const svgCaptcha = require('svg-captcha');
const option = {
    //size: 6, // 验证码长度
    //ignoreChars: '0o1ilI', // 验证码字符中排除 0o1i
    //noise: 2, // 干扰线条的数量
    //color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
    //background: '#6b9fac' // 验证码图片背景颜色
};

const code = svgCaptcha.randomText(8);
// {data: '<svg.../svg>', text: 'abcd'}

let transporter = nodemailer.createTransport({
    service: 'QQ', // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // SSL安全链接
    auth: {   //发送者的账户密码
        user: '1050090118@qq.com', //账户
        pass: 'wgdbsaznwvdabeai', //smtp授权码，到邮箱设置下获取
    }
});

let mailOptions = {
    from: '"TAN-FORUM" <1050090118@qq.com>', // 发送者昵称和地址
    to: 'tiedantan@163.com', // 接收者的邮箱地址
    subject: '一封TAN-FORUM密码找回的小邮件', // 邮件主题
    text: '您的TAN-FORUM账号正在修改密码。\n请将修改密码的验证码输入您正在申请的界面，感谢您的使用：\n'+'请妥善保管好您的验证码：\n'+code,  //邮件的text
    // html: html  //也可以用html发送
};

//发送邮件
exports.transporter = transporter;
exports.code = code;
exports.mailOptions = mailOptions;

// exports.transporter = transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('邮件发送成功 ID：', info.messageId);
// });