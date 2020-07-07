/**
 * This class is the view model for the Main view of the application.
 */

Ext.define("PSO2.Slot", {
    extend: "Ext.data.Model",
    fields: ["id", "name", "slot"]
});

Ext.define('pso2affixsim.view.main.tabpanel.tab.TabModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.tabviewmodel',

    const_MaxFodder: 6,
    const_MaxSlot: 9,
    const_emptyText: "&nbsp",

    itemBoost: 0,
    potentialboost: 0,
    campaignBoost: 0,
    sameItemBonus: false,
    groupBoost: {
        type: null,
        boost: 0
    },
    data: {
        title: "Synthesis Panel",
        panels: [],
        totalRate: "&nbsp",
        itemEnabled: false
    },
    stores: {
        selection: {
            sorters: [
                {
                    sorterFn: function(record1, record2) {
                        return record1.get("data").code.localeCompare(record2.get("data").code)
                    },
                    direction: 'ASC'
                }
            ]
        },
        result: {
            fields: [
            {
                name: "name",
                type: "string"
            },
            {
                name: "rate",
                type: "number"
            },
            {
                name: "baserate",
                type: "number"
            },
            {
                name: "gid",
                type: "string"
            }]
        }
    },
    constructor: function(){
        this.callParent(arguments);
        this.item = Ext.getStore('item');

        for(var i = 0; i < this.const_MaxFodder; i++){
            this.createPanelStore();
        }
    },
    createPanelStore: function(){
        var constBaseSlot = [];
        for(var count = 1; count <= this.const_MaxSlot; count++){
            constBaseSlot.push({
                id: "slot" + count,
                name: "Slot " + count,
                slot: null
            });
        }
        var store = Ext.create("Ext.data.Store", {
            model: "PSO2.Slot",
            data: constBaseSlot,
            getAbilityCount: function(){
                var len = this.getCount();
                var count = 0;
                for(; count < len; count++){
                    if(this.getAt(count).get("slot") == null) break;
                }
                return count;
            },
            isUsed: function(){
                return this.getAbilityCount() != 0;
            }
        })
        this.get('panels').push(store);
    },
    rename: function(name){
        this.setData( {"title":name} )
    },
    addAbility:function(fodder, data){
        var store = this.get("panels")[fodder];
        var index, slot, slotCount = store.getCount();
        for (index = 0; index < slotCount; index++) {
            slot = store.getAt(index).get("slot");

            if (slot == null) break

            if (slot.code == data.code) return true;
            if (slot.gid == data.gid) break;
        }

        if(slotCount <= index) return false;
        
        store.getAt(index).set("slot", data);
        this.updateSelectionList();
    },
    removeAbility:function(tableIndex, index){
        var store = this.get('panels')[tableIndex];
        var slotCount = store.getAbilityCount();
        if(index == slotCount - 1){
            store.getAt(index).set("slot", null)
        } else {
            for(var entry = index; index <  slotCount; entry++){
                store.getAt(entry).set("slot", store.getAt(entry + 1).get("slot"));
                store.getAt(entry + 1).set("slot", null);
            }
        }
        this.updateSelectionList();
    },
    swapAbility: function(fodder, indexDrag, indexDrop){
        var store = this.get("panels")[fodder];
        var slotCount = store.getAbilityCount();
        
        if(indexDrag == indexDrop) return false;

        var slot, count = 0;
        while(count < slotCount && (slot = store.getAt(count).get("slot")) != null){
            count++;
        }
        if(count < indexDrop) {
            indexDrop = count - 1;
        }

        slot = store.getAt(indexDrag).get("slot");
        store.getAt(indexDrag).set("slot", store.getAt(indexDrop).get("slot"));
        store.getAt(indexDrop).set("slot", slot);
        this.updateSelectionList();
    },
    suspendUpdateViewSelectionList: function(){
        var selectionStore = this.getStore("selection");
        selectionStore.suspendEvents()
        selectionStore.removeAll()
    },
    updateViewSelectionList: function(){
        var selectionStore = this.getStore("selection");
        selectionStore.resumeEvents();
        selectionStore.fireEvent("SelectionListChanged", this.getStore("selection"));
        this.maximumAbilitySelectedCheck();
    },
    updateSelectionList: function(){
        var abilityMap = new Map();
        this.set("totalRate", this.const_emptyText)

        var abilityList = Ext.getStore("abilityList");
        var selectionStore = this.getStore("selection");
        var baseCount = this.get("panels")[0].getAbilityCount()

        this.getStore("result").removeAll()

        this.suspendUpdateViewSelectionList();

        for(var i = 0; i < this.const_MaxFodder; i++){
            var panel = this.get("panels")[i];
            var abilityCount = panel.getAbilityCount();
            if(abilityCount != 0 && abilityCount < baseCount){
                this.updateViewSelectionList();
                return;
            }
            for(var j = 0; j < abilityCount; j++){
                var slot = panel.getAt(j).get("slot");
                if(slot == null) break;
                if(!abilityMap.has(slot.code)){
                    abilityMap.set(slot.code, {
                        data: slot,
                        count: 1
                    })
                } else {
                    abilityMap.get(slot.code).count += 1;
                }
            }
        }

        var boostTarget = new Map();

        abilityMap.forEach(function(value, key){
            if(value.data.boost ==  null){
                return;
            } 
            var targets = value.data.boost.target
            
            targets.forEach(function(target){
                if(!boostTarget.has(target)){
                    boostTarget.set(target, new Set())
                } 
                boostTarget.get(target).add(value.data.boost.type)
            })
        })
        console.log('hit me')

        var abilityBoost = Ext.getStore('abilityboost');

        var maxBoostFn = function (data, key_ability_code, rule){
            var boost = 0;
            boostTarget.forEach(function(value_targets, key_target_code){
                if(key_target_code == key_ability_code.substr(0, key_target_code.length)){
                    value_targets.forEach(function(value_target){
                        var boostTypeIndex = abilityBoost.findBy(function(record, id){
                            return record.get('type') == value_target
                        })
                        if(boostTypeIndex > -1 && abilityBoost.getAt(boostTypeIndex).get(rule) != null){
                            boost = Math.max(abilityBoost.getAt(boostTypeIndex).get(rule)[data.receipt][data.lvl ? data.lvl : 0], boost)
                        }
                    })
                }
            })
            return boost;
        }
        
        // Basic Transfer
        abilityMap.forEach(function (value_ability_data, key_ability_code) {
            var data = value_ability_data.data;
            var count = value_ability_data.count;
            if(data.rate){
                var rate = data.rate[Math.min(Math.max(count - 1, 0), data.rate.length - 1)];
                var boost = maxBoostFn(data, key_ability_code, 'transfer');

                rate += boost;
                
                if(rate){
                    selectionStore.add({
                        data: data,
                        rate: rate,
                        disable: false,
                        selected: false
                    })
                } 
            }
        })

        // Level Up
        abilityMap.forEach(function (value_ability_data, key_ability_code) {
            var data = value_ability_data.data;
            var count = value_ability_data.count;
            if(data.lvlup && count > 1){
                var rate = data.generate[Math.min(Math.max(count - 2, 0), data.generate.length - 1)];

                var boost = maxBoostFn(data, key_ability_code, 'create');

                rate += boost;

                if(rate){
                    var find = selectionStore.findBy(function(record, id) { 
                        return record.get("data").code == data.lvlup 
                    })
                    if(find != -1){
                        var found = selectionStore.getAt(find)
                        if(found.get("rate") < rate)
                            found.set("rate", rate)                      
                    } else {
                        var lvlup = abilityList.findNode("code", data.lvlup)
                        selectionStore.add({
                            data: lvlup.data,
                            rate: rate,
                            disable: false,
                            selected: false
                        })
                    }
                }      
            }
        }, this)

        var synthesisList = Ext.getStore("synthesis");
        
        synthesisList.each(function(record){
            var recipe = record.get("recipe");
            var created = true;
            var capture = [];
            for(var item in recipe){
                if(recipe[item] == "*"){
                    /*var codeList = Array.from(abilityMap.keys())
                    var result = codeList.filter(function(element){
                        return element.substring(0, item.length) == item
                    })*/
                } else if (Number.isInteger(recipe[item])){
                    if(abilityMap.get(item) == undefined || recipe[item] > abilityMap.get(item).count){
                        created = false;
                        break;
                    }
                }
            }
            if(created){
                if(record.get("result") != '*'){
                    var synthesis = abilityList.findNode("code", record.get("result"))
                    selectionStore.add({
                        data: synthesis.data,
                        rate: record.get("success"),
                        disable: false,
                        selected: false
                    });
                } /*else if(capture.length){
                    for(var i = 0; i < capture.length; i++){
                        selectionStore.add({
                            data: synthesis.data,
                            rate: record.get("success"),
                            disable: false,
                            selected: false
                        });
                    } 
                } */
            }
        });
        
        this.updateViewSelectionList();
    },
    updateSelectedOptions: function(){
       
        var result = this.getStore("result");
        var selectionList = this.getStore("selection");
        result.removeAll();
        selectionList.each(function(record){
            if(record.get("selected")){
                result.add({
                    name: record.get("data").name, 
                    baserate: record.get("rate"), 
                    rate: record.get("rate"), 
                    gid: record.get("data").gid
                });
            }
        })
        this.maximumAbilitySelectedCheck();
        this.updateRates();
    },
    maximumAbilitySelectedCheck: function(){
        var maxed = this.get("panels")[0].getAbilityCount() + 1 == this.getStore("result").getCount();
        this.getStore("selection").each(function(record){
            if(!record.get("selected")){
                record.set("disable", maxed);
            }
        })
        var itemExists = this.getStore("result").findRecord("gid", "item");
        this.set("itemEnabled", !itemExists && maxed)
        this.getStore("selection").fireEvent("DisabledChanged", this.getStore("selection"))
    },
    changeItemSelected: function(record){
        var removed = this.getStore("result").findRecord("gid", "item");
        if(removed){
            var index = this.getStore("result").find("name", removed.get("name"), 0, false, false, true);
            if(index != -1) this.getStore("result").removeAt(index)
        }

        if(record && record.get("name")){
            this.getStore("result").add({
                name: record.get("name"), 
                baserate: record.get("rate"), 
                rate: record.get("rate"), 
                gid: "item"
            });
        }
        this.maximumAbilitySelectedCheck();
        this.updateRates();
    },
    updateRates: function(){
        var abilityList = Ext.getStore("abilityList");
        var itemList = Ext.getStore('item');
        var upslotRates = Ext.getStore('upslotrates');
        var isUpslotting = this.get("panels")[0].getAbilityCount() + 1 == this.getStore("result").getCount();
        var sameItemMultiplier = 1;
        var materialUsed = 0;
        var upslotMuliplier = 100;

        for(var i = 1; i < this.const_MaxFodder; i++){
            if(this.get("panels")[i].getAbilityCount() != 0) {
                materialUsed += 1;
            }
        }

        if(this.sameItemBonus){
            if(materialUsed >= 2){
                sameItemMultiplier = 1.15;
            } else if (materialUsed >= 1){
                sameItemMultiplier = 1.1;
            } else {
                sameItemMultiplier = 1;
            }
        }

        if(isUpslotting) {
            upslotMuliplier = upslotRates.getAt(this.get("panels")[0].getAbilityCount()).get(materialUsed >= 2);
        }

        var totalRate = 100;
        this.getStore("result").each(function(record){
            var rate = record.get("baserate");
            // To Deal with Floating Point precision
            rate = rate * 100 * sameItemMultiplier / 100;
            if(isUpslotting) {
                rate = upslotMuliplier * rate / 100;
            }
            
            rate = rate + this.itemBoost + this.campaignBoost + this.potentialboost;
            if(record.get("gid") == "item"){
                var item = itemList.findRecord("name", record.get("name"));
                if(item && item.get("type") == this.groupBoost.type){
                    rate = rate + this.groupBoost.boost;
                }
            } else if(abilityList.findNode("name", record.get("name")).get("type") == this.groupBoost.type){
                rate = rate + this.groupBoost.boost;
            }

            rate = Math.min(100,rate);
            record.set("rate", rate)
            totalRate = totalRate * rate;
        }, this)
        if(this.getStore("result").getCount() == 0) this.set("totalRate", this.const_emptyText)
        else this.set("totalRate", totalRate / Math.pow(100, this.getStore("result").getCount()) + "%")
    },
    changeItemBoost: function(boost){
        this.itemBoost = boost;
        this.updateRates();
    },
    changeCampaignBoost: function(boost){
        this.campaignBoost = boost;
        this.updateRates();
    },
    changeGroupTypeBoost: function(group){
        this.groupBoost.type = group;
        this.updateRates();
    },
    changeGroupValueBoost: function(boost){
        this.groupBoost.boost = boost;
        this.updateRates();
    },
    changePotentialBoost: function(boost){
        this.potentialboost = boost;
        this.updateRates();
    },
    changeSameItemBonus: function(value){
        this.sameItemBonus = value;
        this.updateRates();
    }
});
