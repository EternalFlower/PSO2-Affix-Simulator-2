Ext.define('pso2affixsim.Locale', {
    singleton: true,
    jp_en: {
        satk: "S-ATK",
        ratk: "R-ATK",
        tatk: "T-ATK",
        sdef: "S-DEF",
        rdef: "R-DEF",
        tdef: "T-DEF",
        dex: "DEX",
        all: "ALL",
        hp: "HP",
        pp: "PP",
        s_res: "Strike Resist",
        r_res: "Range Resist",
        t_res: "Tech Resist",
        fire_res: "Fire Resist",
        ice_res: "Ice Resist",
        ltn_res: "Lightning Resist",
        wind_res: "Wind Resist",
        light_res: "Light Resist",
        dark_res: "Dark Resist",
        all_res: "All Resist"
    },
    global_en: {
        satk: "S-ATK",
        ratk: "R-ATK",
        tatk: "T-ATK",
        sdef: "S-DEF",
        rdef: "R-DEF",
        tdef: "T-DEF",
        dex: "DEX",
        all: "ALL",
        hp: "HP",
        pp: "PP",
        stkres: "Strike Resist",
        rngres: "Range Resist",
        techres: "Tech Resist",
        fireres: "Fire Resist",
        iceres: "Ice Resist",
        ltnres: "Lightning Resist",
        windres: "Wind Resist",
        lightres: "Light Resist",
        darkres: "Dark Resist",
        allres: "All Resist"
    },
    constructor: function (locale){
        if(locale == 'global_en'){
            for(var text in this.global_en){
                this[text] = this.global_en[text]
            }
        } else {
            for(var text in this.jp_en){
                this[text] = this.jp_en[text]
            }
        }
    }
});