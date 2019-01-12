<template>
    <Layout style="padding-left: 1px;">
        <Content class="m-10 box-full">
            <div ref="tcontent" class="tcontent p-10">
                <Row ref="tools" class="pt-10 pb-10">
                    <Col span="12">
                        <Input type="text" clearable v-model="keyword" placeholder="请输入表单ID或名称" style="width: 200px;"></Input>
                        <!-- <Button type="primary" @click="searchFxs">搜索</Button> -->
                        <Button type="primary" @click="getFormList">搜索</Button>
                        <Button type="primary" @click="createFrom">新建表单</Button>
                    </Col>
                </Row>
                <Table ref="table" :loading="loading" :columns="columns" :data="list" size="small"
                @on-row-click="onRowClick" ></Table>
                <div ref="pages" class="txt-right pt-20 pb-30">
                    <Page :current="current" :total="total" size="small" show-elevator show-sizer :page-size="pagesize"
                    @on-change="onPageChange"
                    @on-page-size-change="onPageSizeChange"></Page>
                </div>
            </div>
            <sp-drawer title="新建表单" :closable="true" width="450" v-model="flag_createform">
                <Form ref="formData_create" :model="formData_create" :label-width="80">
                    <FormItem label="表单ID" prop="formID" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
                        <Input v-model="formData_create.formID" placeholder="表单ID"></Input>
                    </FormItem>
                </Form>
                <div slot="drawer-footer">
                    <Button type="primary" @click="createNewForm('formData_create')">确定</Button>
                </div>
            </sp-drawer>
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
                    { title: '表单ID', key: 'c_id' },
                    { title: '表单名称', key: 'c_name' },
                    { title: '描述', key: 'c_desc' },
                    {
                        title: '操作',
                        key: 'action',
                        render: ( h, params ) => {
    
                        }
                    }
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
        created () { this.getFormList() },
        methods: {
            createFrom () {
                this.flag_createform = true
            },
            createNewForm () {
                this.$refs['formData_create'].validate( valid => {
                    if ( valid ) {
                        this.getFormById()
                    }
                } )
            },
            onRowClick ( row ) {
                this.$router.push( {
                    path: `/form/${row.c_id}`
                } )
            },
            onPageChange ( pageindex ) {
                this.current = pageindex
                this.getFormList()
            },
            onPageSizeChange ( pagesize ) {
                this.pagesize = pagesize
                this.getFormList()
            },
            async getFormById () {
                let result = await this.$http.get( '/getFormById', {
                    params: {
                        id: this.formData_create.formID
                    }
                } )
                if ( result.ecode !== 0 ) {
                    this.$Message.error( result.msg )
                } else {
                    this.flag_createform = false
                    this.formData_create.formID = ''
                    this.getFormList()
                }
            },
            async getFormList () {
                let result = await this.$http.post( '/getFormList', {
                    keyword: this.keyword,
                    pageindex: this.current,
                    pagesize: this.pagesize
                } )
                this.list = result.result.list
                this.current = result.result.pageindex
                this.total = result.result.total
                this.pagesize = result.result.pagesize
                // console.log( result )
            }
        }
    }
</script>

<style lang="less" scoped>
</style>
