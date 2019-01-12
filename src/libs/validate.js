// 手机号
const isPhone = val => {
    // let result = val.match( /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/ )
    let result = val.match( /^1[345678]\d{9}$/ )
    if ( result == null ) {
        return false
    } else {
        return true
    }
}
// 必填
const required = val => {
    if ( val === '' || typeof val === 'undefined' ) {
        return false
    } else {
        return true
    }
}
// 金额
const isMoney = val => {
    let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
    let result = reg.test( val )
    return result
}
// 座机
const isTel = val => {
    let regexp = /(^$)|(^(0\\d{2})-(\\d{8})$)|(^(0\\d{3})-(\\d{7,8})$)|(^(0\\d{2})-(\\d{8})-(\\d+)$)|(^(0\\d{3})-(\\d{7,8})-(\\d+)$)/
    let result = regexp.test( val )
    return result
}
// QQ
const isQQ = val => {
    let reg = /^[1-9][0-9]{4,9}$/
    let result = reg.test( val )
    return result
}
// 邮箱
/* eslint-disable */
const isEmail = val => {
    let reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    let result = reg.test(val);
    return result;
};
// 网址
/* eslint-disable */
const isWebsite = val => {
    let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
    let result = reg.test(val);
    return result;
};
// 有效期 00/00
const validity = val => {
    let reg = /^\d{2}\/\d{2}/;
    let result = reg.test(val);
    return result;
};

export {
    isPhone,
    required,
    isMoney,
    validity,
    isTel,
    isQQ,
    isEmail,
    isWebsite
};
