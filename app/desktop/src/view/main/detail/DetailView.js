Ext.define('pso2affixsim.view.main.detail.DetailView', {
	extend: 'Ext.Panel',
	xtype: 'detailview',
	cls: 'detailview',
	requires: [
		'Ext.ux.colorpick.Field',
		'Ext.form.RadioGroup'
	],
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
		},
		{
            xtype: 'radiogroup',
            fieldLabel: 'Server:',
			name: 'server_select',
			simpleValue: true,
			bind: '{server}',
			//disabled: true,
            items: [
                { boxLabel: 'Japan', inputValue: 1 },
                { boxLabel: 'Global', inputValue: 2 }
            ],
			listeners: {
				change: 'changeServer'
			}
        },
		{
            xtype: 'radiogroup',
            fieldLabel: 'Language:',
			name: 'language_select',
			simpleValue: true,
			bind: '{language}',
            items: [
                { boxLabel: 'English', inputValue: 1 , checked: true}
            ],
			listeners: {
				change: 'changeLanguage'
			}
        }
	]
});
