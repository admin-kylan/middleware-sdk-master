import Form from './src/main';

/* istanbul ignore next */
Form.install = function(Vue) {
  Vue.component(Form.name, Alert);
};

export default Form;
