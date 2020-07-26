Ext.define('pso2affixsim.view.main.TabPanel', {
    extend: 'Ext.tab.Panel',
    resizeTabs: true,
    enableTabScroll: true,
    xtype: "tabpanelview",
    reference: 'tabpanel',
    region: "center",
    layout: "fit",
    cls: 'x-tabpanelview',
    tabBar: {
        defaults: {
            padding: 6
        }
    },
});