import Form from './sdk/components/form/index.js';

import Form_1 from './sdk/components/form_1/util/date_index';
const components = [
    Form,
    Form_1
]

const install = function(Vue, opts = {}) {
  if (install.installed) return;
  components.map(component => {
    Vue.component(component.name, component);
  });
}


module.exports = {
  install,
  Form,

}
