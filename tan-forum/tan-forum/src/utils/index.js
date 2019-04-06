/*
包含n个工具函数得模块
 */
/*
用户主界面路由（判断是否晚上信息 user.header）
用户信息完善界面路由
 */
//返回对应得路由路径
export function getRedirectTo(username) {
    let path ='';
    if(!username){
        path ='/register';
    }else {
        path ='/';
    }
    return path;
}
