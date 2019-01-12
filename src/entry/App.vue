<template>
    <Layout style="height: 100%;">
        <Header v-if="showheader">
            <sp-header></sp-header>
        </Header>
        <Layout style="height: 100%;">
            <!-- <Sider width="200">
                <sp-menu></sp-menu>
            </Sider> -->
            <Content class="content" style="height: 100%;">
                <router-view class="content-view"></router-view>
            </Content>
        </Layout>
        <!-- <Footer>Footer</Footer> -->
    </Layout>
</template>

<script>
import spHeader from './../components/spHeader.vue'
import spMenu from './../components/spMenu.vue'
import { mapState } from 'vuex'
export default {
    data () {
        return {
            isCollapsed: false
        }
    },
    components: {
        spHeader,
        spMenu
    },
    computed: {
        ...mapState( {
            paths: state => state.paths
        } ),
        showheader () {
            return this.$store.state.showheader
        },
        showmenu () {
            return this.$store.state.showmenu
        },
        rotateIcon () {
            return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
        },
        menuitemClasses () {
            return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
        }
    },
    methods: {
        collapsedSider () {
            this.$refs.menuside.toggleCollapse()
        }
    }
}
</script>

<style lang="less" scoped>
.content {
    // padding: 0 10px;
    // background: #fff;
}
.content-view {
    // padding: 10px;
    height: 100%;
}
.menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
