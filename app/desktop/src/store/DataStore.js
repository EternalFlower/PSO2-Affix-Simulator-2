
function description(value, record){
    var output = "";
    var stats = record.get("stats");
    var append = function(name, value){
        if(output.length != 0) output += "<br>";
        output += name + "(";
        if(value > 0) output += "+";
        output += value + ")";
    }
    
    if(stats == undefined) return output;

    if(stats.text){
        if(output.length != 0) output += ",\n";
        output += stats.text;
    }
    if(stats.satk) append(pso2affixsim.Locale.satk, stats.satk);
    if(stats.ratk) append(pso2affixsim.Locale.ratk, stats.ratk);
    if(stats.tatk) append(pso2affixsim.Locale.tatk, stats.tatk);
    if(stats.sdef) append(pso2affixsim.Locale.sdef, stats.sdef);
    if(stats.rdef) append(pso2affixsim.Locale.rdef, stats.rdef);
    if(stats.tdef) append(pso2affixsim.Locale.tdef, stats.tdef);
    if(stats.dex) append(pso2affixsim.Locale.dex, stats.dex);
    if(stats.all) append(pso2affixsim.Locale.all, stats.all);
    if(stats.hp) append(pso2affixsim.Locale.hp, stats.hp);
    if(stats.pp) append(pso2affixsim.Locale.pp, stats.pp);
    if(stats.s_res) append(pso2affixsim.Locale.s_res, stats.s_res);
    if(stats.r_res) append(pso2affixsim.Locale.r_res, stats.r_res);
    if(stats.t_res) append(pso2affixsim.Locale.t_res, stats.t_res);
    if(stats.fire_res) append(pso2affixsim.Locale.fire_res, stats.fire_res);
    if(stats.ice_res) append(pso2affixsim.Locale.ice_res, stats.ice_res);
    if(stats.ltn_res) append(pso2affixsim.Locale.ltn_res, stats.ltn_res);
    if(stats.wind_res) append(pso2affixsim.Locale.wind_res, stats.wind_res);
    if(stats.light_res) append(pso2affixsim.Locale.light_res, stats.light_res);
    if(stats.dark_res) append(pso2affixsim.Locale.dark_res, stats.dark_res);
    if(stats.all_res) append(pso2affixsim.Locale.all_res, stats.all_res);
    
    return output;
}

Ext.define("pso2affixsim.Ability", {
    extend: "Ext.data.Model",
    fields: [
        "code",
        "name", 
        "gid", 
        "lvlup", 
        "rate", 
        "generate", 
        "require", 
        "target", 
        "boost", 
        "stats",
        { name:"effect", convert: description }
    ]
})

Ext.define('pso2affixsim.Recipe', {
    extend: "Ext.data.Model",
    fields: [
        'recipe',
        'result', 
        'success'
    ]
})


Ext.define('pso2affixsim.store.AbilityBoost', {
    extend: 'Ext.data.Store',
    alias:'store.abilityboost',
    data: [
        {
            type: "photon",
            create: [
                [],
                [
                    0,
                    0,
                    0,
                    100,
                    70,
                    50
                ],
                [
                    0,
                    0,
                    0,
                    100,
                    70,
                    50
                ]
            ]
        },
        {
            type: 'mutation1',
            create: [
                [
                    0,
                    0,
                    0,
                    30,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    30,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    40,
                    0,
                    0
                ]
            ]
        },
        {
            type: 'mutation2',
            create: [
                [
                    0,
                    0,
                    0,
                    40,
                    30,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    40,
                    30,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    50,
                    30,
                    0
                ]
            ]
        },
        {
            type: 'soul',
            create: [
                [
                    0,
                    0,
                    0,
                    20,
                    20,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    20,
                    20,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    30,
                    20,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    10,
                    10,
                    0,
                    0
                ]
            ],
            transfer: [
                [
                    0,
                    0,
                    0,
                    20,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    20,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    60,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    10,
                    10,
                    0,
                    0
                ],
                [
                    20
                ],
                [
                    10
                ]
            ]
        },
        {
            type: 'doom1',
            create: [
                [],[],[],
                [
                    0,
                    0,
                    0,
                    20
                ]
            ],
            transfer: [
                [],[],[],
                [
                    0,
                    0,
                    0,
                    20
                ]
            ]
        },
        {
            type: 'doom2',
            create: [
                [],[],[],
                [
                    0,
                    0,
                    0,
                    30
                ]
            ],
            transfer: [
                [],[],[],
                [
                    0,
                    0,
                    0,
                    30
                ]
            ]
        },
        {
            type: 'doom3',
            create: [
                [],[],[],
                [
                    0,
                    0,
                    0,
                    40
                ]
            ],
            transfer: [
                [],[],[],
                [
                    0,
                    0,
                    0,
                    40
                ]
            ]
        },
        {
            type: 'divinewill',
            transfer: [
                [
                    20
                ]
            ]
        },
        {
            type: 'divineorder',
            transfer: [
                [
                    30
                ]
            ]
        }
    ]
});


Ext.define('pso2affixsim.store.Synthesis', {
    extend: 'Ext.data.Store',
    model: "pso2affixsim.Recipe",
    alias:'store.synthesis',
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json'
        },
        url: 'resources/recipe.json'
    },
    autoLoad: true
})

Ext.define('pso2affixsim.store.Ability', {
    extend: 'Ext.data.TreeStore',
    model: "pso2affixsim.Ability",
    alias: 'store.ability',
    proxy: {
        type: 'ajax',
        reader: 'json',
        url: 'resources/ability.json'
    }
})

Ext.define("pso2affixsim.Items", {
    extend: "Ext.data.Model",
    fields: [
        "code",
        "name", 
        "id",  
        "rate", 
        "stats",
        { name:"effect", convert: description }
    ]
});

Ext.define('pso2affixsim.store.Items', {
    extend: 'Ext.data.Store',
    alias:'store.items',
    data: [
        {
            id: "Nothing",
            code: "B01"
        },
        {
            id: "Add Ability (HP)",
            name: "Stamina Boost",
            code: "IT01"
        }
    ]
});

Ext.define('pso2affixsim.store.Substitute', {
    extend: 'Ext.data.Store',
    alias:'store.substitute',
    data: [
        {
            "substitute": [
                0,
                0,
                0,
                0,
                1,
                1,
                1
            ]
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
