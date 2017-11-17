var StringUtils = {

  //1.判断字符串是否为空（null，undefin、空字符串）
  isBlank:function(val){
    if(val == null || val == undefined || val.replace(/(^\s*)|(\s*$)/g, "").length ==0 ){
      return true;
    }else{
      return false;
    }
  },
  //2.默认值
  default:function(val,defaultVal){
    if(this.isBlank(val)){
      return defaultVal;
    }else{
      return val;
    }
  },
  //3.去除两边空白
  strim:function(val){
    return val.replace(/(^\s*)|(\s*$)/g, "");
  },
  //4.字符串判断
  equal:function(val0,val1){
    return val0 == val1;
  },
  compare:function(val0,val1){
    return val0 > val1;
  },
  //5.判断是否是数字类型
  isNumber:function(val){
    if(isNaN(val)){
      return false;
    }else{
      return true;
    }
  },
  //判断是否是Boolean
  isBoolean:function(val){
    if(val == "true" || val == "True"){
      return true;
    }else{
      return false;
    }
  },
  //6.字符串大写
  toUpperCase:function(val){
    return val.toUpperCase();
  },
  //字符串小写
  toLowerCase:function(val){
    return val.toLowerCase();
  },
  //7.分割
  split:function(val,split){
    return val.split(split);
  },
  //8.字符串连接
  concat:function(val0,val1){
    return val0.concat(val1);
  },
  //9.字符串查找
  indexOf:function(val,searchVal){
    return val.indexOf(searchVal);
  },
  //10.取子字符串
  substring:function(val,sartIndex,length){
    return val.substr(startIndex,length);
  },
  //11.删除字符
  deleteChar:function(val,char){

  },
  //13.表码转译
  getNameByCode:function(val,dataJson){
    return dataJson[val]
  }
}


module.exports = StringUtils;
