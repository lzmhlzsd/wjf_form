import axios from 'axios'

const fetch = function ( url = '', data = {}, type = 'GET' ) {
    if ( type === 'GET' ) {
        // return new Promise( ( resolve, reject ) => {
        //     axios.get( url )
        //         .then( response => {
        //             mUtil.handleResponse( response, function ( res ) {
        //                 if ( res.ecode === 1000 ) {
        //                     resolve( res.result )
        //                 } else {
        //                     reject( res.emsg )
        //                 }
        //             } )
        //         } )
        //         .catch( error => {
        //             mUtil.handleError( error )
        //         } )
        // } )
        return new Promise( ( resolve, reject ) => {
            axios
                .get( url, {
                    params: data
                } )
                .then( response => {
                    if ( response.status === 200 ) {
                        resolve( response.data )
                    } else {
                        reject( response.statusText )
                    }
                } )
                .catch( error => {
                    reject( error.message )
                } )
        } )
    } else {
        return new Promise( ( resolve, reject ) => {
            axios
                .post( url, data, {
                    'X-Request-Form': 'XHR'
                } )
                .then( response => {
                    if ( response.status === 200 ) {
                        resolve( response.data )
                    } else {
                        reject( response.statusText )
                    }
                } )
                .catch( error => {
                    reject( error.message )
                } )
        } )
    }
}

export default fetch
