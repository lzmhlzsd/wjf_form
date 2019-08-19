const request = require( './../libs/request' )
const HELP = require( '../libs/help' )
const logFile = '[controller/index]'
const cField = require( './field' )
const colors = require( 'colors' )
module.exports = {
    // 查询
    async getFormById ( req, res ) {
        try {
            let formID = req.query.id
            let data = await request.get( formID )
            if ( !data ) {
                res.send( { ecode: -1, msg: '没有查询到该表单' } )
                return
            }
            HELP.log( `${logFile} getFormById request result: ${JSON.stringify( data )}` )
            // 查询数据库中是否已经存在该表单
            const sql = `select * from t_tables where c_id='${formID}'`
            let result = await HELP.sqlExecute( sql )
            HELP.log( `${logFile} getFormById sql search result: ${result}` )
            if ( result.length > 0 ) {
                res.send( { ecode: -1, msg: '数据库已经存在该表单' } )
            } else {
                // 创建表
                let tableFields = [
                    'id int(11) unsigned NOT NULL AUTO_INCREMENT',
                    'serial_number varchar(32) NOT NULL unique'
                ]
                data.fields.forEach( m => {
                    for ( var item in m ) {
                        if ( cField.normal[m[item].type] ) {
                            tableFields.push( `${item} ${cField.normal[m[item].type].type}` )
                        } else {
                            tableFields.push( `${item} varchar(64)` )
                        }
                    }
                } )
                Object.keys( cField.extend ).forEach( item => {
                    tableFields.push( `${item} ${cField.extend[item].type}` )
                } )
                // tableFields.push( `total_price float` )
                // tableFields.push( `trade_no varchar(64)` )
                // tableFields.push( `trade_status varchar(64)` )
                // tableFields.push( `payment_method varchar(64)` )
                // // 扩展字段type
                // tableFields.push( `x_field_1 varchar(256)` )
                // tableFields.push( `x_field_weixin_nickname varchar(64)` )
                // tableFields.push( `x_field_weixin_gender varchar(16)` )
                // tableFields.push( `x_field_weixin_country varchar(128)` )
                // tableFields.push( `x_field_weixin_province_city varchar(128)` )
                // tableFields.push( `x_field_weixin_openid varchar(64)` )
                // tableFields.push( `x_field_weixin_headimgurl varchar(256)` )
                // //
                // tableFields.push( `creator_name varchar(64)` )
                // tableFields.push( `created_at varchar(64)` )
                // tableFields.push( `updater_name varchar(64)` )
                // tableFields.push( `updated_at varchar(64)` )
                // tableFields.push( `info_platform varchar(64)` )
                // tableFields.push( `info_os varchar(64)` )
                // tableFields.push( `info_browser varchar(64)` )
                // tableFields.push( `info_remote_ip varchar(64)` )
                tableFields.push( 'PRIMARY KEY (`id`)' )
                const sql1 = `create table t_${formID} (${tableFields.join( ',' )})`
                await HELP.sqlExecute( sql1 )
                HELP.log( `${logFile} getFormById table t_${formID} created success`.green )
                // 插入数据库
                let d1 = JSON.stringify( data.fields )
                let d2 = d1.replace( /\r\n/g, '' )
                let d3 = d2.replace( /\\n/g, '' )
                let d4 = d3.replace( /\s/g, '' )
                let d5 = d4.replace( /\"/g, '\\"' )
                const sql2 = `insert into t_tables (c_id, c_name, c_content, c_desc) values ('${formID}', '${
                    data.name
                }', '${d5}', null)`
                await HELP.sqlExecute( sql2 )
                res.send( { ecode: 0, msg: '操作成功' } )
            }
        } catch ( e ) {
            HELP.error( `${logFile} getFormById error: ${e.message}` )
            res.send( { ecode: -1, msg: e.message } )
        }
    },
    // 查询所有表单列表
    async getFormList ( req, res ) {
        try {
            let keyword = req.body.keyword
            let m = ( req.body.pageindex - 1 ) * req.body.pagesize
            const sql1 = `select count(*) as count from t_tables where c_id like '%${keyword}%' or c_name like '%${keyword}%'`
            let result1 = await HELP.sqlExecute( sql1 )
            const sql2 = `select * from t_tables where c_id like '%${keyword}%' or c_name like '%${keyword}%' limit ${m}, ${req.body.pagesize}`
            let result2 = await HELP.sqlExecute( sql2 )
            res.send( {
                ecode: 0,
                result: {
                    list: result2,
                    pagesize: req.body.pagesize,
                    total: result1[0].count,
                    pageindex: req.body.pageindex
                } } )
        } catch ( e ) {
            HELP.error( `${logFile} getFormList error: ${e.message}` )
            res.send( { ecode: -1, msg: e.message } )
        }
    },
    // 查询表单数据
    async getFormData ( req, res ) {
        try {
            let tablename = req.body.tablename
            let m = ( req.body.pageindex - 1 ) * req.body.pagesize
            const sql1 = `select count(*) as count from t_${tablename}`
            let result1 = await HELP.sqlExecute( sql1 )
            const sql2 = `select * from t_${tablename} limit ${m}, ${req.body.pagesize}`
            let result2 = await HELP.sqlExecute( sql2 )
            res.send( {
                ecode: 0,
                result: {
                    list: result2,
                    pagesize: req.body.pagesize,
                    total: result1[0].count,
                    pageindex: req.body.pageindex
                }
            } )
        } catch ( e ) {
            HELP.error( `${logFile} getFormData error: ${e.message}` )
            res.send( { ecode: -1, msg: e.message } )
        }
    },
    async postFormData ( req, res ) {
        HELP.log( `${logFile} postFormData: ${JSON.stringify( req.body )}` )
        try {
            let tableID = req.body.form
            let entry = req.body.entry
            let tableField = []
            let tableValue = []
            for ( var item in entry ) {
                tableField.push( `${item}` )
                if ( entry[item] instanceof Object ) {
                    tableValue.push( `'${JSON.stringify( entry[item] )}'` )
                } else {
                    tableValue.push( `'${entry[item]}'` )
                }
            }
            const sql1 = `select count(*) as count from t_${tableID} where serial_number = '${entry.serial_number}'`
            const sql = `insert into t_${tableID} (${tableField}) values (${tableValue.join( ',' )})`
            const result1 = await HELP.sqlExecute( sql1 )
            HELP.log( `result1: ${JSON.stringify( result1 )}` )
            if ( result1[0].count === 0 ) {
                await HELP.sqlExecute( sql )
                HELP.log( `${logFile} postFormData t_${tableID} insert success` )
            } else {
                let setArray = []
                for ( var sitem in entry ) {
                    if ( sitem !== 'serial_number' ) {
                        if ( entry[sitem] instanceof Object ) {
                            setArray.push( `${sitem} = '${JSON.stringify( entry[sitem] )}'` )
                        } else {
                            setArray.push( `${sitem} = '${entry[sitem]}'` )
                        }
                    }
                }
                const updatesql = `update t_${tableID} set ${setArray.join( ',' )} where serial_number = ${entry.serial_number}`

                HELP.log( updatesql )
                await HELP.sqlExecute( updatesql )
                HELP.log( `${logFile} postFormData t_${tableID} update success` )
            }
            res.send( 200 )
        } catch ( e ) {
            HELP.error( `${logFile} postFormData error: ${e.message}` )
            res.send( { ecode: -1, msg: e.message } )
        }
    }
}
