(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-tabBar-cart-cart"],{"4e1e":function(e,t,i){"use strict";i.r(t);var s=i("cf98"),n=i("966b");for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);i("82a0");var a,c=i("f0c5"),l=Object(c["a"])(n["default"],s["b"],s["c"],!1,null,"0bec1247",null,!1,s["a"],a);t["default"]=l.exports},"5e12":function(e,t,s){"use strict";s("c975"),s("a434"),s("b680"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{sumPrice:"0.00",headerPosition:"fixed",headerTop:null,statusTop:null,showHeader:!0,selectedList:[],isAllselected:!1,goodsList:[{id:1,img:"/static/img/goods/p1.jpg",name:"商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",spec:"规格:S码",price:127.5,number:1,selected:!1},{id:2,img:"/static/img/goods/p2.jpg",name:"商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",spec:"规格:S码",price:127.5,number:1,selected:!1},{id:3,img:"/static/img/goods/p3.jpg",name:"商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",spec:"规格:S码",price:127.5,number:1,selected:!1},{id:4,img:"/static/img/goods/p4.jpg",name:"商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",spec:"规格:S码",price:127.5,number:1,selected:!1},{id:5,img:"/static/img/goods/p5.jpg",name:"商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",spec:"规格:S码",price:127.5,number:1,selected:!1}],theIndex:null,oldIndex:null,isStop:!1}},onPageScroll:function(e){this.headerPosition=e.scrollTop>=0?"fixed":"absolute",this.headerTop=e.scrollTop>=0?null:0,this.statusTop=e.scrollTop>=0?null:-this.statusHeight+"px"},onPullDownRefresh:function(){setTimeout((function(){uni.stopPullDownRefresh()}),1e3)},onLoad:function(){this.footerbottom=document.getElementsByTagName("uni-tabbar")[0].offsetHeight+"px"},methods:{joinGoods:function(e){for(var t=this.goodsList.length,s=!1,n=0;n<t;n++){var o=this.goodsList[n];if(o.id==e.id){this.goodsList[n].number++,s=!0;break}}s||this.goodsList[i].unshift(e)},touchStart:function(e,t){t.touches.length>1?this.isStop=!0:(this.oldIndex=this.theIndex,this.theIndex=null,this.initXY=[t.touches[0].pageX,t.touches[0].pageY])},touchMove:function(e,t){var i=this;if(t.touches.length>1)this.isStop=!0;else{var s=t.touches[0].pageX-this.initXY[0],n=t.touches[0].pageY-this.initXY[1];this.isStop||Math.abs(s)<5||(Math.abs(n)>Math.abs(s)?this.isStop=!0:s<0?(this.theIndex=e,this.isStop=!0):s>0&&null!=this.theIndex&&this.oldIndex==this.theIndex&&(this.oldIndex=e,this.theIndex=null,this.isStop=!0,setTimeout((function(){i.oldIndex=null}),150)))}},touchEnd:function(e,t){this.isStop=!1},toGoods:function(e){uni.showToast({title:"商品"+e.id,icon:"none"}),uni.navigateTo({url:"../../goods/goods"})},toConfirmation:function(){for(var e=[],t=this.goodsList.length,i=0;i<t;i++)this.goodsList[i].selected&&e.push(this.goodsList[i]);e.length<1?uni.showToast({title:"请选择商品结算",icon:"none"}):uni.setStorage({key:"buylist",data:e,success:function(){uni.navigateTo({url:"../../order/confirmation"})}})},deleteGoods:function(e){for(var t=this.goodsList.length,i=0;i<t;i++)if(e==this.goodsList[i].id){this.goodsList.splice(i,1);break}this.selectedList.splice(this.selectedList.indexOf(e),1),this.sum(),this.oldIndex=null,this.theIndex=null},deleteList:function(){this.selectedList.length;while(this.selectedList.length>0)this.deleteGoods(this.selectedList[0]);this.selectedList=[],this.isAllselected=this.selectedList.length==this.goodsList.length&&this.goodsList.length>0,this.sum()},selected:function(e){this.goodsList[e].selected=!this.goodsList[e].selected;var t=this.selectedList.indexOf(this.goodsList[e].id);t>-1?this.selectedList.splice(t,1):this.selectedList.push(this.goodsList[e].id),this.isAllselected=this.selectedList.length==this.goodsList.length,this.sum()},allSelect:function(){for(var e=this.goodsList.length,t=[],i=0;i<e;i++)this.goodsList[i].selected=!this.isAllselected,t.push(this.goodsList[i].id);this.selectedList=this.isAllselected?[]:t,this.isAllselected=!this.isAllselected&&0!=this.goodsList.length,this.sum()},sub:function(e){this.goodsList[e].number<=1||(this.goodsList[e].number--,this.sum())},add:function(e){this.goodsList[e].number++,this.sum()},sum:function(e,t){this.sumPrice=0;for(var i=this.goodsList.length,s=0;s<i;s++)this.goodsList[s].selected&&(this.sumPrice=e&&s==t?this.sumPrice+e.detail.value*this.goodsList[s].price:this.sumPrice+this.goodsList[s].number*this.goodsList[s].price);this.sumPrice=this.sumPrice.toFixed(2)},discard:function(){}}};t.default=n},"73ae":function(e,t,i){var s=i("24fb");t=s(!1),t.push([e.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-0bec1247]{position:relative;background-color:#fff}.checkbox-box[data-v-0bec1247]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.checkbox-box .checkbox[data-v-0bec1247]{width:%?35?%;height:%?35?%;border-radius:100%;border:solid %?2?% #f06c7a;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.checkbox-box .checkbox .on[data-v-0bec1247]{width:%?25?%;height:%?25?%;border-radius:100%;background-color:#f06c7a}.checkbox-box .text[data-v-0bec1247]{font-size:%?28?%;margin-left:%?10?%}.status[data-v-0bec1247]{width:100%;height:0;position:fixed;z-index:10;background-color:#fff;top:0}.header[data-v-0bec1247]{width:92%;padding:0 4%;height:%?100?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:fixed;top:0;z-index:10;background-color:#fff}.header .title[data-v-0bec1247]{font-size:%?36?%}.place[data-v-0bec1247]{background-color:#fff;height:%?100?%}.goods-list[data-v-0bec1247]{width:100%;padding:%?20?% 0 %?120?% 0}.goods-list .tis[data-v-0bec1247]{width:100%;height:%?60?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?32?%}.goods-list .row[data-v-0bec1247]{width:calc(92%);height:calc(22vw + %?40?%);margin:%?20?% auto;border-radius:%?15?%;box-shadow:%?0?% %?5?% %?20?% rgba(0,0,0,.1);display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:relative;overflow:hidden;z-index:4;border:0}.goods-list .row .menu[data-v-0bec1247]{position:absolute;width:30%;height:100%;right:0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background-color:red;color:#fff;z-index:2}.goods-list .row .menu .icon[data-v-0bec1247]{color:#fff}.goods-list .row .carrier[data-v-0bec1247]{background-color:#fff;position:absolute;width:100%;padding:0 0;height:100%;z-index:3;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}@-webkit-keyframes showMenu-data-v-0bec1247{0%{-webkit-transform:translateX(0);transform:translateX(0)}100%{-webkit-transform:translateX(-30%);transform:translateX(-30%)}}@keyframes showMenu-data-v-0bec1247{0%{-webkit-transform:translateX(0);transform:translateX(0)}100%{-webkit-transform:translateX(-30%);transform:translateX(-30%)}}@-webkit-keyframes closeMenu-data-v-0bec1247{0%{-webkit-transform:translateX(-30%);transform:translateX(-30%)}100%{-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes closeMenu-data-v-0bec1247{0%{-webkit-transform:translateX(-30%);transform:translateX(-30%)}100%{-webkit-transform:translateX(0);transform:translateX(0)}}.goods-list .row .carrier.open[data-v-0bec1247]{-webkit-animation:showMenu-data-v-0bec1247 .25s linear both;animation:showMenu-data-v-0bec1247 .25s linear both}.goods-list .row .carrier.close[data-v-0bec1247]{-webkit-animation:closeMenu-data-v-0bec1247 .15s linear both;animation:closeMenu-data-v-0bec1247 .15s linear both}.goods-list .row .carrier .checkbox-box[data-v-0bec1247]{padding-left:%?20?%;-webkit-flex-shrink:0;flex-shrink:0;height:22vw;margin-right:%?20?%}.goods-list .row .carrier .goods-info[data-v-0bec1247]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;padding-right:%?20?%}.goods-list .row .carrier .goods-info .img[data-v-0bec1247]{width:22vw;height:22vw;border-radius:%?10?%;overflow:hidden;-webkit-flex-shrink:0;flex-shrink:0;margin-right:%?10?%}.goods-list .row .carrier .goods-info .img uni-image[data-v-0bec1247]{width:22vw;height:22vw}.goods-list .row .carrier .goods-info .info[data-v-0bec1247]{width:100%;height:22vw;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;position:relative}.goods-list .row .carrier .goods-info .info .title[data-v-0bec1247]{width:100%;font-size:%?28?%;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}.goods-list .row .carrier .goods-info .info .spec[data-v-0bec1247]{font-size:%?20?%;background-color:#f3f3f3;color:#a7a7a7;height:%?30?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0 %?10?%;border-radius:%?15?%;margin-bottom:20vw}.goods-list .row .carrier .goods-info .info .price-number[data-v-0bec1247]{position:absolute;width:100%;bottom:%?0?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;font-size:%?28?%;height:%?60?%}.goods-list .row .carrier .goods-info .info .price-number .number[data-v-0bec1247]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}.goods-list .row .carrier .goods-info .info .price-number .number .input[data-v-0bec1247]{width:%?60?%;height:%?60?%;margin:0 %?10?%;background-color:#f3f3f3}.goods-list .row .carrier .goods-info .info .price-number .number .input uni-input[data-v-0bec1247]{width:%?60?%;height:%?60?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;text-align:center;font-size:%?26?%}.goods-list .row .carrier .goods-info .info .price-number .number .sub[data-v-0bec1247], .goods-list .row .carrier .goods-info .info .price-number .number .add[data-v-0bec1247]{width:%?45?%;height:%?45?%;background-color:#f3f3f3;border-radius:%?5?%}.goods-list .row .carrier .goods-info .info .price-number .number .sub .icon[data-v-0bec1247], .goods-list .row .carrier .goods-info .info .price-number .number .add .icon[data-v-0bec1247]{font-size:%?22?%;width:%?45?%;height:%?45?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.footer[data-v-0bec1247]{width:92%;padding:0 4%;background-color:#fbfbfb;height:%?100?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?28?%;position:fixed;bottom:%?0?%;z-index:5}.footer .delBtn[data-v-0bec1247]{border:solid %?1?% #f06c7a;color:#f06c7a;padding:0 %?30?%;height:%?50?%;border-radius:%?30?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.footer .settlement[data-v-0bec1247]{width:60%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.footer .settlement .sum[data-v-0bec1247]{width:50%;font-size:%?28?%;margin-right:%?10?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end}.footer .settlement .sum .money[data-v-0bec1247]{font-weight:600}.footer .settlement .btn[data-v-0bec1247]{padding:0 %?30?%;height:%?50?%;background-color:#f06c7a;color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-radius:%?30?%}body.?%PAGE?%[data-v-0bec1247]{background-color:#fff}',""]),e.exports=t},"82a0":function(e,t,i){"use strict";var s=i("d38c"),n=i.n(s);n.a},"966b":function(e,t,i){"use strict";i.r(t);var s=i("5e12"),n=i.n(s);for(var o in s)"default"!==o&&function(e){i.d(t,e,(function(){return s[e]}))}(o);t["default"]=n.a},cf98:function(e,t,i){"use strict";var s,n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",[e.showHeader?i("v-uni-view",{staticClass:"status",style:{position:e.headerPosition,top:e.statusTop}}):e._e(),e.showHeader?i("v-uni-view",{staticClass:"header",style:{position:e.headerPosition,top:e.headerTop}},[i("v-uni-view",{staticClass:"title"},[e._v("购物车")])],1):e._e(),e.showHeader?i("v-uni-view",{staticClass:"place"}):e._e(),i("v-uni-view",{staticClass:"goods-list"},[0==e.goodsList.length?i("v-uni-view",{staticClass:"tis"},[e._v("购物车是空的哦~")]):e._e(),e._l(e.goodsList,(function(t,s){return i("v-uni-view",{key:s,staticClass:"row"},[i("v-uni-view",{staticClass:"menu",on:{click:function(i){i.stopPropagation(),arguments[0]=i=e.$handleEvent(i),e.deleteGoods(t.id)}}},[i("v-uni-view",{staticClass:"icon shanchu"})],1),i("v-uni-view",{staticClass:"carrier",class:[e.theIndex==s?"open":e.oldIndex==s?"close":""],on:{touchstart:function(t){arguments[0]=t=e.$handleEvent(t),e.touchStart(s,t)},touchmove:function(t){arguments[0]=t=e.$handleEvent(t),e.touchMove(s,t)},touchend:function(t){arguments[0]=t=e.$handleEvent(t),e.touchEnd(s,t)}}},[i("v-uni-view",{staticClass:"checkbox-box",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.selected(s)}}},[i("v-uni-view",{staticClass:"checkbox"},[i("v-uni-view",{class:[t.selected?"on":""]})],1)],1),i("v-uni-view",{staticClass:"goods-info",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.toGoods(t)}}},[i("v-uni-view",{staticClass:"img"},[i("v-uni-image",{attrs:{src:t.img}})],1),i("v-uni-view",{staticClass:"info"},[i("v-uni-view",{staticClass:"title"},[e._v(e._s(t.name))]),i("v-uni-view",{staticClass:"spec"},[e._v(e._s(t.spec))]),i("v-uni-view",{staticClass:"price-number"},[i("v-uni-view",{staticClass:"price"},[e._v("￥"+e._s(t.price))]),i("v-uni-view",{staticClass:"number"},[i("v-uni-view",{staticClass:"sub",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.sub(s)}}},[i("v-uni-view",{staticClass:"icon jian"})],1),i("v-uni-view",{staticClass:"input",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.discard.apply(void 0,arguments)}}},[i("v-uni-input",{attrs:{type:"number"},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e.sum(t,s)}},model:{value:t.number,callback:function(i){e.$set(t,"number",i)},expression:"row.number"}})],1),i("v-uni-view",{staticClass:"add",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.add(s)}}},[i("v-uni-view",{staticClass:"icon jia"})],1)],1)],1)],1)],1)],1)],1)}))],2),i("v-uni-view",{staticClass:"footer",style:{bottom:e.footerbottom}},[i("v-uni-view",{staticClass:"checkbox-box",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.allSelect.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"checkbox"},[i("v-uni-view",{class:[e.isAllselected?"on":""]})],1),i("v-uni-view",{staticClass:"text"},[e._v("全选")])],1),e.selectedList.length>0?i("v-uni-view",{staticClass:"delBtn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.deleteList.apply(void 0,arguments)}}},[e._v("删除")]):e._e(),i("v-uni-view",{staticClass:"settlement"},[i("v-uni-view",{staticClass:"sum"},[e._v("合计:"),i("v-uni-view",{staticClass:"money"},[e._v("￥"+e._s(e.sumPrice))])],1),i("v-uni-view",{staticClass:"btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.toConfirmation.apply(void 0,arguments)}}},[e._v("结算("+e._s(e.selectedList.length)+")")])],1)],1)],1)},o=[];i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){return s}))},d38c:function(e,t,i){var s=i("73ae");"string"===typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);var n=i("4f06").default;n("3f1d1821",s,!0,{sourceMap:!1,shadowMode:!1})}}]);