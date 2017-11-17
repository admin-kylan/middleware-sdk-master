# 简介

这是一个处理CSV文件的工具类，提供了两个方法，解析CSV文件和生成CSV文件。

# 使用

## 导包

```javascript
  import CSVFileUtil from 'CSVFileUtil' //引入工具类
```

## 解析CSV文件

`CSVFileUtil.parse(file,config)`，解析CSV文件。file是文件对象，configs是解析文件的相关配置。

````javascript
  CSVFileUtil.parse(file,{encoding:"utf-8",header:true})
    .then(result => {}) //result为解析文件的数据
    .catch(error => {}) //error为解析文件失败的错误对象
````

`config`对象的配置有:

```json
  {
    "encoding":"utf-8", //文件的编码
    "header":false      //文件是否有表头
  }
```

## 下载CSV文件

`CSVFileUtil.downLoadFile(data,options,fileName)`,方法下载CSV文件。接收三个参数，data为表格数据。CSV文件的一些配置项，fileName为下载文件的文件名。

```javascript
  CSVFileUtil.downLoadFile(
      [{"name":"zhangsan","age":"11"},{"name":"liliu","age":"12"}],
      {header:["name","zhangsan"]},
      "test.csv"
    );
```
