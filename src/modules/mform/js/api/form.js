// 超级供应商后台接口
import fetch from '../../../../libs/fetch'
import moduleInfo from '../../module.info'
// 获取等级列表接口
const getBLevel = params =>
    fetch( moduleInfo.baseUrl + '/getFormById', params, 'GET' )

export default {

}
