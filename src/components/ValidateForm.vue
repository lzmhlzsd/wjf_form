<template>
    <div class="te-form">
        <slot name="form"></slot>
    </div>
</template>
<script>
    import mUtils from '../js/libs/validate'
    export default {
        props: [
            'rules', 'model'
        ],
        data () {
            return {}
        },

        components: {
        },
        create () {
            console.log( mUtils )
        },
        methods: {
            validate ( callback ) {
                // console.log('validate')
                // if (typeof callback === 'function') {
                //     return
                // }
                for ( var key in this.rules ) {
                    var r = this.rules[key]
                    for ( var i = 0; i < r.length; i++ ) {
                        if ( !mUtils[r[i].type]( this.model[key] ) ) {
                            callback( null, false, r[i].message )
                            return
                        }
                    }
                }
                callback( null, true, key.message )
            }
        }
    }
</script>
<style>
</style>