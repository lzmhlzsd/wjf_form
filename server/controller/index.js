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

                // 创建C表
                // c表字段
                let cTableFileds = [
                    'g_c_name varchar(11)',
                    'g_c_grade varchar(11)',
                    'g_c_class varchar(11)',
                    'g_c_sex varchar(11)',
                    'g_c_school varchar(32)',
                    'g_c_address varchar(128)',
                    'g_c_room varchar(64)',
                    'g_c_stuendId varchar(64)',
                    'g_c_desc varchar(128)'
                ]
                const tsql = `create table t_${formID}_unio (${cTableFileds.join( ',' )}, ${tableFields.join( ',' )})`
                await HELP.sqlExecute( tsql )
                HELP.log( `${logFile} getFormById table t_${formID}_unio created success`.green )

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
            HELP.log( `${logFile} postFormData sql1: ${sql1}` )
            const sql = `insert into t_${tableID} (${tableField}) values (${tableValue.join( ',' )})`
            HELP.log( `${logFile} postFormData sql: ${sql}` )
            const result1 = await HELP.sqlExecute( sql1 )
            HELP.log( `result1: ${JSON.stringify( result1 )}` )

            let userResult = []
            let userResultArray = []
            // 查询用户信息表信息
            // 特殊字段 学号
            HELP.log( `entry: ${JSON.stringify( entry )}` )

            if ( entry.field_10 ) {
                const userSql = `select * from t_student where c_stuendId = '${
                    entry.field_10
                }'`
                userResult = await HELP.sqlExecute( userSql )
                HELP.log( `userResult: ${JSON.stringify( userResult )}` )

                userResultArray = [
                    userResult[0].c_name,
                    userResult[0].c_grade,
                    userResult[0].c_class,
                    userResult[0].c_sex,
                    userResult[0].c_school,
                    userResult[0].c_address,
                    userResult[0].c_room,
                    userResult[0].c_stuendId,
                    userResult[0].c_desc
                ]
            }

            if ( result1[0].count === 0 ) {
                await HELP.sqlExecute( sql )
                HELP.log( `${logFile} postFormData t_${tableID} insert success` )

                const unioSql = `insert into t_${tableID}_unio (g_c_name, g_c_grade, g_c_class, g_c_sex, g_c_school,
                    g_c_address, g_c_room, g_c_stuendId, g_c_desc, ${tableField}) values (${userResultArray.join( ',' )}, ${tableValue.join( ',' )})`
                HELP.log( `unioSql Insert: ${unioSql}` )
                await HELP.sqlExecute( unioSql )
                HELP.log( `${logFile} postFormData t_${tableID}_unio insert success` )
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

                HELP.log( `${logFile} postFormData sql: ${updatesql}` )
                await HELP.sqlExecute( updatesql )
                HELP.log( `${logFile} postFormData t_${tableID} update success` )

                const unioSql = `update into t_${tableID}_unio (g_c_name, g_c_grade, g_c_class, g_c_sex, g_c_school,
                    g_c_address, g_c_room, g_c_stuendId, g_c_desc, ${tableField}) values (${userResultArray.join( ',' )}, ${tableValue.join( ',' )})`
                HELP.log( `unioSql update: ${unioSql}` )
                await HELP.sqlExecute( unioSql )
                HELP.log( `${logFile} postFormData t_${tableID}_unio update success` )
            }

            res.send( 200 )
        } catch ( e ) {
            HELP.error( `${logFile} postFormData error: ${e.message}` )
            res.send( { ecode: -1, msg: e.message } )
        }
    }
}
