/**.
 * @author  Administrator
 * @date   2017/9/27 16:39
 */
import Promise from 'promise'
import Constant from './../util/constant'

function PageService() {

    //私有属性
    let list = []; //存储数组
    let currentPage = 1; //当前页
    let pageSize = 10; //默认十条
    let totalPage = 1; //总页数
    let totalSize = 0; //总条数

    let url = ''; // 交互的url
    let prefixUrl = ""; //url 的前缀
    let condition = {} //基础查询
    let complexCondition = {} //高级查询

    //page
    this.setCurrentPage = function (_currentPage) {
        currentPage = _currentPage;
    }

    this.setPageSize = function (_pageSize) {
        if(_pageSize){
            pageSize = _pageSize
        }
    }

    this.setUrl = function (_url) {
        url = _url;
    }

    this.setCondition = function (_condition) {
        condition = _condition;
    }

    this.setComplexCondition = function (_complexCondition) {
        complexCondition = _complexCondition;
    }

    this.setPrefixUrl = function (_prefixUrl) {
        prefixUrl = _prefixUrl;
    }

    this.setTotalSize = function (_totalSize) {
        totalSize = _totalSize;
        //这里直接设定总页数
        let num = this.getTotalSize() / this.getPageSize();
        this.setTotalPage(Math.ceil(num));
    }

    this.setTotalPage = function (_totalPage) {
        totalPage = _totalPage
    }



    //get
    this.getCurrent = function () {
        return currentPage;
    }

    this.getPageSize = function () {
        return pageSize;
    }

    this.getTotalPage = function () {
        return totalPage;
    }

    this.getTotalSize = function () {
        return totalSize;
    }

    //执行异步操作 //拉取数据
    this.async = function (ajaxInstance, searchType, launch) {
        // let obj = this.getDataParam();
        if (!url) {
            // throw "config url don't null";
            //   obj.list = null;
            //url 为空，抛出空数组
            return new Promise((resolve, reject) => {
                resolve(null)
            })
        }
       // debugger
        //定制url
        let editUrl = StitchingUrl(searchType, launch);
        console.log(editUrl)
        return new Promise((resolve, reject) => {
            ajaxInstance.get(editUrl)
                .then(response => {
                    //重新设定页数
                    let data = response.data;
                    this.setTotalSize(data[Constant.pageTotalSize])

                    resolve(data)
                })
                .catch(response => {
                    reject(response)
                })
            //   resolve({list: editUrl})
        })
    }

    //组装url
    function StitchingUrl(searchType, launch) {
        //"page=" + (this.current - 1) + "&size=" + this.size;
        let conditionOptions = {};
        if(searchType === Constant.searchGetCollectionType){
            conditionOptions = condition;
        }else if(searchType === Constant.complexSearchGetCollectionType){
            conditionOptions = complexCondition;
        }

        let editUrl = ""
        if (launch) {
            //url 执行事件
            editUrl = launch.call(null, conditionOptions)
            if (editUrl.indexOf('?') === -1) {
                editUrl += "?";
            } else {
                editUrl += "&";
            }
            editUrl += Constant.pageParamCurrentPage +"=" + (currentPage - 1) + "&" + Constant.pageParamPageSize + "=" + pageSize;

        } else {
            editUrl = "?" + Constant.pageParamCurrentPage + "=" + (currentPage - 1) + "&" + Constant.pageParamPageSize + "=" + pageSize;
            for (let o in conditionOptions) {
                let oArray = o.split(',');
                for (let i = 0; i < oArray.length; i++) {
                    editUrl += "&" + oArray[i] + "=" + conditionOptions[o]
                }

            }
        }
        editUrl = url + editUrl;
        return editUrl;
    }
}

PageService.prototype.getDataParam = function () {
    return {
        currentPage: this.getCurrent(),
        pageSize: this.getPageSize(),
        totalPage: this.getTotalPage(),
        totalSize: this.getTotalSize(),
    };
}

export default PageService;