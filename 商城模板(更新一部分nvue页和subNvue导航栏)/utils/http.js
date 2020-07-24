import Request from '@/common/luch-request/index.js'

const http = new Request();

http.setConfig((config) => { /* config 为默认全局配置*/
	config.baseURL = 'http://wx.sccdlc.com/'; /* 根域名 */
	// config.header = {
	// 	a: 1, // 演示用
	// 	b: 2 // 演示用
	// }
	return config
})

http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	config.header = {
		...config.header
	}

	// 演示custom 用处
	// if (config.custom.auth) {
	//   config.header.token = 'token'
	// }
	// if (config.custom.loading) {
	//  uni.showLoading()
	// }
	/**
	 /* 演示
	 if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
	    return Promise.reject(config)
	  }
	 **/
	return config
}, config => { // 可使用async await 做异步操作
	return Promise.reject(config)
})

http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
	//  if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
	//    return Promise.reject(response) // return Promise.reject 可使promise状态进入catch
	// if (response.config.custom.verification) { // 演示自定义参数的作用
	//   return response.data
	// }
	if (response.data.code == 302) {
		location.href = 'http://wx.sccdlc.com/wx/auth'
	}
	if (response.data.code !== 200) {
		uni.showToast({
			icon: 'loading',
			title: '错误:' + response.data.message
		})
	}
	return response.data
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
	console.log(response)
	return Promise.reject(response)
})

export default http