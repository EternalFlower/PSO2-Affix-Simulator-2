
Ext.define('pso2affixsim.view.main.nav.abilitylist.AbilityList', {
    extend: 'Ext.tree.Panel',
    xtype: "abilitylistview",
    shrinkWrapDock: true,
    split: true,
    scrollable: true,
    sortableColumns: false,
    disableSelection: true,
    cls: "x-ability",
    title: 'Special Ability',
    rootVisible: false,
    filterSetting: 'name',
    filterValue: '',
    bind: {
        store: "Ability_Store"
    },
    tools: [{
        type: 'plus',
        tooltip: 'Expand All',
        scope: this,
        callback: function (panel, tool, event) {
            Ext.suspendLayouts();
            panel.expandAll();
            Ext.resumeLayouts(true);
            
        }
    }, {
        type: 'minus',
        tooltip: 'Collapse All',
        scope: this,
        callback: function (panel, tool, event) {
            Ext.suspendLayouts();
            panel.collapseAll();
            Ext.resumeLayouts(true);
        }
    }],
    columns: [{
        xtype: 'treecolumn',
        text: 'Name',
        dataIndex: 'name',
        width: 250
    }, {
        text: 'Effect',
        dataIndex: 'effect',
        width: 150
    }],
    viewConfig: {
        listeners: {
            render: function (treeview) {
                treeview.dragZone = Ext.create("Ext.dd.DragZone", treeview.getEl(), {
                    getDragData: function (event) {
                        var targetItem = event.getTarget(treeview.itemSelector, 10),
                            clone;
                        if (targetItem) {
                            clone = targetItem.cloneNode(true);
                            clone.id = Ext.id();
                            return treeview.dragData = {
                                gridId: this.id,
                                sourceEl: targetItem,
                                repairXY: Ext.fly(targetItem).getXY(),
                                ddel: clone,
                                patientData: treeview.getRecord(targetItem).data
                            }
                        }
                    },
                    getRepairXY: function () {
                        return this.dragData.repairXY
                    }
                })
                treeview.dragZone.onBeforeDrag = function (data, e) {
                    var rec = treeview.getRecord(e.getTarget(treeview.itemSelector));
                    return rec.isLeaf();
                };
            },
            itemclick: function (view, node) {
                if (node.isLeaf()) {

                } else if (node.isExpanded()) {
                    node.collapse();
                } else {
                    node.expand();
                }
            }
        }
    },
    initComponent() {
        var panel = this
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            height: 44,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    'xtype': 'combobox',
                    store: Ext.create('Ext.data.Store', {
                        fields: ["T", "V"],
                        data: [{
                            T: "Name",
                            V: 'name'
                        }, {
                            T: "Effect",
                            V: "effect"
                        }]
                    }),
                    displayField: "T",
                    forceSelection: true,
                    editable: false,
                    queryMode: "local",
                    valueField: "V",
                    value: 'name',
                    width: 150,
                    listeners: {
                        change: function (combobox, newValue, prevValue) {
                            panel.filterSetting = newValue;
                            panel.store.clearFilter();
                            var filterValue = panel.filterValue;
                            if (filterValue.length != 0) {
                                var re = new RegExp(filterValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
                                panel.store.filter(panel.filterSetting, re)
                                panel.expandAll()
                            }
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'filter',
                    flex: 1,
                    listeners: {
                        change: function (fld, newValue, oldValue, opts) {
                            panel.store.clearFilter();
                            panel.filterValue = newValue;
                            if (newValue.length != 0) {
                                var re = new RegExp(newValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
                                panel.store.filter(panel.filterSetting, re)
                                panel.expandAll()
                            }
                        }
                    }
                }
            ]
        }]
        this.callParent()
    }
});