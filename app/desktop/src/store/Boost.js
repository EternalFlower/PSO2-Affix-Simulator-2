Ext.define('pso2affixsim.store.BoostItems', {
    extend: 'Ext.data.Store',
    alias:'store.boostitems',
    data: [
        {
            id: "Nothing",
            name: "None",
            value: "A01",
            boost: 0
        },
        {
            id: "Ability Success Rate +5%",
            name: "+5%",
            value: "A02",
            boost: 5
        },
        {
            id: "Ability Success Rate +10%",
            name: "+10%",
            value: "A03",
            boost: 10
        },
        {
            id: "Ability Success Rate +20%",
            name: "+20%",
            value: "A04",
            boost: 20
        },
        {
            id: "Ability Success Rate +30%",
            name: "+30%",
            value: "A05",
            boost: 30
        },
        {
            id: "Ability Success Rate +40%",
            name: "+40%",
            value: "A06",
            boost: 40
        },
        {
            id: "Ability Success Rate +45%",
            name: "+45%",
            value: "A07",
            boost: 45
        },
        {
            id: "Ability Success Rate +50%",
            name: "+50%",
            value: "A08",
            boost: 50
        }
    ]
});

Ext.define('pso2affixsim.store.BoostPotential', {
    extend: 'Ext.data.Store',
    alias:'store.potentialitems',
    data: [
        {
            id: "Nothing",
            name: "Nothing",
            value: "C01",
            boost: 0
        },
        {
            id: "Guidance of Life Lv1 (+2%)",
            name: "+2%",
            value: "C11",
            boost: 2
        },
        {
            id: "Guidance of Life Lv2 (+5%)",
            name: "+5%",
            value: "C12",
            boost: 5
        },
        {
            id: "Guidance of Life Lv3 (+10%)",
            name: "+10%",
            value: "C13",
            boost: 10
        }
    ]
});