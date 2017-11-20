<template>
    <section class="app-main" style="min-height: 100%">
        <div class="page_place">
            当前位置：<span>首页</span>
        </div>
        <div class="mian_zt">
            <transition name="fade" mode="out-in">
                <router-view :key="key"></router-view>
            </transition>
        </div>

    </section>
</template>

<script>
    export default {
        name: 'AppMain',
        data(){
            return{

            }
        },
        created(){

        },
        computed: {

            key() {
                //return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
            }
        }
    }
</script>
