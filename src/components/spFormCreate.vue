<template>
    <div class="custom-form">
        <div class="custom-form-header">
            <div class="custom-form-label">{{label}}</div>
            <div class="custom-form-desc">{{desc}}</div>
        </div>
        <div v-html="html">
            
        </div>
        <Form ref="formData" class="custom-form-container" :model="formData" :rules="ruleValidate" :label-width="100">
            <FormItem v-for="(item, index) in rule" :key="index" :label="item.title" :prop="item.field">
                <form-ctrl :type="item.component" :value="formData[item.field]" :field="item.field" :props="item.props" :event="item.event" :options="item.options"></form-ctrl>
            </FormItem>
            <FormItem>
                <Button type="primary" v-if="option.saveBtn" @click="handleSubmit('formData',label)">保存</Button>
                <Button type="ghost" v-if="option.resetBtn" @click="handleReset('formData')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import _ from "lodash";
import formCtrl from "./../js/libs/formCtrl";
import { isPhone } from './../js/libs/validate';
import API from './../js/libs/api/index.js'
export default {
    props: {
        clueId: String,
        bussinessId: String,
        label: {
            type: String
        },
        desc: {
            type: String
        },
        html: {
            type: String
        },
        rule: {
            type: Array,
            default: []
        },
        option: {
            type: Object
        }
    },
    data() {
        return {
            formData: {},
            ruleValidate: {}
        };
    },
    components: {
        formCtrl
    },
    created() {
        let self = this;
        //let validate = {};
        _.forEach(this.rule, function(value, index) {
            //validate[value.field] = value.validate
            //self.formData[value.field] =  value.value
            _.forEach(value.validate, function(v, k) {
                if(typeof v.validator != 'undefined') {
                    switch (v.validator) {
                        case "mobile":
                            v.validator = (rule, value, callback) => {
                                if (!isPhone(value)) {
                                    callback(rule.message);
                                } else {
                                    callback();
                                }   
                            }
                            break;
                        default:
                            break;
                    }
                }
            })
            self.$set(self.ruleValidate, value.field, value.validate )
            self.$set(self.formData, value.field, value.value )
        });
        //this.ruleValidate = validate;
        this.$on( 'sinput', function(data, field) {
            console.log(`filed: ${field}, sinput: ${data}`)
            self.formData[field] = data
        })
    },
    methods: {
        handleSubmit(name,label) {
            //alert('handleSubmit...')
            this.$refs[name].validate(valid => {
                if (valid) {
                    console.log(label)
                    switch(label){
                        case '不合格':
                            console.log(this.clueId)
                            console.log(this.formData)
                            API.unqualifiedSave({
                                clueId: this.clueId,
                                ...this.formData
                            })
                        break;
                        case '未验证':
                            API.unverifiedSave({
                                clueId: this.clueId,
                                ...this.formData
                            })
                        break;
                        case '已验证':
                            API.verifiedSave({
                                clueId: this.clueId,
                                ...this.formData
                            })
                        break;
                        case '跟进中':
                            API.followUpSave({
                                clueId: this.clueId,
                                ...this.formData
                            })
                        break;
                        case '收集需求':
                            API.collectInforSave({
                                id: this.bussinessId,
                                ...this.formData,
                            })
                        break;
                        case '商谈报价':
                            API.discussQuotationSave({
                                id: this.bussinessId,
                                ...this.formData
                            }) 
                        break;
                        case '丢单结束':
                            API.failSave({
                                id: this.bussinessId,
                                ...this.formData
                            })       
                    }
                    this.$Message.success("Success!");
                } else {
                    this.$Message.error("Fail!");
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    }
};
</script>

<style lang="less" scoped>
@import "./../css/theme/crm-theme.less";
.custom-form {
    border: 1px solid @line-color;
    border-radius: 5px;
    &-header {
        display: flex;
        align-items: center;
        border-bottom: 1px solid @line-color;
        padding: 10px 20px;
    }
    &-label {
        width: 100px;
        font-size: 24px;
        text-align: center;
        color: @darken-color ;
    }
    &-desc {
        font-size: 14px;
        color: @extLighten-color;
    }
    &-container {
        padding: 20px;
        .ivu-date-picker,
        .ivu-select,
        .ivu-input-wrapper {
            width: 300px;
        }
    }
}
</style>
