var express = require( 'express' )
var router = express.Router()
var path = require( 'path' )
const indexCtrl = require( './../controller/index' )

router.get( '/', function ( req, res ) {
    res.sendFile( path.join( __dirname, './../dist/index.html' ) )
} )
// router.get( '/formlist', function ( req, res ) {

// })
router.get( '/getFormById', indexCtrl.getFormById )
router.post( '/getFormList', indexCtrl.getFormList )
router.post( '/getFormData', indexCtrl.getFormData )
router.post( '/postFormData', indexCtrl.postFormData )

module.exports = router
