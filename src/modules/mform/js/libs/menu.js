const menus = [
    {
        name: '下游',
        icon: 'msupplier icon-xiayou',
        url: '/msupplier-agent',
        sub: [
            {
                name: '分销商列表',
                group: '分销商',
                url: '/msupplier-agent/fxsList'
            },
            {
                name: '分销商等级',
                group: '分销商',
                url: '/msupplier-agent/fxsLevel'
            },
            {
                name: '分销招募',
                group: '分销商',
                url: '/msupplier-agent/fxsRecruit'
            },
            {
                name: '团队列表',
                group: '分销团队',
                url: '/msupplier-agent/fxTeam'
            }
        ]
    }
    // {
    //     name: 'msupplier-功能2',
    //     icon: 'icon-gouwu2',
    //     url: '/msupplier-action2',
    //     sub: [
    //         {
    //             name: 'msupplier-功能2-列表1',
    //             group: '功能',
    //             url: '/{{moduleName}-action2/list1'
    //         },
    //         {
    //             name: 'msupplier-功能2-列表2',
    //             group: '功能',
    //             url: '/msupplier-action2/list2'
    //         }
    //     ]
    // }
]

export default menus
