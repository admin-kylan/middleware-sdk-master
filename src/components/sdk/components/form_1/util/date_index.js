/**.
 * @author  Administrator
 * @date   2017/11/20 16:47
 */
import proda from '../template/form.vue'
import store from '../store/index'
export default {
    store,
    mixins: [proda],

    name: 'ElProdaForm',

    methods:{

    },
    created(){
        // console.log('end')
    },
    //标签用于扩展
    props:['data']
}