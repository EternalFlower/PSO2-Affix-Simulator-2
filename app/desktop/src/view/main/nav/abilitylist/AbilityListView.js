
Ext.define('pso2affixsim.view.main.nav.abilitylist.AbilityList', {
    extend: 'Ext.tree.Panel',
    xtype: "abilitylistview",
    shrinkWrapDock: true,
    split: true,
    scrollable: true,
    sortableColumns: false,
    disableSelection: true,
    cls: "x-ability",
    requires: [
        'pso2affixsim.store.Ability'
    ],
    title: 'Special Ability',
    rootVisible: false,
    /*dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        height: 44,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [
            Ext.create("Ext.form.field.ComboBox", {
                store: Ext.create("Ext.data.JsonStore", {
                    autoLoad: false,
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
                width: 100
            }),
            {
                xtype: 'textfield',
                name: 'filter',
                flex: 1
            }
        ]
    }],*/
    bind: {
        store: 'abilityList'
    },
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
            render: function(treeview){
                treeview.dragZone = Ext.create("Ext.dd.DragZone", treeview.getEl(), {
                    getDragData: function(event) {
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
                    getRepairXY: function() {
                        return this.dragData.repairXY
                    }
                })
                treeview.dragZone.onBeforeDrag = function (data, e) {
                    var rec = treeview.getRecord(e.getTarget(treeview.itemSelector));
                    return rec.isLeaf();
                };
            }
        }
    }
});