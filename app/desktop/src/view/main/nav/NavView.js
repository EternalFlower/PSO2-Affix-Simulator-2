
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
            bind: {
				width: '{menuview_width}'
			}
        }
	],
	/*
	bbar: {
		xtype: "bottomview",
		reference: "bottomview",
		height: 50
	}*/
});

