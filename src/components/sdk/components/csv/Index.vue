/**.
* @author  Administrator
* @date   2017/9/22 8:54
*/
<!--编写模板 -->
<template>
<div>
  这是CSV文件解析
  <input type = 'file' v-on:change = "selectCsvFile"/>
  <button v-on:click = "downLoadFile">下载</button>
  <el-table :data="tableData" style="width: 100%" >
    <el-table-column prop="身份证" label="身份证" >
    </el-table-column>
    <el-table-column prop="姓名" label="姓名" >
    </el-table-column>
  </el-table>
  <router-link to="/">去往首页</router-link>
</div>
</template>

<!--编写脚本 -->
<script>
import CSVFileUtil from '../../utils/CSVFileUtil.js'
export default {
  data() {
    return {
      csvFile:null,
      tableData: null,
      titleArr:null,
      columnArr:[]
    }
  },
  components: {},
  created() {

  },
  methods: {
    selectCsvFile: function(e){
      var file  = e.target.files[0];
      this.csvFile = file;
      var self = this;
      CSVFileUtil.parse(file,{
        encoding:'gbk',
        header:true
      }).then(result =>{
        console.log(result)
        self.tableData = result.dataArr;
        self.titleArr = result.titleArr
      }).catch(error =>{
        console.log(error)
      })
    },
    downLoadFile:function(){
      debugger;
      CSVFileUtil.downLoadFile(
          this.tableData,
          {header:this.titleArr},
          "test.csv"
        );
    }
  }
}
</script>


<!--编写样式 -->
