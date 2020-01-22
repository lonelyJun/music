import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
const me = new Vue()
const getFormData = (param = {}) => {
	const fd = new FormData()
	Object.keys(param).forEach(k => fd.append(k, param[k]))
	return fd
}
const formPost = (url, param, opt) => {
	const fd = getFormData(param);
	delete opt.useFormData
	return axios.post(url, fd, opt)
}
const formPostSimple = (url, param, opt) => {
	opt.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
	delete opt.simpleFormData
	return axios.post(url, qs.stringify(param), opt)
}
export const post = (url, param = {}, opt = {}) => {
	if (opt.useFormData) return formPost(url, param, opt)
		else if(opt.simpleFormData)  return formPostSimple(url, param, opt)
	return axios.post(url, param, opt)
}
axios.interceptors.response.use(
	(data) => {
		return data
	},
	(err) => {
		const t = err.response ? err.response.status : 302
		if (t === 302) {
			me.$message.error('人员信息缺失，获取信息失败，请重新登录')
			setTimeout(_ => {
				sessionStorage.clear()
				location.replace('https://login.xinhua-news.com/loginSSO.html?from=LiveSP&service=http%3A%2F%2Flive.xinhua-news.cn%2F&ssoPageType=SSO_PUBLIC_PAGE&terminal=WEB')
			}, 1000)
		} else {
			me.$message.warning('请求失败')
		}
	}
)