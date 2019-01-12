<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="6">
                <span class="expand-key">手机: </span>
                <span class="expand-value">{{ row.field7 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">省市区: </span>
                <span class="expand-value">{{ row.field8 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">收获地址: </span>
                <span class="expand-value">{{ row.field9 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">仓库: </span>
                <span class="expand-value">{{ row.field10 }}</span>
            </Col>
        </Row>
        <Row class="expand-row">
            <Col span="6">
                <span class="expand-key">物流公司: </span>
                <span class="expand-value">{{ row.field11 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">快递单号: </span>
                <span class="expand-value">{{ row.field12 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">数量: </span>
                <span class="expand-value">{{ row.field13 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">订单金额: </span>
                <span class="expand-value">{{ row.field14 }}</span>
            </Col>
        </Row>
        <Row class="expand-row">
            <Col span="6">
                <span class="expand-key">运费: </span>
                <span class="expand-value">{{ row.field15 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">应付金额: </span>
                <span class="expand-value">{{ row.field16 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">实付金额: </span>
                <span class="expand-value">{{ row.field17 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">商家留言: </span>
                <span class="expand-value">{{ row.field18 }}</span>
            </Col>
        </Row>
        <Row class="expand-row">
            <Col span="6">
                <span class="expand-key">买家留言: </span>
                <span class="expand-value">{{ row.field19 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">订单备注: </span>
                <span class="expand-value">{{ row.field20 }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">订单标签: </span>
                <span class="expand-value">{{ row.field21 }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>