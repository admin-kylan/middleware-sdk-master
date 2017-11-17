
<!--编写模板 -->
<template>
<div>
  {{pageNum}}/{{totalpage}}
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="_id" label="主键" width="180">
    </el-table-column>
    <el-table-column prop="username" label="姓名" width="180">
    </el-table-column>
    <el-table-column prop="age" label="年龄" width="180">
    </el-table-column>
    <el-table-column prop="nickName" label="昵称">
    </el-table-column>
  </el-table>
  <el-form ref="conditions" :model="conditions" label-width="80px">
    <el-form-item label="主键">
      <el-input v-model="conditions._id"></el-input>
    </el-form-item>
    <el-form-item label="名字">
      <el-input v-model="conditions.username"></el-input>
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model="conditions.age"></el-input>
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="conditions.nickName"></el-input>
    </el-form-item>
  </el-form>
  <el-button v-if="pageNum > 1" type="primary" @click="prevPage">上一页</el-button>
  <el-button v-if="pageNum < totalpage" type="primary" @click="nextPage">下一页</el-button>
  <el-button  type="primary" @click="search" icon="el-icon-search">查询</el-button>
</div>
</template>

<!--编写脚本 -->
<script>
var db = require("../../../utils/nedb.js");
var Person = require("./Person.js");
export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      count: 100,
      conditions: {
        username: "",
        nickName: "",
        age: "",
        _id:"",
      },
      sort:{
        age:1
      }
    }
  },
  components: {},
  created() {
    new Promise((resolve, reject) => {
      //清空数据
      db.remove({}, {
        multi: true
      }, function(err, numRemoved) {
        console.log("删除成功");
        resolve();
      });
    }).then(() => {
      new Promise((resolve, reject) => {
        //添加50条测试数据
        for (var i = 0; i < this.count; i++) {
          var p = new Person();
          p.setUsername("username" + i);
          p.setAge(i+"");
          p.setNickName("nickName" + i);
          (i => {
            db.insert(p.getJson(), (error, docs) => {
              console.log(docs);
              if (i == (this.count - 1)) {
                resolve()
              }
            });
          })(i)
        }
      }).then(() => {
        console.log("添加数据成功")
        this.findByPage(this.conditions,this.pageNum,this.pageSize,this.sort);
      })
    })
  },
  methods: {
    nextPage: function() {
      this.pageNum += 1;
      this.findByPage(this.conditions,this.pageNum,this.pageSize,this.sort);
    },
    prevPage: function() {
      this.pageNum -= 1;
      this.findByPage(this.conditions,this.pageNum,this.pageSize,this.sort);
    },
    findByPage:function(conditions,pageNum,pageSize,sort){
      return db.findByPage(this._conditions,pageNum-1,this.pageSize,this.sort).then(page =>{
        this.tableData =  page.docs;
        this.count = page.count;
        return this.count;
      }).catch(error => {
        console.log(error);
      });
    },
    search:function(){
      this.pageNum = 1;
      this.findByPage(this.conditions,this.pageNum,this.pageSize,this.sort).then(count => {
          this.pageNum = count == 0 ? 0: 1;
      });
    }
  },
  computed: {
    totalpage:function(){
      return  Math.ceil(this.count / this.pageSize);
    },
    _conditions:function(){
      var conditions = {};
      for(var key in this.conditions){
        if(this.conditions[key] == undefined || this.conditions[key] == null || this.conditions[key].length ==0)
          continue;
          conditions[key] = this.conditions[key];
      }
      return conditions;
    }
  }
}
</script>
<!--编写样式 -->
