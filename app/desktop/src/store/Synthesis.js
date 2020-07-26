Ext.define('pso2affixsim.store.Synthesis', {
    extend: 'Ext.data.Store',
    alias:'store.synthesis',
    data: [
        {
            recipe: [
                'AA01',
                'AB01',
                'AC01'
            ],
            result: [
                "AJ01"
            ],
            success: 80
        },
        {
            recipe: [
                'AE01',
                'AF01',
                'AG01'
            ],
            result: [
                "AJ01"
            ],
            success: 80
        },
        {
            recipe: [
                "XA01",
                "EA*"
            ],
            result: [
                "$$"
            ],
            success: 100
        }
    ]
});

Ext.define('pso2affixsim.store.UpslotRates', {
    extend: 'Ext.data.Store',
    alias:'store.upslotrates',
    data: [
        {
            "false": 100,
            "true": 100
        },
        {
            "false": 85,
            "true": 90
        },
        {
            "false": 75,
            "true": 85
        },
        {
            "false": 60,
            "true": 70
        },
        {
            "false": 50,
            "true": 60
        },
        {
            "false": 45,
            "true": 55
        },
        {
            "false": 35,
            "true": 40
        },
        {
            "false": 30,
            "true": 30
        }
    ]
});