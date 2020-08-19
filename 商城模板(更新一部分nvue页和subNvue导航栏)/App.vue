<script>
	export default {
		onLaunch: function () {
			// uni.setStorageSync('token','7BE14EE081779CA9A0C2170DBEBF363D496FAFA4')
			// localStorage.setItem('token', '07F6D171FB7A2FB12866BAF6B38FFE5D7B2B1F04')
		},
		onShow: function () {
			// wx.setNavigationBarRightButton({
			
			//     hide: true
			
			// });
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "/static/iconfont/font.scss";
</style>
