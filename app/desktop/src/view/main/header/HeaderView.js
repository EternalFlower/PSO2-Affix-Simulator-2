Ext.define('pso2affixsim.view.main.header.HeaderView', {
  extend: 'Ext.toolbar.Toolbar',
  height: 50,
  xtype: 'headerview',
  cls: 'headerview',
  defaults: {
    ui:'toolbutton-toolbar', 
    handler:'onToolButtonClicked'
  },
  items: [
    {
      xtype: 'component',
      bind: {html: '{name}'},
    },
    '->',
    '->',
    {
      reference: 'detailtoggle',
      iconCls:'x-fa fa-arrow-left',
      tooltip: 'Settings',
      handler: 'onHeaderViewDetailToggle'
    }
  ]
});
