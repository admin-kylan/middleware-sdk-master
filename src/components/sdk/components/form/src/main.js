import ElementUI from 'element-ui'
import Vue from 'vue'
import axios from 'axios'

var bus = new Vue();

var InputHandler = function(formItem, form) {
  var Input = ElementUI.Input;
  return Vue.extend({
    data() {
      return {formItem: formItem, form: form}
    },
    template: '<d-input :type = "formItem.type" placeholder="请输入内容" v-model = "form[formItem.prop]" :name = "form.prop" @change = "test"></d-input>',
    components: {
      dInput: Input
    },
    methods: {
      test: function() {
        // console.log(this.form);
      }
    }
  })
}

var SelectHandler = function(formItem, form) {
  var Select = ElementUI.Select,
    Option = ElementUI.Option;
  return Vue.extend({
    data() {
      return {formItem: formItem, form: form}
    },
    template: ' <el-col :span="24"><d-select v-model="form[formItem.prop]" :placeholder="formItem.placeholder"> <d-option v-for = "(key,item) in formItem.options"  :key="item.value" :label="item.label" :value="item.value"></d-option></d-select></el-col>',
    components: {
      dSelect: Select,
      dOption: Option
    }
  });
}

var RadioHandler = function(formItem, form) {
  var Radio = ElementUI.Radio,
    RadioGroup = ElementUI.RadioGroup;
  return Vue.extend({
    data() {
      return {formItem: formItem, form: form}
    },
    template: '<d-radioGroup v-model = "form[formItem.prop]"><el-radio v-for = "item in formItem.radios" :key = "item.value" :label="item.value">{{item.label}}</el-radio></d-radioGroup>',
    components: {
      dRadio: Radio,
      dRadioGroup: RadioGroup
    }
  });
}

var CheckBoxHandler = function(formItem, form) {
  var Checkbox = ElementUI.Checkbox,
    CheckboxGroup = ElementUI.CheckboxGroup;
  return Vue.extend({
    data() {
      return {formItem: formItem, form: form}
    },
    template: '<d-checkboxGroup v-model = "form[formItem.prop]"><d-checkbox :key = "item.value" v-for = "item in formItem.checkboxs" :label="item.value" :name = "formItem.prop">{{item.label}}</d-checkbox></d-checkboxGroup>',
    components: {
      dCheckbox: Checkbox,
      dCheckboxGroup: CheckboxGroup
    }
  });
}

var DaterangeHandler = function(formItem, form) {
  var DatePicker = ElementUI.DatePicker;
  return Vue.extend({
    data() {
      return {formItem: formItem, form: form}
    },
    template: '<d-datePicker  @change = "changeDate" type="daterange" v-model = "form[formItem.prop]" :placeholder = "formItem.placeholder"></d-datePicker>',
    components: {
      dDatePicker: DatePicker
    },
    methods: {
      changeDate(val) {
        if (val.length == 0) {}
      }
    }
  })
}

var FilesHandler = function(formItem, form) {
  var Upload = ElementUI.Upload,
    Button = ElementUI.Button;
  return Vue.extend({
    data() {
      return {formItem: formItem, form: form}
    },
    template: '<d-upload :accept = "formItem.accept"  :file-list = "form[formItem.prop]" action = ""  :on-remove = "removeFile"  :on-change = "changeFile" class="upload-demo"  :auto-upload="false"> <d-button slot="trigger" size="small" type="primary">选取文件</d-button><div slot="tip" class="el-upload__tip">{{formItem.tip}}</div></d-upload>',
    components: {
      dUpload: Upload,
      dButton: Button
    },
    methods: {
      changeFile: function(file, fileList) {
        var files = [];
        for (var i = 0; i < fileList.length; i++) {
          files.push(fileList[i]);
        }
        this.form[formItem.prop] = files;
      },
      removeFile: function(file, fileList) {
        this.form[formItem.prop] = fileList;
      }
    }
  })
}

var SwitchHandler = function(formItem, form) {
  return Vue.extend({
    data() {
      return {formItem: formItem, form: form}
    },
    template: '<el-switch v-model="form[formItem.prop]" active-color="#13ce66" inactive-color="#ff4949"></el-switch>'
  })
}

