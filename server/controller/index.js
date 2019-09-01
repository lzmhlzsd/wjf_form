const request = require( './../libs/request' )
const HELP = require( '../libs/help' )
const logFile = '[controller/index]'
const cField = require( './field' )
const colors = require( 'colors' )
const moment = require( 'moment' )
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
            HELP.log( `${logFile} getFormById sql search result: ${JSON.stringify( result )}` )
            if ( result.length > 0 ) {
                res.send( { ecode: -1, msg: '数据库已经存在该表单' } )
            } else {
                // 创建表
                let tableFields = [
                    'id int(11) unsigned NOT NULL AUTO_INCREMENT',
                    'serial_number varchar(32) NOT NULL unique',
                    'field_1 varchar(32)',
                    'field_2 varchar(32)',
                    'field_3 varchar(32)',
                    'field_4 varchar(32)'
                ]
                data.fields.forEach( m => {
                    for ( var item in m ) {
                        if ( ['field_1', 'field_2', 'field_3', 'field_4'].indexOf( item ) < 0 ) {
                            if ( cField.normal[m[item].type] ) {
                                tableFields.push( `${item} ${cField.normal[m[item].type].type}` )
                            } else {
                                tableFields.push( `${item} varchar(64)` )
                            }
                        }
                    }
                } )
                // 扩展字段
                Object.keys( cField.extend ).forEach( item => {
                    tableFields.push( `${item} ${cField.extend[item].type}` )
                } )

                tableFields.push( 'PRIMARY KEY (`id`)' )
                // const sql1 = `create table t_${formID} (${tableFields.join( ',' )})`
                // await HELP.sqlExecute( sql1 )
                // HELP.log( `${logFile} getFormById table t_${formID} created success`.green )

                // 用户表字段
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

                // 销售表字段
                let saleFileds = [
                    's_c_leader varchar(16)',
                    's_c_name varchar(16)',
                    's_c_school varchar(32)',
                    's_c_grade varchar(11)',
                    's_c_phone varchar(11)',
                    's_c_qq varchar(16)',
                    's_c_type varchar(32)',
                    's_c_recode varchar(32)'
                ]

                const tsql = `create table t_${formID}_unio (${cTableFileds.join( ',' )}, ${tableFields.join( ',' )}, ${saleFileds.join( ',' )})`
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
                    if ( HELP.isdatetime( entry[item] ) && item != 'info_os' ) {
                        HELP.log( `${logFile} postFormData datetime ${item}: ${entry[item]}` )
                        tableValue.push( `'${moment( entry[item] ).format( 'YYYY-MM-DD HH:mm:ss' )}'` )
                    } else {
                        tableValue.push( `'${entry[item]}'` )
                    }
                }
            }
            const sql1 = `select count(*) as count from t_${tableID}_unio where serial_number = '${entry.serial_number}'`
            HELP.log( `${logFile} postFormData sql is: ${sql1}` )
            // const sql = `insert into t_${tableID} (${tableField}) values (${tableValue.join( ',' )})`
            // HELP.log( `${logFile} postFormData sql: ${sql}` )
            const result1 = await HELP.sqlExecute( sql1 )
            HELP.log( `select t_${tableID}_unio count: ${JSON.stringify( result1 )}` )

            let userResult = []
            let userResultArray = []

            // HELP.log( `entry: ${JSON.stringify( entry )}` )
            //
            if ( entry.field_1 ) {
                const userSql = `select * from t_student where c_stuendId = '${entry.field_2}'`
                userResult = await HELP.sqlExecute( userSql )
                HELP.log( `userSql: ${userSql}`.yellow )
                HELP.log( `userResult: ${JSON.stringify( userResult )}` )

                if ( userResult.length > 0 ) {
                    userResultArray = [
                        `'${userResult[0].c_name}'`,
                        `'${userResult[0].c_grade}'`,
                        `'${userResult[0].c_class}'`,
                        `'${userResult[0].c_sex}'`,
                        `'${userResult[0].c_school}'`,
                        `'${userResult[0].c_address}'`,
                        `'${userResult[0].c_room}'`,
                        `'${userResult[0].c_stuendId}'`,
                        `'${userResult[0].c_desc}'`
                    ]
                } else {
                    userResultArray = [
                        `''`,
                        `''`,
                        `''`,
                        `''`,
                        `''`,
                        `''`,
                        `''`,
                        `''`,
                        `''`
                    ]
                }
            } else {
                userResultArray = [
                    `''`,
                    `''`,
                    `''`,
                    `''`,
                    `''`,
                    `''`,
                    `''`,
                    `''`,
                    `''`
                ]
            }

            let saleResult = []
            let saleResultArray = []
            if ( entry.field_3 ) {
                const saleSql = `select * from t_6MC9hz where field_4 = '${entry.field_4}'`
                saleResult = await HELP.sqlExecute( saleSql )
                HELP.log( `saleSql: ${saleSql}`.yellow )
                HELP.log( `saleResult: ${JSON.stringify( saleResult )}` )

                if ( saleResult.length > 0 ) {
                    saleResultArray = [
                        `'${saleResult[0].field_19}'`,
                        `'${saleResult[0].field_1}'`,
                        `'${saleResult[0].field_2}'`,
                        `'${saleResult[0].field_3}'`,
                        `'${saleResult[0].field_4}'`,
                        `'${saleResult[0].field_12}'`,
                        `'${saleResult[0].field_14}'`,
                        `'${saleResult[0].field_10}'`
                    ]
                } else {
                    saleResultArray = [
                        `''`,
                        `''`,
                        `''`,
                        `''`,
                        `''`,
                        `''`,
                        `''`,
                        `''`
                    ]
                }
            } else {
                saleResultArray = [
                    `''`,
                    `''`,
                    `''`,
                    `''`,
                    `''`,
                    `''`,
                    `''`,
                    `''`
                ]
            }

            if ( result1[0].count === 0 ) {
                const unioSql = `insert into t_${tableID}_unio (g_c_name, g_c_grade, g_c_class, g_c_sex, g_c_school,
                    g_c_address, g_c_room, g_c_stuendId, g_c_desc, ${tableField},
                    s_c_leader, s_c_name, s_c_school, s_c_grade, s_c_phone, s_c_qq, s_c_type, s_c_recode) values
                    (${userResultArray.join( ',' )}, ${tableValue.join( ',' )}, ${saleResultArray.join( ',' )})`
                HELP.log( `unioSql Insert: ${unioSql}`.yellow )
                await HELP.sqlExecute( unioSql )
                HELP.log( `${logFile} postFormData t_${tableID}_unio insert success`.green )
            } else {
                let setArray = []
                for ( var sitem in entry ) {
                    if ( sitem !== 'serial_number' ) {
                        if ( entry[sitem] instanceof Object ) {
                            setArray.push( `${sitem} = '${JSON.stringify( entry[sitem] )}'` )
                        } else {
                            // setArray.push( `${sitem} = '${entry[sitem]}'` )
                            if ( HELP.isdatetime( entry[sitem] ) && sitem != 'info_os' ) {
                                HELP.log( `${logFile} postFormData datetime ${sitem}: ${entry[sitem]}` )
                                setArray.push( `${sitem} = '${moment( entry[sitem] ).format( 'YYYY-MM-DD HH:mm:ss' )}'` )
                            } else {
                                setArray.push( `${sitem} = '${entry[sitem]}'` )
                            }
                        }
                    }
                }
                // const updatesql = `update t_${tableID} set ${setArray.join( ',' )} where serial_number = ${entry.serial_number}`

                // HELP.log( `${logFile} postFormData sql: ${updatesql}` )
                // await HELP.sqlExecute( updatesql )
                // HELP.log( `${logFile} postFormData t_${tableID} update success` )

                let updateUserResultArray = [
                    `g_c_name = '${userResult.length > 0 ? userResult[0].c_name : ''}'`,
                    `g_c_grade = '${userResult.length > 0 ? userResult[0].c_grade : ''}'`,
                    `g_c_class = '${userResult.length > 0 ? userResult[0].c_class : ''}'`,
                    `g_c_sex = '${userResult.length > 0 ? userResult[0].c_sex : ''}'`,
                    `g_c_school = '${userResult.length > 0 ? userResult[0].c_school : ''}'`,
                    `g_c_address = '${userResult.length > 0 ? userResult[0].c_address : ''}'`,
                    `g_c_room = '${userResult.length > 0 ? userResult[0].c_room : ''}'`,
                    `g_c_stuendId = '${userResult.length > 0 ? userResult[0].c_stuendId : ''}'`,
                    `g_c_desc = '${userResult.length > 0 ? userResult[0].c_desc : ''}'`
                ]

                let updateSaleResultArray = [
                    `s_c_leader = '${saleResult.length > 0 ? userResult[0].field_19 : ''}'`,
                    `s_c_name = '${saleResult.length > 0 ? userResult[0].field_1 : ''}'`,
                    `s_c_school = '${saleResult.length > 0 ? userResult[0].field_2 : ''}'`,
                    `s_c_grade = '${saleResult.length > 0 ? userResult[0].field_3 : ''}'`,
                    `s_c_phone = '${saleResult.length > 0 ? userResult[0].field_4 : ''}'`,
                    `s_c_qq = '${saleResult.length > 0 ? userResult[0].field_12 : ''}'`,
                    `s_c_type = '${saleResult.length > 0 ? userResult[0].field_14 : ''}'`,
                    `s_c_recode = '${saleResult.length > 0 ? userResult[0].field_10 : ''}'`
                ]

                const unioSql = `update t_${tableID}_unio set ${updateUserResultArray.join( ',' )},  ${setArray.join( ',' )}, ${updateSaleResultArray.join( ',' )} where serial_number = ${entry.serial_number}`
                HELP.log( `unioSql update: ${unioSql}`.yellow )
                await HELP.sqlExecute( unioSql )
                HELP.log( `${logFile} postFormData t_${tableID}_unio update success`.green )
            }
            res.send( 200 )
        } catch ( e ) {
            HELP.error( `${logFile} postFormData error: ${e.message}`.red )
            res.send( { ecode: -1, msg: e.message } )
        }
    },

    // update sale
    async postFromDataSale ( req, res ) {
        HELP.log( `${logFile} postFromDataSale: ${JSON.stringify( req.body )}` )
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
                    if ( HELP.isdatetime( entry[item] ) && item != 'info_os' ) {
                        HELP.log(
                            `${logFile} postFromDataSale datetime ${item}: ${
                                entry[item]
                            }`
                        )
                        tableValue.push(
                            `'${moment( entry[item] ).format(
                                'YYYY-MM-DD HH:mm:ss'
                            )}'`
                        )
                    } else {
                        tableValue.push( `'${entry[item]}'` )
                    }
                }
            }
            const sql1 = `select count(*) as count from t_${tableID} where serial_number = '${
                entry.serial_number
            }'`
            HELP.log( `${logFile} postFromDataSale sql is: ${sql1}` )
            const result1 = await HELP.sqlExecute( sql1 )
            HELP.log(
                `select t_${tableID} count: ${JSON.stringify( result1 )}`
            )

            if ( result1[0].count === 0 ) {
                const unioSql = `insert into t_${tableID} (${tableField}) values(${tableValue.join( ',' )})`
                HELP.log( `unioSql Insert: ${unioSql}`.yellow )
                await HELP.sqlExecute( unioSql )
                HELP.log( `${logFile} postFromDataSale t_${tableID} insert success`.green )
            } else {
                let setArray = []
                for ( var sitem in entry ) {
                    if ( sitem !== 'serial_number' ) {
                        if ( entry[sitem] instanceof Object ) {
                            setArray.push(
                                `${sitem} = '${JSON.stringify( entry[sitem] )}'`
                            )
                        } else {
                            // setArray.push( `${sitem} = '${entry[sitem]}'` )
                            if ( HELP.isdatetime( entry[sitem] ) && sitem != 'info_os' ) {
                                HELP.log( `${logFile} postFromDataSale datetime ${sitem}: ${entry[sitem]}` )
                                setArray.push( `${sitem} = '${moment( entry[sitem] ).format( 'YYYY-MM-DD HH:mm:ss' )}'`
                                )
                            } else {
                                setArray.push( `${sitem} = '${entry[sitem]}'` )
                            }
                        }
                    }
                }

                const unioSql = `update t_${tableID} set ${setArray.join( ',' )} where serial_number = ${entry.serial_number}`
                HELP.log( `unioSql update: ${unioSql}`.yellow )
                await HELP.sqlExecute( unioSql )
                HELP.log(
                    `${logFile} postFromDataSale t_${tableID} update success`
                        .green
                )
            }
            res.send( 200 )
        } catch ( e ) {
            HELP.error( `${logFile} postFromDataSale error: ${e.message}`.red )
            res.send( { ecode: -1, msg: e.message } )
        }
    }
}
