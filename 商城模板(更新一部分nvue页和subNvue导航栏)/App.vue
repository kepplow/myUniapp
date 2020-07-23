<script>
	export default {
		onLaunch: function () {
			localStorage.setItem('token', 'D9150A44BE324855FCEF60BE91F49B6D629C4686')
		},
		onShow: function () {
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
