Ext.define('pso2affixsim.view.main.center.tabpanel.tab.Tab', {
    extend: 'Ext.panel.Panel',
    requires: [
        'pso2affixsim.view.main.tabpanel.tab.TabController',
        'pso2affixsim.view.main.tabpanel.tab.TabModel'
    ],
    controller: 'tabpanelcontroller',
    viewModel: 'tabviewmodel',
    bind: {
        title: "{title}"
    },
    xtype: "tabview",
    layout: {
        type: "vbox",
        align: "stretch"
    },
    factorMenuText: {
        on: "Add Factor",
        off: "Cancel Factor"
    },
    border: 5,
    padding: '5 0 0 0',
    autoScroll: true,
    closable: true,
    initComponent: function(){
        this.superclass.initComponent.apply(this, arguments);
        this.initContextMenu();
        this.createTopPanel();
        this.createBottomPanel();  
    },
    initContextMenu: function(){
        var buttons = [];
        buttons.push({
            iconCls: "x-factor-icon",
            text: this.factorMenuText.on,
            scope: this,
            handler: function(item, event, eOpts) {
                var cell = this.holdInfo;
                if (cell) {
                    if (item.text === this.factorMenuText.on) {
                        this.getController().makeFactor(cell.tableIndex, cell.rowIndex, true);
                    } else {
                        this.getController().makeFactor(cell.tableIndex, cell.rowIndex, false);
                    }
                }
                delete(this.holdInfo)
            }
        });
        buttons.push({
            iconCls: "x-del-icon",
            text: "Delete",
            scope: this,
            handler: function(item, event, eOpts) {
                var cell = this.holdInfo;
                if (cell) {
                    this.getController().removeAbility(cell.tableIndex, cell.rowIndex);
                }
                delete(this.holdInfo)
            }
        });
        this.contextMenu = Ext.create("Ext.menu.Menu", {
            items: buttons
        })
    },
    createGridPanel:function(index, title){
        var controller = this.getController();
        var fodderPanel = Ext.create("Ext.grid.Panel", {
            title: title,
            sortableColumns: false,
            locked: false,
            collapsed: false,
            collapsible: true,
            border: true,
            cls: 'x-tabgrid',
            header: {
                padding: 6
            },
            columns: [{
                dataIndex: "name",
                header: "Slot",
                width: 52,
                hidden: true
            }, {
                dataIndex: "slot",
                header: "Ability",
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                    if (value != null) {
                        if (value.factor) {
                            metaData.tdCls = "x-factor-icon"
                        }
                        return value.name
                    }
                    return ""
                }
            }],
            forceFit: true,
            bind: {
                store: "{panels." + index + "}"
            },
            viewConfig: {
                markDirty: false,
                listeners: {
                    scope: this,
                    render: function(el){
                        el.dragZone = Ext.create("Ext.dd.DragZone", el.getEl(), {
                            getDragData: function(event) {
                                var sourceEl = event.getTarget(el.itemSelector, 10),
                                    clone;
                                if (sourceEl) {
                                    if (!el.getRecord(sourceEl).data.slot) {
                                        return null
                                    }
                                    clone = sourceEl.cloneNode(true);
                                    clone.id = Ext.id();
                                    return el.dragData = {
                                        gridId: this.id,
                                        sourceEl: sourceEl,
                                        repairXY: Ext.fly(sourceEl).getXY(),
                                        ddel: clone,
                                        patientData: el.getRecord(sourceEl).data.slot
                                    }
                                }
                            },
                            getRepairXY: function() {
                                return this.dragData.repairXY
                            }
                        }),
                        
                        el.dropZone = Ext.create("Ext.dd.DropZone", el.getEl(), {
                            getTargetFromEvent: function(event) {
                                return event.getTarget(".x-grid-cell-last");
                            },
                            onNodeDrop: function(target, dd, event, data) {
                                if (dd.id == el.id) {
                                    controller.swapAbility(index, el.indexOf(dd.dragData.sourceEl), el.indexOf(target));
                                } else {
                                    var data = data.patientData;
                                    controller.addAbility(index, data);
                                }
                                return true
                            }
                        })
                    },
                    cellcontextmenu: function( table, td, cellIndex, record, tr, rowIndex, event, eOpts ){
                        event.stopEvent();
                        if(record.get('slot') != null){
                            this.holdInfo = {
                                tableIndex: index,
                                rowIndex: rowIndex
                            }
                            if (record.get('slot').factor !== true) {
                                this.contextMenu.items.getAt(0).setText(this.factorMenuText.on)
                            } else {
                                this.contextMenu.items.getAt(0).setText(this.factorMenuText.off)
                            }
                            this.contextMenu.showAt(event.getXY())
                        }
                    }
                }
            }
        });

        return fodderPanel
    },
    createTopPanel: function(){
        var synthesisGrid = [this.createGridPanel(0, "Base")];
        for (var e = 1; e <= 5; e++) {
            synthesisGrid.push(this.createGridPanel(e, "Fodder " + e))
        }
        var panel = Ext.create("Ext.Panel",{
            layout: "column",
            defaults: {
                columnWidth: 1 / 6,
                layout: "anchor",
                autoHeight: true,
                defaults: {
                    anchor: "100%"
                }
            },
            items: synthesisGrid
        })
        this.add(panel);
    },
    createBottomPanel: function(){

        var checkboxgroup = Ext.create("Ext.form.CheckboxGroup", {
            cls: "selection-panel",
            columns: 1,
            autoHeight: true,
            config: {
                selection: []
            },
        
            bind: {
                selections: {
                    bindTo: '{selection}'
                }
            }
        })

        var vm = this.getViewModel();
        var controller = this.getController();

        var itemboost = Ext.create("Ext.form.field.ComboBox", {
            store: Ext.getStore("boostitem"),
            padding: "5 5 0 5",
            displayField: "id",
            forceSelection: true,
            editable: false,
            valueField: "value",
            value: "A01",
            anchor: "100%",
            width: "100%",
            disabled: false,
            listeners: {
                select: 'changeAffixAidItem'
            }
        })

        var additem = Ext.create("Ext.form.field.ComboBox", {
            store: Ext.getStore("item"),
            padding: "5 5 0 5",
            displayField: "id",
            forceSelection: true,
            editable: false,
            valueField: "code",
            value: "B01",
            anchor: "100%",
            width: "100%",
            listeners: {
                select: 'controllerChangeAddItem'
            }
        })

        var potentialboost = Ext.create("Ext.form.field.ComboBox", {
            store: Ext.getStore("boostpotential"),
            padding: "5 5 0 5",
            displayField: "id",
            forceSelection: true,
            editable: false,
            valueField: "value",
            value: "C01",
            anchor: "100%",
            width: "100%",
            disabled: false,
            listeners: {
                select: 'changePotentialBoost'
            }
        })

        checkboxgroup.relayEvents(vm.getStore('selection'), ['SelectionListChanged', 'DisabledCheckbox', 'SetValue'], 'selectionStore');
        checkboxgroup.on('selectionStoreSelectionListChanged', function (store, eOpts) {
            var me = this,
                updateItems = function () {
                    me.removeAll();
                    me.add(cfg);
                },
                cfg = [];
    
            if (!store.isStore) {
                return;
            }
    
            store.each(function (record) {
                var boxLabelHeader = '<div style="float:left;padding-left:3px;">';
                if(record.get('data').factor){
                    boxLabelHeader = '<div class="x-factor-icon" style="float:left;margin-left:2px;padding-left:16px">';
                }
                cfg.push({
                    xtype: 'checkboxfield',
                    margin: "0 5 0 5",
                    width: "100%",
                    value: record.get('selected'),
                    disabled: record.get('disable'),
                    record: record,
                    boxLabel: boxLabelHeader + record.get('data').name+ '</div>',
                    afterBoxLabelTpl: '<span style="float:right;margin-top:8px;padding-right:3px;">' + record.get('rate') + "%</span>",
                    listeners: {
                        change: function(checkbox, newValue, oldValue, eOpts ){
                            this.record.set("selected", newValue);
                            controller.updateSelectedOptions(record.get('data'), newValue);
                        },
                        render: function(){
                            this.relayEvents(vm.getStore('selection'), ['DisabledCheckbox', 'SetValue'], 'selectionStore')
                        },
                        selectionStoreDisabledCheckbox: function(){
                            this.setDisabled(record.get('disable'));
                        },
                        selectionStoreSetValue: function() {
                            this.setValue(record.get('selected'));
                        }
                    }
                });
            });
            
            updateItems();
        });

        var bottomRight = Ext.create("Ext.panel.Panel", {
            autoHeight: true,
            border: 5
        });

        bottomRight.add(Ext.create("Ext.view.View", {
            padding: 5,
            autoWidth: true,
            autoHeight: true,
            disabled: true,
            tpl: [
                '<table style="width:100%">',
                    '<tpl for=".">', 
                        '<tr id="success">', 
                            '<td style="width:50%;padding-bottom:5px">{name}</td>', 
                            '<td style="width:50%;padding-bottom:5px">{rate}%</td>', 
                        '</tr>', 
                    '</tpl>', 
                '</table>'
            ],
            itemSelector: "tr#success",
            bind: {
                store: '{result}'
            }
        }));

        bottomRight.add(itemboost)
        bottomRight.add(additem)
        bottomRight.add(potentialboost)

        bottomRight.add(Ext.create("Ext.form.Checkbox", {
            labelWidth: 120,
            padding: "5 5 -5 5",
            fieldLabel: "Same Item Bonus",
            labelAlign: 'left',
            autoEl:{
                'data-qtip': 'Bonus Multiplier if all items are the same.<br>1.1x for 2 items, 1.15x for 3 or more'
            },
            listeners: {
                change: 'changeSameItemBoost'
            }
        }))

        bottomRight.add(Ext.create("Ext.panel.Panel", {
            padding: 5,
            width: "100%",
            border: "1 1 1 0",
            bind: {
                html: "{totalRate}"
            },
            style: {
                textAlign: "right"
            },
            anchor: "100%"
        }))

        bottomRight.add(Ext.create("Ext.button.Button", {
            xtype: "button",
            text: "Details",
            width: '100%',
            listeners: {
                scope: this,
                click: function(button, event, eOpts){
                    var stats = this.getController().getStats()
                    var outputText = ""
                    for (var stat in stats){
                        if(stat == "text") continue;
                        if (0 < stats[stat]) {
                            outputText += "<div>" + pso2affixsim.Locale[stat] + '<span style="color:red;font-weight:bold">&nbsp;&nbsp;(+' + Math.abs(stats[stat]) + ")</span></div>"
                        } else {
                            outputText += "<div>" + pso2affixsim.Locale[stat] + '<span style="color:blue;font-weight:bold">&nbsp;&nbsp;(-' + stats[stat] + ")</span></div>"
                        }
                    }

                    for (var index = 0; index < stats["text"]; index++) {
                        outputText += "<div>" + stats["text"][index] + "</div>"
                    }
                    console.log(stats)
                    Ext.create("widget.window", {
                        title: "Details",
                        autoDestroy: true,
                        closable: true,
                        width: 600,
                        autoHeight: true,
                        modal: true,
                        layout: "fit",
                        bodyStyle: {
                            padding: "5px"
                        },
                        items: Ext.createWidget("tabpanel", {
                            activeTab: 0,
                            tabBar: {
                                height: 33,
                                defaults: {
                                    padding: 0
                                }
                            },
                            defaults: {
                                bodyPadding: 5
                            },
                            items: [
                                {
                                    title: "Abilities",
                                    html: outputText
                                } 
                            ]
                        })
                    }).show()
                }
            }
        }))

        var panels = [{
            xtype: "panel",
            border: 0,
            items: {
                xtype: "fieldset",
                layout: "anchor",
                title: "Select Abilities",
                autoHeight: true,
                padding: "0 0 0 0",
                margin: "0 0 0 0",
                items: [
                    checkboxgroup
                ]
            }
        }]

        panels.push(bottomRight)
        var panel = Ext.create("Ext.panel.Panel", {
            flex: 1,
            border: false,
            autoScroll: true,
            padding: "0 0 0 0",
            layout: "column",
            defaults: {
                columnWidth: 1 / 2,
                layout: "anchor",
                autoHeight: true,
                defaults: {
                    anchor: "100%"
                }
            },
            items: panels
        });
        this.add(panel);
    }
});