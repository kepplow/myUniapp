<template>
	<view>

		<!-- 占位 -->
		<view class="place"></view>
		<!-- 标题 -->
		<view class="activity-title">
			<text>2020·中国成渝双城万人瑜伽大会暨百万人民线上瑜伽大会</text>

			<view class="wx-avatar"></view>
		</view>
		<!-- 轮播图 -->
		<view class="swiper">
			<view class="swiper-box">
				<swiper circular="true" :indicator-dots="true" indicator-active-color="#D44D62" autoplay="true" @change="swiperChange">
					<swiper-item v-for="swiper in swiperList" :key="swiper.id">
						<image :src="swiper.img" @tap="toSwiper(swiper)"></image>
					</swiper-item>
				</swiper>
				<view class="indicator">
					<view class="dots" v-for="(swiper, index) in swiperList" :class="[currentSwiper >= index ? 'on' : '']" :key="index"></view>
				</view>
			</view>
		</view>

		<view class="sub-title">
			<view class="left">
				<view>活动报名</view>
				<text></text>
			</view>
			<view class="right">
				<view>线上活动</view>
				<view>线下活动</view>
				<view class="more">更多</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showHeader: true,
				afterHeaderOpacity: 1, //不透明度
				headerPosition: 'fixed',
				headerTop: null,
				statusTop: null,
				nVueTitle: null,
				city: '北京',
				currentSwiper: 0,
				// 轮播图片
				swiperList: [{
						id: 1,
						src: 'url1',
						img: '/static/img/1.jpg'
					},
					{
						id: 2,
						src: 'url2',
						img: '/static/img/2.jpg'
					},
					{
						id: 3,
						src: 'url3',
						img: '/static/img/3.jpg'
					}
				],
				loadingText: '正在加载...'
			};
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
			this.headerTop = e.scrollTop >= 0 ? null : 0;
			this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			uni.showToast({
				title: '触发上拉加载'
			});
			let len = this.productList.length;
			if (len >= 40) {
				this.loadingText = '到底了';
				return false;
			}
			// 演示,随机加入商品,生成环境请替换为ajax请求
			let end_goods_id = this.productList[len - 1].goods_id;
			for (let i = 1; i <= 10; i++) {
				let goods_id = end_goods_id + i;
				let p = {
					goods_id: goods_id,
					img: '/static/img/goods/p' + (goods_id % 10 == 0 ? 10 : goods_id % 10) + '.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				};
				this.productList.push(p);
			}
		},
		onLoad() {},
		methods: {
			//加载Promotion 并设定倒计时,,实际应用中应该是ajax加载此数据。
			loadPromotion() {
				let cutTime = new Date();
				let yy = cutTime.getFullYear(),
					mm = cutTime.getMonth() + 1,
					dd = cutTime.getDate();
				let tmpcountdown = yy + '/' + mm + '/' + dd + ' 23:59:59';
				let tmpPromotion = [{
						title: '整点秒杀',
						ad: '整天秒杀专区',
						img: '/static/img/s1.jpg',
						countdown: false
					},
					{
						title: '限时抢购',
						ad: '每天23点上线',
						img: '/static/img/s2.jpg',
						countdown: tmpcountdown
					} //countdown为目标时间，程序会获取当前时间倒数
				];
				//检查倒计时
				for (let i = 0; i < tmpPromotion.length; i++) {
					let row = tmpPromotion[i];
					if (row.countdown) {
						let h = '00',
							m = '00',
							s = '00';
						let currentTime = new Date();
						let cutoffTime = new Date(tmpcountdown);
						if (!(currentTime >= cutoffTime)) {
							let countTime = parseInt(
								(cutoffTime.getTime() - currentTime.getTime()) / 1000
							);
							h = parseInt(countTime / 3600);
							m = parseInt((countTime % 3600) / 60);
							s = countTime % 60;
							h = h < 10 ? '0' + h : h;
							m = m < 10 ? '0' + m : m;
							s = s < 10 ? '0' + s : s;
						}
						tmpPromotion[i].countdown = {
							h: h,
							m: m,
							s: s
						};
					}
				}
				this.Promotion = tmpPromotion;
			},
			//定时器
			Timer() {
				setInterval(() => {
					if (this.Promotion.length > 0) {
						for (let i = 0; i < this.Promotion.length; i++) {
							let row = this.Promotion[i];
							if (row.countdown) {
								if (
									!(
										row.countdown.h == 0 &&
										row.countdown.m == 0 &&
										row.countdown.s == 0
									)
								) {
									if (row.countdown.s > 0) {
										row.countdown.s--;
										row.countdown.s =
											row.countdown.s < 10 ?
											'0' + row.countdown.s :
											row.countdown.s;
									} else if (row.countdown.m > 0) {
										row.countdown.m--;
										row.countdown.m =
											row.countdown.m < 10 ?
											'0' + row.countdown.m :
											row.countdown.m;
										row.countdown.s = 59;
									} else if (row.countdown.h > 0) {
										row.countdown.h--;
										row.countdown.h =
											row.countdown.h < 10 ?
											'0' + row.countdown.h :
											row.countdown.h;
										row.countdown.m = 59;
										row.countdown.s = 59;
									}
									this.Promotion[i].countdown = row.countdown;
								}
							}
						}
					}
				}, 1000);
			},
			//消息列表
			toMsg() {
				uni.navigateTo({
					url: '../../msg/msg'
				})
			},
			//搜索跳转
			toSearch() {
				uni.showToast({
					title: '建议跳转到新页面做搜索功能'
				});
			},
			//轮播图跳转
			toSwiper(e) {
				uni.showToast({
					title: e.src,
					icon: 'none'
				});
			},
			//分类跳转
			toCategory(e) {
				//uni.showToast({title: e.name,icon:"none"});
				uni.setStorageSync('catName', e.name);
				uni.navigateTo({
					url: '../../goods/goods-list/goods-list?cid=' + e.id + '&name=' + e.name
				});
			},
			//推荐商品跳转
			toPromotion(e) {
				uni.showToast({
					title: e.title,
					icon: 'none'
				});
			},
			//商品跳转
			toGoods(e) {
				uni.showToast({
					title: '商品' + e.goods_id,
					icon: 'none'
				});
				uni.navigateTo({
					url: '../../goods/goods'
				});
			},
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			}
		}
	};
