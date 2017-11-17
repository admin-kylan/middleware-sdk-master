<template>
    <div class="app-wrapper" >
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <navbar></navbar>
            <app-main></app-main>
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

