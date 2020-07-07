Ext.define('pso2affixsim.view.main.MainView', {
  extend: 'Ext.Container',
  xtype: 'mainview',
  controller: 'mainviewcontroller',
  viewModel: {
    type: 'mainviewmodel'
  },
  layout: 'border',
  items: [
    { xtype: 'headerview', reference: 'headerview', region: 'north', docked: 'top' },
    { xtype: "navview", reference: "navview", region: "west" },
    { xtype: 'footerview', reference: 'footerview', region: 'south', docked: 'bottom' },
    { xtype: 'centerview', reference: 'centerview', region: 'center' },
    { xtype: 'detailview', reference: 'detailview', region: 'east', docked: 'right',  bind: {width:  '{detailview_width}'}  },
  ]
});