<template>
	<view>
		<!-- 顶部导航 -->
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in orderType" :key="tbIndex" @tap="showType(tbIndex)">
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		<!-- 考虑非APP端长列表和复杂的DOM使用scroll-view会卡顿，所以漂浮顶部选项卡使用page本身的滑动 -->
		<view class="order-list">
			<view class="list">
				<view class="onorder" v-if="list.length==0">
					<image src="../../../static/img/noorder.png"></image>
					<view class="text">
						没有相关订单
					</view>
				</view>
				<view class="row" v-for="(row,index) in list" :key="index">
					<view class="type">
						<text class="order-id">订单号：{{row.order_id}}</text>
						<text>{{row.status}}</text>
					</view>
					<view class="order-info">
						<view class="left">
							<image v-for="item in row.Goods" :key="item.id" :src="item.goods_img"></image>
						</view>
						<view class="right">
							共<text>{{row.Goods.length}}</text>件>
						</view>

					</view>
					<view class="detail">
						<view class="time">{{row.create_time}}</view>
						<view class="sum">实付金额:<view class="price">￥{{row.pay_price}}</view>
						</view>
					</view>
					<view class="btns">
						<block v-if="row.status=='未支付'">
							<!-- <view class="default" @tap="cancelOrder(row)">取消订单</view> -->
							<view class="pay" @tap="toPayment(row)">立即付款</view>
						</block>
						<!-- <block v-if="row.type=='back'">
							<view class="default" @tap="remindDeliver(row)">提醒发货</view>
						</block> -->
						<block v-if="row.status=='配送中'">
							<!-- <view class="default" @tap="showLogistics(row)">查看物流</view> -->
							<view class="pay" @tap="confirm(row)">确认收货</view>
							<!-- <view class="pay">我要退货</view> -->
						</block>
						<!-- <block v-if="row.type=='received'">
							<view class="default">评价</view>
							<view class="default">再次购买</view>
						</block>
						<block v-if="row.type=='completed'">
							<view class="default">再次购买</view>
						</block>
						<block v-if="row.type=='refunds'">
							<view class="default">查看进度</view>
						</block>
						<block v-if="row.type=='cancelled'">
							<view class="default">已取消</view>
						</block> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				token: '',
				headerPosition: "fixed",
				headerTop: "0px",
				orderType: ['全部', '待付款', '待发货', '配送中', '已完成'],
				//订单列表 演示数据
				orderList: [],
				list: [],
				tabbarIndex: 0
			};
		},
		onLoad(option) {
			// this.token = localStorage.getItem('token');
			this.token = uni.getStorageSync('token')
			//option为object类型，会序列化上个页面传递的参数
			console.log("option: " + JSON.stringify(option));
			let tbIndex = parseInt(option.tbIndex);
			if (tbIndex == 1) {
				this.getOrder(3)
			} else if (tbIndex == 2) {
				this.getOrder(4)
			} else if (tbIndex == 3) {
				this.getOrder(2)
			} else if (tbIndex == 4) {
				this.getOrder(1)
			} else {
				this.getOrder()
			}
			// this.list = this.orderList[tbIndex];
			this.tabbarIndex = tbIndex;
			//兼容H5下排序栏位置
			// #ifdef H5
			let Timer = setInterval(() => {
				let uniHead = document.getElementsByTagName('uni-page-head');
				if (uniHead.length > 0) {
					this.headerTop = uniHead[0].offsetHeight + 'px';
					clearInterval(Timer); //清除定时器
				}
			}, 1);
			// #endif
		},
		onPageScroll(e) {
			return;
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
		},
		methods: {
			confirm(row) {
				this.$http.post('api/user/confirm/receipt', {
					token: this.token,
					order_id: row.order_id
				}).then(res => {
					console.log(res)
					uni.showToast({
						icon: 'none',
						title: res.message
					})
					this.tabbarIndex = 0
					this.getOrder()
				})
			},
			jsApiCall(jsApiParameters) {
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest',
					jsApiParameters,
					function(res) {
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							// 使用以上方式判断前端返回,微信团队郑重提示：
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
							uni.hideLoading();
							uni.showToast({
								title: '支付成功！',
								icon: 'none'
							})
							this.tabbarIndex = 0
							this.getOrder()
						} else {
							uni.showToast({
								icon: 'none',
								title: '支付失败'
							})
						}
					}
				);
			},
			// 获取不同状态订单
			getOrder(state) {
				this.$http.post('api/user/get/order', {
					token: this.token,
					state
				}).then(res => {
					console.log(res)
					this.list = res.data
				})
			},
			showType(tbIndex) {
				this.tabbarIndex = tbIndex;
				// this.list = this.orderList[tbIndex];
				if (tbIndex == 1) {
					this.getOrder(3)
				} else if (tbIndex == 2) {
					this.getOrder(4)
				} else if (tbIndex == 3) {
					this.getOrder(2)
				} else if (tbIndex == 4) {
					this.getOrder(1)
				} else {
					this.getOrder()
				}
			},
			showLogistics(row) {

			},
			remindDeliver(row) {
				uni.showToast({
					title: '已提醒商家发货'
				})
			},
			cancelOrder(row) {
				uni.showModal({
					title: '取消订单',
					content: '确定取消此订单？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.doCancelOrder(row.ordersn);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			doCancelOrder(ordersn) {
				let typeNum = this.orderList.length;
				for (let i = 0; i < typeNum; i++) {
					let list = this.orderList[i];
					let orderNum = list.length;
					if (orderNum > 0 && list[0].type == 'unpaid') {
						for (let j = 0; j < orderNum; j++) {
							if (this.orderList[i][j].ordersn == ordersn) {
								this.orderList[i][j].type = 'cancelled';
								break;
							}
						}
					}

				}
			},
			toPayment(row) {
				//本地模拟订单提交UI效果
				uni.showLoading({
					title: '正在获取订单...'
				})
				// let paymentOrder = [];
				// paymentOrder.push(row);
				// setTimeout(() => {
				// 	uni.setStorage({
				// 		key: 'paymentOrder',
				// 		data: paymentOrder,
				// 		success: () => {
				// 			uni.hideLoading();
				// 			uni.navigateTo({
				// 				url: '../../pay/payment/payment?amount=' + row.payment
				// 			})
				// 		}
				// 	})
				// }, 500)
				
				// #ifdef H5
					let pay_type = 1
					let url = 'api/wx/pay'
				// #endif
				// #ifdef MP
					let pay_type = 2
					let url = 'api/applets/wx/pay'
				// #endif
				
				this.$http.post(url, {
					token: this.token,
					order_id: row.order_id,
					pay_type
				}).then(res => {
					// #ifdef H5
						this.jsApiCall(JSON.parse(res.data.pay));
					// #endif
					
					// #ifdef MP
						this.MPPay(JSON.parse(res.data.pay))
					// #endif
				})
			},
			MPPay (payData) {
				uni.requestPayment({
				    ...payData,
					provider: 'wxpay',
				    success: function (res) {
				        uni.hideLoading();
				        uni.showToast({
				        	title: '支付成功！',
				        	icon: 'none'
				        })
				        setTimeout(() => {
				        	uni.navigateTo({
				        		url: 'pages/user/order_list/order_list?tbIndex=2'
				        	})
				        }, 500)
				    },
				    fail: function (err) {
				        uni.hideLoading();
				        uni.showToast({
				        	title: '支付失败！',
				        	icon: 'none'
				        })
				    }
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f3f3;
	}

	/* #ifdef H5 */
	uni-page-head {
		display: none;
	}

	/* #endif */


	.topTabBar {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #f8f8f8;
		height: 80upx;
		display: flex;
		justify-content: space-around;

		.grid {
			width: 20%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #444;
			font-size: 28upx;

			.text {
				height: 76upx;
				display: flex;
				align-items: center;

				&.on {
					color: #f06c7a;
					border-bottom: solid 4upx #f06c7a;
				}
			}

		}
	}

	.order-list {
		margin-top: 80upx;
		padding-top: 20upx;
		width: 100%;

		.list {
			width: 94%;
			margin: 0 auto;

			.onorder {
				width: 100%;
				height: 50vw;
				display: flex;
				justify-content: center;
				align-content: center;
				flex-wrap: wrap;

				image {
					width: 20vw;
					height: 20vw;
					border-radius: 100%;
				}

				.text {
					width: 100%;
					height: 60upx;
					font-size: 28upx;
					color: #444;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.row {
				width: calc(100% - 40upx);
				padding: 10upx 20upx;
				border-radius: 10upx;
				background-color: #fff;
				margin-bottom: 20upx;

				.type {
					font-size: 26upx;
					color: #ec652f;
					height: 50upx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.order-id {
						color: #333;
					}
				}

				.order-info {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20upx 0;

					.left {
						flex: 1;
						flex-wrap: nowrap;
						overflow-x: scroll;
						overflow-y: hidden;

						image {
							width: 25vw;
							height: 25vw;
							border-radius: 10upx;
							margin-right: 20upx;
						}
					}

					.right {
						margin-right: 10upx;
						position: relative;
						color: #999;
						font-size: 42upx;

						.name {
							width: 100%;
							font-size: 28upx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}

						.spec {
							color: #a7a7a7;
							font-size: 22upx;

						}

						.price-number {
							position: absolute;
							bottom: 0;
							width: 100%;
							display: flex;
							justify-content: flex-end;
							font-size: 22upx;
							color: #333;
							display: flex;
							align-items: flex-end;

							.price {
								font-size: 24upx;
								margin-right: 5upx;
							}

						}
					}
				}

				.detail {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					height: 60upx;
					font-size: 26upx;

					.time {
						color: #B0B0B0;
						font-size: 28upx;
					}

					.sum {
						padding: 0 8upx;
						display: flex;
						align-items: flex-end;
						color: #626262;
						font-size: 30upx;

						.price {
							font-size: 30upx;
							color: #FF494A;
						}
					}

				}

				.btns {
					height: 80upx;
					display: flex;
					align-items: center;
					justify-content: flex-end;

					view {
						min-width: 120upx;
						height: 50upx;
						padding: 0 20upx;
						border-radius: 50upx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 28upx;
						margin-left: 20upx;
					}

					.default {
						border: solid 1upx #ccc;
						color: #666;
					}

					.pay {
						border: solid 1upx #ec652f;
						color: #ec652f;
					}
				}
			}
		}
	}
</style>
