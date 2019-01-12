const request = require( 'request' )
const appconfig = require( './../app_config' )
module.exports = {
    get ( url ) {
        return new Promise( ( resolve, reject ) => {
            request.get( appconfig.formUrl + url, {
                'auth': {
                    'user': appconfig.appkey,
                    'pass': appconfig.appScrect,
                    'sendImmediately': false
                }
            }, function ( err, res, rdata ) {
                if ( err ) {
                    reject( err )
                } else {
                    if ( res.statusCode === 200 ) {
                        try {
                            var body = JSON.parse( res.body )
                            resolve( body )
                        } catch ( e ) {
                            reject( e )
                        }
                    } else {
                        resolve( body )
                        reject( res.statusMessage )
                    }
                }
            } )
        } )
    }
}
