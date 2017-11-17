
let Datastore = require('nedb')
let dbName = require("./MatchData.db");
let db = new Datastore({
  filename: dbName,
  autoload: true
});
db.loadDatabase();

//原型链增加分页查询方法
Datastore.prototype.findByPage = function(conditions, pageNum, pageSize,sort) {
  return new Promise((resolve,reject) =>{
    let skip = pageNum*pageSize,
        limit = pageSize;
        //查询记录数
    this.find(conditions).sort(sort).skip(skip).limit(limit).exec((err, docs) => {
       if(err == null){
         resolve(docs);
       }else{
         reject(err);
       }
    })
  }).then(docs => {
    return new Promise((resolve,reject) => {
      //查询总数量
      this.count(conditions,(err,count)=>{
        if(err == null)
          resolve({docs,count})
      })
    })
  }).catch(err =>{
    console.log(err);
  });
}

module.exports = db;
