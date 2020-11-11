
Ext.define("pso2affixsim.view.main.nav.NavView", {
	extend: "Ext.Panel",
	xtype: "navview",
	cls: "navview",
	id: 'navview',
	layout: "fit",
	padding: 5,

	items: [
		{
			xtype: 'abilitylistview',
			width: 417
		}
	]
});

