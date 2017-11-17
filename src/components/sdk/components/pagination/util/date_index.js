/**.
 * @author  Administrator
 * @date   2017/9/25 15:09
 */

import proda from '../template/proda.vue'
import store from '../store/index'
export default {
    store,
    mixins: [proda],

    name: 'ElProdaTable',

    methods:{

    },
    created(){
       // console.log('end')
    },
    //标签用于扩展
    props:['adaptDate']
}