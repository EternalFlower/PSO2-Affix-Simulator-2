Ext.define('pso2affixsim.view.main.tabpanel.tab.TabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tabpanelcontroller',
    requires: ['Ext.ux.Mediator'],
    init: function() {
        Ext.ux.Mediator.on('campaignChange', this.changeCampaignBoost, this);
        Ext.ux.Mediator.on('groupTypeChange', this.changeGroupTypeBoost, this);
        Ext.ux.Mediator.on('groupValueChange', this.changeGroupValueBoost, this);
    },
    
    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    rename: function () {
        var name = "tttt";
        this.getViewModel().rename(name);
    },
    addAbility: function(fodder, data){
        this.getViewModel().addAbility(fodder, data);
    },
    removeAbility: function(tableIndex, rowIndex){
        this.getViewModel().removeAbility(tableIndex, rowIndex);
    },
    swapAbility: function(fodder, indexDrag, indexDrop){
        this.getViewModel().swapAbility(fodder, indexDrag, indexDrop);
    },
    updateSelectionList: function(){
        this.getViewModel().updateSelectionList();
    },
    updateSelectedOptions: function(){
        this.getViewModel().updateSelectedOptions();
    },
    removeSelectedList: function(ability){
        return this.getViewModel().removeSelectedList(ability);
    },
    controllerChangeAddItem: function ( combo, record, eOpts ) {
        this.getViewModel().changeItemSelected(record);
    },
    changeAffixAidItem: function ( combo, record, eOpts ) {
        this.getViewModel().changeItemBoost(record.get("boost"));
    },
    changeCampaignBoost: function(boost){
        this.getViewModel().changeCampaignBoost(boost);
    },
    changeGroupTypeBoost: function(group){
        this.getViewModel().changeGroupTypeBoost(group);
    },
    changeGroupValueBoost: function(boost){
        this.getViewModel().changeGroupValueBoost(boost);
    },
    changePotentialBoost: function ( combo, record, eOpts ){
        this.getViewModel().changePotentialBoost(record.get("boost"));
    },
    changeSameItemBoost: function (checkbox, newValue, oldValue, eOpts){
        this.getViewModel().changeSameItemBonus(newValue);
    }
});