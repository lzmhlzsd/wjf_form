<template>
    <Layout style="padding-left: 1px;">
        <Content class="m-10 box-full">
            <div ref="tcontent" class="tcontent p-10">
                <Row ref="tools" class="pt-10 pb-10">
                    <Col span="12">
                        <!-- <Input type="text" clearable v-model="keyword" placeholder="请输入表单ID或名称" style="width: 200px;"></Input>
                        <Button type="primary" @click="getFormList">搜索</Button> -->
                        <Button type="primary" @click="goFormList">表单管理</Button>
                    </Col>
                </Row>
                <Table ref="table" :loading="loading" :columns="columns" :data="list" size="small"></Table>
                <div ref="pages" class="txt-right pt-20 pb-30">
                    <Page :current="current" :total="total" size="small" show-elevator show-sizer :page-size="pagesize"
                    @on-change="onPageChange"
                    @on-page-size-change="onPageSizeChange"></Page>
                </div>
            </div>
        </Content>
    </Layout>
</template>

<script>
    // 接口
    import spDrawer from './../../../../components/spDrawer'
    export default {
        name: 'formList',
        data () {
            return {
                flag_createform: false,
                loading: false,
                keyword: '',
                list: [],
                columns: [ // table 表头
                    // {
                    //     type: 'selection',
                    //     width: 60,
                    //     align: 'center',
                    //     fixed: 'left'
                    // },
                    // { title: '表单ID', key: 'c_id' },
                    // { title: '表单名称', key: 'c_name' },
                    // { title: '描述', key: 'c_desc' },
                    // {
                    //     title: '操作',
                    //     key: 'action',
                    //     render: ( h, params ) => {
    
                    //     }
                    // }
                ],
                total: 0,
                current: 1,
                pagesize: 10,
                formData_create: {
                    formID: ''
                }

            }
        },
        components: {
            spDrawer
        },
        mounted: function () {

        },
        created () {
            let id = this.$route.params.id
            this.getFormList( id )
        },
        methods: {
            goFormList () {
                this.$router.go( -1 )
            },
            onPageChange ( pageindex ) {
                this.current = pageindex
                this.getFormData()
            },
            onPageSizeChange ( pagesize ) {
                this.pagesize = pagesize
                this.getFormData()
            },
            async getFormData () {
                let result = await this.$http.post( '/getFormData', {
                    tablename: this.$route.params.id,
                    pageindex: this.current,
                    pagesize: this.pagesize
                } )
                this.list = result.result.list
                this.current = result.result.pageindex
                this.total = result.result.total
                this.pagesize = result.result.pagesize
            },
            async getFormList ( id ) {
                let result = await this.$http.post( '/getFormList', {
                    keyword: id,
                    pageindex: 1,
                    pagesize: 1
                } )
                this.columns = []
                if ( result.result.list.length > 0 ) {
                    let contents = JSON.parse( result.result.list[0].c_content )
                    this.columns.push( {
                        title: '序号',
                        key: 'serial_number'
                    } )
                    contents.forEach( m => {
                        for ( var item in m ) {
                            this.columns.push( {
                                title: m[item].label,
                                key: item
                            } )
                        }
                    } )
                    this.columns = this.columns.concat( [
                        { title: '提交人', key: 'creator_name' },
                        { title: '提交时间', key: 'created_at' },
                        { title: '修改时间', key: 'updated_at' },
                        { title: '填写设备', key: 'info_platform' },
                        { title: '操作系统', key: 'info_os' },
                        { title: '浏览器', key: 'info_browser' },
                        { title: 'IP', key: 'info_remote_ip' }
                    ] )
                }
                this.getFormData()
            }
        }
    }
</script>

<style lang="less" scoped>
</style>
