<template>
    <div>
        <div class="steps-btn">
            <div class="steps-btn-item" @click="handlerClick(index)" :class="[(index <= stepStatus) ? 'active' : '', showIndex == index ? 'open' : '', showIndex == index + 1 ? 'open-arrow' : '']" v-for="(item, index) in value" :key="index">
                {{item.label}}
            </div>
            <div style="margin-left: 30px;">
                <Button type="ghost" @click="changeState(btn_text,showIndex)" shape="circle">{{btn_text}}</Button>
            </div>
        </div>
        <div v-for="(item, index) in value" :key="index" v-if="showIndex == index">
            <sp-formcreate :bussinessId="bussinessId" :clueId="clueId" :label="item.label" :desc="item.desc" :html="item.html" :rule="item.form.rule" :option="item.form.option"></sp-formcreate>
        </div>
        <Modal
            v-model="success"
            width="700"
            title="成功签单"
        >
            <Form ref="successFormData" :model="successFormData" :rules="ruleValidate" :label-width="100" style="padding-right: 80px;">
                <Row>
                    <Col span="12"> 
                    <FormItem label="客户名称：" prop="guest">
                        <Input v-model="successFormData.guest" placeholder="请输入公司名称"></Input>
                    </FormItem> 
                    </Col>
                    <Col span="12"> 
                        <FormItem label="联系人姓名：" prop="name">
                            <Input v-model="successFormData.name" placeholder="请输入姓名"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12"> 
                        <FormItem label="手机：" prop="phone">
                            <Input v-model="successFormData.phone" placeholder="请输入手机号码"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer" class="ModalFooter">
                <Button @click="changeSta">更改</Button>
            </div>
        </Modal>
        <Modal v-model="clue" width="700" title="转化线索为商机">
            <Tabs value="newContacts" @on-click="clickContacts">
                <TabPane label="生成新的联系人" name="newContacts">
                    <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="100" style="padding-right: 80px;">
                        <Col span="12"> 
                            <FormItem label="姓名：" prop="name">
                                <Input v-model="formData.name" placeholder="请输入姓名"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12"> 
                            <FormItem label="手机：" prop="phone">
                                <Input v-model="formData.phone" placeholder="请输入手机号" @on-blur="checkPhone"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12"> 
                            <FormItem label="邮箱：" prop="email">
                                <Input v-model="formData.email" placeholder="请输入邮箱地址"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12"> 
                            <FormItem label="公司：" prop="company">
                                <Input v-model="formData.company" placeholder="请输入公司名称"></Input>
                            </FormItem> 
                        </Col>
                        <Col span="12"> 
                            <FormItem label="职位：" prop="position">
                                <Input v-model="formData.position" placeholder="请输入职位名称"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12"> 
                            <FormItem label="QQ：" prop="QQ">
                                <Input v-model="formData.QQ" placeholder="请输入所属行业"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12"> 
                            <FormItem label="微信：" prop="wechat">
                                <Input v-model="formData.wechat" placeholder="请输入所属行业"></Input>
                            </FormItem>
                        </Col> 
                    </Form>
                </TabPane>
                <TabPane label="从已有联系人中选择" name="hasContacts">
                    <Form ref="hasContactsData" :model="hasContactsData" :rules="ruleValidate1" :label-width="100" style="padding-right: 80px;">
                        <FormItem label="关联联系人：" prop="contactsId">
                            <Select v-if="optionsContacts"  v-model="hasContactsData.contactsId" filterable clearable placeholder="请选择联系人" remote :remote-method="changeContacts" >
                                <Option v-for="item in optionsContacts" :value="item.contant_id? item.contant_id: ''" :key="item.contact_id">{{ item.phone }}</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </TabPane>
            </Tabs>
            <Tabs value="newCustomer" @on-click="clickCustomer">
                <TabPane label="生成新的客户" name="newCustomer" >
                    <Form ref="customerData" :model="customerData" :rules="ruleValidate" :label-width="100" style="padding-right: 80px;">
                        <Col span="12">
                            <FormItem label="名称：" prop="name">
                                <Input v-model="customerData.name" placeholder="请输入名称"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="地址：" prop="address">
                                <Input v-model="customerData.address" placeholder="请输入地址"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="行业：" prop="industry">
                                <Input v-model="customerData.industry" placeholder="请输入行业"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="电话：" prop="tel">
                                <Input v-model="customerData.tel" placeholder="请输入电话"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="人数：" prop="personNum">
                                <Input v-model="customerData.personNum" placeholder="请选择人数"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="网址：" prop="website">
                                <Input v-model="customerData.website" placeholder="请输入网址"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="年营业额：" prop="annualTurnover">
                                <Input v-model="customerData.annualTurnover" placeholder="请输入年营业额"></Input>
                            </FormItem>
                        </Col>
                    </Form>
                </TabPane>
                <TabPane label="从已有客户中选择" name="hasCustomer">
                    <Form ref="hasGuest" :model="hasGuest" :rules="ruleValidate1" :label-width="100" style="padding-right: 80px;">
                        <FormItem label="关联客户：" prop="guestId">
                            <Select v-model="hasGuest.guestId" filterable clearable placeholder="请选择客户" remote :remote-method="changeGuest">
                                <Option v-for="(item,key) in optionsGuest" :value="item.account_id" :key="key">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </TabPane>
            </Tabs>
            <Tabs value="newBussiness" @on-click="clickBussiness">
                <TabPane label="生成新的商机" name="newBussiness">
                    <Col span="12">
                        <Form ref="newBussiness" :model="newBussiness" :rules="ruleValidate1" :label-width="100" style="padding-right: 80px;">
                            <FormItem label="商机：" prop="businessName">
                                <Input v-model="newBussiness.businessName" placeholder="请输入商机"/>
                            </FormItem>
                        </Form>
                    </Col>
                    <div style="height: 80px">

                    </div>
                </TabPane>
                <TabPane label="从已有商机中选择" name="hasBussiness">
                    <Form ref="hasBussiness" :model="hasBussiness" :rules="ruleValidate1" :label-width="100" style="padding-right: 80px;">
                        <FormItem label="关联商机：" prop="bussinessId" >
                            <Select  v-model="hasBussiness.bussinessId" filterable clearable placeholder="请选择商机" remote :remote-method="changeBusiness">
                                <Option v-for="(item,index) in bussinessOList" :value="item.id" :key="index">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </TabPane>
            </Tabs>
            <div slot="footer" >
                <Button type="primary" @click="conversion">转化</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import spFormcreate from './spFormCreate'
