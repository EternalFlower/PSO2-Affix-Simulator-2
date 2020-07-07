Ext.define('pso2affixsim.store.Synthesis', {
    extend: 'Ext.data.Store',
    alias:'store.synthesis',
    data: [
        {
            recipe: {
                AA01: 1,
                AB01: 1,
                AC01: 1
            },
            result: "AJ01",
            success: 80
        },
        {
            recipe: {
                AE01: 1,
                AF01: 1,
                AG01: 1
            },
            result: "AJ01",
            success: 80
        }
    ]
});

Ext.define('pso2affixsim.store.UpslotRates', {
    extend: 'Ext.data.Store',
    alias:'store.synthesis',
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