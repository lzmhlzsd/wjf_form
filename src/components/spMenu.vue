<template>
    <Menu theme="light" width="200">
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-paper"/>表单
        </template>
        <MenuItem name="1-1">表单管理</MenuItem>
        <MenuItem name="1-2">表单查询</MenuItem>
      </Submenu>
    </Menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        menuitemClasses: String
    },
    data () {
        return {}
    },
    components: {},
    computed: {},
    methods: {},
    created () { }
}
</script>

<style lang="less" scoped>
</style>
