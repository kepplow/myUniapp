<template>
	<view class="backPic">
		<!-- <view class="icon xiangqian" @tap="goback"></view> -->
		<image :src="bg_img" class="bg-img" mode="widthFix"></image>
		<view class="title-act">活动详情页</view>
		<view class="font-box">
			<image class="font-in" src="../../static/img/font-box-2.png"></image>
		</view>
		<view class="act-time">【截止时间 {{invalid_time}}】</view>
		<!-- 优惠券 -->
		<!-- <view class="quan">
			<view class="qleftBox">
				<view class="qprice">
					￥<text>10</text>
				</view>
				<view class="middleBox">
					<view class="enough">全场满<text>￥100</text>可用</view>
					<view class="xianshi">仅限活动期内有效</view>
				</view>
			</view>
			<view class="qright-box">
				<view class="lingquBox">
					<view class="lingqu">点击领取</view>
				</view>
			</view>
		</view> -->

		<!-- 活动商品列表 -->
		<view class="rcmdBox1">
			<view class="rcmdTitle">
				<view class="rtext1">夏季水果狂欢趴 品质推荐</view>
				<view class="rtext2">鲜果狂欢，怎能少了TA</view>
			</view>
			<!-- <view class="r1boxList1">
				<image class="list1Image" src="../../static/img/category/list/9.jpg"></image>
				<view class="listRight">
					<view class="list1goodsName">美国加州樱桃</view>
					<view class="list1goodsJieshao">供应周期短 限量珍贵</view>
					<view class="list1btnBox">
						<view class="jiage">￥<text>782</text>/450g</view>
						<view class="btn-gou">
							<view class="btn-font">立即抢购</view>
						</view>
					</view>
				</view>
			</view> -->
			<view class="r1boxList2out">
				<view class="item" v-for="(item, index) in goodsList" :key="index" @tap="toGoods(item)">
					<view class="r1boxList2">
						<image class="list2Image" :src="item.activity_goods_img"></image>
						<view class="list2goodsName">{{item.goods_details.title}}</view>
						<view class="list2goodsJieshao">{{item.goods_details.explain}}</view>
						<view class="act-price">活动价<view class="fuhao">￥<text>{{item.final_price}}</text></view>
						</view>
						<view class="list2btnBox">
							<view class="progress">
								<view class="progress-done" :style="'width:' + progressWidth(item) + '%;'"></view>
							</view>
							<text class="percent">{{progressWidth(item)}}%</text>
							<view class="btn-mai">
								<view class="nowGou">马上抢购 ></view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		
	</view>


</template>

