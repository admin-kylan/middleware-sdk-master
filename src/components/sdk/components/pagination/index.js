/**.
 * @author  Administrator
 * @date   2017/9/25 15:08
 */
/*import date_index_type_1 from './util/date_index_type_1';
import date_index_type_2 from './util/date_index_type_2';*/
import date_index from './util/date_index';

let components = [date_index]
let install = function install(Vue) {
    components.map(function (component) {
        Vue.component(component.name, component);
    });
}
module.exports = {
    install: install,
}

