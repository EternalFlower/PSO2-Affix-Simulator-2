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
			glyph: 43,
			listeners: {
				click: 'onAddTabClick'
			}
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
			validator: function(val){
				var value = val;
				if(value < 0){
					value =  0
				} else if(value > 100){
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
						text: 'Strike',
						value: 'strike'
					},
					{
						text: 'Shoot',
						value: 'shoot'
					},
					{
						text: 'Tech',
						value: 'tech'
					},
					{
						text: 'HP & PP',
						value: 'hppp'
					},
					{
						text: 'Special',
						value: 'special'
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
			validator: function(val){
				var value = val;
				if(value < 0){
					value =  0
				} else if(value > 100){
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
