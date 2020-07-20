<template>
	<view class="detail">
		<view class="bg" :style="`background-image: url(../../static/img/01.png);`">
			<view class="title">
				<view class="back icon xiangqian" @tap="goback"></view>
				数字奖章和证书
			</view>
			
		</view>
		<view class="content">
			<view class="float-box">
				<view class="title">
					恭喜获得数字奖章和证书
				</view>
				<view class="image-box">
					<image class="bg-black" src="../../static/img/05.png" style="padding: 20upx;box-sizing: border-box;" mode=""></image>
					<image :src="baseUrl + certificateImg" mode=""></image>
				</view>
				<view class="download-btn" @tap="download">
					<view class="icon"></view>
					下载数字证书
				</view>
			</view>
			
			<!-- 二级标题 -->
			<view class="sub-title">
				<view class="left">
					<view>纪念品类</view>
					<text></text>
				</view>
				<view class="right">
					<view class="more">更多</view>
				</view>
			</view>
			<!-- 商品列表 -->
			<view class="goods-list">
				<view class="goods-item" v-for="(item,index) in goodsList" :key="index">
					<image :src="baseUrl + item.goods_images" mode="aspectFill"></image>
					<view class="right">
						<view class="goods-title">
							<text>{{item.title}}</text>
						</view>
			
						<view class="price-box">
							<view class="goods-price">
								￥<text>{{item.actual_price}}</text>
								<text class="old-price">￥{{item.price}}</text>
							</view>
							<view class="btn">立即购买</view>
						</view>
					</view>
				</view>
			</view>
			<view class="back-btn">
				<view class="icon"></view>
				返回
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList: [],
				certificateImg: '',
				orderid: '',
				oid: '',
				baseUrl: 'http://ht.sccdlc.com:8000/',
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
			this.orderid = data.orderid
			this.getCertificateImg(data.orderid)
			this.getGoodsList()
		},
		methods: {
			getGoodsList () {
				let that = this
				uni.request({
					url: 'http://ct.sccdlc.com/api/get/goods/list',
					method: "POST",
					data: {
						openid: that.oid
					},
					success(res) {
						if (res.data.code == 200) {
							console.log(res.data.data)
							that.goodsList = res.data.data
						}
					}
				})
			},
			download () {
				let a = document.createElement('a');
				a.href = this.baseUrl + this.certificateImg
				a.style.display = 'none'
				a.setAttribute('download', 'sdfsd ')
				a.click()
			},
			// 获取证书图片
			getCertificateImg (orderid)  {
				let that = this
				uni.request({
					url: 'http://ct.sccdlc.com/api/order/info',
					method: "POST",
					data: {
						openid: that.oid,
						order_id: orderid
					},
					success(res) {
						if (res.data.code == 200) {
								that.certificateImg = res.data.data.register.certificate_image
						}
					}
				})
			},
			goback() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	.bg {
		width: 100%;
		height: 600upx;
		background-image: url(../../static/img/01.png);
		background-repeat: no-repeat;
		background-size: cover;
		.title {
			position: absolute;
			left: 0;
			right: 0;
			top: 80upx;
			text-align: center;
			color: white;
			font-size: 34upx;
		}
		.back {
			position: absolute;
			top: 5upx;
			left: 40upx;
			color: white;
			padding: 5upx 25upx;
			font-size: 30upx;
			border-radius: 40upx;
			background-color: rgba(255, 255, 255, .1);
		}
	}
	.content {
		margin-top: -200upx;
		padding: 0 20upx;
		.float-box {
			
			
			text-align: center;
			padding: 40upx;
			background-color: white;
			border-radius: 25upx;
			box-shadow: 0 10upx 30upx rgba(0, 0, 0, 0.2);
			.image-box {
				display: flex;
				justify-content: center;
				align-items: center;
				.bg-black {
					background-color: black;
				}
				image {
					width: 274upx;
					margin: 20upx;
					height: 400upx;
					
				}
			}
			.download-btn {
				margin-top: 40upx;
				font-size: 30upx;
				display: inline-block;
				background-color: #DD524D;
				width: 300upx;
				border-radius: 50upx;
				padding: 10upx;
				color: white;
				.icon {
					display: inline-block;
					background-image: url(../../static/img/03.png);
					background-size: 100%;
					background-repeat: no-repeat;
					vertical-align: middle;
					width: 50upx;
					height: 50upx;
					
				}
			}
		}
		.sub-title {
			margin: 50upx 0upx;
			height: 60upx;
			display: flex;
			justify-content: space-between;
		
			.left {
				width: 300upx;
				position: relative;
		
				view {
					position: absolute;
					top: 0;
					width: 300upx;
					font-weight: 550;
					z-index: 2;
				}
		
				text {
					position: absolute;
					top: 20upx;
					left: 20upx;
					display: block;
					width: 160upx;
					height: 35upx;
					background-color: #D44D62;
					z-index: 1;
				}
			}
		
			.right {
				flex: 1;
				font-size: 24upx;
				display: flex;
				justify-content: flex-end;
				align-items: flex-end;
		
				view {
					margin-left: 40upx;
				}
		
				.more {
					color: #bbb;
				}
			}
		}
		.goods-list {
			.goods-item {
				margin-bottom: 80upx;
				display: flex;
		
				image {
					width: 200upx;
					height: 200upx;
				}
		
				.right {
					flex: 1;
					margin-left: 20upx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
		
					.goods-title {
						.tag {
							background-color: #9165BA;
							margin-right: 10upx;
							padding: 2upx 16upx;
							border-radius: 40upx;
							color: white;
						}
		
						font-size: 30upx;
					}
		
					.price-box {
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
		
						.goods-price {
							font-size: 24upx;
							color: black;
		
							text {
								font-size: 36upx;
								font-weight: 550;
								margin-right: 10upx;
							}
		
							.old-price {
								color: #ccc;
								font-weight: normal;
								font-size: 24upx;
								text-decoration: line-through;
							}
						}
		
						.btn {
							background-color: #DD524D;
							color: white;
							font-size: 30upx;
							padding: 10upx 40upx;
							border-radius: 50upx;
						}
					}
				}
			}
		}
		.back-btn {
			position: relative;
			width: 200upx;
			background-color: #DD524D;
			text-align: center;
			color: white;
			border-radius: 50upx;
			margin: auto;
			bottom: 20upx;
			left: 0;
			right: 0;
			padding: 5upx 10upx;
			font-size: 30upx;
			.icon {
				display: inline-block;
				background-image: url(../../static/img/02.png);
				background-repeat: no-repeat;
				background-size: 100%;
				width: 50upx;
				height: 30upx;
				vertical-align: middle;
				margin: 10upx 10upx 10upx 0;
			}
		}
	}

</style>
