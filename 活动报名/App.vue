<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			let oid = localStorage.getItem('oid');
			let expire = localStorage.getItem('expire');
			let now = new Date().getTime();
			// alert(oid);
			if (!oid || oid == 'undefined') {
				let data = {};
				// 获取query里的code请求用户信息
				let query = location.search.substr(1)
				query.split('&').forEach(ele => {
					data[ele.split('=')[0]] = ele.split('=')[1]
				})
				if (data.code) {

					uni.request({
						url: 'http://ct.sccdlc.com/api/wx/auth',
						method: 'POST',
						data: {
							code: data.code
						},
						success: (res) => {
							if (res.data.code == 200) {
								location.href = location.origin + '?openid=' + res.data.data.openid + '&expire=' + expire
							} else {
								alert('openid获取失败')
							}
							// 				// localStorage.setItem('oid', res.data.data.openid);
							// 				// localStorage.setItem('expire', res.data.time);
							// 				// localStorage.setItem('user_info', JSON.stringify(res.data.data));
							// 				// let timer = setInterval(()=> {
							// 				// 	let haveOid = localStorage.getItem('oid')
							// 				// 	if (!haveOid || haveOid == 'undefined') {
							// 				// 		console.log(1111,haveOid)
							// 				// 	} else {
							// 				// 		console.log(2222,haveOid)
							// 				// 		clearInterval(timer)
							// 				// 		location.href = location.origin
							// 				// 		return
							// 				// 	}
							// 				// },250)
						}
					})
				} else {
					getcode()
				}

			} else {
				if (expire * 1000 - 24 * 3600 * 1000 < now) {
					localStorage.removeItem('oid')
					getcode()
				}
			}
			// localStorage.setItem('oid', 'oxoIL1tymx4-cl4gKAuhGBv1SHvY')
			// localStorage.setItem('user_info',
			// 	`{
			// 		"user_id": 2,
			// 		"openid": "oxoIL1g7VhFz5jjPS2v-QCrctHIk",
			// 		"nickname": "null",
			// 		"sex": "男",
			// 		"province": "四川/成都",
			// 		"headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/ycs2wAX4lS0wqb39IDKrLzoldrr8bOBWuZFcpnXkpvZPgKYkloIrFW042qz0OX9sDMg55WYjichfkfFzTJNt6NA/132",
			// 		"unionid": "",
			// 		"phone": null,
			// 		"created_at": "2020-07-16 06:02:51"
			// 	}`
			// )
			// if (!oid || oid == 'undefined') {
			// 	location.href = location.origin + '?openid=oxoIL1jNGkJ-vgE8J580piUMpNVs'
			// }

			function getcode() {
				uni.request({
					url: 'http://ct.sccdlc.com/api/wx/geturl',
					method: 'POST',
					data: {
						url: location.origin
					},
					success: (res) => {
						console.log(res.data.data);
						location.href = res.data.data;
					}
				})
			}
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "/static/iconfont/font.scss";

	/* #ifdef H5 */
	uni-page-head {
		display: none;
	}

	/* #endif */
</style>
