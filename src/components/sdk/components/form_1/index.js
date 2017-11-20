/**.
 * @author  Administrator
 * @date   2017/11/20 16:46
 */

import Form from './util/date_index';

let components = [Form]
let install = function install(Vue) {
    components.map(function (component) {
        Vue.component(component.name, component);
    });
}
module.exports = {
    install: install,
}
