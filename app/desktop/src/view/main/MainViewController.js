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
  onAddTabClick: function() {
    var tabPanel = this.lookupReference('tabpanel'),
        tab = tabPanel.add({
          xtype: "tabview"
        });

    tabPanel.setActiveTab(tab);
  },

  onHeaderViewNavToggle: function () {
    var vm = this.getViewModel();
    vm.set('navCollapsed', !vm.get('navCollapsed'));
    //var topPic = this.lookup('topPic');
    var topPic = Ext.getCmp('topPic');
    if (vm.get('navCollapsed') == true) {
      topPic.setData({ src:'resources/desktop/5.jpg', caption:'John Smith', imgStyle: 'imgSmall', height: '100px' });
    }
    else {
      topPic.setData({ src:'resources/desktop/5.jpg', caption:'John Smith', imgStyle: 'imgBig', height: '150px' });
    }

  },

  onHeaderViewDetailToggle: function () {
    var vm = this.getViewModel();
    vm.set('detailCollapsed', !vm.get('detailCollapsed'));
    var detailtoggle = this.lookup('detailtoggle');
    if(vm.get('detailCollapsed') === true) {
      //detailtoggle.setType('prev')
      detailtoggle.setIconCls('x-fa fa-arrow-left')
    }
    else {
      //detailtoggle.setType('next')
      detailtoggle.setIconCls('x-fa fa-arrow-right')
    }
  },

  onToolButtonClicked: function (button) {
    Ext.Msg.show({
      title:'Tool Button',
      closable: false,
      message: button.name + ' tool button was clicked',
      buttons: Ext.Msg.OK,
      icon: Ext.Msg.INFO,
      fn: function(btn) {
        if (btn === 'ok') {
          console.log('ok pressed');
        } else {
          console.log('??? pressed');
        }
      }
    })
  }
});