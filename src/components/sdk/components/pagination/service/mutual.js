/**.
 * @author  Administrator
 * @date   2017/9/27 13:46
 */
/**
 * 于后台交互数据
 * 数据格式是个疑点，
 *
 **/
import Constant from './../util/constant'
import PageParam from './../util/page-param'
import PageService from './page_service'

function Mutual(self) {

    //实例化页码对象
    let pageService = new PageService()
    pageService.setUrl(self.url)
    pageService.setPrefixUrl(self.$constants.$mutualUrl);

    //点击查询，触发的事件
    self.$parent.parentVue.$on(Constant.emitListenerSearchName, function (currentPage, pageSize) {
        //执行 ajax 初始方法
        getCollection(currentPage, pageSize)
    })

    //执行查询的函数
    function getCollection(currentPage, pageSize) {
        //查询值

        let searchModel = {},
            searchType = self.$store.getters.getSearchType;
        if(searchType === Constant.searchGetCollectionType){
            searchModel = self.$store.getters.getSearchModelKeyValue;
        }else if(searchType === Constant.complexSearchGetCollectionType){
            searchModel = self.$store.getters.getComplexSearchModelKeyValue;
        }
        //遍历条件
        for (let o in searchModel) {
            if (!searchModel[o]) {
                delete searchModel[o]
            }
        }
        if(searchType === Constant.searchGetCollectionType){
            //设置查询条件
            pageService.setCondition(searchModel)
        }else if(searchType === Constant.complexSearchGetCollectionType){
            //设置高级查询条件
            pageService.setComplexCondition(searchModel)
        }else{
            return false;
        }

        //设置页码
        pageService.setCurrentPage(currentPage);
        pageService.setPageSize(pageSize);

        //执行异步服务器拉去操作
        let ajaxInstance = getAxios()
        //基本查询和高级查询的回调函数判断
        let launch = null;
        if(searchType === Constant.searchGetCollectionType){
            launch = self.callback.launch
        }else if(searchType === Constant.complexSearchGetCollectionType){
            launch = self.callback.complexLaunch
        }
        //执行asyc
        pageService.async(ajaxInstance, searchType, launch)
            .then(response => {
                successBack(response)
            })
            .catch(response => {
                errorBack(response)
            })
    }

    //此方法可以根据业务代码的需求做相应的调整，
    //执行axios
    function getAxios() {
        let ajaxInstance = self.$http.create({});
        return ajaxInstance
    }

    //此方法可以根据业务代码的需求做相应的调整，
    //执行成功回调
    function successBack(response) {
        //没有配置成功回调，则系统抛出数据
        let data = response;
        if (self.callback.success) {
            data = self.callback.success.call(null, response, PageParam)
        }else{
            if(null === data || "" === data){
                data = {};
                data.list = null;
            }
            Object.assign(data, pageService.getDataParam())
        }
        //广播事件 后台传递数据
        self.$parent.parentVue.$emit(Constant.emitListenerReceiveName, data)

    }

    //执行失败回调
    function errorBack(response) {
        if (self.callback.error) {
            self.callback.error.call(null, response)
        }
    }


}

//page页面属性返回
Mutual.prototype.getPageService = function () {

}
export default Mutual;