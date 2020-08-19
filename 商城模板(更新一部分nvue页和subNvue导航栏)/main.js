import Vue from 'vue'
import App from './App'
import http from './utils/http.js'
// #ifdef H5
	import wx from './common/SDK/jweixin-module'
// #endif

Vue.config.productionTip = false

Vue.prototype.$http = http
App.mpType = 'app'
// #ifdef H5
	Vue.prototype.wx = wx
// #endif


const app = new Vue({
    ...App
})
app.$mount()
