/**.
 * @author  Administrator
 * @date   2017/9/30 17:08
 */
/**.
 * @author  Administrator
 * @date   2017/9/22 9:36
 */


import Constant from './../util/constant'
/**
 * option 传入参数格式数据
 * @param option
 * @returns {*}
 */
const DATA_TYPE ={
    EMPTY: "empty",
    INDEX_PREFIX_MARK: '$'
}

//总的返回对象
let backData = {}

//table 过滤主函数
export default function (option) {
    //option必须是json对象
    let isJson = typeof(option) === "object" && Object.prototype.toString.call(option).toLowerCase() === "[object object]" && !option.length;
    if (isJson === false) {
        return null;
    }

    //获取模板状态 templateType
    let templateType = option[Constant.templateType]
    if(!templateType){
        templateType = "1"
    }

    //取值 param 必须是个数组对象
    let column = option[Constant.column]
    if(!(column && column.constructor === Array )){
        return null;
    }

    //取值search
    let search = option[Constant.search]
    if(!search){
        search = null;
    }

    //表格编辑项 edit
    let edit = option[Constant.edit]
    if(!edit){
        edit = {}
    }

    //表格添加项 buttons
    let buttons = option[Constant.buttons];
    if(!buttons){
        buttons = []
    }

    //高级查询 specialSearch
    let complexSearch = option[Constant.complexSearch]
    if(!complexSearch){
        complexSearch = null;
    }

    //表格的参数 table
    let table = option[Constant.table]
    if(!table){
        table = {};
    }

    //回调函数 callback
    let callback = option[Constant.callback]
    if(!callback){
        callback = {};
    }

    let pagination = option[Constant.pagination];
    if(!pagination){
        pagination = {}
    }
    //column 导出
    backData.column = column;
    //templateType 导出
    backData.templateType = templateType;
    //url 导出
    backData.url = option.url;
    //search 导出
    backData.search = search;
    //edit 导出
    backData.edit = edit;
    //add 导出
    backData.buttons = buttons;
    //specialSearch 导出
    backData.complexSearch = complexSearch;
    //table 导出
    backData.table = table;
    //callback 导出
    backData.callback = callback;
    //pagination 导出
    backData.pagination = pagination;


    //table class
    backData.tableClass = option.tableClass;


    //launch
    backData.launch = option.launch;

    return backData;
}

