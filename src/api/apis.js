// 所有封装接口文件（方面项目后期维护）
import axios from 'axios'


// axios.defaults.baseURL
// 完全等效
// 创建一个请求对象
let req =axios.create({
    baseURL:'http://192.168.0.102:3000', //基本路径
    timeout:10000    //ms 超时设置，请求10秒，如果10后还没有请求到，则提示请求超时（8-12秒）超时限制！
})

 export function getSeller(){
    return req.get('/api/seller')
}
// 请求
export function getGoods(){
    return req.get('/api/goods')
}
export function getRatings(){
    return req.get('/api/ratings')
}