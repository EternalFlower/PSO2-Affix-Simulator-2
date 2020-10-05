Ext.define('pso2affixsim.Application', {
	extend: 'Ext.app.Application',
	name: 'pso2affixsim',
	requires: [
		'Ext.layout.container.Border',
		'pso2affixsim.*'
	],

	launch: function () {
		Ext.ariaWarn = Ext.emptyFn
		Ext.getBody().removeCls('launching')
		var elem = document.getElementById("splash")
		elem.parentNode.removeChild(elem)

		var whichView = 'mainview'
		
		Ext.create('pso2affixsim.store.Ability', {storeId: "AbilityList_Store"});
		Ext.create('pso2affixsim.store.Synthesis', {storeId: "Synthesis_Store"});
		Ext.create('pso2affixsim.store.Items', {storeId: "item"});
        Ext.create('pso2affixsim.store.BoostItems', {storeId: "boostitem"});
		Ext.create('pso2affixsim.store.BoostPotential', {storeId: "boostpotential"});
		Ext.create('pso2affixsim.store.AbilityBoost', {storeId: "abilityboost"});
		Ext.create('pso2affixsim.store.UpslotRates', {storeId: "upslotrates"});
		Ext.create('pso2affixsim.store.Substitute', {storeId: "substitute"});
		

		if (Ext.isClassic == true) {
			Ext.create({xtype: whichView, plugins: 'viewport'})
		}
		else {
			Ext.Viewport.add([{xtype: whichView}])
		}
	},

	onAppUpdate: function () {
		Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
			function (choice) {
				if (choice === 'yes') {
					window.location.reload();
				}
			}
		);
	}
});
