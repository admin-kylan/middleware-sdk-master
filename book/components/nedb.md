# 介绍
nedb是基于mongodb的一个种非关系型数据库，nedb库已经已经有了增删该查的api，少的是分页查询的方法。所以，在原有的的nedb原型上新增一个分页查询的方法。

## 使用

```javascript
  var db = require('db');
  db.findByPage(conditions,pageNum,pageSize,sort).then(pages => {
    var count = pages.count;
    var docs = pages.docs;
  })

```
方法findByPage接收四个参数，conditions查询条件对象，pageNum页码、pageSize分页大小、sort排序字段。其中conditions和sort对象配置可以参考nedb的[官方手册](http://www.alloyteam.com/2016/03/node-embedded-database-nedb/)。

db对象是nedb的实例。所以，db对象可以使用nedb对象的所有方法。
