/**.
 * @author  Administrator
 * @date   2017/9/21 15:12
 */
//这个路由是设置全局路由，首页路由，报错路由的配置
const router = [
    {
        path: '/pagination',
        name: 'pagination-page',
        component: require('@/components/pagination/index.vue')
    },
    {
        path: '/pagination/edit/:id',
        name: 'pagination-page-edit',
        component: require('@/components/pagination/test/edit.vue')
    },
    {
        path: '/pagination/save',
        name: 'pagination-page-save',
        component: require('@/components/pagination/test/save.vue')
    }
]

export default router;