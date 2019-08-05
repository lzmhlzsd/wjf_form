module.exports = {
    normal: {
        single_choice: { title: '单选框', type: 'varchar(64)' },
        multiple_choice: { title: '复选框', type: 'text' },
        drop_down: { title: '下拉框 ', type: 'varchar(64)' },
        date: { title: '日期', type: 'varchar(32)' },
        email: { title: 'Email', type: 'varchar(32)' },
        number: { title: '数字', type: 'varchar(32)' },
        phone: { title: '电话', type: 'varchar(11)' },
        mobile: { title: '手机', type: 'varchar(11)' },
        paragraph_text: { title: '多行文本', type: 'varchar(128)' },
        single_line_text: { title: '单行文本', type: 'varchar(128)' },
        address: { title: '地址', type: 'text' },
        form_association: { title: '表单选择', type: 'varchar(64)' },
        goods: { title: '商品', type: 'text' },
        attachment: { title: '附加信息', type: 'text' }
    },
    extend: {
    // 扩展字段
        serial_number: { title: '序号', type: 'varchar(32)' },
        total_price: { title: '订单价格', type: 'varchar(64)' },
        trade_no: { title: '订单号', type: 'varchar(64)' },
        trade_status: { title: '订单状态', type: 'varchar(32)' },
        payment_method: { title: '支付方式', type: 'varchar(32)' },
        x_field_1: { title: '扩展字段', type: 'varchar(32)' },
        x_field_weixin_nickname: { title: '微信名称', type: 'varchar(32)' },
        x_field_weixin_gender: { title: '性别', type: 'varchar(8)' },
        x_field_weixin_country: { title: '国家', type: 'varchar(16)' },
        x_field_weixin_province_city: { title: '省市区', type: 'varchar(32)' },
        x_field_weixin_openid: { title: 'openID', type: 'varchar(64)' },
        x_field_weixin_headimgurl: { title: '微信头像', type: 'text' },
        creator_name: { title: '创建人', type: 'varchar(32)' },
        created_at: { title: '创建时间', type: 'varchar(32)' },
        updater_name: { title: '修改人', type: 'varchar(32)' },
        updated_at: { title: '修改时间', type: 'varchar(32)' },
        info_platform: { title: '设备信息', type: 'varchar(64)' },
        info_os: { title: '操作系统', type: 'varchar(64)' },
        info_browser: { title: '浏览器', type: 'varchar(64)' },
        info_remote_ip: { title: 'IP', type: 'varchar(64)' }
    }
}
