import Vue from 'vue'
import { post } from './http.js'
const me = new Vue()


// 获取左侧菜单父项
export const userRegiest = async _ => {
  const url = '/admin/users/regist'
  const res = await post(url, _)
  return res.data
}

//获取当前用户身份信息
export const login = async _ => {
  const url = '/admin/users/login'
  const res = await post(url, _)
  return res.data
}

// 获取直播信号
export const getSign = async _ => {
  const url = '/albums'
  const res = await me.$http.get(url, { params: _ })
  return res.data
}

