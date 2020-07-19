<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			let oid = localStorage.getItem('oid');
			let expire = localStorage.getItem('expire');
			let now = +new Date();
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
							localStorage.setItem('oid', res.data.data.openid);
							localStorage.setItem('expire', res.data.time);
							localStorage.setItem('user_info', JSON.stringify(res.data.data));
							location.href = location.origin
						}
					})
				} else {
					getcode()
				}
			
			} else {
				if (expire*1000 - 24 * 3600 * 1000 < now) {
					localStorage.removeItem('oid')
					getcode()
				}
			}
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
