/**
NavView is a component that shows a list of menu options, and the view xtype for each. It is
twoWayBindable on "selection".
NavView is actually composed of several components: a header, a tree list, and a footer. But we're
hiding that from the rest of the app -- we only want code to be aware of NavView, without caring
about the underlying components within it. We could write the rest of the app to select and listen
directly to the tree list, but in a complex app that kind of poor scoping can lead to problems.
*/
Ext.define("pso2affixsim.view.main.nav.NavView", {
	extend: "Ext.Panel",
	xtype: "navview",
	controller: "navviewcontroller",
	viewModel: { type: "navviewmodel"},
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

	bbar: {
		xtype: "bottomview",
		reference: "bottomview",
		height: 50
	}
});

