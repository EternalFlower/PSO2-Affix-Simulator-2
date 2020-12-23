Ext.define('pso2affixsim.Application', {
    extend: 'Ext.app.Application',
    name: 'pso2affixsim',
    requires: [
        'Ext.layout.container.Border',
        'pso2affixsim.*'
    ],

    launch: function() {
        Ext.ariaWarn = Ext.emptyFn
        Ext.getBody().removeCls('launching')
        var elem = document.getElementById("splash")
        elem.parentNode.removeChild(elem)

        var whichView = 'mainview'

        var server = Ext.util.LocalStorage.get('affixsim').getItem("server")

        var abilityStore = 'pso2affixsim.store.JPAbility'

        if (server == "1") {
            abilityStore = 'pso2affixsim.store.JPAbility'
        } else if (server == "2") {
            abilityStore = 'pso2affixsim.store.GlobalAbility'
        }

        Ext.create(abilityStore, { storeId: "Ability_Store" });
        Ext.create('pso2affixsim.store.Synthesis', { storeId: "Synthesis_Store" })
        Ext.create('pso2affixsim.store.Items', { storeId: "Item_Store" })
        Ext.create('pso2affixsim.store.BoostItems', { storeId: "BoostItem_Store" })
        Ext.create('pso2affixsim.store.BoostPotential', { storeId: "BoostPotential_Store" })
        Ext.create('pso2affixsim.store.AbilityBoost', { storeId: "AbilityBoost_Store" })
        Ext.create('pso2affixsim.store.UpslotRates', { storeId: "Upslot_Store" })
        Ext.create('pso2affixsim.store.Substitute', { storeId: "Substitute_Store" });

        if (Ext.isClassic == true) {
            Ext.create({ xtype: whichView, plugins: 'viewport' })
        } else {
            Ext.Viewport.add([{ xtype: whichView }])
        }
    },

    onAppUpdate: function() {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function(choice) {
                if (choice === 'yes') {
                    window.location.reload()
                }
            }
        );
    }
});