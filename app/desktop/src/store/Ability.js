
function description(value, record){
    var text = ["S-ATK", "R-ATK", "T-ATK", "S-DEF", "R-DEF", "T-DEF", "DEX", "ALL", "HP", "PP", "Strike Resist", "Range Resist", "Tech Resist", "Fire Resist", "Ice Resist", "Lightning Resist", "Wind Resist", "Light Resist", "Dark Resist", "All Resist"];
    var output = "";
    var stats = record.get("stats");
    var append = function(name, value){
        if(output.length != 0) output += ",\n";
        output += name + "(";
        if(value > 0) output += "+";
        output += value + ")";
    }
    if(stats == undefined) return output;
    if(stats.satk) append(text[0], stats.satk);
    if(stats.ratk) append(text[1], stats.ratk);
    if(stats.tatk) append(text[2], stats.tatk);
    if(stats.sdef) append(text[3], stats.sdef);
    if(stats.rdef) append(text[4], stats.rdef);
    if(stats.tdef) append(text[5], stats.tdef);
    if(stats.dex) append(text[6], stats.dex);
    if(stats.all) append(text[7], stats.all);
    if(stats.hp) append(text[8], stats.hp);
    if(stats.pp) append(text[9], stats.pp);
    if(stats.s_res) append(text[10], stats.s_res);
    if(stats.r_res) append(text[11], stats.r_res);
    if(stats.t_res) append(text[12], stats.t_res);
    if(stats.fire_res) append(text[13], stats.fire_res);
    if(stats.ice_res) append(text[14], stats.ice_res);
    if(stats.ltn_res) append(text[15], stats.ltn_res);
    if(stats.wind_res) append(text[16], stats.wind_res);
    if(stats.light_res) append(text[17], stats.light_res);
    if(stats.dark_res) append(text[18], stats.dark_res);
    if(stats.all_res) append(text[19], stats.all_res);
    if(stats.other){
        if(output.length != 0) output += ",\n";
        output += stats.other;
    }
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
});
/*
{
                    name: "",
                    expanded: false,
                    children:
                    [
                        
                        
                    ]                    
                }
                {
                    name: "",
                    code: "",
                    gid: "",
                    lvlup: ""
                    rate: [

                    ],
                    generate: [
                    ]
                    stats: {
                    },
                    type: "",
                    leaf: true
                }
*/

Ext.define('pso2affixsim.store.AbilityBoost', {
    extend: 'Ext.data.Store',
    alias:'store.abilityboost',
    data: [
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
                    0
                ],
                [
                    0,
                    0,
                    0,
                    20,
                    20,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    30,
                    20,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    10,
                    10,
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
                    0
                ],
                [
                    0,
                    0,
                    0,
                    20,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    60,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    10,
                    10,
                    0
                ],
                [
                    20
                ],
                [
                    10
                ]
            ]
        }
    ]
});

