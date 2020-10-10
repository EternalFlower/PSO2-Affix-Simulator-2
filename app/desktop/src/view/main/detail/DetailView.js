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
            items: [
                { boxLabel: 'Japan', inputValue: 1 },
                { boxLabel: 'Global', inputValue: 2 }
            ],
			listeners: {
				change: 'changeServer'
			}
		},
		{
			xtype: 'button',
			text: "Reload",
			iconCls: 'x-fa fa-redo',
			listeners: {
				click: function() {
					location.reload()
				}
			},
			tooltip: "Reload the page to change server"
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
        },
		{
			xtype: 'button',
			text: "Changelog",
			iconCls: 'x-fa fa-list',
			listeners: {
				click: function() {
					
				}
			}
		}
	],
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		ui: 'footer',
		fixed: true,
		items: [
			{ 
				xtype: 'panel', 
				html: 'Created by Skylark_Tree#1658<br>(Fleurine@Ship2)<br>'+ 'PHANTASY STAR ONLINE 2 © SEGA<br>' + 'Application version: '+ "Open Beta 1.0" + '<br>' +'Ext JS version: ' + Ext.versions.extjs.version + '<br>'
			}
		]
	}]  
});
