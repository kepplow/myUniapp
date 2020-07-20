<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			// let oid = localStorage.getItem('oid');
			// let expire = localStorage.getItem('expire');
			// let now = +new Date();
			// // alert(oid);
			// if (!oid || oid == 'undefined') {
			// 	let data = {};
			// 	// 获取query里的code请求用户信息
			// 	let query = location.search.substr(1)
			// 	query.split('&').forEach(ele => {
			// 		data[ele.split('=')[0]] = ele.split('=')[1]
			// 	})
			// 	if (data.code) {

			// 		uni.request({
			// 			url: 'http://ct.sccdlc.com/api/wx/auth',
			// 			method: 'POST',
			// 			data: {
			// 				code: data.code
			// 			},
			// 			success: (res) => {
			// 				localStorage.setItem('oid', res.data.data.openid);
			// 				localStorage.setItem('expire', res.data.time);
			// 				localStorage.setItem('user_info', JSON.stringify(res.data.data));
			// 				location.href = location.origin
			// 			}
			// 		})
			// 	} else {
			// 		getcode()
			// 	}

			// } else {
			// 	if (expire*1000 - 24 * 3600 * 1000 < now) {
			// 		localStorage.removeItem('oid')
			// 		getcode()
			// 	}
			// }
			localStorage.setItem('oid', 'oxoIL1g7VhFz5jjPS2v-QCrctHIk')
			localStorage.setItem('user_info',
				`{
					"user_id": 2,
					"openid": "oxoIL1g7VhFz5jjPS2v-QCrctHIk",
					"nickname": "null",
					"sex": "男",
					"province": "四川/成都",
					"headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/ycs2wAX4lS0wqb39IDKrLzoldrr8bOBWuZFcpnXkpvZPgKYkloIrFW042qz0OX9sDMg55WYjichfkfFzTJNt6NA/132",
					"unionid": "",
					"phone": null,
					"created_at": "2020-07-16 06:02:51"
				}`
			)

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
</style>
