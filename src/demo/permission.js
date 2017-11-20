/**.
 * @author  Administrator
 * @date   2017/11/17 10:02
 */
import router from './router/index'
import { getToken } from '@/utils/auth' // 验权


//路由白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {

    if(getToken()){ //验证token
        //存在token
        if(to.path === '/login'){
            next({path: '/'})
        }else{
            //正常访问，获取权限
            next({to}) // hack方法 确保addRoutes已完成
        }
    }else{ //不存在token
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next('/login') // 否则全部重定向到登录页
        }
    }
    //next()
})

router.afterEach(() => { // 路由结束钩子
    //NProgress.done() // 结束Progress
})