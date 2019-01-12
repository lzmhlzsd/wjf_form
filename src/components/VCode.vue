<template>
    <div>
        <span class="vcode-btn" :class="disabled ? 'disabled' : ''">{{text}}</span>
    </div>
</template>
<script>
    export default {
        props: {
            second: {
                type: Number,
                default: 60
            },
            mini: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                time: 0,
                disabled: false
            }
        },
        create () {
            console.log(this)
        },
        computed: {
            text () {
                return this.time > 0 ? this.time + 's后重发' : '获取验证码'
            }
        },
        mounted () {
            console.log(this)
        },
        methods: {
            start () {
                this.time = this.second
                this.timer()
            },
            stop () {
                this.time = 0
                this.disabled = false
            },
            setDisabled (val) {
                this.time = 0
                this.disabled = val
            },
            timer () {
                var self = this
                if (self.time > 0) {
                    setTimeout(function () {
                        self.time--
                        self.timer()
                    }, 1000)
                } else {
                    this.disabled = false
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .vcode-btn {
        &.disabled {
            color: #cdcdcd;
        }
    }
</style>