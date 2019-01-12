<template>
    <div v-transfer-dom :data-transfer="transfer">
        <transition name="fade">
            <div :class="maskClasses" :style="maskStyle" v-show="visible" v-if="mask" @click="handleMask"></div>
        </transition>
        <div :class="wrapClasses" @click="handleWrapClick">
            <transition :name="'move-' + placement">
                <div :class="classes" :style="mainStyles" v-show="visible">
                    <div :class="contentClasses" ref="content">
                        <!-- <a class="ivu-drawer-close" v-if="closable" @click="close">
                            <slot name="close">
                                <Icon type="ios-close"></Icon>
                            </slot>
                        </a> -->
                        <div :class="[prefixCls + '-header']" v-if="showHead">
                            <slot name="header">
                                <div :class="[prefixCls + '-header-inner']">{{ title }}</div>
                            </slot>
                        </div>
                        <div :class="[prefixCls + '-body']" :style="styles">
                            <slot></slot>
                        </div>
                        <div :class="[prefixCls + '-footer']" v-if="showFooter">
                            <slot name="drawer-footer"></slot>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import TransferDom from './../libs/transfer-dom'

const prefixCls = 'sp-drawer'

export default {
    name: 'spDrawer',
    directives: { TransferDom },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        title: {
            type: String
        },
        width: {
            type: [Number, String],
            default: 256
        },
        closable: {
            type: Boolean,
            default: true
        },
        maskClosable: {
            type: Boolean,
            default: true
        },
        mask: {
            type: Boolean,
            default: true
        },
        maskStyle: {
            type: Object
        },
        styles: {
            type: Object
        },
        transfer: {
            type: Boolean,
            default: true
        },
        placement: {
            // validator (value) {
            //     return oneOf(value, ['left', 'right']);
            // },
            type: String,
            default: 'right'
        }
    },
    data () {
        return {
            prefixCls: prefixCls,
            visible: this.value,
            wrapShow: false,
            showHead: true,
            showFooter: true
        }
    },
    computed: {
        wrapClasses () {
            return [
                `${prefixCls}-wrap`,
                {
                    [`${prefixCls}-hidden`]: !this.wrapShow,
                    [`${this.className}`]: !!this.className,
                    [`${prefixCls}-no-mask`]: !this.mask,
                    [`${prefixCls}-wrap-inner`]: this.inner
                }
            ]
        },
        mainStyles () {
            let style = {}

            const width = parseInt( this.width )

            const styleWidth = {
                width: width <= 100 ? `${width}%` : `${width}px`
            }

            Object.assign( style, styleWidth )

            return style
        },
        contentClasses () {
            return [
                `${prefixCls}-content`,
                {
                    [`${prefixCls}-content-no-mask`]: !this.mask
                }
            ]
        },
        classes () {
            return [
                `${prefixCls}`,
                `${prefixCls}-${this.placement}`,
                {
                    [`${prefixCls}-no-header`]: !this.showHead,
                    [`${prefixCls}-inner`]: this.inner
                }
            ]
        },
        maskClasses () {
            return [
                `${prefixCls}-mask`,
                {
                    [`${prefixCls}-mask-inner`]: this.inner
                }
            ]
        }
    },
    methods: {
        close () {
            this.visible = false
            this.$emit( 'input', false )
            this.$emit( 'on-close' )
        },
        handleMask () {
            if ( this.maskClosable && this.mask ) {
                this.close()
            }
        },
        handleWrapClick ( event ) {
            // use indexOf,do not use === ,because ivu-modal-wrap can have other custom className
            const className = event.target.getAttribute( 'class' )
            if ( className && className.indexOf( `${prefixCls}-wrap` ) > -1 ) { this.handleMask() }
        }
    },
    mounted () {
        if ( this.visible ) {
            this.wrapShow = true
        }

        let showHead = true

        if ( this.$slots.header === undefined && !this.title ) {
            showHead = false
        }

        this.showHead = showHead

        let showFooter = true
        if ( this.$slots['drawer-footer'] === undefined ) {
            showFooter = false
        }
        this.showFooter = showFooter
    },
    watch: {
        value ( val ) {
            this.visible = val
        },
        visible ( val ) {
            if ( val === false ) {
                this.timer = setTimeout( () => {
                    this.wrapShow = false
                    // this.removeScrollEffect();
                }, 300 )
            } else {
                if ( this.timer ) clearTimeout( this.timer )
                this.wrapShow = true
                if ( !this.scrollable ) {
                    // this.addScrollEffect();
                }
            }
            // this.broadcast('Table', 'on-visible-change', val);
            // this.broadcast('Slider', 'on-visible-change', val);  // #2852
            // this.$emit('on-visible-change', val);
        }
    }
}
</script>

<style lang="less" scoped>
@import '~iview/src/styles/index.less';
.sp-drawer {
    width: auto;
    height: 100%;
    position: fixed;
    top: 0;

    &-inner {
        position: absolute;
    }

    &-left {
        left: 0;
    }
    &-right {
        right: 0;
    }

    &-hidden {
        display: none !important;
    }

    &-wrap {
        position: fixed;
        overflow: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        -webkit-overflow-scrolling: touch;
        outline: 0;

        &-inner {
            position: absolute;
        }
    }

    &-wrap * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    &-mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(55, 55, 55, 0.6);
        height: 100%;
        z-index: 999;

        &-hidden {
            display: none;
        }
        &-inner {
            position: absolute;
        }
    }

    &-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        background-color: #fff;
        border: 0;
        background-clip: padding-box;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

        &-no-mask {
            pointer-events: auto;
        }
    }

    &-header {
        border-bottom: 1px solid @border-color-split;
        padding: 14px 16px;
        line-height: 1;

        p,
        &-inner
        {
            display: inline-block;
            width: 100%;
            height: 20px;
            line-height: 20px;
            font-size: @font-size-base;
            color: @title-color;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        p i, p span{
            vertical-align: middle;
        }
    }

    &-close {
        z-index: 1;
        // .content-close(1px, 31px);
    }

    &-body {
        flex: 1;
        width: 100%;
        padding: 16px;
        font-size: 12px;
        line-height: 1.5;
        word-wrap: break-word;
        overflow: auto;
    }

    &-footer {
        border-top: 1px solid @border-color-split;
        padding: 14px 16px;
        text-align: right;
    }

    &-no-header &-body {
        height: 100%;
    }

    &-no-mask {
        pointer-events: none;
    }
}
</style>
