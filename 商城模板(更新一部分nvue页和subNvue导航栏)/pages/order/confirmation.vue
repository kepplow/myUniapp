<template>
	<view>
		<!-- 收货地址 -->
		<view class="addr" @tap="selectAddress">
			<view class="icon">
				<image src="../../static/img/addricon.png" mode=""></image>
			</view>
			<view class="right">
				<view class="tel-name">
					<view class="name">
						{{recinfo.name}}
					</view>
					<view class="tel">
						{{recinfo.phone}}
					</view>
				</view>
				<view class="addres">
					{{recinfo.area}}
					{{recinfo.address}}
				</view>
			</view>
		</view>
		<view class="time">
			<view class="table">配送时间:</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-db">
					<picker mode="date" fields="day" :value="deliverydate" @change="bindDateChange">
						<view class="uni-input">{{deliverydate}}</view>
					</picker>

				</view>
				<view class="uni-list-cell-db">
					<picker mode="time" :value="deliverytime" @change="bindTimeChange">
						<view class="uni-input">{{deliverytime}}</view>
					</picker>
				</view>
			</view>
		</view>
		<!-- 购买商品列表 -->
		<view class="buy-list">
			<view class="row" v-for="(row,index) in buylist" :key="index">
				<view class="goods-info">
					<view class="img">
						<image :src="row.goods_img"></image>
					</view>
					<view class="info">
						<view class="title">{{row.goods_title}}</view>
						<view class="spec">数量:{{row.num}}</view>
						<view class="price-number">
							<view class="price">￥{{(row.price*row.num) | toFixed}}</view>
							<view class="number">

							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 提示-备注 -->
		<!-- <view class="order">
			<view class="row">
				<view class="left">
					积分 :
				</view>
				<view class="right">
					已扣除{{int}}积分抵扣{{deduction|toFixed}}元
				</view>
			</view>
			<view class="row">
				<view class="left">
					备注 :
				</view>
				<view class="right">
					<input placeholder="选填,备注内容" v-model="note" />
				</view>
			</view>
		</view> -->
		<!-- 明细 -->
		<view class="detail">
			<view class="row">
				<view class="nominal">
					商品金额
				</view>
				<view class="content">
					￥{{goodsPrice|toFixed}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					运费
				</view>
				<view class="content">
					￥+{{freight|toFixed}}
				</view>
			</view>
			<!-- <view class="row">
				<view class="nominal">
					积分抵扣
				</view>
				<view class="content">
					￥-{{deduction|toFixed}}
				</view>
			</view> -->
		</view>
		<view class="blck">

		</view>
		<view class="footer">
			<view class="settlement">
				<view class="sum">合计:<view class="money">￥{{sumPrice|toFixed}}</view>
				</view>
				<view class="btn" @tap="toPay">提交订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				deliverytime: this.getDeliverytime(),
				deliverydate: this.getDeliverydate(),
				token: '',
				buylist: [], //订单列表
				goodsPrice: 0.0, //商品合计价格
				sumPrice: 0.0, //用户付款价格
				freight: 0, //运费
				note: '', //备注
				int: 1200, //抵扣积分
				deduction: 0, //抵扣价格
				recinfo: {}

			};
		},
		onShow() {
			//页面显示时，加载订单信息
			uni.getStorage({
				key: 'buylist',
				success: (ret) => {
					this.buylist = ret.data;
					this.goodsPrice = 0;
					//合计
					let len = this.buylist.length;
					for (let i = 0; i < len; i++) {
						this.goodsPrice = this.goodsPrice + (this.buylist[i].num * this.buylist[i].price);
					}
					this.deduction = this.int / 100;
					this.sumPrice = this.goodsPrice + this.freight;
				}
			});
			uni.getStorage({
				key: 'selectAddress',
				success: (e) => {
					this.recinfo = e.data;
					uni.removeStorage({
						key: 'selectAddress'
					})
				}
			})
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
			this.$http.post('api/get/user/address', {
				token: this.token
			}).then(res => {
				if (res.data.length > 0) {
					this.recinfo = res.data[0]
				}
			})
		},
		onBackPress() {
			//页面后退时候，清除订单信息
			this.clearOrder();
		},
		filters: {
			toFixed: function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			
		},
		methods: {
			getDeliverytime () {
				let str = new Date();
				return str.getHours() + ":" + str.getMinutes()
			},
			getDeliverydate() {
				let str = new Date()
				return str.getFullYear() + "-" +
					(str.getMonth() + 1) + "-" + str.getDate()
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindTimeChange(e) {
				this.deliverytime = e.target.value
			},
			bindDateChange(e) {
				this.deliverydate = e.target.value
			},
			clearOrder() {
				uni.removeStorage({
					key: 'buylist',
					success: (res) => {
						this.buylist = [];
						console.log('remove buylist success');
					}
				});
			},
			toPay() {
				//商品列表
				let paymentOrder = [];
				let goodsid = [];
				let len = this.buylist.length;
				for (let i = 0; i < len; i++) {
					paymentOrder.push(this.buylist[i]);
					goodsid.push(this.buylist[i].id);
				}
				if (paymentOrder.length == 0 || !this.recinfo) {
					uni.showToast({
						title: '订单信息有误，请重新购买',
						icon: 'none'
					});
					return;
				}
				//本地模拟订单提交UI效果
				uni.showLoading({
					title: '正在提交订单...'
				})
				// setTimeout(() => {
				// 	uni.setStorage({
				// 		key: 'paymentOrder',
				// 		data: paymentOrder,
				// 		success: () => {
				// 			uni.hideLoading();
				// 			uni.redirectTo({
				// 				url: "../pay/payment/payment?amount=" + this.sumPrice
				// 			})
				// 		}
				// 	})
				// }, 1000)
				let goodsList = []
				this.buylist.forEach(ele => {
					goodsList.push({
						id: ele.goods_id,
						num: ele.num,
						is_active: ele.is_active
					})
				})
				this.$http.post('api/user/bug/goods', {
					token: this.token,
					goods: goodsList,
					area: this.recinfo.area,
					address: this.recinfo.address,
					phone: this.recinfo.phone,
					name: this.recinfo.name,
					delivery_time: this.deliverydate + ' ' + this.deliverytime
				}).then(res => {
					console.log(res)
					// 发起支付
					if (res.data.orderId) {
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
							order_id: res.data.orderId,
							pay_type
						}).then(res => {
							// #ifdef H5
							this.jsApiCall(JSON.parse(res.data.pay));
							// #endif

							// #ifdef MP
							this.MPPay(JSON.parse(res.data.pay))
							// #endif
						})
					}
					uni.showToast({
						icon: 'none',
						title: res.message
					})
				})

			},
			MPPay(payData) {
				uni.requestPayment({
					...payData,
					provider: 'wxpay',
					success: function(res) {
						uni.hideLoading();
						uni.showToast({
							title: '支付成功！',
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '../user/order_list/order_list?tbIndex=0'
							})
						}, 500)
					},
					fail: function(err) {
						uni.hideLoading();
						uni.showToast({
							title: '支付失败！',
							icon: 'none'
						})
					}
				});
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
							setTimeout(() => {
								uni.navigateTo({
									url: '../user/order_list/order_list?tbIndex=0'
								})
							}, 500)

						} else {
							uni.showToast({
								icon: 'none',
								title: '支付失败'
							})
						}
					}
				);
			},
			//选择收货地址
			selectAddress() {
				uni.navigateTo({
					url: '../user/address/address?type=select'
				})
			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef H5 */
	uni-page-head {
		display: none;
	}

	/* #endif */
	.addr {
		width: 86%;
		padding: 20upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
		display: flex;

		.icon {
			width: 80upx;
			height: 80upx;
			display: flex;
			align-items: center;

			image {
				width: 60upx;
				height: 60upx;
			}
		}

		.tel-name {
			width: 100%;
			display: flex;
			font-size: 32upx;

			.tel {
				margin-left: 40upx;
			}
		}

		.addres {
			width: 100%;
			font-size: 26upx;
			color: #999;
		}
	}

	.time {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.table {
			font-size: 34upx;
		}

		.uni-list-cell-db {
			display: inline-block;
			color: #999999;
			font-size: 30upx;
			margin: 10upx;
		}
	}

	.buy-list {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			margin: 30upx 0;

			.goods-info {
				width: 100%;
				display: flex;

				.img {
					width: 22vw;
					height: 22vw;
					border-radius: 10upx;
					overflow: hidden;
					flex-shrink: 0;
					margin-right: 10upx;

					image {
						width: 22vw;
						height: 22vw;
					}
				}

				.info {
					width: 100%;
					height: 22vw;
					overflow: hidden;
					display: flex;
					flex-wrap: wrap;
					position: relative;

					.title {
						width: 100%;
						font-size: 28upx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						// text-align: justify;
						overflow: hidden;
					}

					.spec {
						font-size: 22upx;
						background-color: #f3f3f3;
						color: #a7a7a7;
						height: 40upx;
						display: flex;
						align-items: center;
						padding: 0 10upx;
						border-radius: 20upx;
						margin-bottom: 20vw;
					}

					.price-number {
						position: absolute;
						width: 100%;
						bottom: 0upx;
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						font-size: 28upx;
						height: 40upx;

						.price {
							color: #f06c7a;
						}

						.number {
							display: flex;
							justify-content: center;
							align-items: center;

						}
					}
				}
			}
		}
	}

	.order {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			margin: 20upx 0;
			height: 40upx;
			display: flex;

			.left {
				font-size: 28upx;
			}

			.right {
				margin-left: 40upx;
				font-size: 26upx;
				color: #999;

				input {
					font-size: 26upx;
					color: #999;
				}
			}
		}
	}

	.blck {
		width: 100%;
		height: 100upx;
	}

	.footer {
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;

		.settlement {
			width: 80%;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.sum {
				width: 50%;
				font-size: 28upx;
				margin-right: 10upx;
				display: flex;
				justify-content: flex-end;

				.money {
					font-weight: 600;
				}
			}

			.btn {
				padding: 0 30upx;
				height: 60upx;
				background-color: #f06c7a;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				border-radius: 40upx;
			}
		}
	}

	.detail {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			height: 60upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.nominal {
				font-size: 28upx;
			}

			.content {
				font-size: 26upx;
				color: #f06c7a;
			}
		}
	}
</style>
