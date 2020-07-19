import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

import wx from './common/SDK/jweixin-module'
App.mpType = 'app'

Vue.prototype.wx = wx
const app = new Vue({
    ...App
})
app.$mount()
