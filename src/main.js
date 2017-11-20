import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'//导入element-ui
import 'element-ui/lib/theme-chalk/index.css'
import App from './demo/App'
import router from './demo/router'
import store from './demo/store'
import dragon from './components'
import './demo/permission'
import './demo/mock'  // 该项目所有请求使用mockjs模拟
Vue.use(ElementUI)
Vue.use(dragon)

if (!process.env.IS_WEB) {
    Vue.use(require('vue-electron'))
}
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV !== 'production'


/* eslint-disable no-new */
new Vue({
    components: {App},
    router,
    store,
    template: '<App/>',
    data: {
        eventHub: new Vue()
    }

}).$mount('#app')
