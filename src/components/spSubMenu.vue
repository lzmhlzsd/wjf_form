<template>
    <div class="sider-sub">
        <div class="sider-sub-nav">{{subMenu.name}}</div>
        <div v-for="(item, index) in menu" :key="index">
            <div class="sider-sub-group__name">{{item.name}}</div>
            <ul class="sider-sub-group">
                <li class="sider-sub-group__item" :class="{'hover' : hoverItem == index + '_' + index2}" 
                v-for="(item2, index2) in item.item" :key="index2"
                @mouseover="selectStyle(index, index2)" @mouseout="outStyle(index, index2)">
                    <router-link :to="item2.url" class="sider-sub-link" v-if="!item2.blank">{{item2.name}}</router-link>
                    <router-link :to="item2.url" class="sider-sub-link" v-if="item2.blank" target="_blank">{{item2.name}}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// import { mapState } from 'vuex'
import _ from 'lodash'
export default {
    data () {
        return {
            hoverItem: ''
        }
    },
    components: {},
    computed: {
        // ...mapState( {
        //     // menu_open: state => state.menu_open,
        //     // menu_active: state => state.menu_active,
        //     subMenu: state => state.selectMenu
        // } ),
        subMenu () {
            return this.$store.state.selectMenu
        },
        menu () {
            var menu = []
            var k = 0
            _.forEach( this.subMenu.sub, function ( value, index ) {
                if ( menu.length > 0 ) {
                    if ( _.findIndex( menu, function ( o ) {
                        return o.name === value.group
                    } ) > -1 ) {
                        menu[k].item.push( value )
                    } else {
                        menu[++k] = {
                            name: value.group,
                            item: [value]
                        }
                    }
                } else {
                    menu[k] = {
                        name: value.group,
                        item: [value]
                    }
                // index++
                }
            } )
            // console.log(menu)
            return menu
        }
    },
    mounted () {

    },
    methods: {
        select () {
            console.log( 100 )
        },
        selectStyle ( index, index2 ) {
            // console.log(12)
            this.hoverItem = `${index}_${index2}`
        },
        outStyle ( index ) {
            this.hoverItem = ''
        }
    }
}
</script>

<style lang="less" scoped>
@import './../css/common/theme.less';
.sider {
    &-sub {
        width: 200px;
        height: 100%;
        background-color: #fff;
        overflow-y: auto;
        &-nav {
            padding: 17px 20px;
            font-size: 16px;
            color: @primary-color;
        }
        &-group {
            padding: 5px 0;
        }
        &-group__name {
            border-bottom: 1px solid @line-color;
            padding: 6px 20px;
            font-weight: 500;
            color: @darken-color;
        }
        &-group__item {
            // padding: 6px 20px;
            cursor: pointer;
            &.hover {
                background: @hover-background ;
            }
            a {
                color: @lighten-color;
            }
            .router-link-active {
                position: relative;
                &:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: inline-block;
                    width: 2px;
                    height: 100%;
                    background: @primary-color;
                }
            }
        }
        &-link {
            display: block;
            padding: 6px 20px;
            color: @lighten-color;
        }
    }
}
</style>
