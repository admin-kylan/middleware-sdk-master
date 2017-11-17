/**.
 * @author  Administrator
 * @date   2017/9/21 15:12
 */
//这个路由是设置全局路由，首页路由，报错路由的配置
const router = [
    {
        path: '/',
        name: 'index-page',
        component: require('@/components/index')
    },
    {
        path: '*',
        redirect: '/'
    }
]

export default router;