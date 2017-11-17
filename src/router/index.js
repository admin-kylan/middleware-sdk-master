/* layout */
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/layout'
const _import = require('./_import_')
Vue.use(Router)

export const constantRouterMap = [
    {path: '/login', component: _import('login/index'), hidden: true},
    {path: '/404', component: _import('error_page/404'), hidden: true},
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: '首页',
        hidden: true,
        children: [{path: 'dashboard', component: _import('dashboard/index')}]
    },
    {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})