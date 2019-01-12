const pool = require( './mysql' )
const appConfig = require( '../app_config' )
const moment = require( 'moment' )
const colors = require( 'colors' )
module.exports = {
    sqlExecute: function ( sql ) {
        return new Promise( ( resolve, reject ) => {
            var resourcePromise = pool.acquire()
            resourcePromise
                .then( function ( client ) {
                    client.query( sql, null, function ( err, result ) {
                        if ( err ) {
                            reject( new Error( `sql: ${sql}, msg: ${err}` ) )
                        }
                        resolve( result )
                        pool.release( client )
                    } )
                } )
                .catch( function ( err ) {
                    reject( new Error( `sql: ${sql}, msg: ${err}` ) )
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
