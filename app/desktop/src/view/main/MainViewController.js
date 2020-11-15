Ext.define('pso2affixsim.view.main.MainViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mainviewcontroller',
  requires: ['Ext.ux.Mediator'],

  initViewModel: function (vm) {
  },
  campaignBoostChangeEvent: function (field, newValue, oldValue, opts) {
    Ext.ux.Mediator.fireEvent('campaignChange', newValue);
  },
  groupTypeBoostChangeEvent: function (field, newValue, oldValue, opts) {
    Ext.ux.Mediator.fireEvent('groupTypeChange', newValue);
  },
  groupvalueBoostChangeEvent: function (field, newValue, oldValue, opts) {
    Ext.ux.Mediator.fireEvent('groupValueChange', newValue);
  },
  changeBaseColor: function (field, color, previousColor, eOpts) {
    if (previousColor != null) {
      var storage = Ext.util.LocalStorage.get("affixsim");
      if (storage) {
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
  changeDarkMode: function (checkbox, newValue, oldValue, eOpts) {
    this.getViewModel().set('dark_mode', newValue);
    var storage = Ext.util.LocalStorage.get('affixsim');
    if (storage) {
      storage.setItem("dark-mode", newValue)
    }
    Fashion.css.setVariables(
      {
        "base-color": '#' + this.getViewModel().get('color'),
        "dark-mode": newValue.toString()
      });
  },
  changeServer: function (field, newValue, oldValue, eOpts) {
    if (oldValue != null) {
      var storage = Ext.util.LocalStorage.get("affixsim");
      if (storage) {
        storage.setItem("server", newValue)
      }
    }
  },
  changeLanguage: function (field, newValue, oldValue, eOpts) {
    if (oldValue != null) {
      var storage = Ext.util.LocalStorage.get("affixsim");
      if (storage) {
        storage.setItem("language", newValue)
      }
    }
  },
  onAddTabClick: function () {
    var tabPanel = this.lookupReference('tabpanel'),
      tab = tabPanel.add({
        xtype: "tabview"
      });

    tabPanel.setActiveTab(tab);
    var test = JSON.parse('{"affixes":[["AA01"],["AA03"],[],[],[],[]],"saf":[null,"AA04"],"selection":["AA03"],"potBoost":0,"itemBoost":0,"item":null}')
    tab.loadTabData(test)
  },
  makeActiveTabValid: function () {
    var tabPanel = this.lookupReference('tabpanel'),
      tab = tabPanel.getActiveTab(tab)
    if (tab != null) tab.makeTabValid()
  },
  renameActiveTab: function () {
    var tabPanel = this.lookupReference('tabpanel'),
      tab = tabPanel.getActiveTab(tab)
    if (tab != null){
      return Ext.Msg.prompt("Rename Panel", "Rename current panel.<br/>Input a name?", function(okButton, textfield) {
        if (okButton == "ok") {
            tab.rename(textfield)
        }
      })
    } 
  },
  onHeaderViewDetailToggle: function () {
    var vm = this.getViewModel();
    vm.set('detailCollapsed', !vm.get('detailCollapsed'));
  }
});