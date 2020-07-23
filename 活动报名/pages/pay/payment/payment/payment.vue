<template>
	<view class="detail">
		<view class="bg" :style="`background-image: url(${baseUrl + goodsImage});`">
			<view class="back icon xiangqian" @tap="goback"></view>
		</view>
		<view class="content">
			<view class="title">确认订单</view>
			<view class="form-item">
				<view class="label">姓名</view>
				<input type="text" v-model="commitData.name" placeholder="请输入您的姓名" />
			</view>
			
			<view class="form-item">
				<view class="label">手机号码</view>
				<input type="number" v-model="commitData.phone" placeholder="请输入您的手机号码" />
			</view>
			<view class="form-item">
				<view class="label">购买数量</view>
				<input type="number" v-model="commitData.num" placeholder="输入购买数量" />
			</view>
			<view class="form-item">
				<view class="label">收货地址</view>
				<input type="text" v-model="commitData.address" placeholder="详细地址,用于奖品发放" />
			</view>
			
			<!-- <view class="notice">
				<checkbox value="box" color="#DD524D" style="transform:scale(0.6)" :checked="agree" @tap="checkboxChange" />本人已阅读并且同意《*******用户协议》
			</view> -->
			<!-- <view class="btn" @tap="pay" v-if="formData.price != '0.00'">缴费报名</view> -->
			<view class="btn" @tap="pay">立即购买</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsImage: '',
				goodsId: '',
				oid: '',
				baseUrl: 'http://47.106.246.68:8000/',
				
				pickdata: [{key: 1, value:'场馆一'},{key: 2, value:'场馆二'}],
				pickvalue: '选择场馆',
				
				commitData: {
					name: '',
					phone: '',
					address:'',
					num: 1
				},
				
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
			this.goodsId = data.goodsId
			this.goodsImage = data.goodsImage
			this.getAddress()
		},
		methods: {
			getAddress () {
				let that = this
				uni.request({
					url: 'http://ct.sccdlc.com/api/get/harvest/info',
					method: "POST",
					data: {
						openid: that.oid
					},
					success (res) {
						if (res.data.code == 200) {
							that.commitData.address = res.data.data.address ? res.data.data.address[0] : ''
							that.commitData.phone = res.data.data.phone || ''
						}
					}
				})
			},
			truePay (orderid) {
				let that = this
				uni.request({
					url: 'http://ct.sccdlc.com/api/wx/goods/pay',
					method: "POST",
					data: {
						openid: this.oid,
						order_id: orderid
					},
					success(res) {
						console.log(res.data.data.pay)
						that.jsApiCall(JSON.parse(res.data.data.pay));
					}
				})
			},
			//支付
			
			jsApiCall(jsApiParameters)
			{
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest',
					jsApiParameters,
					function(res){
						if(res.err_msg == "get_brand_wcpay_request:ok" ){
							// 使用以上方式判断前端返回,微信团队郑重提示：
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
							uni.showToast({
								title: '支付成功！',
								icon: 'none'
							})
							uni.navigateTo({
								url: '../tabBar/user/user'
							})
						} else {
							uni.showToast({
								title: res.err_code+res.err_desc+res.err_msg
							})
						}
					}
				);
			},
			// 验证表单
			checkForm () {
				if (!this.commitData.name) {
					uni.showToast({
						icon: 'none',
						title: '请输入姓名'
					})
					return false
				}
				if (!this.commitData.phone) {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号'
					})
					return false
				}
				if (!(this.commitData.num > 0)) {
					uni.showToast({
						icon: 'none',
						title: '数量必须大于0'
					})
					return false
				}
				if (!this.commitData.address) {
					uni.showToast({
						icon: 'none',
						title: '请输入联系地址'
					})
					return false
				}
				return true
			},
			pay () {
				// 验证表单
				let that = this
				let flag = that.checkForm();
				if (!flag) return
				uni.request({
					url: 'http://ct.sccdlc.com/api/get/goods/buy',
					data:{
						...that.commitData,
						openid: that.oid,
						goods_id: that.goodsId
					},
					method:'POST',
					success(res) {
						
						that.orderid = res.data.data.order_id;
							if (res.data.code == 200) {
								uni.showToast({
									title: '下单成功！',
									icon: 'none'
								})
								if (res.data.data && res.data.data.order) {
									that.truePay(res.data.data.order.id)
								}
							} else {
								uni.showToast({
									title: '下单失败！'+ res.data.msg,
									icon: 'none'
								})
							}
							
						// this.truePay(res.data.data.order_id)
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
		height: 500upx;
		background-image: url(../../../../static/img/占位图.png);
		background-size: cover;
		background-repeat: no-repeat;

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
	}

	.title {
		text-align: center;
		padding: 20upx 0;
	}

	.form-item {
		background-color: #ddd;
		border-radius: 10upx;
		margin: 20upx 10upx;
		display: flex;
		justify-content: start;
		align-items: center;
		font-size: 30upx;
		.send {
			background-color: #DD524D;
			padding: 10upx 20upx;
			color: white;
			font-size: 28upx;
			border-radius: 10upx;
		}
		.label {
			min-width: 60upx;
			font-size: 30upx;
			padding: 20upx;
		}

		input {
			margin-right: 20upx;
			flex: 1;
			font-size: 30upx;
		}
	}

	.flex {
		display: flex;
		margin-top: -20upx;
	}
	.between {
		display: flex;
		justify-content: space-between;
	}
	.show-icon {
		display: block;
		background-color: #eee;
		
		font-size: 28upx;
		text-align: center;
		border-radius: 50%;
		margin-left: 10upx;
	}
	.picker-item {
		padding: 0 20upx 0 0;
		flex: 1;
		color: #aaa;
	}
	.notice {
		font-size: 24upx;
		display: flex;
		align-items: center;
	}
	.radio {
		margin-left: 30upx;
	}
	.btn {
		width: 200upx;
		display: inline-block;
		padding: 20upx 50upx;
		background-color: #DD524D;
		margin: 40upx auto;
		font-size: 30upx;
		color: white;
		text-align: center;
		border-radius: 50upx;
		transform: translateX(calc(100% - 100upx));
		
	}
</style>
