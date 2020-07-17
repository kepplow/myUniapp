<template>
	<view class="detail">
		<view class="bg">
			<view class="back icon xiangqian" @tap="goback"></view>
		</view>
		<view class="content">
			<view class="activity-title">atam半手倒立基础课程详解</view>
			<view class="info">
				<view class="info-left">
					<view class="price">
						￥<text>198</text>
						<view class="old-price">
							市场价格&nbsp;
							<text>￥588.00</text>
						</view>
					</view>
					<view class="time">活动时间: <text>2020.07.15-08.15</text></view>
				</view>
				<view class="info-right">
					<view class="num">98</view>
					<view>已参与人数</view>
				</view>
			</view>
			<view class="pull-down">
				<view class="title">课程详情</view>
				<view @tap="showDetaileContent = !showDetaileContent">
					展开
					<view class="icon xiangqian show-icon" :style="`transform: rotate(${showDetaileContent ? -90 : 180}deg);`"></view>
				</view>
			</view>
			<view class="detail-content" :style="`height: ${showDetaileContent ? 'auto' : '0'};`">
				详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情
			</view>
		</view>
		<view class="btn">
			<view class="share">
				<view class="icon"></view>分享给好友
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
				showDetaileContent: true
			}
		},
		methods: {
			goback () {
				uni.navigateBack();
			},
			commit () {
				console.log(2)
				
				
				uni.navigateTo({
					url: '/pages/activity/form'
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
		background-size: 100%;

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
