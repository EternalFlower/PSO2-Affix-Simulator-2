Ext.define('pso2affixsim.view.main.tabpanel.tab.TabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tabpanelcontroller',
    requires: ['Ext.ux.Mediator'],
    init: function() {
        Ext.ux.Mediator.on('campaignChange', this.changeCampaignBoost, this);
        Ext.ux.Mediator.on('groupTypeChange', this.changeGroupTypeBoost, this);
        Ext.ux.Mediator.on('groupValueChange', this.changeGroupValueBoost, this);
    },
    rename: function () {
        var name = "tttt";
        this.getViewModel().renameTab(name);
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
    updateSelectedOptions: function(data, isSelect){
        this.getViewModel().updateSelectedOptions(data, isSelect);
    },
    makeFactor: function(tableIndex, rowIndex, isFactor){
        this.getViewModel().makeFactor(tableIndex, rowIndex, isFactor);
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
    },
    getStats: function () {
        return this.getViewModel().getResultStats();
    },
    fillJunk: function(tableIndex, rowIndex){
        this.getViewModel().fillJunk(tableIndex, rowIndex);
    },
    makeTabValid: function(){
        this.getViewModel().makeTabValid();
    }
});