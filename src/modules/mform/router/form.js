export default [
    // 下游
    {
        path: '/formlist',
        title: 'formlist',
        name: 'formlist',
        component: resolve =>
            require.ensure(
                [],
                () => resolve( require( './../views/form/list' ) ),
                /* 模块名-菜单名-子菜单名 */ 'mformlist'
            )
    },
    {
        path: '/form/:id',
        title: 'form',
        name: 'form',
        component: resolve =>
            require.ensure(
                [],
                () => resolve( require( './../views/form/detail' ) ),
                /* 模块名-菜单名-子菜单名 */ 'mformdetail'
            )
    }
]