Ext.define('pso2affixsim.store.Ability', {
    extend: 'Ext.data.TreeStore',
    model: "pso2affixsim.Ability",
    alias: 'store.ability',
    root: {
        expanded: true,
        children: [
            {
                name: "Stat Enhancement",
                expanded: true,
                children: [
                    {
                        name: "Power",
                        expanded: true,
                        children:
                        [
                            {
                                name: "Power I",
                                code: "AA01",
                                gid: "AA",
                                lvl: 1,
                                lvlup: "AA02",
                                rate: [
                                    100
                                ],
                                generate: [
                                    60,
                                    80
                                ],
                                receipt: 0,
                                stats: {
                                    satk: 10
                                },
                                type: "power",
                                leaf: true
                            },
                            {
                                name: "Power II",
                                code: "AA02",
                                gid: "AA",
                                lvl: 2,
                                lvlup: "AA03",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    30,
                                    50
                                ],
                                receipt: 0,
                                stats: {
                                    satk: 20
                                },
                                type: "power",
                                leaf: true
                            },
                            {                            
                                name: "Power III",
                                code: "AA03",
                                gid: "AA",
                                lvl: 3,
                                lvlup: "AA04",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    20,
                                    40
                                ],
                                receipt: 0,
                                stats: {
                                    satk: 30
                                },
                                type: "power",
                                leaf: true
                            },
                            {
                                name: "Power IV",
                                code: "AA04",
                                gid: "AA",
                                lvl: 4,
                                lvlup: "AA05",
                                rate: [
                                    40,
                                    60,
                                    80
                                ],
                                generate: [
                                    10,
                                    30
                                ],
                                receipt: 0,
                                stats: {
                                    satk: 35
                                },
                                type: "power",
                                leaf: true
                            },
                            {
                                name: "Power V",
                                code: "AA05",
                                gid: "AA",
                                lvl: 5,
                                rate: [
                                    20,
                                    40,
                                    60
                                ],
                                receipt: 0,
                                stats: {
                                    satk: 40
                                },
                                type: "power",
                                leaf: true	
                            },
                            {
                                name: "Power VI",
                                code: "AA06",
                                gid: "AA",
                                lvl: 6,
                                receipt: 0,
                                stats: {
                                    satk: 45
                                },
                                type: "power",
                                leaf: true
                            }
                        ]                    
                    },
                    {
                        name: "Shoot",
                        expanded: false,
                        children: [
                            {
                                name: "Shoot I",
                                code: "AB01",                            
                                gid: "AB",
                                lvl: 1,
                                lvlup: "AB02",
                                rate: [
                                    100
                                ],
                                generate: [
                                    60,
                                    80
                                ],
                                receipt: 0,
                                stats: {
                                    ratk: 10
                                },
                                type: "shoot",
                                leaf: true
                            },
                            {
                                name: "Shoot II",
                                code: "AB02",
                                gid: "AB",
                                lvl: 2,
                                lvlup: "AB03",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    30,
                                    50
                                ],
                                receipt: 0,
                                stats: {
                                    ratk: 20
                                },
                                type: "shoot",
                                leaf: true
                            },
                            {
                                name: "Shoot III",
                                code: "AB03",                            
                                gid: "AB",
                                lvl: 3,
                                lvlup: "AB04",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    20,
                                    40
                                ],
                                receipt: 0,
                                stats: {
                                    ratk: 30
                                },
                                type: "shoot",
                                leaf: true
                            },
                            {
                                name: "Shoot IV",
                                code: "AB04",                            
                                gid: "AB",
                                lvl: 4,
                                lvlup: "AB05",
                                rate: [
                                    40,
                                    60,
                                    80
                                ],
                                generate: [
                                    10,
                                    30
                                ],
                                receipt: 0,
                                stats: {
                                    ratk: 35
                                },
                                type: "shoot",
                                leaf: true
                            },
                            {
                                name: "Shoot V",
                                code: "AB05",                            
                                gid: "AB",
                                lvl: 5,
                                rate: [
                                    20,
                                    40,
                                    60
                                ],
                                receipt: 0,
                                stats: {
                                    ratk: 40
                                },
                                type: "shoot",
                                leaf: true
                            },
                            {
                                name: "Shoot VI",
                                code: "AB06",
                                gid: "AB",
                                lvl: 6,
                                receipt: 0,
                                stats: {
                                    ratk: 45
                                },
                                type: "shoot",
                                leaf: true
                            }
                        ]
                    },
                    {
                        name: "Technique",
                        expanded: false,
                        children: [
                            {
                                name: "Technique I",
                                code: "AC01",
                                gid: "AC",
                                lvl: 1,
                                lvlup: "AC02",
                                rate: [
                                    100
                                ],
                                generate: [
                                    60,
                                    80
                                ],
                                receipt: 0,
                                stats: {
                                    tatk: 10
                                },
                                type: "tech",
                                leaf: true
                            },
                            {
                                name: "Technique II",
                                code: "AC02",
                                gid: "AC",
								lvl: 2,
                                lvlup: "AC03",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    30,
                                    50
                                ],
                                receipt: 0,
                                stats: {
                                    tatk: 20
                                },
                                type: "tech",
                                leaf: true
                            },
                            {
                                name: "Technique III",
                                code: "AC03",
                                gid: "AC",
								lvl: 3,
                                lvlup: "AC04",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    20,
                                    40
                                ],
                                receipt: 0,
                                stats: {
                                    tatk: 30
                                },
                                type: "tech",
                                leaf: true
                            },
                            {
                                name: "Technique IV",
                                code: "AC04",
                                gid: "AC",
								lvl: 4,
                                lvlup: "AC05",
                                rate: [
                                    40,
                                    60,
                                    80
                                ],
                                generate: [
                                    10,
                                    30
                                ],
                                receipt: 0,
                                stats: {
                                    tatk: 35
                                },
                                type: "tech",
                                leaf: true
                            },
                            {
                                name: "Technique V",
                                code: "AC05",
                                gid: "AC",
								lvl: 5,
                                rate: [
                                    20,
                                    40,
                                    60
                                ],
                                receipt: 0,
                                stats: {
                                    tatk: 40
                                },
                                type: "tech",
                                leaf: true
                            },
                            {
                                name: "Technique VI",
                                code: "AC06",
                                gid: "AC",
								lvl: 6,
                                receipt: 0,
                                stats: {
                                    tatk: 45
                                },
                                type: "tech",
                                leaf: true
                            }
                        ]
                    },
                    {
                        name: "Arm",
                        expanded: false,
                        children: [
                            {
                                name: "Arm I",
                                code: "AD01",
                                gid: "AD",
								lvl: 1,
                                lvlup: "AD02",
                                rate: [
                                    100
                                ],
                                generate: [
                                    60,
                                    80
                                ],
                                receipt: 0,
                                stats: {
                                    "dex": 10 
                                },
                                leaf: true
                            },
                            {
                                name: "Arm II",
                                code: "AD02",
                                gid: "AD",
								lvl: 2,
                                lvlup: "AD03",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    30,
                                    50
                                ],
                                receipt: 0,
                                stats: {
                                    "dex": 20 
                                },
                                leaf: true
                            },
                            {
                                name: "Arm III",
                                code: "AD03",
                                gid: "AD",
								lvl: 3,
                                lvlup: "AD04",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    20,
                                    40
                                ],
                                receipt: 0,
                                stats: {
                                    "dex": 30
                                },
                                leaf: true
                            },
                            {
                                name: "Arm IV",
                                code: "AD04",
                                gid: "AD",
								lvl: 4,
                                lvlup: "AD05",
                                rate: [
                                    40,
                                    60,
                                    80
                                ],
                                generate: [
                                    10,
                                    30
                                ],
                                receipt: 0,
                                stats: {
                                    "dex": 35
                                },
                                leaf: true
                            },
                            {
                                name: "Arm V",
                                code: "AD05",
                                gid: "AD",
								lvl: 5,
                                rate: [
                                    20,
                                    40,
                                    60
                                ],
                                receipt: 0,
                                stats: {
                                    "dex": 40
                                },
                                leaf: true
                            }
                        ]
                    },
                    {
                        name: "Body",
                        expanded: false,
                        children: [
                            {
                                name: "Body I",
                                code: "AE01",
                                gid: "AE",
								lvl: 1,
                                lvlup: "AE02",
                                rate: [
                                    100
                                ],
                                generate: [
                                    60,
                                    80
                                ],
                                receipt: 0,
                                stats: {
                                    sdef: 10
                                },
                                leaf: true
                            },
                            {
                                name: "Body II",
                                code: "AE02",
                                gid: "AE",
								lvl: 2,
                                lvlup: "AE03",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    30,
                                    50
                                ],
                                receipt: 0,
                                stats: {
                                    sdef: 20
                                },
                                leaf: true
                            },
                            {                            
                                name: "Body III",
                                code: "AE03",
                                gid: "AE",
								lvl: 3,
                                lvlup: "AE04",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    20,
                                    40
                                ],
                                receipt: 0,
                                stats: {
                                    sdef: 30
                                },
                                leaf: true
                            },
                            {
                                name: "Body IV",
                                code: "AE04",
                                gid: "AE",
								lvl: 4,
                                lvlup: "AE05",
                                rate: [
                                    40,
                                    60,
                                    80
                                ],
                                generate: [
                                    10,
                                    30
                                ],
                                receipt: 0,
                                stats: {
                                    sdef: 35
                                },
                                leaf: true
                            },
                            {
                                name: "Body V",
                                code: "AE05",
                                gid: "AE",
								lvl: 5,
                                rate: [
                                    20,
                                    40,
                                    60
                                ],
                                receipt: 0,
                                stats: {
                                    sdef: 40
                                },
                                leaf: true	
                            }
                        ]
                    },
                    {
                        name: "React",
                        expanded: false,
                        children: [
                            {
                                name: "React I",
                                code: "AF01",
                                gid: "AF",
								lvl: 1,
                                lvlup: "AF02",
                                rate: [
                                    100
                                ],
                                generate: [
                                    60,
                                    80
                                ],
                                receipt: 0,
                                stats: {
                                    rdef: 10
                                },
                                leaf: true
                            },
                            {
                                name: "React II",
                                code: "AF02",
                                gid: "AF",
								lvl: 2,
                                lvlup: "AF03",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    30,
                                    50
                                ],
                                receipt: 0,
                                stats: {
                                    rdef: 20
                                },
                                leaf: true
                            },
                            {                            
                                name: "React III",
                                code: "AF03",
                                gid: "AF",
								lvl: 3,
                                lvlup: "AF04",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    20,
                                    40
                                ],
                                receipt: 0,
                                stats: {
                                    rdef: 30
                                },
                                leaf: true
                            },
                            {
                                name: "React IV",
                                code: "AF04",
                                gid: "AF",
								lvl: 4,
                                lvlup: "AF05",
                                rate: [
                                    40,
                                    60,
                                    80
                                ],
                                generate: [
                                    10,
                                    30
                                ],
                                receipt: 0,
                                stats: {
                                    rdef: 35
                                },
                                leaf: true
                            },
                            {
                                name: "React V",
                                code: "AF05",
                                gid: "AF",
								lvl: 5,
                                rate: [
                                    20,
                                    40,
                                    60
                                ],
                                receipt: 0,
                                stats: {
                                    rdef: 40
                                },
                                leaf: true	
                            }
                        ]
                    },
                    {
                        name: "Mind",
                        expanded: false,
                        children: [
                            {
                                name: "Mind I",
                                code: "AG01",
                                gid: "AG",
								lvl: 1,
                                lvlup: "AG02",
                                rate: [
                                    100
                                ],
                                generate: [
                                    60,
                                    80
                                ],
                                receipt: 0,
                                stats: {
                                    tdef: 10
                                },
                                leaf: true
                            },
                            {
                                name: "Mind II",
                                code: "AG02",
                                gid: "AG",
								lvl: 2,
                                lvlup: "AG03",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    30,
                                    50
                                ],
                                receipt: 0,
                                stats: {
                                    tdef: 20
                                },
                                leaf: true
                            },
                            {                            
                                name: "Mind III",
                                code: "AG03",
                                gid: "AG",
								lvl: 3,
                                lvlup: "AG04",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    20,
                                    40
                                ],
                                receipt: 0,
                                stats: {
                                    tdef: 30
                                },
                                leaf: true
                            },
                            {
                                name: "Mind IV",
                                code: "AG04",
                                gid: "AG",
								lvl: 4,
                                lvlup: "AG05",
                                rate: [
                                    40,
                                    60,
                                    80
                                ],
                                generate: [
                                    10,
                                    30
                                ],
                                receipt: 0,
                                stats: {
                                    tdef: 35
                                },
                                leaf: true
                            },
                            {
                                name: "Mind V",
                                code: "AG05",
                                gid: "AG",
								lvl: 5,
                                rate: [
                                    20,
                                    40,
                                    60
                                ],
                                receipt: 0,
                                stats: {
                                    tdef: 40
                                },
                                leaf: true	
                            }
                        ]
                    },
                    {
                        name: "Stamina",
                        expanded: false,
                        children: [
                            {
                                name: "Stamina I",
                                code: "AH01",
                                gid: "AH",
								lvl: 1,
                                lvlup: "AH02",
                                rate: [
                                    100
                                ],
                                generate: [
                                    60,
                                    80
                                ],
                                receipt: 0,
                                stats: {
                                    hp: 20
                                },
                                leaf: true
                            },
                            {
                                name: "Stamina II",
                                code: "AH02",
                                gid: "AH",
								lvl: 2,
                                lvlup: "AH03",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    30,
                                    50
                                ],
                                receipt: 0,
                                stats: {
                                    hp: 40
                                },
                                leaf: true
                            },
                            {                            
                                name: "Stamina III",
                                code: "AH03",
                                gid: "AH",
								lvl: 3,
                                lvlup: "AH04",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    20,
                                    40
                                ],
                                receipt: 0,
                                stats: {
                                    hp: 50
                                },
                                leaf: true
                            },
                            {
                                name: "Stamina IV",
                                code: "AH04",
                                gid: "AH",
								lvl: 4,
                                lvlup: "AH05",
                                rate: [
                                    40,
                                    60,
                                    80
                                ],
                                generate: [
                                    10,
                                    30
                                ],
                                receipt: 0,
                                stats: {
                                    hp: 60
                                },
                                leaf: true
                            },
                            {
                                name: "Stamina V",
                                code: "AH05",
                                gid: "AH",
								lvl: 5,
                                rate: [
                                    20,
                                    40,
                                    60
                                ],
                                receipt: 0,
                                stats: {
                                    hp: 70
                                },
                                leaf: true	
                            },
                            {
                                name: "Stamina VI",
                                code: "AH06",
                                gid: "AH",
								lvl: 6,
                                receipt: 0,
                                stats: {
                                    hp: 80
                                },
                                leaf: true	
                            }
                        ]
                    },
                    {
                        name: "Spirita",
                        expanded: false,
                        children: [
                            {
                                name: "Spirita I",
                                code: "AI01",
                                gid: "AI",
								lvl: 1,
                                lvlup: "AI02",
                                rate: [
                                    100
                                ],
                                generate: [
                                    60,
                                    80
                                ],
                                receipt: 0,
                                stats: {
                                    pp: 2
                                },
                                leaf: true
                            },
                            {
                                name: "Spirita II",
                                code: "AI02",
                                gid: "AI",
								lvl: 2,
                                lvlup: "AI03",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    30,
                                    50
                                ],
                                receipt: 0,
                                stats: {
                                    pp: 3
                                },
                                leaf: true
                            },
                            {                            
                                name: "Spirita III",
                                code: "AI03",
                                gid: "AI",
								lvl: 3,
                                lvlup: "AI04",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    20,
                                    40
                                ],
                                receipt: 0,
                                stats: {
                                    pp: 4
                                },
                                leaf: true
                            },
                            {
                                name: "Spirita IV",
                                code: "AI04",
                                gid: "AI",
								lvl: 4,
                                lvlup: "AI05",
                                rate: [
                                    40,
                                    60,
                                    80
                                ],
                                generate: [
                                    10,
                                    30
                                ],
                                receipt: 0,
                                stats: {
                                    pp: 5
                                },
                                leaf: true
                            },
                            {
                                name: "Spirita V",
                                code: "AI05",
                                gid: "AI",
								lvl: 5,
                                rate: [
                                    20,
                                    40,
                                    60
                                ],
                                receipt: 0,
                                stats: {
                                    pp: 6
                                },
                                leaf: true	
                            },
                            {
                                name: "Spirita VI",
                                code: "AI0G",
                                gid: "AI",
								lvl: 6,
                                receipt: 0,
                                stats: {
                                    pp: 7
                                },
                                leaf: true	
                            }
                        ]
                    },
                    {
                        name: "Ability",
                        expanded: false,
                        children: [
                            {
                                code: "AJ01",
                                name: "Ability I",
                                gid: "AJ",
                                lvl: 1,
                                rate: [
                                    100
                                ],
                                receipt: 5,
                                stats: {
                                    all: 5
                                },
                                type: "special",
                                leaf: true
                            },
                            {
                                code: "AJ02",
                                name: "Ability II",
                                gid: "AJ",
                                lvl: 2,
                                rate: [
                                    20,
                                    40,
                                    60
                                ],
                                receipt: 5,
                                stats: {
                                    all: 10
                                },
                                type: "special",
                                leaf: true
                            },
                            {
                                code: "AJ03",
                                name: "Ability III",
                                gid: "AJ",
                                lvl: 3,
                                rate: [
                                    10,
                                    30,
                                    50
                                ],
                                receipt: 5,
                                stats: {
                                    all: 15
                                },
                                type: "special",
                                leaf: true
                            },
                            {
                                code: "AJ04",
                                name: "Ability IV",
                                gid: "AJ",
                                lvl: 4,
                                stats: {
                                    all: 20
                                },
                                type: "special",
                                leaf: true
                            }
                        ]
                    }
                ]
            },
            {
                name: "Stat Enchancement (Lesser)",
                expanded: false,
                children: []
            },
            {
                name: "Stat Enchancement (Special)",
                expanded: false,
                children: []
            },
            {
                name: "Resistance",
                expanded: false,
                children: [
                    {
                        name: "Blow Resist",
                        expanded: false,
                        children: [
                            {
                                name: "Blow Resist I",
                                code: "CA01",
                                gid: "CA",
								lvl: 1,
                                //lvlup: "CA02",
                                rate: [
                                    100
                                ],
                                generate: [
                                    60,
                                    80
                                ],                                
                                stats: {
                                    s_res: 3
                                },
                                leaf: true
                            }
                        ]
                    }
                    
                ]
            },
            {
                name: "Status Effect",
                expanded: false,
                children: [
                    {
                        name: "Burn",
                        expanded: false,
                        children: [
                            {
                                name: "Burn I",
                                code: "DA01",
                                gid: "DA",
								lvl: 1,
                                //lvlup: "DA02",
                                rate: [
                                    60,
                                    80,
                                    100
                                ],
                                generate: [
                                    60,
                                    80
                                ],
                                stats: {
                                    other: "Grants Burn Lvl 1"
                                },
                                //visible: false,
                                leaf: true
                            }
                        ]
                    }
                    
                ]
            },
            {
                name: "Soul",
                expanded: false,
                children: [
                    {
                        name: "Free Field Boss",
                        expanded: false,
                        children: [
                            {
                                name: "Gunne Soul",
                                code: "EA01",
                                gid: "E",
                                rate: [
                                    0,
                                    50,
                                    80
                                ],
                                stats: {
                                    satk: 15,
                                    hp: 45
                                },
                                boost: {
                                    type: 'soul',
                                    target: [
                                        'AA',
                                        'AE',
                                        'AH'
                                    ]
                                },
                                leaf: true
                            },
                            {
                                name: "Zigmor Soul",
                                code: "EA02",
                                gid: "E",
                                rate: [
                                    0,
                                    50,
                                    80
                                ],
                                stats: {
                                    satk: 15,
                                    pp: 4
                                },
                                boost: {
                                    type: 'mutation2',
                                    target: [
                                        "AA",
                                        "AI",
                                        "HC",
                                        "JF"
                                    ]
                                },
                                leaf: true
                            }
                        ]
                    }
                    
                ]
            }
        ]
    }
});

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
    //model: "pso2affixsim.Items",
    alias:'store.items',
    data: [
        {
            id: "Nothing",
            code: "B01"
        },
        {
            id: "Add Ability (HP)",
            name: "Stamina Boost",
            code: "B02",
            rate: 100,
            stats: {
                hp: 45
            }
        }
    ]
});