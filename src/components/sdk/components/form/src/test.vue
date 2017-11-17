/**.
* @author  Administrator
* @date   2017/9/21 14:42
*/
<!--编写模板 -->
<template>
<div>
  <d-form :form='form1' :layout="layout1" :formItems="formItems1" :action = "action" :method = "method" :rules="rules1" position="left" v-on:successHandler = "success" v-on:errorHandler = "error"></d-form>
  <div style="margin:100px"></div>
  <!-- <d-form :form='form2' :layout="layout2" :formItems="formItems2" :rules="rules2" position="right"></d-form>
  <div style="margin:100px"></div>
  <d-form :form='form3' :layout="layout3" :formItems="formItems3" :rules="rules3" position="left"></d-form>
  <div style="margin:100px"></div> -->
</div>
</template>

<!--编写脚本 -->
<script>
var Form = require("./main.js");
//第一种
var form1 = require("./form1.js");
var formItems1 = require("./formItems1.js");
var layout1 = require("./layout1.js");
var rules1 = require("./rules1.js");

//第二种
var form2 = require("./form2.js");
var formItems2 = require("./formItems2.js");
var layout2 = require("./layout2.js");
var rules2 = require("./rules2.js");

//第三种
var form3 = require("./form3.js");
var formItems3 = require("./formItems3.js");
var layout3 = require("./layout3.js");
var rules3 = require("./rules3.js");

export default {
  data() {
    return {
      form1: form1,
      formItems1: formItems1,
      layout1: layout1,
      rules1:rules1,
      form2: form2,
      formItems2: formItems2,
      layout2: layout2,
      rules2:rules2,
      form3:form3,
      formItems3:formItems3,
      layout3:layout3,
      rules3:rules3,
      action:"http://www.baidu.com",
      method:"post"
    }
  },
  components: {
    dForm: Form
  },
  mounted:function(){

  },
  created() {

  },
  methods: {
    success:function(res){
      console.log(res);
      alert("success")
    },
    error:function(error){
      console.log(error);
      alert("error")
    }
  }
}
</script>


<!--编写样式 -->
