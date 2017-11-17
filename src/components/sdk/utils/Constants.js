/**.
 * @author  Administrator
 * @date   2017/9/21 13:29
 */
export default{
    //加载更新的方法
    install(Vue){
        let constants = {};
        Object.assign(constants, this.editCons());
        Vue.prototype.$constants = constants;
    },
    editCons(){
        let obj = {};
        //于服务器后台调用的地址IP
        obj.$mutualUrl = "https://127.0.0.1:8080/xxx";
        return obj
    }
}