import API from './../js/libs/api/index.js'
import bus from './../js/libs/bus.js'
import {isPhone} from './../js/libs/validate.js'
export default {
    props: {
        value: {
            type: Array
        },
        stepStatus: {
            type: Number
        },
        type: String,
        clueId: String,
        bussinessId: String,
        navList: Array
    },
    data () {
        return {
            newBussiness: {
                businessName: ''
            },
            hasBussiness: {
                bussinessId: ''
            },
            hasGuest: {
                guestId: ''
            },
            hasContactsData: {
                contactsId: ''
            },
            contactsDiff: 'newContacts',
            gusetDiff: 'newCustomer',
            bussinessDiff: 'newBussiness',
            showIndex: 0,
            btn_text: '更改为选中阶段',
            success: false,
            clue: false,
            successFormData: {
                name: '',
                phone: '',
                guest: ''
            },
            formData: {
                name: '',
                phone: '',
                email: '',
                company: '',
                position: '',
                QQ: '',
                wechat: ''
            },
            customerData: {
                name: '',
                address: '',
                industry: '',
                tel: '',
                personNum: '',
                website: '',
                annualTurnover: ''
            },
            optionsContacts: [],
            optionsGuest: [],
            bussinessOList: [],
            contacts: '',
            guest: '',
            bussiness: '',
            ruleValidate: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                phone: [
                    {
                        required: true,
                        message: '请输入手机号码',
                        trigger: 'blur'
                    },
                    {
                        validator: ( rule, value, callback ) => {
                            if ( !isPhone( value ) ) {
                                callback( '请输入正确的手机号码' )
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ]
            },
            ruleValidate1: {
                businessName: [
                    { required: true, message: '请输入商机', trigger: 'change' }
                ],
                contactsId: [
                    { required: true, message: '请选择联系人', trigger: 'change' }
                ],
                guestId: [
                    { required: true, message: '请选择客户', trigger: 'change' }
                ],
                bussinessId: [
                    { required: true, message: '请选择商机', trigger: 'change' }
                ]
            }
        }
    },
    components: {
        spFormcreate
    },
    created () {
        // this.contactsList();
        // this.guestList();
        // this.bussinessList();
    },
    methods: {
        // 检验手机号
        checkPhone ( val ) {
            API.contactsList( {
                pageSize: '',
                pageIndex: 1,
                filter: JSON.stringify(
                    {
                        logic: 'and',
                        filters: [
                            {
                                field: 'phone',
                                value: val.target.value,
                                operator: 'like'
                            }
                        ]
                    }
                )
            } ).then( res => {
                res.result.data.length > 0 ? this.$Message.warning( '手机号已存在，请从已有联系人中选择' ) : ''
            } )
        },
        // 关联客户
        changeGuest ( val ) {
            API.guestList( {
                pageSize: '',
                pageIndex: 1,
                filter: JSON.stringify(
                    {
                        logic: 'and',
                        filters: [
                            {
                                field: 'name',
                                value: val,
                                operator: 'like'
                            }
                        ]
                    }
                )
            } ).then( res => {
                console.log( res )
                this.optionsGuest = res.result.data
            } )
        },
        // 关联联系人
        changeContacts ( val ) {
            API.contactsList( {
                pageSize: '',
                pageIndex: 1,
                filter: JSON.stringify(
                    {
                        logic: 'and',
                        filters: [
                            {
                                field: 'phone',
                                value: val,
                                operator: 'like'
                            }
                        ]
                    }
                )
            } ).then( res => {
                console.log( res )
                this.optionsContacts = res.result.data
            } )
        },
        // 选择商机
        changeBusiness ( val ) {
            API.contactsList( {
                pageSize: '',
                pageIndex: 1,
                filter: JSON.stringify(
                    {
                        logic_all: 'and',
                        filters_all: [
                            {
                                logic: 'and',
                                filters: [
                                    {
                                        field: 'businessName',
                                        value: val,
                                        operator: 'like'
                                    }
                                ]
                            }
                        ]
                    }
                )
            } ).then( res => {
                this.bussinessOList = res.result.data
            } )
        },
        // 点击商机tabs
        clickBussiness ( e ) {
            this.bussinessDiff = e
        },
        // 点击联系人tabs
        clickContacts ( e ) {
            this.contactsDiff = e
        },
        // 点击客户tabs
        clickCustomer ( e ) {
            this.gusetDiff = e
        },
        handlerClick ( e ) {
            this.showIndex = e
            if ( this.type === 'clue' && e === this.value.length - 1 ) {
                this.btn_text = '转化为商机'
            } else {
                this.btn_text = '更改为选中阶段'
            }
        },
        changeState ( e ) {
            if ( this.showIndex === 2 && this.type === 'bussiness' ) {
                this.success = true
            } else if ( e === '转化为商机' ) {
                this.clue = true
            }
            if ( this.type === 'bussiness' ) {
                if ( e === '更改为选中阶段' && this.showIndex !== 2 ) {
                    bus.$emit( 'set.stepStatus', this.showIndex )
                } else if ( e === '转化为订单' ) {

                }
            } else {
                if ( e === '更改为选中阶段' ) {
                    bus.$emit( 'set.stepStatus', this.showIndex )
                } else if ( e === '转化为订单' ) {

                }
            }
            if ( this.type === 'clue' && e === '更改为选中阶段' ) {
                API.changeClueStatus( {
                    clueId: [this.clueId],
                    type: this.navList[this.showIndex].type
                } )
            }
            if ( this.type === 'bussiness' && e === '更改为选中阶段' ) {

            }
        },
        conversion () {
            if ( this.contactsDiff === 'newContacts' && this.gusetDiff != 'newCustomer' ) {
                this.$refs.formData.validate( valid => {
                    if ( valid ) {
                        this.$refs.hasGuest.validate( valid => {
                            if ( valid ) {
                                if ( this.bussinessDiff === 'newBussiness' ) {
                                    this.$refs.newBussiness.validate( valid => {
                                        if ( valid ) {
                                            API.contactsList( {
                                                pageSize: '',
                                                pageIndex: 1,
                                                filter: JSON.stringify(
                                                    {
                                                        logic: 'and',
                                                        filters: [
                                                            {
                                                                field: 'phone',
                                                                value: this.formData.phone,
                                                                operator: 'like'
                                                            }
                                                        ]
                                                    }
                                                )
                                            } ).then( res => {
                                                if ( res.result.data.length > 0 ) {
                                                    this.$Message.warning( '手机号已存在，请从已有联系人中选择' )
                                                } else {
                                                    API.createContacts( this.formData ).then( ( res ) => {
                                                        if ( res.code === 200 ) {
                                                            API.transformClue( {
                                                                clueId: this.clueId,
                                                                contactsId: res.result.contact_id,
                                                                guestId: this.hasGuest.guestId,
                                                                businessId: '',
                                                                businessName: this.newBussiness.businessName
                                                            } )
                                                        }
                                                    } )
                                                    this.clue = false
                                                }
                                            } )
                                        }
                                    } )
                                } else {
                                    this.$refs.hasBussiness.validate( valid => {
                                        if ( valid ) {
                                            API.createContacts( this.formData ).then( res => {
                                                if ( res.code === 200 ) {
                                                    API.transformClue( {
                                                        clueId: this.clueId,
                                                        contactsId: res.result.contact_id,
                                                        guestId: this.hasGuest.guestId,
                                                        businessId: this.hasBussiness.bussinessId,
                                                        businessName: ''
                                                    } )
                                                }
                                            } )
                                            this.clue = false
                                        }
                                    } )
                                }
                            }
                        } )
                    }
                } )
            } else if ( this.contactsDiff != 'newContacts' && this.gusetDiff === 'newCustomer' ) {
                this.$refs.customerData.validate( valid => {
                    if ( valid ) {
                        this.$refs.hasContactsData.validate( valid => {
                            if ( valid ) {
                                if ( this.bussinessDiff === 'newBussiness' ) {
                                    this.$refs.newBussiness.validate( valid => {
                                        if ( valid ) {
                                            API.createGuest( this.customerData ).then( res => {
                                                if ( res.code === 200 ) {
                                                    API.transformClue( {
                                                        clueId: this.clueId,
                                                        contactsId: this.hasContactsData.contactsId,
                                                        guestId: res.result.account_id,
                                                        businessId: '',
                                                        businessName: this.newBussiness.bussinessName
                                                    } )
                                                    this.clue = false
                                                }
                                            } )
                                        }
                                    } )
                                } else {
                                    this.$refs.hasBussiness.validate( valid => {
                                        if ( valid ) {
                                            API.createGuest( this.customerData ).then( res => {
                                                API.transformClue( {
                                                    clueId: this.clueId,
                                                    contactsId: this.hasContactsData.contactsId,
                                                    guestId: res.result.account_id,
                                                    businessId: this.hasBussiness.bussinessId,
                                                    businessName: this.newBussiness.bussinessName
                                                } )
                                                this.clue = false
                                            } )
                                        }
                                    } )
                                }
                            }
                        } )
                    }
                } )
            } else if ( this.contactsDiff === 'newContacts' && this.gusetDiff === 'newCustomer' ) {
                this.$refs.formData.validate( valid => {
                    if ( valid ) {
                        this.$refs.customerData.validate( valid => {
                            if ( valid ) {
                                if ( this.bussinessDiff === 'newBussiness' ) {
                                    this.$refs.newBussiness.validate( valid => {
                                        if ( valid ) {
                                            API.createGuest( this.customerData ).then( res => {
                                                API.createContacts( this.formData ).then( res1 => {
                                                    API.transformClue( {
                                                        clueId: this.clueId,
                                                        contactsId: res1.result.contact_id,
                                                        guestId: res.result.account_id,
                                                        businessId: '',
                                                        businessName: this.newBussiness.bussinessName
                                                    } )
                                                    this.clue = false
                                                } )
                                            } )
                                        }
                                    } )
                                } else {
                                    this.$refs.hasBussiness.validate( valid => {
                                        if ( valid ) {
                                            API.createGuest( this.customerData ).then( res => {
                                                API.createContacts( this.formData ).then( res1 => {
                                                    API.transformClue( {
                                                        clueId: this.clueId,
                                                        contactsId: res1.result.contact_id,
                                                        guestId: res.result.account_id,
                                                        businessId: this.hasBussiness.bussinessId,
                                                        businessName: ''
                                                    } )
                                                    this.clue = false
                                                } )
                                            } )
                                        }
                                    } )
                                }
                            }
                        } )
                    }
                } )
            }
        },
        changeSta () {
            this.success = false
            bus.$emit( 'set.stepStatus', this.showIndex )
            API.successSave( {
                id: this.bussinessId,
                ...this.successFormData
            } )
        }
    }
}
</script>

<style lang="less" scoped>
@import './../css/theme/crm-theme.less';
.steps {
    &-btn {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        &-item {
            position: relative;
            flex: 1;
            border-top: 1px solid @line-color;
            border-bottom: 1px solid @line-color;
            padding: 10px;
            text-align: center;
            background: @hover-background;
            cursor: pointer;
            &:not(:last-child){
                &::before {
                    content: '';
                    position: absolute;
                    top: 0px;
                    right: -16px;
                    bottom: 0px;
                    border-top: 20px solid transparent;
                    border-bottom: 20px solid transparent;
                    border-left: 15px solid @line-color;
                    z-index: 999;
                }
                &::after {
                    content: '';
                    position: absolute;
                    top: 0px;
                    right: -15px;
                    bottom: 0px;
                    border-top: 20px solid transparent;
                    border-bottom: 20px solid transparent;
                    border-left: 15px solid @hover-background;
                    z-index: 999;
                }
            }
            &:first-child {
                border-left: 1px solid @line-color;
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
            }
            &:last-child {
                border-right: 1px solid @line-color;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }
        }
        &-item.active {
            // border: 1px solid @primary-color;
            background-color: @primary-color;
            color: #fff;
            // &::before {
            //     border-left: 15px solid @primary-color;
            // }
            &::after {
                border-left: 15px solid @primary-color;
            }
        }
        &-item.open {
            // border: 1px solid #3d5a94;
            color: #f1ae51;
            // &::before {
            //     border-left: 15px solid #3d5a94;
            // }
        }
        // &-item.open-arrow {
        //     &::before {
        //         border-left: 15px solid #3d5a94;
        //     }
        // }
    }
}
</style>
