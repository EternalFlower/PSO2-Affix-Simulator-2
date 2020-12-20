Ext.define('pso2affixsim.view.main.MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewcontroller',
    requires: ['Ext.ux.Mediator'],

    initViewModel: function(vm) {},
    campaignBoostChangeEvent: function(field, newValue, oldValue, opts) {
        Ext.ux.Mediator.fireEvent('campaignChange', newValue);
    },
    groupTypeBoostChangeEvent: function(field, newValue, oldValue, opts) {
        Ext.ux.Mediator.fireEvent('groupTypeChange', newValue);
    },
    groupvalueBoostChangeEvent: function(field, newValue, oldValue, opts) {
        Ext.ux.Mediator.fireEvent('groupValueChange', newValue);
    },
    changeBaseColor: function(field, color, previousColor, eOpts) {
        if (previousColor != null) {
            var storage = Ext.util.LocalStorage.get("affixsim");
            if (storage) {
                storage.setItem("base-color", color)
            }
            Fashion.css.setVariables({
                "base-color": '#' + color,
                "dark-mode": this.getViewModel().get('dark_mode').toString()
            });
        }
    },
    changeDarkMode: function(checkbox, newValue, oldValue, eOpts) {
        this.getViewModel().set('dark_mode', newValue);
        var storage = Ext.util.LocalStorage.get('affixsim');
        if (storage) {
            storage.setItem("dark-mode", newValue)
        }
        Fashion.css.setVariables({
            "base-color": '#' + this.getViewModel().get('color'),
            "dark-mode": newValue.toString()
        });
    },
    changeServer: function(field, newValue, oldValue, eOpts) {
        if (oldValue != null) {
            var storage = Ext.util.LocalStorage.get("affixsim");
            if (storage) {
                storage.setItem("server", newValue)
            }
        }
    },
    changeLanguage: function(field, newValue, oldValue, eOpts) {
        if (oldValue != null) {
            var storage = Ext.util.LocalStorage.get("affixsim");
            if (storage) {
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
        if (tab != null) tab.makeTabValid()
    },
    renameActiveTab: function() {
        var tabPanel = this.lookupReference('tabpanel'),
            tab = tabPanel.getActiveTab(tab)
        if (tab != null) {
            return Ext.Msg.prompt("Rename Panel", "Rename current panel.<br/>Input a name?", function(okButton, textfield) {
                if (okButton == "ok") {
                    tab.rename(textfield)
                }
            })
        }
    },
    loadExistingPlan: function() {
        var tabPanel = this.lookupReference('tabpanel')
        var win = Ext.create("widget.window", {
            title: "Load Plan",
            autoDestroy: true,
            closable: true,
            width: 600,
            autoHeight: true,
            modal: true,
            layout: "fit",
            margin: "10 10 10 10",
            bodyStyle: {
                padding: "10px"
            },
            items: [{
                xtype: 'textfield',
                name: 'code',
                fieldLabel: 'Code:'
            }],
            dockedItems: [{
                xtype: "toolbar",
                ui: "footer",
                dock: "bottom",
                items: [{
                        xtype: "label",
                        name: "error",
                        readOnly: true,
                        textAlign: "right",
                        html: "&nbsp",
                        bodyStyle: {
                            "float": "hidden"
                        }
                    }, "->",
                    Ext.create("Ext.button.Button", {
                        text: "Load",
                        handler: function() {
                            var json, code = win.down('textfield[name=code]').getValue().trim()
                            try {
                                if (!code) throw "Invalid"
                                json = JSON.parse(LZString.decompressFromEncodedURIComponent(code))
                            } catch (e) {
                                win.down('label[name=error]').setHtml('<div style="color:red">Invalid code</div>')
                                return
                            }
                            var tab = tabPanel.add({
                                xtype: "tabview"
                            });
                            tab.loadTabData(json)
                            tabPanel.setActiveTab(tab);
                        },
                        minWidth: 64
                    }), Ext.create("Ext.button.Button", {
                        text: "Close",
                        handler: function() {
                            win.hide()
                        },
                        minWidth: 64
                    })
                ]
            }]
        }).show()
    },
    getActiveTabData: function() {
        var tabPanel = this.lookupReference('tabpanel'),
            tab = tabPanel.getActiveTab(tab)
        console.log(tab.getTabData())
    },
    onHeaderViewDetailToggle: function() {
        var vm = this.getViewModel();
        vm.set('detailCollapsed', !vm.get('detailCollapsed'));
    }
});