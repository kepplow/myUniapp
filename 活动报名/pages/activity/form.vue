<template>
	<view class="detail">
		<view class="bg" :style="`background-image: url(${baseUrl + formData.active_images});`">
			<view class="back icon xiangqian" @tap="goback"></view>
		</view>
		<view class="content">
			<view class="title">活动报名资料</view>
			<view class="form-item" v-if="findItem('name')">
				<view class="label">姓名</view>
				<input type="text" v-model="commitData.name" placeholder="请输入您的姓名" />
			</view>
			<view class="form-item">
				<view class="label">性别</view>
				<radio-group @change="radioChange">
					<label class="radio">
						<radio value="男" checked="true" color="#DD524D" />男</label>
					<label class="radio">
						<radio value="女" color="#DD524D" />女</label>
				</radio-group>
			</view>
			<view class="form-item" v-if="findItem('id_number')">
				<view class="label">身份证号码</view>
				<input type="text" v-model="commitData.id_number" placeholder="请输入15或18位的身份证" />
			</view>
			<view class="form-item" v-if="findItem('phone')">
				<view class="label">手机号码</view>
				<input type="number" v-model="commitData.phone" placeholder="请输入您的手机号码" />
				<text class="send" @tap="sendMsg">{{sendFlag ? '发送' : timeNum + 's'}}</text>
			</view>
			<view class="form-item" v-if="findItem('phone')">
				<view class="label">验证码</view>
				<input type="number" v-model="commitData.code" placeholder="请输入验证码" />
			</view>
			<view class="form-item" v-if="findItem('emergency_contact')">
				<view class="label">紧急联系人</view>
				<input type="text" v-model="commitData.emergency_contact" placeholder="请输入紧急联系人" />
			</view>
			<view class="form-item" v-if="findItem('contact_address')">
				<view class="label">联系地址</view>
				<input type="text" v-model="commitData.contact_address" placeholder="详细地址,用于奖品发放" />
			</view>
			<view class="form-item" v-if="findItem('emergency_phone')">
				<view class="label">紧急联系人电话</view>
				<input type="number" v-model="commitData.emergency_phone" placeholder="请输入紧急联系人电话" />
			</view>
			<view class="form-item" v-if="findItem('introduce_oneself')">
				<view class="label">自我介绍</view>
				<textarea :auto-height="true" v-model="commitData.introduce_oneself" placeholder="请输入自我介绍" />
				</view>
			<view class="form-item" v-if="findItem('hobby')">
				<view class="label">兴趣爱好</view>
				<textarea :auto-height="true" v-model="commitData.hobby" placeholder="请输入兴趣爱好" />
			</view>
			<view class="form-item" v-if="findItem('area')">
				<view class="label">选择报名场馆</view>
				<picker class="picker-item" mode="selector" :value="commitData.area" :range="formData.area" @change="pickChange">
					<view class="between">{{commitData.area}}
						<view class="icon xiangqian show-icon" style="transform: rotate(-90deg);" ></view>
					</view>
				</picker>
			</view>
			<view class="flex" v-if="findItem('height') || findItem('weight')">
				<view class="form-item" v-if="findItem('height')">
					<view class="label">身高</view>
					<input type="text" v-model="commitData.height" placeholder="cm" />
				</view>
				<view class="form-item" v-if="findItem('weight')">
					<view class="label">体重</view>
					<input type="text" v-model="commitData.weight" placeholder="kg" />
				</view>
			</view>
			<view class="notice">
				<checkbox value="box" color="#DD524D" style="transform:scale(0.6)" :checked="agree" @tap="checkboxChange" />本人已阅读并且同意《*******用户协议》
			</view>
			<!-- <view class="btn" @tap="pay" v-if="formData.price != '0.00'">缴费报名</view> -->
			<view class="btn" @tap="pay">立即报名</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: '',
				timeNum: 5,
				sendFlag: true,
				oid: '',
				baseUrl: 'http://47.106.246.68:8000/',
				formData: {},
				pickdata: [{key: 1, value:'场馆一'},{key: 2, value:'场馆二'}],
				pickvalue: '选择场馆',
				agree: true,
				commitData: {
					name: '',
					sex: '男',
					id_number:'',
					phone: '',
					emergency_contact: '',
					emergency_phone:'',
					introduce_oneself: '',
					hobby: '',
					area: '',
					height: '',
					weight: '',
					code: '',
					contact_address:''
				},
				isReady: false
			}
		},
		beforeMount () {
			this.oid = localStorage.getItem('oid')
			let data = JSON.parse(decodeURIComponent(location.search.substr(6)))
			this.formData = data;
			// uni.request({
			// 	url: 'http://ct.sccdlc.com/api/get/share/params',
			// 	data: {
			// 		url: location.href
			// 	}
			// })
		},
		methods: {
			truePay (orderid) {
				let that = this
				uni.request({
					url: 'http://ct.sccdlc.com/api/wx/pay',
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
			
			// 发送短信验证码
			sendMsg () {
				if (!this.commitData.phone) {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号'
					})
					return
				}
				let that = this
				if (this.sendFlag) {
					uni.request({
						url: 'http://ct.sccdlc.com/api/send/msg',
						data:{
							phone: this.commitData.phone,
							openid: this.oid
						},
						method:'POST',
						success(res) {
							if (res.data.code == 200) {
								uni.showToast({
									title:'发送成功！',
									icon: 'none'
								})
							} else {
								uni.showToast({
									title:'发送失败，请稍后再试',
									icon: 'none'
								})
							}
						}
					})
					this.sendFlag = false
					this.timer = setInterval(()=> {
						this.timeNum--
						if (this.timeNum <= 0) {
							clearInterval(this.timer)
							this.sendFlag = true
							this.timeNum = 5
						}
					},1000)
				} else {
					uni.showToast({
						title: '请稍后再试',
						icon: 'none'
					})
				}
			},
			checkForm () {
				for (let index in this.formData.fillin_field_list) {
					if (!this.commitData[this.formData.fillin_field_list[index].field]) {
						
						uni.showToast({
							icon: 'none',
							title: '请输入' + this.formData.fillin_field_list[index].lable
						})
						return false
					 }
				}
				if (!this.commitData.code) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					})
					return false
				}
				if (!this.agree) {
					uni.showToast({
						icon: 'none',
						title: '未同意用户协议将不能参加报名'
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
					url: 'http://ct.sccdlc.com/api/user/enroll',
					data:{
						...that.commitData,
						openid: that.oid,
						active_id: that.formData.active_id
					},
					method:'POST',
					success(res) {
						
						that.orderid = res.data.data.order_id;
							if (res.data.code == 200) {
								uni.showToast({
									title: '报名成功！',
									icon: 'none'
								})
								uni.navigateTo({
									url: `../goods/goods?orderid=${that.orderid}`
								})
							} else {
								uni.showToast({
									title: '报名失败！'+ res.data.msg,
									icon: 'none'
								})
							}
							
						// this.truePay(res.data.data.order_id)
					}
				})
				
			},
			findItem (str) {
				let item = this.formData.fillin_field_list && this.formData.fillin_field_list.find(ele => ele.field == str)
				return item || false
			},
			radioChange (e) {
				this.commitData.sex = e.detail.value || '男'
			},
			checkboxChange (e) {
				this.agree = !this.agree
			},
			pickChange  (e) {
				this.commitData.area = this.formData.area[e.detail.value];
				
			},
			goback() {
				uni.navigateBack();
			},
			commit() {
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
