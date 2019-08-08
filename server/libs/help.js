const pool = require( './mysql' )
const appConfig = require( '../app_config' )
const moment = require( 'moment' )
const colors = require( 'colors' )
module.exports = {
    sqlExecute: function ( sql ) {
        return new Promise( ( resolve, reject ) => {
            var resourcePromise = pool
                .acquire()
                .then( function ( resource ) {
                    console.log( 'resource' )
                } )
                .catch( function ( err ) {
                    console.log( err )
                    return pool.drain()
                } )
            resourcePromise
                .then( function ( client ) {
                    client.query( sql, null, function ( err, result ) {
                        pool.release( client )
                        if ( err ) {
                            reject( new Error( `client sql: ${sql}, msg: ${err}` ) )
                        }
                        resolve( result )
                    } )
                } )
                .catch( function ( err ) {
                    reject( new Error( `resourcePromise sql: ${sql}, msg: ${err}` ) )
                } )
        } )
    },
    log: function ( logs ) {
        if ( appConfig.log === 'debug' ) {
            console.log( `${moment().format( 'YYYY-MM-DD HH:mm:ss' )}`.cyan + ` ${logs}` )
        }
    },
    error: function ( logs ) {
        console.log( `${moment().format( 'YYYY-MM-DD HH:mm:ss' )}`.cyan + ` ${logs}`.red )
    },
    createID: function ( id ) {
        return id.replace( /-/g, '' ).substring( 0, 10 )
    }
}
