Ext.define('pso2affixsim.view.main.detail.DetailView', {
	extend: 'Ext.Panel',
	xtype: 'detailview',
	cls: 'detailview',
	requires: ['Ext.ux.colorpick.Field'],
	title: 'Settings',
	items: [
		{
			xtype: 'colorfield',
			fieldLabel: 'Color Field',
			labelAlign: 'left',
			labelWidth: 100,
			bind: {
				value: '{color}'
			},
			listeners: {
				change: 'changeBaseColor'
			}
		},
		{
			xtype: 'checkbox',
			fieldLabel: 'Dark Mode',
			labelAlign: 'left',
			bind: {
				value: '{dark_mode}'
			},
			listeners: {
				change: 'changeDarkMode'
			}
		}
	]
});
