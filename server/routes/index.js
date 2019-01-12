var express = require( 'express' )
var router = express.Router()
const indexCtrl = require( './../controller/index' )

router.get( '/getFormById', indexCtrl.getFormById )
router.post( '/getFormList', indexCtrl.getFormList )
router.post( '/getFormData', indexCtrl.getFormData )
router.post( '/postFormData', indexCtrl.postFormData )

module.exports = router
