/**.
 * @author  Administrator
 * @date   2017/10/26 14:05
 */

/**
 * option 传递key: value json值
 * fetchCodeUrl 取状态值得url,
 * fetchResultUrl 取数据值得url,
 * @param option
 */
import Vue from 'vue';
import axios from 'axios'
import Promise from 'promise'

export default function () {
    let that = this;
    let vm = new Vue({
        data(){
            return {
                flag: null,
                array: [],
                valueResult: []
            }
        },
    });
    this.fetchResult = function (cb){
        let unwatch = vm.$watch('flag', function () {
            let array = vm.$data.array;
           //第一种情况
            for(let i = 0; i < array.length; i++){
                cb(array[i])
            }
            //第二种情况
           // cb(array)
            //去空
            vm.$data.array = [];
        }, {deep: true})
    }

    this.add = function (val) {
        let array = [];
        //触发添加事件，更改数组状态
        if(typeof val === 'string'){
            array = val.split(',')
            for(let i = 0; i < array.length; i++){
                vm.array.push(array[i])
                changeFlag();
            }
        }
        if(val instanceof Array){
            Object.assign(array, val)
            for(let i = 0; i < array.length; i++){
                vm.array.push(array[i])
                changeFlag();
            }
        }
        if(typeof val === 'object'){
            vm.array.push(val)
            changeFlag();
        }
    }

    //更改标记
    function changeFlag() {
        vm.$data.flag = new Date().getTime();
    }


}