var ButtonHandler = function(formItem, form) {
  return Vue.extend({
    data() {
      return {formItem: formItem, form: form}
    },
    template: '<el-button @click = "clickButton(formItem.nativeType)" :type="formItem.type"  >{{form[formItem.prop]}}</el-button>',
    methods: {
      clickButton: function(type) {
        bus.$emit('clickButton', type)
      }
    }
  })
}

const FormControlHandler = {
  Input: InputHandler,
  Select: SelectHandler,
  Radio: RadioHandler,
  Checkbox: CheckBoxHandler,
  Daterange: DaterangeHandler,
  Files: FilesHandler,
  Switch: SwitchHandler,
  Button: ButtonHandler
}

var validateFiles = (rule, value, callback) => {
  if (value.length == 0) {
    callback(new Error('请选择文件'));
  } else {
    callback();
  }
};

var buildCol = function(span, FormItem) {
  return Vue.extend({
    data() {
      return {span: span, FormItem: FormItem}
    },
    render() {
      return (
        <el-col span={this.span}>{this.FormItem}</el-col>
      )
    }
  })
}

module.exports = {
  name: 'DForm',
  data: function() {
    return {};
  },
  props: [
    'formItems',
    "form",
    "action",
    "method",
    "layout",
    "position",
    "className"
  ],
  created: function() {},
  mounted: function() {},
  computed: {},
  render() {
    var FormItem = ElementUI.FormItem,
      formItemArr = [],
      propMaptoFormItem = {},
      rules = {};
    //获取表单验证规则对象
    for (var i = 0; i < this.formItems.length; i++) {
      var formItem = this.formItems[i],
        prop = formItem.prop,
        rule = formItem.rule;
      if (rule != undefined)
        rules[prop] = rule;
      }
    //遍历表单域,表单域下有一个表单控件FormControl（表单控件：Input Select Radio Checkbox ...）
    for (var i = 0; i < this.formItems.length; i++) {
      var formItem = this.formItems[i],
        cname = formItem.cname,
        handler = FormControlHandler[cname];
      if (handler == undefined)
        continue;
      var FormControl = handler(formItem, this.form);
      propMaptoFormItem[formItem.prop] = <FormItem class = {formItem.className} label={formItem.label} prop={formItem.prop}><FormControl/></FormItem>
    }
    //设置表单布局
    var rowArr = [];
    for (var i = 0; i < this.layout.length; i++) {
      //获取列
      var cols = this.layout[i],
        colArr = [];
      for (var key in cols) {
        var Col = buildCol(cols[key], propMaptoFormItem[key]);
        colArr.push(<Col/>)
      }
      rowArr.push(
        <el-row gutter={20}>{colArr}</el-row>
      );
    }
    // <el-form-item>
    //   <el-button type="primary" onClick={this.submitForm}>立即创建</el-button>
    //   <el-button onClick={this.resetForm}>重置</el-button>
    // </el-form-item>
    return (
      <el-form class = {this.className} label-position={this.position} label-width="130px" rules={rules} model={this.form} ref={this.form}>
        {rowArr}
      </el-form>
    )
  },
  methods: {
    submitForm: function() {
      this.$refs[this.form].validate((valid, err) => {
        if (valid) {
          //验证通过回调
          var formData = this.getFormData();
          axios({method: this.method, url: this.action, data: formData}).then(res => {
            this.$emit("successHandler", res);
          }).catch(error => {
            this.$emit("errorHandler", error);
          })
        } else {
          //验证失败回调
          this.$emit("errorHandler", err)
          return false;
        }
      });
    },
    resetForm() {
      this.$refs[this.form].resetFields();
    },
    getFormData: function() {
      var formData = new FormData();
      for (var i = 0; i < this.formItems; i++) {
        var item = this.formItems[i],
          name = item.prop,
          value = this.form[name];
        if (item.cname == "Files") {
          //如果是多文件控件，需要单独处理。
          for (var j = 0; j < value.length; j++) {
            formData.append(name, value[i].raw);
          }
        }
        if (item.cname == "Checkbox") {
          //如果是多选控件，需要单独处理
          formData.append(name, value.jion(","));
        }
        formData.append(name, value);
      }
      return formData;
    }
  },
  mounted: function() {
    bus.$on('clickButton', type => {
      if (type == "submit") {
        this.submitForm();
      } else if (type == "reset") {
        this.resetForm();
      }
    })
  }
};
