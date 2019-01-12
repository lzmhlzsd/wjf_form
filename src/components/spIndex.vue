<template>
        <Layout>
            <Sider v-if="showsubmenu">
                <sub-menu></sub-menu>
            </Sider>
            <router-view class="content-view"></router-view>
        </Layout>
</template>

<script>
import subMenu from './spSubMenu'
export default {
    data () {
        return {

        }
    },
    computed: {
        showsubmenu () {
            return this.$store.state.showsubmenu
        }
    },
    components: {
        'sub-menu': subMenu
    },
    created () {

    }
}
</script>

<style lang="less" scoped>
</style>
