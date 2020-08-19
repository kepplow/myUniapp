import Request from '@/common/luch-request/index.js'

const http = new Request();

http.setConfig((config) => { /* config 为默认全局配置*/
	config.baseURL = 'https://lysv.sccdlc.com/'; /* 根域名 */
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
		// #ifdef H5
		location.href = 'http://lysv.sccdlc.com/wx/auth'
		// #endif

		// #ifdef MP
		uni.showToast({
			icon: 'none',
			title: '未登录或身份已过期！'
		})
		uni.login({
			success(res) {
				// 登录失败
				if (!res.code) {
					uni.showToast({
						icon: 'none',
						title: '登录失败！'
					})
				}
				// 用code换取openid等
				http.post('api/applets/login', {
					code: res.code
				}).then(info => {
					// 已注册
					if (info.data.token) {
						uni.setStorageSync('token',info.data.token)
						uni.reLaunch({
							url: '/pages/tabBar/home/home',
							success(res) {
								uni.showToast({
									icon: 'none',
									title: '登录成功'
								})
							},
							fail(e) {
								uni.showToast({
									icon: 'none',
									title: e.errMsg
								})
							}
						})
						
						
					// 未注册
					} else if (info.data.openid) {
						uni.getUserInfo({
							lang: 'zh_CN',
							success(user) {
								http.post('api/applets/register', {
									openid: info.data.openid,
									unionid: info.data.unionid,
									nickname: user.userInfo.nickName,
									sex: user.userInfo.gender,
									province: user.userInfo.province,
									city: user.userInfo.city,
									headimgurl: user.userInfo.avatarUrl
								}).then(tokenData => {
									if (!tokenData.data.token) {
										uni.showToast({
											icon: "none",
											title: '未获取到token'
										})
									} else {
										uni.setStorage('token', tokenData.data.token)
										setTimeout(() => {
											uni.switchTab({
												url: '/pages/tabBar/user/user.vue'
											})
										},200)
									}
								})
							}
						})
						
					}
				})
			}
		})
		// #endif
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
