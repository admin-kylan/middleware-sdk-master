// /**
//  * The file enables `@/router/routes.js` to import all router modules
//  * in a one-shot manner. There should not be any reason to edit this file.
//  */
// import Vue from 'vue'
// import Router from 'vue-router'
//
//
// // in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading
// Vue.use(Router)
//
// /* layout */
// import Layout from '@/views/layout/layout'
// const _import = require('./_import_')
// export const constantRouterMap = [
//     {path: '/login', component: _import('login/index'), hidden: true},
//     {path: '/404', component: _import('error_page/404'), hidden: true},
//     {
//         path: '/',
//         component: Layout,
//         redirect: '/dashboard',
//         name: '首页',
//         hidden: true,
//         children: [{path: 'dashboard', component: _import('dashboard/index')}]
//     },
//     {path: '*', redirect: '/404', hidden: true}
//     ]
//
// export default new Router({
//     // mode: 'history', //后端支持可开
//     scrollBehavior: () => ({y: 0}),
//     routes: constantRouterMap
// })

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * The file enables `@/router/routes.js` to import all router modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */
const files = require.context('.', true, /\.js$/)
var RouterBase = new Router({
    mode: 'history'
});

files.keys().forEach(key => {
    if (key === './index.js') return
    RouterBase.addRoutes(files(key).default)
})

export default RouterBase;
