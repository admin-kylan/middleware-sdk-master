/**.
* @author  Administrator 
* @date   2017/10/26 11:24
*/
<!--编写模板 -->
<template>
    <div>
        dddddd

    </div>

</template>

<!--编写脚本 -->
<script>

    import receiveQueue from '../queue/receive_queue_listener'
   // import testPage from './test.vue'
    export default {
        data(){
            return {}
        },
        components: {},
        created(){


            let a = new receiveQueue();
            a.fetchResult(function (value) {
                console.log("get: " + value )
               // alert(value)
            })

            let obj = {}
            obj.a = 1212
            obj.c = 1212
           // a.add("aaa");
//            setInterval(function () {
//                let num = parseInt(Math.random() * 10)
//                a.add(num + "");
//            },1000)
//          for(let i = 0; i < 10; i++){
//              let num = parseInt(Math.random() * 10)
//              console.log("put: " + i )
//              a.add(i + "");
//          }

        },
        methods: {}
    }

</script>


<!--编写样式 -->
