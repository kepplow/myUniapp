<template>
	<view class="detail">
		<view class="bg" :style="`background-image: url(${baseUrl + goodsData.goods_images});`">
			<view class="back icon xiangqian" @tap="goback"></view>
		</view>
		<view class="content">
			<view class="activity-title">{{goodsData.title}}</view>
			<view class="info">
				<view class="info-left">
					<view class="price">
						￥<text>{{goodsData.actual_price}}</text>
						<view class="old-price">
							<text>￥{{goodsData.price}}</text>
						</view>
					</view>
					<!-- <view class="time">已售: <text>{{goodsData.sales_volumes}}/{{goodsData.stock}}</text></view> -->
				</view>
				<view class="info-right">
					<!-- <view class="num">/</view> -->
					<view>已售{{goodsData.sales_volumes}}/库存{{goodsData.stock}}</view>
				</view>
			</view>
			<view class="pull-down">
				<view class="title">商品说明</view>
				<view @tap="showDetaileContent = !showDetaileContent">
					展开
					<view class="icon xiangqian show-icon" :style="`transform: rotate(${showDetaileContent ? -90 : 180}deg);`"></view>
				</view>
			</view>
			<view class="detail-content" :style="`height: ${showDetaileContent ? 'auto' : '0'};`">
				<view>{{goodsData.explain}}</view>
			</view>
			<view class="margin-b" v-html="hanshum(goodsData.goods_content)"></view>
		</view>
		<view class="btn">
			<view class="share">
				<view class="icon"></view>点击右上角分享
			</view>
			<view class="commit" @tap="commit">
				<view class="icon"></view>立即购买
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
				goodsData: {},
				showDetaileContent: true
			}
		},
		onReady() {
			let data = {};
			// 获取query里的code请求用户信息
			let query = location.search.substr(1)
			query.split('&').forEach(ele => {
				data[ele.split('=')[0]] = ele.split('=')[1]
			})
			this.oid = localStorage.getItem('oid')
			let id = data.goodsId
			this.getGoodsData(id)
		},
		filters: {
			timeFilter(value) {
				return value.split(' ')[0].replace(/-/g, '.') + '-' + value.split(' ')[2].replace(/-/g, '.')
			}
		},
		methods: {
			getGoodsData(id) {
				let that = this
				uni.request({
					url: 'http://ct.sccdlc.com/api/get/goods/id',
					method: "POST",
					data: {
						openid: that.oid,
						goods_id: id
					},
					success(res) {
						that.goodsData = res.data.data
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
					url: `../pay/payment/payment/payment?goodsId=${this.goodsData.goods_id}&goodsImage=${this.goodsData.goods_images}&goodsSpecs=${JSON.stringify(this.goodsData.specs)}`
				})
			},
			hanshum(str) {
				var imgReg = /<img.*?(?:>|\/>)/gi;
				var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
				if(str === undefined){
					return;
				}
				var arr = str.match(imgReg);
				for (var i = 0; i < arr.length; i++) {
					var src = arr[i].match(srcReg);
					str = str.replace(src[1],this.baseUrl+src[1]);
				}
				return str;
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
		margin-bottom: 40upx;

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
			display: flex;
			align-items: center;

			.num {
				font-size: 40upx;
				text-align: right;
				color: #DD524D;
			}

			view {
				color: #aaa;
				font-size: 24upx;
				margin: 0 20upx;
				text-align: right;
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
	.margin-b {
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
