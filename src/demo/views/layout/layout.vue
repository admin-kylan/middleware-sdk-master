<template>
    <div class="app-wrapper" >
        <!--头部内容-->
        <sidebar class="mian_top"></sidebar>
        <div class="main-container">
            <!--左侧内容-->
            <navbar class="mian_left"></navbar>
            <!--右侧内容-->
            <app-main class="mian_right"></app-main>
        </div>
    </div>
</template>

<script>

    import AppMain from './app_main.vue'
    import Navbar from './navbar.vue'
    import Sidebar from './sidebar.vue'

    export default {
        name: 'layout',
        components: {
            Navbar,
            Sidebar,
            AppMain
        },
        computed: {
            sidebar() {
                //return this.$store.state.app.sidebar
            }
        }
    }
</script>
<!--<style rel="stylesheet/scss" lang="scss" scoped>
    .test-span{
        color: #3f63ff;
    }
</style>-->

