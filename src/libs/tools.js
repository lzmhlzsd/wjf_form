// import config from './config'
// const countDown = function ( options ) {
//     this.default = {
//         ele_id: '',
//         second: 60
//     }
//     var extend = function ( target, source ) {
//         for ( var obj in source ) {
//             target[obj] = source[obj]
//         }
//         return target
//     }
//     this.disabled = false
//     this.time = 0
//     this.options = extend( this.default, options )
//     console.log( this.options )
//     this.init()
//     return this
// }
// countDown.prototype = {
//     init () {
//         var ele = document.getElementById( this.options.ele_id )
//         if ( this.disabled ) {
//             ele.style.color = '#a0a0a0'
//         } else {
//             ele.style.color = '#0188FB'
//         }
//     },
//     setDisabled ( flag ) {
//         this.disabled = flag
//         var ele = document.getElementById( this.options.ele_id )
//         if ( this.disabled ) {
//             ele.style.color = '#a0a0a0'
//         } else {
//             ele.style.color = '#0188FB'
//         }
//     },
//     disabled () {
//         return this.options.disabled
//     },
//     start () {
//         this.setDisabled( true )
//         this.time = this.options.second
//         this.timer()
//     },
//     timer () {
//         var self = this
//         var ele = document.getElementById( self.options.ele_id )
//         if ( self.time > 0 ) {
//             self.time--
//             ele.innerHTML = self.time + 's后重发'
//             setTimeout( function () {
//                 self.timer()
//             }, 1000 )
//         } else {
//             self.setDisabled( false )
//             ele.innerHTML = '获取验证码'
//         }
//     }
// }

// const tconsole = function ( msg ) {
//     if ( config.console ) {
//         console.log( msg )
//     }
// }

// export {
//     countDown,
//     tconsole
// }
