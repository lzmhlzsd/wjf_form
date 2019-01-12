const genericPool = require( 'generic-pool' )
const DbDriver = require( 'mysql' )
const appConfig = require( './../app_config' )
const factory = {
    create: function () {
        return new Promise( function ( resolve, reject ) {
            var client = DbDriver.createConnection( {
                host: appConfig.mysql.host,
                user: appConfig.mysql.user,
                password: appConfig.mysql.password,
                database: appConfig.mysql.database
            } )
            client.connect( function ( err ) {
                if ( err ) {
                    console.log( '[libs/mysql]create database connection error' )
                } else {
                    resolve( client )
                    console.log( '[libs/mysql]create database connection successful' )
                }
            } )
        } )
    },
    destroy: function ( client ) {
        return new Promise( function ( resolve ) {
            client.end( function () {
                console.log( '[libs/mysql]create', {}, 'pool destroy end' )
                resolve()
            } )
            client.disconnect()
        } )
    }
}

var opts = {
    max: 10,
    min: 2
}

var myPool = genericPool.createPool( factory, opts )

module.exports = myPool