</script>
<style lang="scss">
	page {
		position: relative;
		background-color: #fff;
	}

	.activity-title {
		position: absolute;
		display: flex;
		justify-content: space-between;
		align-items: center;
		top: 100upx;
		width: 92%;
		text-align: center;
		margin: 0 auto;
		left: 0;
		right: 0;
		color: white;
		font-size: 36upx;

		text {
			flex: 1;
		}

		.wx-avatar {
			width: 80upx;
			height: 80upx;
			margin: 10upx;
			border-radius: 50%;
			background-image: url('../../../static/img/q.jpg');
		}
	}

	.place {
		position: relative;
		width: 100%;
		height: 500upx;
		background-color: #ffffff;
		background-image: url(../../../static/img/image01.png);
		background-size: cover;
	}

	.swiper {
		position: absolute;
		top: 200upx;
		width: 100%;
		margin-top: 10upx;
		display: flex;
		justify-content: center;

		.swiper-box {
			width: 92%;
			height: 40.7vw;

			overflow: hidden;
			border-radius: 15upx;
			box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
			//兼容ios，微信小程序
			position: relative;
			z-index: 1;

			swiper {
				width: 100%;
				height: 40.7vw;

				swiper-item {
					image {
						width: 100%;
						height: 40.7vw;
					}
				}
			}
		}
	}
	
	.sub-title {
		margin: 50upx 30upx;
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
			font-size: 20upx;
			display: flex;
			justify-content: space-around;
			align-items: flex-end;
			.more {
				color: #bbb;
			}
		}
	}

</style>
