/*
能发送ajax请求的函数模块
函数的返回值是promise对象
 */
import axios from 'axios'

export default function ajax(url,data={},method='GET') {

    if(method ==='GET'){
        //拼请求参数的字符串
        //data:{username:tom,password:123}
        //paramStr:username=tom&password=123
        let paramStr = '';
        // Object.keys(data).forEach(key =>{
        //     paramStr += key + '=' + data[key] + '&';
        // });
        paramStr=paramStr+'/'+data;
        //console.log(paramStr);
        // if(paramStr){
        //     paramStr = paramStr.substring(0,paramStr.length-1);
        // }

            return axios.get(url+paramStr);

        //console.log(url+paramStr);

    }else{
        //console.log(axios.post(url,data));
        return axios.post(url,data);
    }
}