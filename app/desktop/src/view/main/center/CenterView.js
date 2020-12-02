Ext.define('pso2affixsim.view.main.center.CenterView', {
	extend: 'Ext.panel.Panel',
	xtype: 'centerview',
	cls: 'centerview',
	layout: 'card',
	padding: 5,
	tbar: [
		{
			xtype: 'button',
			icon: null,
			text: "Add Panel",
			iconCls: 'x-fa fa-plus',
			listeners: {
				click: 'onAddTabClick'
			},
			tooltip: "Add new panel"
		},
		{
			xtype: 'button',
			icon: null,
			text: "Rename Tab",
			iconCls: 'x-fa fa-edit',
			listeners: {
				click: 'renameActiveTab'
			},
			tooltip: "Rename current tab"
		},
		{
			xtype: 'button',
			icon: null,
			text: "Make Active Tab Valid",
			iconCls: 'x-fa fa-check',
			listeners: {
				click: 'makeActiveTabValid'
			},
			tooltip: "Add fillers to make active tab valid"
		},
		{
			xtype: 'button',
			icon: null,
			text: "Save",
			iconCls: 'x-fa fa-save',
			listeners: {
				click: 'getActiveTabData'
			},
			style: {
				pointerEvents: 'all'
			},
			tooltip: "Not available"
		},
		{
			xtype: 'button',
			icon: null,
			text: "Load",
			iconCls: 'x-fa fa-download',
			style: {
				pointerEvents: 'all'
			},
			tooltip: "Not available",
			disabled: true
		},
		'-',
		{
			xtype: 'numberfield',
			name: 'campaignBoost',
			fieldLabel: 'Campaign Boost',
			value: 0,
			maxValue: 100,
			minValue: 0,
			hideTrigger: true,
			listeners: {
				change: 'campaignBoostChangeEvent'
			},
			validator: function (val) {
				var value = val;
				if (value < 0) {
					value = 0
				} else if (value > 100) {
					value = 100
				}
				this.setValue(value);
				return true
			}
		},
		'-',
		{
			xtype: 'combobox',
			name: 'groupBoostType',
			fieldLabel: 'Group Boost',
			displayField: 'text',
			forceSelection: true,
			editable: false,
			valueField: 'value',
			value: 0,
			queryMode: 'local',
			listeners: {
				change: 'groupTypeBoostChangeEvent'
			},
			store: Ext.create("Ext.data.Store", {
				fields: ["text", "value"],
				data: [
					{
						text: 'No Boost',
						value: 0
					},
					{
						text: 'Power',
						value: 'Power'
					},
					{
						text: 'Shoot',
						value: 'Shoot'
					},
					{
						text: 'Tech',
						value: 'Tech'
					},
					{
						text: 'HP & PP',
						value: 'HPPP'
					},
					{
						text: 'Special',
						value: 'Special'
					}
				]
			})
		},
		{
			xtype: 'numberfield',
			name: 'groupBoostNumber',
			fieldLabel: ' ',
			value: 0,
			maxValue: 100,
			minValue: 0,
			hideTrigger: true,
			listeners: {
				change: 'groupvalueBoostChangeEvent'
			},
			validator: function (val) {
				var value = val;
				if (value < 0) {
					value = 0
				} else if (value > 100) {
					value = 100
				}
				this.setValue(value);
				return true
			}
		}
	],
	items: [
		{
			xtype: "tabpanelview"
		}
	]
});