<script>
	export default {
		data () {
			return {
				bg_img: '',
				activityId: '',
				token: '',
				invalid_time: '',
				goodsList: [{
					
				}]
			}
		},
		onLoad(option) {
			console.log(option)
			this.token = uni.getStorageSync('token')
			this.activityId = option.activityId
			this.invalid_time = option.invalid_time
			this.bg_img = option.bg_img
		},
		onShow() {
			this.getActivity(this.activityId)
		},
		methods: {
			progressWidth (item) {
				return (item.stock/item.amount*100).toFixed(0)
			},
			toGoods (item) {
				uni.navigateTo({
					url: '../goods/goods?goodsId=' + item.id + '&isActive=1'
				})
			},
			goback () {
				uni.navigateBack()
			},
			getActivity(id) {
				this.$http.post('api/home/activity/goods', {
					activityId: id
				}).then(res=> {
					this.goodsList = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.backPic {
		// height: 4460upx;
		padding-bottom: 60upx;
		// width: 750upx;
		background-size: 100% auto;
		
		.bg-img {
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			height: auto;
			z-index: -1;
		}
		.icon.xiangqian {
			color: #666666;
			width: 23px;
			height: 42px;
			padding-left: 30upx;
			padding-top: 20upx;
			font-weight: bold;
		}

		.title-act {
			font-family: "微软雅黑";
			color: #FFFFFF;
			font-size: 36upx;
			font-weight: 400;
			display: flex;
			justify-content: center;
			margin-top: -70upx;
		}

		.font-box {
			width: 302upx;
			height: 638upx;
			background-size: 100% 100%;
			// position: absolute;
			margin-top: 45upx;
			margin-left: 177upx;

			.font-in {
				width: 466upx;
				height: 519upx;
				padding-top: 64upx;
				margin-left: -55upx;
			}
		}

		.act-time {
			text-align: center;
			font-size: 24upx;
			font-weight: 500;
			line-height: 42upx;
			text-shadow: 5upx 9upx 10upx rgba(255, 255, 255, 1);
			padding-top: 200upx;
		}

		.quan {
			width: 727upx;
			height: 181upx;
			background-image: url(../../static/img/quan-box.png);
			background-size: 100% 100%;
			margin-left: 15upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.qleftBox {
				display: flex;
				// flex-direction: column;
				justify-content: start;
				align-items: center;
				flex: 1;

				.qprice {
					// width:138upx;
					// height:79upx;
					font-size: 36upx;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					padding-left: 52upx;

					text {
						font-size: 50px;
					}
				}

				.middleBox {
					display: flex;
					flex-direction: column;
					align-items: center;
					padding-left: 18upx;

					.enough {
						font-size: 30upx;
						// font-family:Source Han Sans CN;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
						padding-bottom: 10upx;
					}

					.xianshi {
						// width: 216upx;
						height: 25upx;
						font-size: 26upx;
						// font-family:PingFang SC;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
						padding-bottom: 10upx;
					}
				}
			}

			.qright-box {
				width: 250upx;
				height: 74upx;
				border-left: 1upx solid rgba(89, 216, 97, 1);

				// position: absolute;
				// top:50upx;
				// right: 0upx;
				.lingquBox {
					width: 160upx;
					height: 43upx;
					background: rgba(89, 216, 97, 1);
					opacity: 0.7;
					border-radius: 22upx;
					margin-left: 31upx;
					margin-top: 16upx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.lingqu {
						font-size: 24upx;
						// font-family:PingFang SC;
						font-weight: 400;
						color: rgba(255, 254, 254, 1);
						// text-align: center;
						// padding-top: 8upx;
					}
				}
			}
		}


		.rcmdBox1 {
			width: calc(100% - 80upx);
			// height: 1395upx;
			background: linear-gradient(125deg, rgba(255, 255, 254, 1) 21%, rgba(255, 250, 250, 1) 54%, rgba(255, 254, 253, 1) 85%);
			box-shadow: 3upx 4upx 10upx 0upx rgba(247, 125, 148, 0.3);
			opacity: 0.8;
			border-radius: 10upx;
			margin-left: 20upx;
			margin-right: 20upx;
			text-align: center;
			padding: 0 20upx;
			margin-top: 70upx;
			padding-bottom: 16upx;

			.rcmdTitle {
				background-image: url(../../static/img/rcmdTitle.png);
				background-size: 100% 100%;
				display: inline-block;
				padding: 22upx;
				position: relative;
				margin-top: -100upx;

				.rtext1 {

					font-size: 27upx;
					font-family: "HYQiHei";
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
					line-height: 10upx;
					text-shadow: 0upx 2upx 1upx rgba(184, 21, 21, 0.44);
					padding-top: 12upx;
					letter-spacing: 3upx;
					margin-bottom: 10upx;
				}

				.rtext2 {
					// width:208upx;
					// height:19upx;
					font-size: 11upx;
					font-family: "HYQiHei";
					// font-weight: bold;
					color: rgba(255, 255, 255, 1);
					text-shadow: 0upx 2upx 1upx rgba(184, 21, 21, 0.44);
					padding-top: 5upx;
					// letter-spacing: 3upx;
				}
			}

			.r1boxList1 {
				width: 525upx;
				background: rgba(255, 255, 255, 1);
				border: 2upx solid rgba(85, 196, 125, 1);
				border-radius: 28upx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				padding: 30upx;
				margin-top: 55upx;
				margin-left: 36upx;

				.list1Image {
					height: 195upx;
					width: 200upx;
				}

				.listRight {
					flex: 1;
					height: 100%;
					// background-color: red;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					margin-left: 25upx;

					// padding-right: 63upx;
					.list1goodsName {
						font-size: 32upx;
						// font-family:Source Han Sans CN;
						font-weight: bold;
						color: rgba(34, 34, 34, 1);
						line-height: 42upx;

					}

					.list1goodsJieshao {
						font-size: 23upx;
						color: rgba(34, 34, 34, 1);
						line-height: 42upx;
					}
					.list1btnBox {
						background: rgba(89, 216, 97, 1);
						padding: 20upx 10upx;
						border-radius: 9px;
						display: flex;
						justify-content: space-around;
						align-items: center;
					
						// padding-right: 8upx;
						.jiage {
							font-size: 22upx;
							font-weight: bold;
							color: rgba(255, 255, 255, 1);
							line-height: 24upx;
							margin-top: 5upx;
							margin-left: 5upx;
							margin-right: 5upx;

							text {
								font-size: 45upx;
								font-weight: bold;
								color: rgba(255, 255, 255, 1);
								line-height: 24upx;
							}
						}

						.btn-gou {
							// width:94upx;
							background: rgba(255, 255, 0, 1);
							border-radius: 9upx;
							display: flex;
							justify-content: center;
							align-items: center;
							padding-right: 5upx;

							.btn-font {
								display: inline-block;
								font-size: 24upx;
								font-weight: bold;
								color: rgba(255, 52, 52, 1);
								margin-bottom: 5upx;
							}
						}
					}
				}
			}

			.r1boxList2out {
				margin-top: 27upx;
				width: 100%;
				height: 640upx;
				display: flex;
				flex-wrap: wrap;

				

					
				.r1boxList2 {
					height: 594upx;
					margin-bottom: 20upx;
					padding: 20upx 10upx;
					border: 3upx solid rgba(85, 196, 125, 1);
					border-radius: 5upx;
					margin: 0 10upx;
					overflow: hidden;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					// margin-left: 10upx;
					// margin-right: 10upx;
					// margin-bottom: 20upx;
					.list2Image {
						height: 200upx;
						width: 220upx;
					}


					.list2goodsName {
						font-size: 36upx;
						// font-family:Source Han Sans CN;
						font-weight: bold;
						color: rgba(34, 34, 34, 1);
						line-height: 53upx;
					}

					.list2goodsJieshao {
						font-size: 24upx;
						// font-family:Source Han Sans CN;
						font-weight: bold;
						color: rgba(20, 20, 20, 1);
						// line-height:51upx;
					}

					.act-price {
						font-size: 18upx;
						font-weight: 400;
						color: rgba(50, 50, 50, 1);
						margin-bottom: 5upx;

						.fuhao {
							font-size: 24upx;
							font-weight: 500;
							color: rgba(51, 51, 51, 1);
							display: inline-block;
							margin-left: 12upx;

							text {
								font-size: 40upx;
								font-weight: 500;
								color: rgba(51, 51, 51, 1);
							}
						}
					}

					.list2btnBox {
						min-width:277upx;
						padding: 10upx 0;
						padding-left: 5upx;
						padding-right: 10upx;
						// height:57upx;
						background: rgba(89, 216, 97, 1);
						border-radius: 29upx;
						display: flex;
						justify-content: space-around;
						align-items: center;

						.progress {
							width: 65upx;
							height: 8upx;
							background: rgba(255, 255, 255, 0.6);
							border-radius: 4px;

							.progress-done {
								height: 8upx;
								background: rgba(255, 255, 255, 1);
								border-radius: 4upx;
								width: 90%;
							}
						}

						.percent {
							// display: inline-block;
							font-size: 14upx;
							font-weight: 400;
							color: rgba(255, 255, 255, 1);
						}

						.btn-mai {
							// width: 160upx;
							// height: 43upx;
							background: rgba(255, 255, 255, 1);
							border-radius: 22upx;
							display: flex;
							justify-content: center;
							align-items: center;
							margin-left: 5upx;

							.nowGou {
								font-size: 24upx;
								font-weight: bold;
								color: rgba(255, 0, 0, 1);
							}
						}
					}


				}
				.item {
					width: 50%;
					display: flex;
					justify-content: center;
					align-items: flex-start;
					margin-bottom: 20upx;
					.r1boxList2 {
						width: 100%;
						border: 3upx solid #55C47D;
						padding: 20upx;
						text-align: center;
						image.list2Image {
							width: 260upx;
							height: 260upx;
						}
						.list2goodsName {
							font-size: 36upx;
							font-weight: bold;
						}
					}
					
				}
			}
		}

		.rcmdBox2 {
			width: calc(100% - 80upx);
			background: linear-gradient(125deg, rgba(255, 255, 254, 1) 21%, rgba(255, 250, 250, 1) 54%, rgba(255, 254, 253, 1) 85%);
			box-shadow: 3upx 4upx 10upx 0upx rgba(247, 125, 148, 0.3);
			opacity: 0.8;
			border-radius: 10upx;
			margin-left: 20upx;
			margin-right: 20upx;
			text-align: center;
			padding: 0 21upx;
			margin-top: 70upx;
			padding-bottom: 60upx;

			.rcmdTitle {
				background-image: url(../../static/img/rcmdTitle.png);
				background-size: 100% 100%;
				display: inline-block;
				padding: 22upx;
				position: relative;
				margin-top: -100upx;

				.rtext1 {

					font-size: 27upx;
					font-family: "HYQiHei";
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
					line-height: 10upx;
					text-shadow: 0upx 2upx 1upx rgba(184, 21, 21, 0.44);
					padding-top: 12upx;
					letter-spacing: 3upx;
					margin-bottom: 10upx;
				}

				.rtext2 {
					// width:208upx;
					// height:19upx;
					font-size: 11upx;
					font-family: "HYQiHei";
					// font-weight: bold;
					color: rgba(255, 255, 255, 1);
					text-shadow: 0upx 2upx 1upx rgba(184, 21, 21, 0.44);
					padding-top: 5upx;
					// letter-spacing: 3upx;
				}
			}

			.r2boxListout {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 40upx;

				.r2boxList {
					display: flex;
					justify-content: space-around;
					align-items: center;
					border: 3upx solid rgba(85, 196, 125, 1);
					border-radius: 5upx;
					padding: 30upx 30upx;

					.r2listImage {
						flex: 1;
						height: 200upx;
						width: 220upx;
					}

					.r2listRightbox {
						// flex: 1;
						margin-left: 20upx;

						.r2listgoodsName {
							font-size: 36upx;
							font-family: "微软雅黑";
							font-weight: bold;
							color: rgba(34, 34, 34, 1);
							line-height: 53upx;
							text-align: start;
							padding: 0 20upx;
						}

						.r2listgoodsJieshao {
							font-size: 24upx;
							font-weight: bold;
							color: rgba(20, 20, 20, 1);
							line-height: 51upx;
							border-bottom: 1upx solid rgba(85, 196, 125, 1);
							padding: 0 10upx;
						}

						.font-price {
							margin-top: 25upx;
							padding: 0 5upx;
							font-size: 20upx;
							font-weight: 500;
							color: rgba(100, 100, 100, 1);

							.jin {
								display: inline-block;
								margin-left: 5upx;
								font-size: 24upx;
								font-weight: 500;
								color: rgba(51, 51, 51, 1);

								text {
									font-size: 36upx;
									font-weight: bold;
									color: rgba(51, 51, 51, 1);
								}
							}

							.font-yuanjia {
								display: inline-block;
								margin-left: 10upx;

								text {
									text-decoration: line-through;
								}
							}
						}

						.r2listbtnBox {
							margin-top: 5upx;
							padding-left: 5upx;
							padding-right: 10upx;
							height: 57upx;
							background: rgba(89, 216, 97, 1);
							border-radius: 29upx;
							display: flex;
							justify-content: space-around;
							align-items: center;

							.progress {
								width: 106upx;
								height: 8upx;
								background: rgba(255, 255, 255, 0.6);
								border-radius: 4px;

								.progress-done {
									height: 8upx;
									background: rgba(255, 255, 255, 1);
									border-radius: 4upx;
									width: 90%;
								}
							}

							.percent {
								// display: inline-block;
								font-size: 14upx;
								font-weight: 400;
								color: rgba(255, 255, 255, 1);
							}

							.btn-mai {
								width: 160upx;
								height: 43upx;
								background: rgba(255, 255, 255, 1);
								border-radius: 22upx;
								display: flex;
								justify-content: center;
								align-items: center;
								margin-left: 5upx;

								.nowGou {
									font-size: 24upx;
									font-weight: bold;
									color: rgba(255, 0, 0, 1)
								}
							}
						}
					}
				}
			}
		}
	}
</style>
