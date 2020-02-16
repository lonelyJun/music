import Vue from 'vue'
import { post } from './http.js'
const me = new Vue()


// zhuce----------
export const userRegiest = async _ => {
  const url = '/admin/users/regist'
  const res = await post(url, _)
  return res.data
}

//获取当前用户身份信息 -----
export const login = async _ => {
  const url = '/admin/users/login'
  const res = await post(url, _)
  return res.data
}

// 添加歌手
export const addSongSinger = async _ => {
  const url = '/singers/addSinger'
  const res = await me.$http.get(url, { params: _ })
  return res.data
}
// 返回所有歌手信息
export const allSinger = async _ => {
  const url = '/singer'
  const res = await me.$http.get(url, { params: _ })
  return res.data
}
// 添加歌曲
export const addMusic = async _ => {
  const url = '/songs/addSong'
  const res = await me.$http.get(url, { params: _ })
  return res.data
}
// 给某首歌添加歌手
export const addSinger = async _ => {
  const url = '/songs/addSinger'
  const res = await me.$http.get(url, { params: _ })
  return res.data
}
// 收藏歌曲
export const storeSong = async _ => {
  const url = '/songs/addUser'
  const res = await me.$http.get(url, { params: _ })
  return res.data
}
// 添加专辑
export const addAlb = async _ => {
  const url = '/albums/addAlbum'
  const res = await post(url, _)
  return res.data
}
// 返回所有专辑信息
export const allAlb = async _ => {
  const url = '/albums'
  const res = await me.$http.get(url)
  return res.data
}
// 返回某专辑信息
export const albInfo = async _ => {
  const url = '/albums/albumDetail'
  const res = await me.$http.get(url, { params: _ })
  return res.data
}
// 给专辑添加歌手
export const albAddSinger = async _ => {
  const url = '/albums/addSinger'
  const res = await me.$http.get(url, { params: _ })
  return res.data
}
// 给专辑添加歌曲
export const albAddSong = async _ => {
  const url = '/albums/addSong'
  const res = awaitpost(url, { params: _ })
  return res.data
}
// 设置用户等级
export const setUserLevel = async _ => {
  const url = '/users/setLevel'
  const res = await post(url, _)
  return res.data
}


