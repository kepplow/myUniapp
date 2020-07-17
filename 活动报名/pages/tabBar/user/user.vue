<template>
	<view>
		<view class="back">
		</view>
		<view class="information">
			<image src="../../../static/img/alipay.png"></image>
			<view class="rightbox">
				<view class="username">名字名字名字名字</view>
				<view class="jianjie">简介名字名字名字名字简介名字名字名字名字简介名字名字名字名字</view>
			</view>
		</view>
		<view class="baoming">
			<view class="mybaoming">我的报名</view>
			<view class="backcolor"></view>
		</view>
		<view class="mylesson">
			<image src="../../../static/img/占位图.png"></image>
			<view class="classinfo">
				<view class="classname">
					<view class="yibaoming">已报名</view> 半手倒立基础课程详解 倒立基础课程详解
				</view>
				<view class="placeinfo">场馆信息：<text>世纪城三号馆</text></view>
				<view class="intime">报名时间：<text>2020.07.15-08.15</text>
					<view class="xiangqing">详情</view>
				</view>
			</view>
		</view>
		<view class="dingdan">
			<view class="mydingdan">我的订单</view>
			<view class="backcolor"></view>
		</view>
		<view class="mylist">
			<image src="../../../static/img/image03.png"></image>
			<view class="listinfo">
				<view class="listname">
					<view class="daifukuan">待付款</view>2020·中国成渝双城万人瑜伽大会纪念勋章
				</view>
				<br />
				<view class="price"><text>￥198</text><text>￥500.00</text>
					<view class="xiangqing">详情</view>
				</view>
			</view>

		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isfirst: true,
				headerPosition: "fixed",
				headerTop: null,
				statusTop: null,
				showHeader: true,
				//个人信息,

			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
			this.headerTop = e.scrollTop >= 0 ? null : 0;
			this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
		},
		onLoad() {
			this.statusHeight = 0;
			// #ifdef APP-PLUS
			this.showHeader = false;
			this.statusHeight = plus.navigator.getStatusbarHeight();
			// #endif
		},
		onReady() {
			//此处，演示,每次页面初次渲染都把登录状态重置
			uni.setStorage({
				key: 'UserInfo',
				data: false,
				success: function() {},
				fail: function(e) {}
			});
		},
		onShow() {
			uni.getStorage({
				key: 'UserInfo',
				success: (res) => {
					if (!res.data) {
						if (this.isfirst) {
							//this.toLogin();
						}
						return;
					}
					this.user = res.data;
				},
				fail: (e) => {
					//this.toLogin(); 
				}
			});
		},
		methods: {
			//消息列表
			toMsg() {
				uni.navigateTo({
					url: '../../msg/msg'
				})
			},
			toOrderList(index) {
				uni.setStorageSync('tbIndex', index);
				uni.navigateTo({
					url: '../../user/order_list/order_list?tbIndex=' + index
				})
			},
			toSetting() {
				uni.navigateTo({
					url: '../../user/setting/setting'
				})
			},
			toMyQR() {
				uni.navigateTo({
					url: '../../user/myQR/myQR'
				})
			},
			toLogin() {
				uni.showToast({
					title: '请登录',
					icon: "none"
				});
				uni.navigateTo({
					url: '../../login/login'
				})
				this.isfirst = false;
			},
			isLogin() {
				//实际应用中,用户登录状态应该用token等方法去维持登录状态.
				const value = uni.getStorageSync('UserInfo');
				if (value) {
					return true;
				}
				return false
			},
			toDeposit() {
				uni.navigateTo({
					url: '../../user/deposit/deposit'
				})
			},
			toPage(url) {
				if (!url) {
					uni.showToast({
						title: '模板未包含此页面',
						icon: "none"
					});
					return;
				}
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>
<style lang="scss">
	.back {
		background-image: url(../../../static/img/image04.png);
		width: 100%;
		height: 150upx;
		background-repeat: no-repeat;
		background-size: 100%;
	}

	.information {
		display: flex;
		justify-content: center;
		align-items: center;

		.rightbox {
			width: 450upx;
			margin-left: 10upx;
		}

		.username {
			font-weight: 550;
			font-size: 50upx;
			margin-bottom: 10upx;
		}

		.jianjie {
			font-size: 32upx;
			color: #747474;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		image {
			height: 250upx;
			width: 250upx;

		}
	}

	.baoming {
		position: relative;

		.mybaoming {
			font-size: 50upx;
			font-weight: 550;
			margin-left: 35upx;
			margin-top: 50upx;

		}

		.backcolor {
			width: 210upx;
			height: 40upx;
			background-color: #DD524D;
			position: absolute;
			left: 55upx;
			top: 25upx;
			z-index: -1;

		}
	}

	.mylesson {
		display: flex;
		justify-content: start;

		image {
			margin-left: 35upx;
			margin-top: 40upx;
			width: 230upx;
			height: 180upx;
			// z-index: -1;
			border-radius: 25upx;
		}

		.classinfo {
			flex: 1;
			margin-left: 20upx;
			margin-top: 40upx;

			.classname {
				font-size: 32upx;

				.yibaoming {
					display: inline-block;
					width: 110upx;
					height: 40upx;
					border-radius: 20upx;
					background-color: #DD524D;
					font-size: 28upx;
					text-align: center;
					color: #FFFFFF;
					margin-right: 10upx;
				}
			}

			.placeinfo {
				font-size: 28upx;
				margin-top: 10upx;
				color: #747474;

				text {
					font-weight: bold;
					color: #000000;
				}
			}

			.intime {
				font-size: 28upx;
				margin-top: 10upx;
				color: #747474;

				.xiangqing {
					color: #CCCCCC;
					font-size: 28upx;
					position: absolute;
					right: 20upx;
					display: inline-block;
				}
			}
		}
	}



	.dingdan {
		position: relative;

		.mydingdan {
			font-size: 50upx;
			font-weight: 550;
			margin-left: 35upx;
			margin-top: 50upx;

		}

		.backcolor {
			width: 210upx;
			height: 40upx;
			background-color: #DD524D;
			position: absolute;
			left: 55upx;
			top: 25upx;
			z-index: -1;

		}
	}

	.mylist {
		display: flex;
		justify-content: start;

		image {
			margin-left: 35upx;
			margin-top: 40upx;
			width: 230upx;
			height: 180upx;
			// z-index: -1;
			border-radius: 25upx;
		}

		.listinfo {
			flex: 1;
			margin-left: 20upx;
			margin-top: 40upx;

			.listname {
				font-size: 32upx;

				.daifukuan {
					display: inline-block;
					width: 110upx;
					height: 40upx;
					border-radius: 20upx;
					background-color: #DD524D;
					font-size: 28upx;
					text-align: center;
					color: #FFFFFF;
					margin-right: 10upx;
				}
			}

			.price {
				text:nth-child {
					font-weight: bold;
					font-size: 38upx;
					margin-top: 10upx;
					color: #000000;
				}

				text:nth-child(2) {
					font-size: 26upx;
					color: #747474;
					text-decoration: line-through;
					margin-left: 10upx;
				}

				.xiangqing {
					color: #CCCCCC;
					font-size: 28upx;
					position: absolute;
					right: 20upx;
					display: inline-block;
				}
			}
		}
	}
</style>
