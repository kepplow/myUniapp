(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-address-address"],{3159:function(e,t,i){"use strict";var a,n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",[i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"list"},e._l(e.addressList,(function(t,a){return i("v-uni-view",{key:a,staticClass:"row",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.select(t)}}},[i("v-uni-view",{staticClass:"left"},[i("v-uni-view",{staticClass:"head"},[e._v(e._s(t.head))])],1),i("v-uni-view",{staticClass:"center"},[i("v-uni-view",{staticClass:"name-tel"},[i("v-uni-view",{staticClass:"name"},[e._v(e._s(t.name))]),i("v-uni-view",{staticClass:"tel"},[e._v(e._s(t.tel))]),t.isDefault?i("v-uni-view",{staticClass:"default"},[e._v("默认")]):e._e()],1),i("v-uni-view",{staticClass:"address"},[e._v(e._s(t.address.region.label)+" "+e._s(t.address.detailed))])],1),i("v-uni-view",{staticClass:"right"},[i("v-uni-view",{staticClass:"icon bianji",on:{click:function(i){i.stopPropagation(),arguments[0]=i=e.$handleEvent(i),e.edit(t)}}})],1)],1)})),1)],1),i("v-uni-view",{staticClass:"add"},[i("v-uni-view",{staticClass:"btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.add.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"icon tianjia"}),e._v("新增地址")],1)],1)],1)},s=[];i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return a}))},9893:function(e,t,i){"use strict";i("a434"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{isSelect:!1,addressList:[{id:1,name:"大黑哥",head:"大",tel:"18816881688",address:{region:{label:"广东省-深圳市-福田区",value:[18,2,1],cityCode:"440304"},detailed:"深南大道1111号无名摩登大厦6楼A2"},isDefault:!0},{id:2,name:"大黑哥",head:"大",tel:"15812341234",address:{region:{label:"广东省-深圳市-福田区",value:[18,2,1],cityCode:"440304"},detailed:"深北小道2222号有名公寓502"},isDefault:!1},{id:3,name:"老大哥",head:"老",tel:"18155467897",address:{region:{label:"广东省-深圳市-福田区",value:[18,2,1],cityCode:"440304"},detailed:"深南大道1111号无名摩登大厦6楼A2"},isDefault:!1},{id:4,name:"王小妹",head:"王",tel:"13425654895",address:{region:{label:"广东省-深圳市-福田区",value:[18,2,1],cityCode:"440304"},detailed:"深南大道1111号无名摩登大厦6楼A2"},isDefault:!1}]}},onShow:function(){var e=this;uni.getStorage({key:"delAddress",success:function(t){var i=e.addressList.length;if(t.data.hasOwnProperty("id"))for(var a=0;a<i;a++)if(e.addressList[a].id==t.data.id){e.addressList.splice(a,1);break}uni.removeStorage({key:"delAddress"})}}),uni.getStorage({key:"saveAddress",success:function(t){var i=e.addressList.length;if(t.data.hasOwnProperty("id")){for(var a=0;a<i;a++)if(e.addressList[a].id==t.data.id){e.addressList.splice(a,1,t.data);break}}else{var n=e.addressList[i-1];n++,t.data.id=n,e.addressList.push(t.data)}uni.removeStorage({key:"saveAddress"})}})},onLoad:function(e){"select"==e.type&&(this.isSelect=!0)},methods:{edit:function(e){uni.setStorage({key:"address",data:e,success:function(){uni.navigateTo({url:"edit/edit?type=edit"})}})},add:function(){uni.navigateTo({url:"edit/edit?type=add"})},select:function(e){this.isSelect&&uni.setStorage({key:"selectAddress",data:e,success:function(){uni.navigateBack()}})}}};t.default=a},"9ff0":function(e,t,i){"use strict";var a=i("b734"),n=i.n(a);n.a},b184:function(e,t,i){"use strict";i.r(t);var a=i("3159"),n=i("db4a");for(var s in n)"default"!==s&&function(e){i.d(t,e,(function(){return n[e]}))}(s);i("9ff0");var c,r=i("f0c5"),d=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"cc36c1e2",null,!1,a["a"],c);t["default"]=d.exports},b734:function(e,t,i){var a=i("e32d");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("c05a5c44",a,!0,{sourceMap:!1,shadowMode:!1})},db4a:function(e,t,i){"use strict";i.r(t);var a=i("9893"),n=i.n(a);for(var s in a)"default"!==s&&function(e){i.d(t,e,(function(){return a[e]}))}(s);t["default"]=n.a},e32d:function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-view[data-v-cc36c1e2]{display:-webkit-box;display:-webkit-flex;display:flex}.add[data-v-cc36c1e2]{position:fixed;bottom:0;width:100%;height:%?120?%;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.add .btn[data-v-cc36c1e2]{box-shadow:%?0?% %?5?% %?10?% rgba(0,0,0,.4);width:70%;height:%?80?%;border-radius:%?80?%;background-color:#f06c7a;color:#fff;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?30?%}.add .btn .icon[data-v-cc36c1e2]{height:%?80?%;color:#fff;font-size:%?30?%;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.list[data-v-cc36c1e2]{-webkit-flex-wrap:wrap;flex-wrap:wrap}.list .row[data-v-cc36c1e2]{width:96%;padding:%?20?% 2%}.list .row .left[data-v-cc36c1e2]{width:%?90?%;-webkit-flex-shrink:0;flex-shrink:0;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.list .row .left .head[data-v-cc36c1e2]{width:%?70?%;height:%?70?%;background:-webkit-linear-gradient(left,#ccc,#aaa);background:linear-gradient(90deg,#ccc,#aaa);color:#fff;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-radius:%?60?%;font-size:%?35?%}.list .row .center[data-v-cc36c1e2]{width:100%;-webkit-flex-wrap:wrap;flex-wrap:wrap}.list .row .center .name-tel[data-v-cc36c1e2]{width:100%;-webkit-box-align:baseline;-webkit-align-items:baseline;align-items:baseline}.list .row .center .name-tel .name[data-v-cc36c1e2]{font-size:%?34?%}.list .row .center .name-tel .tel[data-v-cc36c1e2]{margin-left:%?30?%;font-size:%?24?%;color:#777}.list .row .center .name-tel .default[data-v-cc36c1e2]{font-size:%?22?%;background-color:#f06c7a;color:#fff;padding:0 %?18?%;border-radius:%?24?%;margin-left:%?20?%}.list .row .center .address[data-v-cc36c1e2]{width:100%;font-size:%?24?%;-webkit-box-align:baseline;-webkit-align-items:baseline;align-items:baseline;color:#777}.list .row .right[data-v-cc36c1e2]{-webkit-flex-shrink:0;flex-shrink:0;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-left:%?20?%}.list .row .right .icon[data-v-cc36c1e2]{-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:%?80?%;height:%?60?%;border-left:solid %?1?% #aaa;font-size:%?40?%;color:#777}',""]),e.exports=t}}]);