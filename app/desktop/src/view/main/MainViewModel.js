Ext.define('pso2affixsim.view.main.MainViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.mainviewmodel',
	data: {
		name: 'PSO2 Ability Simulator',
		navCollapsed:       false,
		navview_max_width:    400,
		navview_min_width:     44,
		topview_height:       75,
		bottomview_height:     50,
		detailCollapsed:     true,
		detailview_width:       0,
		detailview_max_width: 300,
		detailview_min_width:   0,
		color: '025B80',
		dark_mode: false,
		server: 1,
		language: 1
	},
	constructor: function (){
		this.callParent(arguments);
		var local = Ext.util.LocalStorage.get('affixsim');
		console.log(local.getItem("language"))
		this.setData({
			'color': local.getItem("base-color") ? local.getItem("base-color") : '025B80',
			'dark_mode': local.getItem("dark-mode") ? local.getItem("dark-mode") : false,
			'server': local.getItem("server") ? parseInt(local.getItem("server")) : 1,
			'language': local.getItem("language") ? parseInt(local.getItem("language")) : 1
		})
	},
	formulas: {
		navview_width: function(get) {
			return get('navCollapsed') ? get('navview_min_width') : get('navview_max_width');
		},
		detailview_width: function(get) {
			return get('detailCollapsed') ? get('detailview_min_width') : get('detailview_max_width');
		}
	}
});
