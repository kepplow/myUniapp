(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-confirmation"],{"078f":function(i,t,e){var n=e("24fb");t=n(!1),t.push([i.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.addr[data-v-0b0f6295]{width:86%;padding:%?20?% 3%;margin:%?30?% auto %?20?% auto;box-shadow:%?0?% %?5?% %?20?% rgba(0,0,0,.1);border-radius:%?20?%;display:-webkit-box;display:-webkit-flex;display:flex}.addr .icon[data-v-0b0f6295]{width:%?80?%;height:%?80?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.addr .icon uni-image[data-v-0b0f6295]{width:%?60?%;height:%?60?%}.addr .tel-name[data-v-0b0f6295]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;font-size:%?32?%}.addr .tel-name .tel[data-v-0b0f6295]{margin-left:%?40?%}.addr .addres[data-v-0b0f6295]{width:100%;font-size:%?26?%;color:#999}.buy-list[data-v-0b0f6295]{width:86%;padding:%?10?% 3%;margin:%?30?% auto %?20?% auto;box-shadow:%?0?% %?5?% %?20?% rgba(0,0,0,.1);border-radius:%?20?%}.buy-list .row[data-v-0b0f6295]{margin:%?30?% 0}.buy-list .row .goods-info[data-v-0b0f6295]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex}.buy-list .row .goods-info .img[data-v-0b0f6295]{width:22vw;height:22vw;border-radius:%?10?%;overflow:hidden;-webkit-flex-shrink:0;flex-shrink:0;margin-right:%?10?%}.buy-list .row .goods-info .img uni-image[data-v-0b0f6295]{width:22vw;height:22vw}.buy-list .row .goods-info .info[data-v-0b0f6295]{width:100%;height:22vw;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;position:relative}.buy-list .row .goods-info .info .title[data-v-0b0f6295]{width:100%;font-size:%?28?%;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}.buy-list .row .goods-info .info .spec[data-v-0b0f6295]{font-size:%?22?%;background-color:#f3f3f3;color:#a7a7a7;height:%?40?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0 %?10?%;border-radius:%?20?%;margin-bottom:20vw}.buy-list .row .goods-info .info .price-number[data-v-0b0f6295]{position:absolute;width:100%;bottom:%?0?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;font-size:%?28?%;height:%?40?%}.buy-list .row .goods-info .info .price-number .price[data-v-0b0f6295]{color:#f06c7a}.buy-list .row .goods-info .info .price-number .number[data-v-0b0f6295]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.order[data-v-0b0f6295]{width:86%;padding:%?10?% 3%;margin:%?30?% auto %?20?% auto;box-shadow:%?0?% %?5?% %?20?% rgba(0,0,0,.1);border-radius:%?20?%}.order .row[data-v-0b0f6295]{margin:%?20?% 0;height:%?40?%;display:-webkit-box;display:-webkit-flex;display:flex}.order .row .left[data-v-0b0f6295]{font-size:%?28?%}.order .row .right[data-v-0b0f6295]{margin-left:%?40?%;font-size:%?26?%;color:#999}.order .row .right uni-input[data-v-0b0f6295]{font-size:%?26?%;color:#999}.blck[data-v-0b0f6295]{width:100%;height:%?100?%}.footer[data-v-0b0f6295]{width:92%;padding:0 4%;background-color:#fbfbfb;height:%?100?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?28?%;position:fixed;bottom:%?0?%;z-index:5}.footer .settlement[data-v-0b0f6295]{width:80%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.footer .settlement .sum[data-v-0b0f6295]{width:50%;font-size:%?28?%;margin-right:%?10?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end}.footer .settlement .sum .money[data-v-0b0f6295]{font-weight:600}.footer .settlement .btn[data-v-0b0f6295]{padding:0 %?30?%;height:%?60?%;background-color:#f06c7a;color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?30?%;border-radius:%?40?%}.detail[data-v-0b0f6295]{width:86%;padding:%?10?% 3%;margin:%?30?% auto %?20?% auto;box-shadow:%?0?% %?5?% %?20?% rgba(0,0,0,.1);border-radius:%?20?%}.detail .row[data-v-0b0f6295]{height:%?60?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.detail .row .nominal[data-v-0b0f6295]{font-size:%?28?%}.detail .row .content[data-v-0b0f6295]{font-size:%?26?%;color:#f06c7a}',""]),i.exports=t},"26c0":function(i,t,e){i.exports=e.p+"static/img/addricon.207cc274.png"},3701:function(i,t,e){var n=e("078f");"string"===typeof n&&(n=[[i.i,n,""]]),n.locals&&(i.exports=n.locals);var a=e("4f06").default;a("6147c622",n,!0,{sourceMap:!1,shadowMode:!1})},"66a4":function(i,t,e){"use strict";e.r(t);var n=e("cd03"),a=e.n(n);for(var s in n)"default"!==s&&function(i){e.d(t,i,(function(){return n[i]}))}(s);t["default"]=a.a},be92:function(i,t,e){"use strict";var n=e("3701"),a=e.n(n);a.a},cd03:function(i,t,e){"use strict";(function(i){e("b680"),e("acd8"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{buylist:[],goodsPrice:0,sumPrice:0,freight:12,note:"",int:1200,deduction:0,recinfo:{id:1,name:"大黑哥",head:"大",tel:"18816881688",address:{region:{label:"广东省-深圳市-福田区",value:[18,2,1],cityCode:"440304"},detailed:"深南大道1111号无名摩登大厦6楼A2"},isDefault:!0}}},onShow:function(){var i=this;uni.getStorage({key:"buylist",success:function(t){i.buylist=t.data,i.goodsPrice=0;for(var e=i.buylist.length,n=0;n<e;n++)i.goodsPrice=i.goodsPrice+i.buylist[n].number*i.buylist[n].price;i.deduction=i.int/100,i.sumPrice=i.goodsPrice-i.deduction+i.freight}}),uni.getStorage({key:"selectAddress",success:function(t){i.recinfo=t.data,uni.removeStorage({key:"selectAddress"})}})},onHide:function(){},onBackPress:function(){this.clearOrder()},filters:{toFixed:function(i){return parseFloat(i).toFixed(2)}},methods:{clearOrder:function(){var t=this;uni.removeStorage({key:"buylist",success:function(e){t.buylist=[],i("log","remove buylist success"," at pages\\order\\confirmation.vue:160")}})},toPay:function(){for(var i=this,t=[],e=[],n=this.buylist.length,a=0;a<n;a++)t.push(this.buylist[a]),e.push(this.buylist[a].id);0!=t.length?(uni.showLoading({title:"正在提交订单..."}),setTimeout((function(){uni.setStorage({key:"paymentOrder",data:t,success:function(){uni.hideLoading(),uni.redirectTo({url:"../pay/payment/payment?amount="+i.sumPrice})}})}),1e3)):uni.showToast({title:"订单信息有误，请重新购买",icon:"none"})},selectAddress:function(){uni.navigateTo({url:"../user/address/address?type=select"})}}};t.default=n}).call(this,e("0de9")["log"])},eef9:function(i,t,e){"use strict";var n,a=function(){var i=this,t=i.$createElement,n=i._self._c||t;return n("v-uni-view",[n("v-uni-view",{staticClass:"addr",on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.selectAddress.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"icon"},[n("v-uni-image",{attrs:{src:e("26c0"),mode:""}})],1),n("v-uni-view",{staticClass:"right"},[n("v-uni-view",{staticClass:"tel-name"},[n("v-uni-view",{staticClass:"name"},[i._v(i._s(i.recinfo.name))]),n("v-uni-view",{staticClass:"tel"},[i._v(i._s(i.recinfo.tel))])],1),n("v-uni-view",{staticClass:"addres"},[i._v(i._s(i.recinfo.address.region.label)+"\n\t\t\t\t"+i._s(i.recinfo.address.detailed))])],1)],1),n("v-uni-view",{staticClass:"buy-list"},i._l(i.buylist,(function(t,e){return n("v-uni-view",{key:e,staticClass:"row"},[n("v-uni-view",{staticClass:"goods-info"},[n("v-uni-view",{staticClass:"img"},[n("v-uni-image",{attrs:{src:t.img}})],1),n("v-uni-view",{staticClass:"info"},[n("v-uni-view",{staticClass:"title"},[i._v(i._s(t.name))]),n("v-uni-view",{staticClass:"spec"},[i._v("选择"+i._s(t.spec)+" 数量:"+i._s(t.number))]),n("v-uni-view",{staticClass:"price-number"},[n("v-uni-view",{staticClass:"price"},[i._v("￥"+i._s(t.price*t.number))]),n("v-uni-view",{staticClass:"number"})],1)],1)],1)],1)})),1),n("v-uni-view",{staticClass:"order"},[n("v-uni-view",{staticClass:"row"},[n("v-uni-view",{staticClass:"left"},[i._v("积分 :")]),n("v-uni-view",{staticClass:"right"},[i._v("已扣除"+i._s(i.int)+"积分抵扣"+i._s(i._f("toFixed")(i.deduction))+"元")])],1),n("v-uni-view",{staticClass:"row"},[n("v-uni-view",{staticClass:"left"},[i._v("备注 :")]),n("v-uni-view",{staticClass:"right"},[n("v-uni-input",{attrs:{placeholder:"选填,备注内容"},model:{value:i.note,callback:function(t){i.note=t},expression:"note"}})],1)],1)],1),n("v-uni-view",{staticClass:"detail"},[n("v-uni-view",{staticClass:"row"},[n("v-uni-view",{staticClass:"nominal"},[i._v("商品金额")]),n("v-uni-view",{staticClass:"content"},[i._v("￥"+i._s(i._f("toFixed")(i.goodsPrice)))])],1),n("v-uni-view",{staticClass:"row"},[n("v-uni-view",{staticClass:"nominal"},[i._v("运费")]),n("v-uni-view",{staticClass:"content"},[i._v("￥+"+i._s(i._f("toFixed")(i.freight)))])],1),n("v-uni-view",{staticClass:"row"},[n("v-uni-view",{staticClass:"nominal"},[i._v("积分抵扣")]),n("v-uni-view",{staticClass:"content"},[i._v("￥-"+i._s(i._f("toFixed")(i.deduction)))])],1)],1),n("v-uni-view",{staticClass:"blck"}),n("v-uni-view",{staticClass:"footer"},[n("v-uni-view",{staticClass:"settlement"},[n("v-uni-view",{staticClass:"sum"},[i._v("合计:"),n("v-uni-view",{staticClass:"money"},[i._v("￥"+i._s(i._f("toFixed")(i.sumPrice)))])],1),n("v-uni-view",{staticClass:"btn",on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.toPay.apply(void 0,arguments)}}},[i._v("提交订单")])],1)],1)],1)},s=[];e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return s})),e.d(t,"a",(function(){return n}))},f0a6:function(i,t,e){"use strict";e.r(t);var n=e("eef9"),a=e("66a4");for(var s in a)"default"!==s&&function(i){e.d(t,i,(function(){return a[i]}))}(s);e("be92");var o,r=e("f0c5"),d=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"0b0f6295",null,!1,n["a"],o);t["default"]=d.exports}}]);