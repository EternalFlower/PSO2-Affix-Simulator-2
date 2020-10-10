Ext.define('pso2affixsim.view.main.MainViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mainviewcontroller',
  requires: ['Ext.ux.Mediator'],

  initViewModel: function(vm) {
  },
  campaignBoostChangeEvent: function(field, newValue, oldValue, opts){
    Ext.ux.Mediator.fireEvent('campaignChange', newValue);
  },
  groupTypeBoostChangeEvent: function(field, newValue, oldValue, opts){
    Ext.ux.Mediator.fireEvent('groupTypeChange', newValue);
  },
  groupvalueBoostChangeEvent: function(field, newValue, oldValue, opts){
    Ext.ux.Mediator.fireEvent('groupValueChange', newValue);
  },
  changeBaseColor: function ( field, color, previousColor, eOpts ) {
    if(previousColor != null){
      var storage = Ext.util.LocalStorage.get("affixsim");
      if(storage){
        storage.setItem("base-color", color)
      }
      Fashion.css.setVariables(
        {
          "base-color": '#' + color,
          "dark-mode": this.getViewModel().get('dark_mode').toString()
        }
      );
    }
  },
  changeDarkMode: function (checkbox, newValue, oldValue, eOpts){
    this.getViewModel().set('dark_mode', newValue);
    var storage = Ext.util.LocalStorage.get('affixsim');
    if(storage){
      storage.setItem("dark-mode", newValue)
    }
    Fashion.css.setVariables(
      {
        "base-color": '#' + this.getViewModel().get('color'),
        "dark-mode": newValue.toString()
      });
  },
  changeServer: function ( field, newValue, oldValue, eOpts ) {
    if(oldValue != null){
      var storage = Ext.util.LocalStorage.get("affixsim");
      if(storage){
        storage.setItem("server", newValue)
      }
    }
  },
  changeLanguage: function ( field, newValue, oldValue, eOpts ) {
    if(oldValue != null){
      var storage = Ext.util.LocalStorage.get("affixsim");
      if(storage){
        storage.setItem("language", newValue)
      }
    }
  },
  onAddTabClick: function() {
    var tabPanel = this.lookupReference('tabpanel'),
        tab = tabPanel.add({
          xtype: "tabview"
        });

    tabPanel.setActiveTab(tab);
  },
  makeActiveTabValid: function() {
    var tabPanel = this.lookupReference('tabpanel'),
        tab = tabPanel.getActiveTab(tab)
        if(tab != null) tab.makeTabValid()
  },

  onHeaderViewDetailToggle: function () {
    var vm = this.getViewModel();
    vm.set('detailCollapsed', !vm.get('detailCollapsed'));
    var detailtoggle = this.lookup('detailtoggle');
    if(vm.get('detailCollapsed') === true) {
      detailtoggle.setIconCls('x-fa fa-arrow-left')
    }
    else {
      detailtoggle.setIconCls('x-fa fa-arrow-right')
    }
  }
});