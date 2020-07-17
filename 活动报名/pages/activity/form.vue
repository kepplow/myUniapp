<template>
	<view class="detail">
		<view class="bg">
			<view class="back icon xiangqian" @tap="goback"></view>
		</view>
		<view class="content">
			<view class="title">活动报名资料</view>
			<view class="form-item">
				<view class="label">姓名</view>
				<input type="text" value="" placeholder="请输入您的姓名" />
			</view>
			<view class="form-item">
				<view class="label">证件类型</view>
				<input type="text" value="" placeholder="身份证" disabled />
			</view>
			<view class="form-item">
				<view class="label">身份证号码</view>
				<input type="text" value="" placeholder="请输入15或18位的身份证" />
			</view>
			<view class="form-item">
				<view class="label">手机号码</view>
				<input type="text" value="" placeholder="请输入您的手机号码" />
			</view>
			<view class="form-item">
				<view class="label">选择报名场馆</view>
				<picker class="picker-item" mode="selector" range-key="value" :value="pickvalue" :range="pickdata" @change="pickChange">
					<view class="between">{{pickvalue}}
						<view class="icon xiangqian show-icon" style="transform: rotate(-90deg);" ></view>
					</view>
				</picker>
			</view>
			<view class="flex">
				<view class="form-item">
					<view class="label">身高</view>
					<input type="text" value="" placeholder="cm" />
				</view>
				<view class="form-item">
					<view class="label">体重</view>
					<input type="text" value="" placeholder="kg" />
				</view>
			</view>
			<view class="notice">
				<checkbox value="box" color="#DD524D" style="transform:scale(0.6)" :checked="agree" @tap="checkboxChange" />本人已阅读并且同意《*******用户协议》
			</view>
			<view class="btn">缴费报名</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pickdata: [{key: 1, value:'场馆一'},{key: 2, value:'场馆二'}],
				pickvalue: '选择场馆',
				agree: true
			}
		},
		methods: {
			checkboxChange (e) {
				this.agree = !this.agree
			},
			pickChange  (e) {
				this.pickvalue = this.pickdata[e.detail.value].value;
				console.log(e.detail.value);
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
		padding: 5upx;
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
