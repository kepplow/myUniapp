<template>
	<view>
		<view class="status" :style="{ opacity: afterHeaderOpacity }"></view>
		<view class="header">
			<!-- 头部-默认显示 -->
			<view class="before" :style="{ opacity: 1 - afterHeaderOpacity, zIndex: beforeHeaderzIndex }">
				<view class="back">
					<view class="icon xiangqian" @tap="back" v-if="showBack"></view>
				</view>
				<view class="middle"></view>
				<view class="icon-btn">
					<!-- <view class="icon tongzhi" @tap="toMsg"></view> -->
					<view class="icon cart" @tap="tocar"></view>
				</view>
			</view>
			<!-- 头部-滚动渐变显示 -->
			<view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">
				<view class="back">
					<view class="icon xiangqian" @tap="back" v-if="showBack"></view>
				</view>
				<view class="middle">
					<view v-for="(anchor,index) in anchorlist" :class="[selectAnchor==index ?'on':'']" :key="index" @tap="toAnchor(index)">{{anchor.name}}</view>
				</view>
				<view class="icon-btn">
					<!-- <view class="icon tongzhi" @tap="toMsg"></view> -->
					<view class="icon cart" @tap="tocar"></view>
				</view>
			</view>
		</view>
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="icons">
				<!-- <view class="box" @tap="share">
					<view class="icon fenxiang"></view>
					<view class="text">分享</view>
				</view> -->
				<!-- <view class="box" @tap="toChat">
					<view class="icon kefu"></view>
					<view class="text">客服</view>
				</view>
				<view class="box" @tap="keep">
					<view class="icon" :class="[isKeep?'shoucangsel':'shoucang']"></view>
					<view class="text">{{isKeep?'已':''}}收藏</view>
				</view> -->
				<view class="t-price">
					￥{{goodsData.actual_price}}
				</view>
				<view class="f-price">
					门市价<text>{{goodsData.price}}</text>
				</view>

			</view>
			<view class="btn">
				<view class="joinCart" @tap="joinCart">加入购物车</view>
				<view class="buy" @tap="buy">立即购买</view>
			</view>
		</view>
		<!-- share弹窗 -->
		<!-- <view class="share" :class="shareClass" @touchmove.stop.prevent="discard" @tap="hideShare">
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="h1">分享</view>
				<view class="list">
					<view class="box">
						<image src="../../static/img/share/wx.png"></image>
						<view class="title">
							微信好友
						</view>
					</view>
					<view class="box">
						<image src="../../static/img/share/pyq.png"></image>
						<view class="title">
							朋友圈
						</view>
					</view>
					<view class="box">
						<image src="../../static/img/share/wb.png"></image>
						<view class="title">
							新浪微博
						</view>
					</view>
					<view class="box">
						<image src="../../static/img/share/qq.png"></image>
						<view class="title">
							QQ
						</view>
					</view>
				</view>
				<view class="btn" @tap="hideShare">
					取消
				</view>
			</view>
			
		</view> -->
		<!-- 服务-模态层弹窗 -->
		<!-- <view class="popup service" :class="serviceClass" @touchmove.stop.prevent="discard" @tap="hideService"> -->
		<!-- 遮罩层 -->
		<!-- <view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="row" v-for="(item,index) in goodsData.service" :key="index">
						<view class="title">{{item.name}}</view>
						<view class="description">{{item.description}}</view>
					</view>
				</view>
				<view class="btn"><view class="button" @tap="hideService">完成</view></view>
			</view> -->
		<!-- </view> -->
		<!-- 规格-模态层弹窗 -->
		<!-- <view class="popup spec" :class="specClass" @touchmove.stop.prevent="discard" @tap="hideSpec"> -->
		<!-- 遮罩层 -->
		<!-- <view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="title">选择规格：</view>
					<view class="sp">
						<view v-for="(item,index) in goodsData.spec" :class="[index==selectSpec?'on':'']" @tap="setSelectSpec(index)" :key="index">{{item}}</view>
					</view>
					<view class="length" v-if="selectSpec!=null">
						<view class="text">数量</view>
						<view class="number">
							<view class="sub" @tap.stop="sub">
								<view class="icon jian"></view>
							</view>
							<view class="input" @tap.stop="discard">
								<input type="number" v-model="goodsData.number" />
							</view>
							<view class="add"  @tap.stop="add">
								<view class="icon jia"></view>
							</view>
						</view>
					</view>
				</view>
				<view class="btn"><view class="button" @tap="hideSpec">完成</view></view>
			</view> -->
		<!-- </view> -->
		<!-- 商品主图轮播 -->
		<view class="swiper-box">
			<swiper circular="true" autoplay="true" @change="swiperChange">
				<swiper-item v-for="(swiper, index) in goodsData.goods_img" :key="index">
					<image :src="swiper"></image>
				</swiper-item>
			</swiper>
			<view class="indicator">{{currentSwiper+1}}/{{goodsData.goods_img.length}}</view>
		</view>
		<!-- 标题 价格 -->
		<view class="info-box goods-info">
			<view class="title">
				<view>{{goodsData.title}}</view>
				<view class="stock">
					库存: {{goodsData.stock}}
				</view>
			</view>
			<view class="explain">
				{{goodsData.explain}}
			</view>
			<view class="price">￥{{goodsData.actual_price}}</view>

		</view>


		<!-- 服务-规则选择 -->
		<!-- <view class="info-box spec">
			<view class="row" @tap="showService">
				<view class="text">服务</view>
				<view class="content"><view class="serviceitem" v-for="(item,index) in goodsData.service" :key="index">{{item.name}}</view></view>
				<view class="arrow"><view class="icon xiangyou"></view></view>
			</view>
			<view class="row" @tap="showSpec(false)">
				<view class="text">选择</view>
				<view class="content">
					<view>选择规格：</view>
					<view class="sp">
						<view v-for="(item,index) in goodsData.spec" :key="index" :class="[index==selectSpec?'on':'']">{{item}}</view>
					</view>
					
				</view>
				<view class="arrow"><view class="icon xiangyou"></view></view>
			</view>
		</view> -->
		<!-- 评价 -->
		<!-- <view class="info-box comments" id="comments">
			<view class="row">
				<view class="text">商品评价({{goodsData.comment.number}})</view>
				<view class="arrow" @tap="toRatings">
					<view class="show" @tap="showComments(goodsData.id)">
						查看全部
						<view class="icon xiangyou"></view>
					</view>
				</view>
			</view>
			<view class="comment" @tap="toRatings">
				<view class="user-info">
					<view class="face"><image :src="goodsData.comment.userface"></image></view>
					<view class="username">{{goodsData.comment.username}}</view>
				</view>
				<view class="content">
					{{goodsData.comment.content}}
				</view>
			</view>
		</view> -->
		<!-- 详情 -->
		<view class="description" id="comments">
			<view class="title">———— 商品详情 ————</view>
			<view class="content">
				<rich-text :nodes="goodsData.content" type="text"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isActive: '2',
				token: '',
				//控制渐变标题栏的参数
				beforeHeaderzIndex: 11, //层级
				afterHeaderzIndex: 10, //层级
				beforeHeaderOpacity: 1, //不透明度
				afterHeaderOpacity: 0, //不透明度
				//是否显示返回按钮
				// #ifndef MP
				showBack: true,
				// #endif
				//轮播主图数据
				swiperList: [],
				//轮播图下标
				currentSwiper: 0,
				anchorlist: [], //导航条锚点
				selectAnchor: 0, //选中锚点
				serviceClass: '', //服务弹窗css类，控制开关动画
				specClass: '', //规格弹窗css类，控制开关动画
				shareClass: '', //分享弹窗css类，控制开关动画
				// 商品信息
				goodsData: {
					id: 1,
					name: "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
					price: "127.00",
					number: 1,
					service: [{
							name: "正品保证",
							description: "此商品官方保证为正品"
						},
						{
							name: "极速退款",
							description: "此商品享受退货极速退款服务"
						},
						{
							name: "7天退换",
							description: "此商品享受7天无理由退换服务"
						}
					],
					spec: ["XS", "S", "M", "L", "XL", "XXL"],
					comment: {
						number: 102,
						userface: '../../static/img/face.jpg',
						username: '大黑哥',
						content: '很不错，之前买了很多次了，很好看，能放很久，和图片色差不大，值得购买！'
					}
				},
				selectSpec: null, //选中规格
				isKeep: false, //收藏
				//商品描述html
				descriptionStr: '<div style="text-align:center;"><img width="100%" src="https://ae01.alicdn.com/kf/HTB1t0fUl_Zmx1VjSZFGq6yx2XXa5.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB1LzkjThTpK1RjSZFKq6y2wXXaT.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB18dkiTbvpK1RjSZPiq6zmwXXa8.jpg"/></div>'
			};
		},
		onLoad(option) {
			// #ifdef MP
			//小程序隐藏返回按钮
			this.showBack = false;
			// #endif
			//option为object类型，会序列化上个页面传递的参数
			console.log(option.cid); //打印出上个页面传递的参数。
			this.token = uni.getStorageSync('token')
			this.isActive = option.isActive ? option.isActive : '2'
			if (this.isActive == 1) {
				this.getActivityGoods(option.goodsId)
			} else {
				this.getGoods(option.goodsId)
			}
			// #ifdef H5
			this.share()
			// #endif
			
		},
		// #ifdef MP
		onShareAppMessage() {
			return {
				title: this.goodsData.title,
				path: '/pages/goods/goods?goodsId=' + this.goodsData.goods_id,
				imageUrl: this.goodsData.goods_img[0]
			}
		},
		// #endif
		
		onReady() {
			this.calcAnchor(); //计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确

		},
		onPageScroll(e) {
			//锚点切换
			this.selectAnchor = e.scrollTop >= 375 ? 1 : 0;
			//导航栏渐变
			let tmpY = 375;
			e.scrollTop = e.scrollTop > tmpY ? 375 : e.scrollTop;
			this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
			this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
			//切换层级
			this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
			this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		// onReachBottom() {
		// 	uni.showToast({
		// 		title: '触发上拉加载'
		// 	});
		// },
		mounted() {
			

		},
		methods: {
			callJsSDK(config) {
				let that = this
				console.log(config)
				console.log(11111111111111)
				this.wx.config({
					// debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					...config,
					jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表
				})
				this.wx.ready(function() {
					console.log(location)
					// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
					that.wx.updateAppMessageShareData({
						title: that.goodsData.title, // 分享标题
						desc: that.goodsData.explain, // 分享描述
						link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: that.goodsData.goods_img[0], // 分享图标
						success: function() {
							// 设置成功
							uni.showToast({
								title: '分享设置成功'
							})
						}
					})
				});
			},
			// 分享
			share() {
				let that = this
				this.$http.post('api/get/jsapi', {
							url: location.href
						}).then(res => {
							console.log(res.data)
							if (res.data) {
								that.callJsSDK(res.data)
							}
						})
					},
					tocar() {
						uni.switchTab({
							url: '../tabBar/cart/cart'
						})
					},
					getActivityGoods(id) {
						this.$http.post('api/active/goods', {
							id
						}).then(res => {
							console.log(res)
							if (res.code == 200) {
								this.goodsData.goods_img = res.data.goods.goods_img
								this.goodsData.actual_price = res.data.active.final_price
								this.goodsData.price = res.data.active.original_price
								this.goodsData.title = res.data.goods.title
								this.goodsData.explain = res.data.goods.explain
								this.goodsData.stock = res.data.active.stock
								this.goodsData.goods_id = res.data.active.goods_id
								this.goodsData.num = 1
								this.goodsData.content = res.data.goods.goods_content
							}
						})
					},
					getGoods(goodsId) {
						this.$http.post('api/get/goods/details', {
							goodsId
						}).then(res => {
							console.log(res)
							this.goodsData = res.data
						})
					},
					//轮播图指示器
					swiperChange(event) {
						this.currentSwiper = event.detail.current;
					},
					//消息列表
					toMsg() {
						uni.navigateTo({
							url: '../msg/msg'
						})
					},
					// 客服
					toChat() {
						uni.navigateTo({
							url: "../msg/chat/chat?name=客服008"
						})
					},
					hideShare() {
						this.shareClass = 'hide';
						setTimeout(() => {
							this.shareClass = 'none';
						}, 150);
					},
					//收藏
					keep() {
						this.isKeep = this.isKeep ? false : true;
					},
					// 加入购物车
					joinCart() {
						this.$http.post('api/user/add/car', {
							token: this.token,
							goodsId: this.goodsData.goods_id,
							num: 1,
							isActive: this.isActive
						}).then(res => {
							uni.showToast({
								icon: 'none',
								title: res.message
							});
							if (res.message == '添加成功') {
								uni.showTabBarRedDot({
									index: 2
								});
							}
						})

					},
					//立即购买
					buy() {
						// if(this.selectSpec==null){
						// 	return this.showSpec(()=>{
						// 		this.toConfirmation();
						// 	});
						// }
						let goodsData = JSON.parse(JSON.stringify(this.goodsData))

						goodsData.goods_img = goodsData.goods_img[0]
						goodsData.goods_title = goodsData.title
						goodsData.price = goodsData.actual_price
						goodsData.num = 1
						goodsData.is_active = this.isActive

						uni.setStorage({
							key: 'buylist',
							data: [goodsData],
							success: () => {
								uni.navigateTo({
									url: '../order/confirmation'
								})
							}
						})
						// this.toConfirmation();
					},
					//商品评论
					// toRatings(){
					// 	uni.navigateTo({
					// 		url:'ratings/ratings'
					// 	})
					// },
					//跳转确认订单页面
					toConfirmation() {
						// let tmpList=[];
						// let goods = {id:this.goodsData.id,img:'../../static/img/goods/p1.jpg',name:this.goodsData.name,spec:'规格:'+this.goodsData.spec[this.selectSpec],price:this.goodsData.price,number:this.goodsData.number};
						// tmpList.push(goods);
						// uni.setStorage({
						// 	key:'buylist',
						// 	data:tmpList,
						// 	success: () => {

						// 	}
						// })
						uni.navigateTo({
							url: '../order/confirmation'
						})
					},
					//跳转评论列表
					showComments(goodsid) {

					},
					//选择规格
					setSelectSpec(index) {
						this.selectSpec = index;
					},
					//减少数量
					sub() {
						if (this.goodsData.number <= 1) {
							return;
						}
						this.goodsData.number--;
					},
					//增加数量
					add() {
						this.goodsData.number++;
					},
					//跳转锚点
					toAnchor(index) {
						this.selectAnchor = index;
						uni.pageScrollTo({
							scrollTop: this.anchorlist[index].top,
							duration: 200
						});
					},
					//计算锚点高度
					calcAnchor() {
						this.anchorlist = [{
								name: '主图',
								top: 0
							},
							{
								name: '详情',
								top: 0
							},
							// {name:'评价',top:0},
						]
						let commentsView = uni.createSelectorQuery().select("#comments");
						commentsView.boundingClientRect((data) => {
							let statusbarHeight = 0;
							//APP内还要计算状态栏高度
							// #ifdef APP-PLUS
							statusbarHeight = plus.navigator.getStatusbarHeight()
							// #endif
							let headerHeight = uni.upx2px(100);
							this.anchorlist[1].top = data.top - headerHeight - statusbarHeight;
							// this.anchorlist[2].top = data.bottom - headerHeight - statusbarHeight;

						}).exec();
					},
					//返回上一页
					back() {
						uni.navigateBack();
					},
					//服务弹窗
					showService() {
						console.log('show');
						this.serviceClass = 'show';
					},
					//关闭服务弹窗
					hideService() {
						this.serviceClass = 'hide';
						setTimeout(() => {
							this.serviceClass = 'none';
						}, 200);
					},
					//规格弹窗
					showSpec(fun) {
						console.log('show');
						this.specClass = 'show';
						this.specCallback = fun;
					},
					specCallback() {
						return;
					},
					//关闭规格弹窗
					hideSpec() {
						this.specClass = 'hide';
						//回调

						this.selectSpec && this.specCallback && this.specCallback();
						this.specCallback = false;
						setTimeout(() => {
							this.specClass = 'none';
						}, 200);
					},
					discard() {
						//丢弃
					}
			}
		};
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}

	@keyframes showPopup {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes hidePopup {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes showLayer {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(-100%);
		}
	}

	@keyframes hideLayer {
		0% {
			transform: translateY(-100%);
		}

		100% {
			transform: translateY(0);
		}
	}

	.icon {
		font-size: 26upx;
	}

	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
		background-color: #f1f1f1;
		transition: opacity 0.05s linear;
	}

	.header {
		width: 100%;

		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);

		/*  #endif  */
		.before,
		.after {
			width: 92%;
			padding: 0 4%;
			height: 100upx;
			display: flex;
			align-items: center;
			position: fixed;
			top: 0;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
			/*  #endif  */
			transition: opacity 0.05s linear;

			.back {
				width: 125upx;
				height: 60upx;
				flex-shrink: 0;

				.icon {
					margin-left: -10%;
					width: 60upx;
					height: 60upx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 42upx;
				}
			}

			.middle {
				width: 100%;
			}

			.icon-btn {
				width: 125upx;
				height: 60upx;
				flex-shrink: 0;
				display: flex;

				.icon {
					&:first-child {
						margin-right: 5upx;
					}

					width: 60upx;
					height: 60upx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 42upx;
				}
			}
		}

		.before {
			.back {
				.icon {
					color: #fff;
					background-color: rgba(0, 0, 0, 0.2);
					border-radius: 100%;
				}
			}

			.icon-btn {
				.icon {
					color: #fff;
					background-color: rgba(0, 0, 0, 0.2);
					border-radius: 100%;

				}
			}
		}

		.after {
			background-color: #f1f1f1;

			.back {
				.icon {
					color: #666;
				}
			}

			.icon-btn {
				.icon {
					color: #666;
				}
			}

			.middle {
				font-size: 32upx;
				height: 90upx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 7%;

				view {
					width: (100%/3);
					padding: 0 3%;
					margin: 0 3%;
					display: flex;
					justify-content: center;
					align-items: center;

					&.on {
						margin-bottom: -4upx;
						color: #f47952;
						border-bottom: solid 4upx #f47952;
					}
				}
			}
		}
	}

	.swiper-box {
		position: relative;
		width: 100%;
		height: 100vw;

		swiper {
			width: 100%;
			height: 100vw;

			swiper-item {
				image {
					width: 100%;
					height: 100vw;
				}
			}
		}

		.indicator {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 25upx;
			height: 40upx;
			border-radius: 40upx;
			font-size: 22upx;
			position: absolute;
			bottom: 20upx;
			right: 20upx;
			color: #fff;
			background-color: rgba(0, 0, 0, 0.2);
		}
	}

	.info-box {
		width: 92%;
		padding: 20upx 4%;
		background-color: #fff;
		margin-bottom: 20upx;
	}

	.stock {
		font-size: 24upx;
		color: #666;
	}

	.goods-info {
		.price {
			font-size: 46upx;
			font-weight: 600;
			color: #FF535F;
		}

		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 40upx;
		}

		.explain {
			font-size: 30upx;
			padding: 10upx 0;
			color: #999;
		}
	}

	.spec {
		.row {
			width: 100%;
			display: flex;
			align-items: center;
			margin: 0 0 30upx 0;

			.text {
				font-size: 24upx;
				color: #a2a2a2;
				margin-right: 20upx;
			}

			.content {
				font-size: 28upx;
				display: flex;
				flex-wrap: wrap;

				.serviceitem {
					margin-right: 10upx;
				}

				.sp {
					width: 100%;
					display: flex;

					view {
						background-color: #f6f6f6;
						padding: 5upx 10upx;
						color: #999;
						margin-right: 10upx;
						font-size: 20upx;
						border-radius: 5upx;

						&.on {
							border: solid 1upx #f47952;
							padding: 4upx 8upx;
						}
					}
				}
			}

			.arrow {
				position: absolute;
				right: 4%;

				.icon {
					color: #ccc;
				}
			}
		}
	}

	.comments {
		.row {
			width: 100%;
			height: 40upx;
			display: flex;
			align-items: center;
			margin: 0 0 30upx 0;

			.text {
				font-size: 30upx;
			}

			.arrow {
				font-size: 28upx;
				position: absolute;
				right: 4%;
				color: #17e6a1;

				.show {
					display: flex;
					align-items: center;

					.icon {
						color: #17e6a1;
					}
				}
			}
		}

		.comment {
			width: 100%;

			.user-info {
				width: 100%;
				height: 40upx;
				display: flex;
				align-items: center;

				.face {
					width: 40upx;
					height: 40upx;
					margin-right: 8upx;

					image {
						width: 40upx;
						height: 40upx;
						border-radius: 100%;
					}
				}

				.username {
					font-size: 24upx;
					color: #999;
				}
			}

			.content {
				margin-top: 10upx;
				font-size: 26upx;
			}
		}
	}

	.description {
		margin-bottom: 100upx;

		.title {
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #999;
		}
	}

	.footer {
		position: fixed;
		bottom: 0upx;
		width: 92%;
		padding: 0 4%;
		height: 99upx;
		border-top: solid 1upx #eee;
		background-color: #fff;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.icons {
			display: flex;
			height: 80upx;
			margin-left: -4%;

			.box {
				width: 80upx;
				height: 80upx;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;

				.icon {
					font-size: 40upx;
					color: #828282;
				}

				.text {
					display: flex;
					justify-content: center;
					width: 100%;
					font-size: 22upx;
					color: #666;
				}
			}
		}

		.t-price {
			font-size: 48upx;
			color: #FF535F;
		}

		.f-price {
			margin-left: 20upx;
			display: flex;
			align-items: center;
			font-size: 26upx;
			color: #999;

			text {
				text-decoration: line-through;
			}
		}

		.btn {
			height: 80upx;
			border-radius: 40upx;
			overflow: hidden;
			display: flex;
			margin-right: -2%;

			.joinCart,
			.buy {
				height: 80upx;
				padding: 0 40upx;
				color: #fff;
				display: flex;
				align-items: center;
				font-size: 28upx;
			}

			.joinCart {
				background-color: #f0b46c;
			}

			.buy {
				background-color: #f06c7a;
			}
		}
	}

	.popup {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		display: none;

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 21;
			background-color: rgba(0, 0, 0, 0.6);
		}

		.layer {
			position: fixed;
			z-index: 22;
			bottom: -70%;
			width: 92%;
			padding: 0 4%;
			height: 70%;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;

			.content {
				width: 100%;
				padding: 20upx 0;
			}

			.btn {
				width: 100%;
				height: 100upx;

				.button {
					width: 100%;
					height: 80upx;
					border-radius: 40upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #f47952;
					font-size: 28upx;
				}
			}
		}

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			display: block;

			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		&.service {
			.row {
				margin: 30upx 0;

				.title {
					font-size: 30upx;
					margin: 10upx 0;
				}

				.description {
					font-size: 28upx;
					color: #999;
				}
			}
		}

		&.spec {
			.title {
				font-size: 30upx;
				margin: 30upx 0;
			}

			.sp {
				display: flex;

				view {
					font-size: 28upx;
					padding: 5upx 20upx;
					border-radius: 8upx;
					margin: 0 30upx 20upx 0;
					background-color: #f6f6f6;

					&.on {
						padding: 3upx 18upx;
						border: solid 1upx #f47925;
					}
				}
			}

			.length {
				margin-top: 30upx;
				border-top: solid 1upx #aaa;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 20upx;

				.text {
					font-size: 30upx;
				}

				.number {
					display: flex;
					justify-content: center;
					align-items: center;

					.input {
						width: 80upx;
						height: 60upx;
						margin: 0 10upx;
						background-color: #f3f3f3;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;

						input {
							width: 80upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;
							text-align: center;
							font-size: 26upx;
						}
					}

					.sub,
					.add {
						width: 60upx;
						height: 60upx;
						background-color: #f3f3f3;
						border-radius: 5upx;

						.icon {
							font-size: 30upx;
							width: 60upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;

						}
					}
				}
			}

		}
	}

	.share {
		display: none;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.15s linear both;
			}

			.layer {
				animation: showLayer 0.15s linear both;
			}
		}

		&.hide {
			display: block;

			.mask {
				animation: hidePopup 0.15s linear both;
			}

			.layer {
				animation: hideLayer 0.15s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			background-color: rgba(0, 0, 0, .5);
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			z-index: 11;
		}

		.layer {
			width: 92%;
			position: fixed;
			z-index: 12;
			padding: 0 4%;
			top: 100%;
			background-color: rgba(255, 255, 255, 0.9);

			.list {
				width: 100%;
				display: flex;
				padding: 10upx 0 30upx 0;

				.box {
					width: 25%;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;

					image {
						width: 13.8vw;
						height: 13.8vw;
					}

					.title {
						margin-top: 10upx;
						display: flex;
						justify-content: center;
						width: 100%;
						font-size: 26upx;
					}
				}
			}

			.btn {
				width: 100%;
				height: 100upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28upx;
				border-top: solid 1upx #666666;
			}

			.h1 {
				width: 100%;
				height: 80upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 34upx;
			}
		}
	}
</style>
