<template>
	<view class="detail">
		<view class="bg" :style="`background-image: url(${baseUrl + activityData.active_images});`">
			<view class="back icon xiangqian" @tap="goback"></view>
		</view>
		<view class="content">
			<view class="activity-title">{{activityData.title}}</view>
			<view class="info">
				<view class="info-left">
					<!-- <view class="price">
						￥<text>{{activityData.price}}</text>
						<view class="old-price">
							市场价格&nbsp;
							<text>￥{{activityData.original_price}}</text>
						</view>
					</view> -->
					<view class="time">活动时间: <text>{{activityData.begin_time +' ' + activityData.end_time | timeFilter}}</text></view>
				</view>
				<!-- <view class="info-right">
					<view class="num">{{activityData.registered}}</view>
					<view>已参与人数</view>
				</view> -->
			</view>
			<view class="pull-down">
				<view class="title">活动详情</view>
				<view @tap="showDetaileContent = !showDetaileContent">
					展开
					<view class="icon xiangqian show-icon" :style="`transform: rotate(${showDetaileContent ? -90 : 180}deg);`"></view>
				</view>
			</view>
			<view class="detail-content" :style="`height: ${showDetaileContent ? 'auto' : '0'};`">
				<view v-for="(item,index) in activityData.details.split('；')" :key="index">{{item}}</view>
			</view>
		</view>
		<view class="btn">
			<view class="share">
				<view class="icon"></view>点击右上角分享
			</view>
			<view class="commit" @tap="commit">
				<view class="icon"></view>立即报名
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oid: '',
				baseUrl: 'http://ht.sccdlc.com:8000/',
				activityData: {},
				showDetaileContent: true
			}
		},
		mounted() {
			let data = {};
			// 获取query里的code请求用户信息
			let query = location.search.substr(1)
			query.split('&').forEach(ele => {
				data[ele.split('=')[0]] = ele.split('=')[1]
			})
			this.oid = localStorage.getItem('oid')
			let id = data.id
			this.getActivityData(id)

		},
		filters: {
			timeFilter(value) {
				return value.split(' ')[0].replace(/-/g, '.') + '-' + value.split(' ')[2].replace(/-/g, '.')
			}
		},
		methods: {
			getActivityData(id) {
				let that = this
				uni.request({
					url: 'http://ct.sccdlc.com/api/id/active',
					method: "POST",
					data: {
						openid: that.oid,
						active_id: id
					},
					success(res) {
						that.activityData = res.data.data
					}
				})
			},
			callJsSDK(config) {
				let that = this
				console.log(config)
				this.wx.config({
					debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					...config,
					jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表
				})
				this.wx.ready(function() {
					console.log(location)
					// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
					that.wx.updateAppMessageShareData({
						title: that.activityData.title, // 分享标题
						desc: '简单描述', // 分享描述
						link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: that.baseUrl + that.activityData.active_images, // 分享图标
						success: function() {
							// 设置成功
							uni.showToast({
								title: '分享成功'
							})
						}
					})
				});
			},
			// 分享
			share() {
				let that = this
				uni.request({
					url: 'http://ct.sccdlc.com/api/get/share/params',
					method: "POST",
					data: {
						url: location.href,
						openid: this.oid
					},
					success(res) {
						console.log(res.data)
						if (res.data && res.data.code == 200) {
							let config = res.data.data.params
							that.callJsSDK(config)
						}
					}
				})
			},
			goback() {
				uni.navigateBack();
			},
			commit() {
				uni.navigateTo({
					url: '/pages/activity/form?item=' + JSON.stringify(this.activityData)
				})
			}
		}
	}
</script>

<style lang="scss">
	.bg {
		width: 100%;
		height: 500upx;
		background-image: url(../../static/img/占位图.png);
		background-repeat: no-repeat;
		background-size: cover;

		.back {
			position: absolute;
			top: 80upx;
			left: 40upx;
			color: white;
			padding: 5upx 25upx;
			font-size: 30upx;
			border-radius: 40upx;
			background-color: rgba(255, 255, 255, .1);
		}
	}

	.content {
		background-color: #fff;
		border-radius: 30upx;
		margin-top: -30upx;
		overflow: hidden;
		padding: 20upx;

		.activity-title {
			margin: 20upx 0;
			font-size: 36upx;
		}
	}

	.info {
		display: flex;
		justify-content: space-between;

		.info-left {
			.price {
				color: #DD524D;
				font-size: 28upx;

				text {
					font-weight: 550;
					font-size: 40upx;
				}

				.old-price {
					display: inline-block;
					margin-left: 20upx;
					color: #aaa;
					font-size: 24upx;
					font-weight: normal;

					text {
						text-decoration: line-through;
						font-size: 24upx;
						font-weight: normal;
					}

				}
			}

			.time {
				margin: 20upx 0;
				font-size: 26upx;
			}


		}

		.info-right {
			.num {
				font-size: 40upx;
				text-align: center;
				color: #DD524D;
			}

			view {
				color: #aaa;
				font-size: 24upx;
				margin: 0 20upx;
			}
		}
	}

	.pull-down {
		display: flex;
		padding: 40upx 0;
		border-top: 2upx solid #ddd;
		border-bottom: 2upx solid #ddd;
		justify-content: space-between;

		view {
			color: #aaa;
			font-size: 28upx;
		}

		.title {
			color: black;
			font-size: 30upx;
			font-weight: 550;
		}

		.show-icon {
			display: inline-block;
			background-color: #eee;
			padding: 5upx;
			text-align: center;
			border-radius: 50%;
			margin-left: 10upx;
		}
	}

	.detail-content {
		margin-top: 20upx;
		font-size: 28upx;
		overflow: hidden;
		box-sizing: border-box;
		transition: all .3s ease;
		margin-bottom: 100upx;
	}

	.btn {
		width: 85%;
		position: fixed;
		bottom: 40upx;
		left: 0;
		right: 0;
		margin: 0 auto;
		background-color: white;
		border: 2upx solid #ccc;
		border-radius: 50upx;
		overflow: hidden;
		display: flex;
		font-size: 30upx;

		.share {
			background-color: white;
			width: 50%;
			text-align: center;
			padding: 15upx 0;

			.icon {
				margin-right: 20upx;
				display: inline-block;
				width: 40upx;
				height: 40upx;
				vertical-align: -6upx;
				background-image: url(../../static/img/icon02.png);
				background-size: 100%;
				background-repeat: no-repeat;
			}
		}

		.commit {
			width: 50%;
			color: white;
			text-align: center;
			padding: 15upx 0;
			background-color: #DD524D;
			border-radius: 50upx;

			.icon {
				margin-right: 20upx;
				display: inline-block;
				width: 40upx;
				height: 40upx;
				vertical-align: -6upx;
				background-image: url(../../static/img/icon03.png);
				background-size: 100%;
				background-repeat: no-repeat;
			}
		}
	}
</style>
