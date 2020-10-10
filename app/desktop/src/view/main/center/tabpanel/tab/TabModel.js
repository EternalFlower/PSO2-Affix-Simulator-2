Ext.define("PSO2.Slot", {
    extend: "Ext.data.Model",
    fields: ["id", "name", "slot"]
})

Ext.define('pso2affixsim.view.main.tabpanel.tab.TabModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.tabviewmodel',

    const_MaxFodder: 6,
    const_MaxSlot: 9,
    const_emptyText: "&nbsp",

    addItem: null,
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
                        return record1.get("data").get("code").localeCompare(record2.get("data").get("code"))
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
        this.callParent(arguments)

        for(var i = 0; i < this.const_MaxFodder; i++){
            this.createPanelStore()
        }
    },
    createPanelStore: function(){
        var constBaseSlot = []
        for(var count = 1; count <= this.const_MaxSlot; count++){
            constBaseSlot.push({
                id: "slot" + count,
                name: "Slot " + count,
                slot: null
            })
        }
        var store = Ext.create("Ext.data.Store", {
            model: "PSO2.Slot",
            data: constBaseSlot,
            getAbilityCount: function(){
                var len = this.getCount()
                var count = 0
                for(; count < len; count++){
                    if(this.getAt(count).get("slot") == null) break
                }
                return count
            },
            isUsed: function(){
                return this.getAbilityCount() != 0
            }
        })
        this.get('panels').push(store)
    },
    renameTab: function(name){
        this.setData({
            "title": name
        })
    },
    addAbility:function(fodder, data){
        var store = this.get("panels")[fodder]
        var index, slot, slotCount = store.getCount()
        for (index = 0; index < slotCount; index++) {
            slot = store.getAt(index).get("slot")

            if (slot == null) break
            if (slot.gid == null || data.gid == null) continue
            if (slot.code == data.code) return true
            if (slot.gid == data.gid) break
        }

        if(slotCount <= index) return false
        
        store.getAt(index).set("slot", data)
        this.updateSelectionList()
    },
    removeAbility:function(tableIndex, index){
        var store = this.get('panels')[tableIndex]
        var slotCount = store.getAbilityCount()

        if(index == slotCount - 1){
            store.getAt(index).set("slot", null)
        } else {
            for(var entry = index; entry <  slotCount; entry++){
                store.getAt(entry).set("slot", store.getAt(entry + 1).get("slot"))
                store.getAt(entry + 1).set("slot", null)
            }
        }

        this.updateSelectionList()
    },
    fillJunk: function(tableIndex, index){
        var Ability_Store = Ext.getStore("Ability_Store")
        var panel = this.get('panels')[tableIndex]

        for(var i = 0; i <= index; i++){
            var filler = 1
            var data = panel.getAt(i).get("slot")

            if(data == null){
                for(var j = 1; j <= 9; j++){
                    var junkCode = "ZA0" + String(filler)
                    var exist = panel.findBy(function(record){
                        return record.get("slot") != null && record.get("slot").code == junkCode
                    })
                    if(exist == -1){
                        var junk = Ability_Store.findNode("code", junkCode)
                        panel.getAt(i).set("slot", junk.getData())
                        break
                    }
                    filler += 1
                }
            }
        }
        
        this.updateSelectionList()
    },
    makeTabValid: function(){
        var base = this.get('panels')[0]
        var requireCount = base.getAbilityCount() - 1
        if (requireCount < 0) return
        for(var i = 1; i < 6; i++){
            if(this.get('panels')[i].getAbilityCount() == 0) continue
            this.fillJunk(i, requireCount)
        }
    },
    makeFactor:function(tableIndex, index, isFactor){
        var store = this.get('panels')[tableIndex]
        var data = store.getAt(index).get("slot")

        var node
        if (isFactor == true) {
            node = Ext.applyIf({
                source: data,
                factor: true,
                rate: [100],
                generate: null
            }, data)
            node.code = "*" + data.code
        } else {
            node = data.source
            delete data
        }

        store.getAt(index).set("slot", node)

        this.updateSelectionList()
    },
    swapAbility: function(fodder, indexDrag, indexDrop){
        var store = this.get("panels")[fodder]
        var slotCount = store.getAbilityCount()
        
        if(indexDrag == indexDrop) return false

        var slot, count = 0
        while(count < slotCount && (slot = store.getAt(count).get("slot")) != null){
            count++
        }
        if(count < indexDrop) {
            indexDrop = count - 1
        }

        slot = store.getAt(indexDrag).get("slot")
        store.getAt(indexDrag).set("slot", store.getAt(indexDrop).get("slot"))
        store.getAt(indexDrop).set("slot", slot)

        this.updateSelectionList()
    },
    suspendUpdateViewSelectionList: function(){
        var selectionStore = this.getStore("selection")
        selectionStore.suspendEvents()
        selectionStore.removeAll()
    },
    updateViewSelectionList: function(){
        var selectionStore = this.getStore("selection")
        selectionStore.resumeEvents()
        selectionStore.fireEvent("SelectionListChanged", this.getStore("selection"))
        this.maximumAbilitySelectedCheck()
    },
    updateSelectionList: function(){
        
        this.set("totalRate", this.const_emptyText)

        var Ability_Store = Ext.getStore("Ability_Store")
        var selectionStore = this.getStore("selection")
        
        this.getStore("result").removeAll()

        this.suspendUpdateViewSelectionList()

        var minAbilityCount = this.get("panels")[0].getAbilityCount()

        var abilityIdMap = new Map()
        var tagPool = new Map()
        var substituteSet = new Set()
        

        for(var i = 0; i < this.const_MaxFodder; i++){

            var fodder = this.get("panels")[i]
            var numAbiFodderCount = fodder.getAbilityCount()

            if(numAbiFodderCount != 0 && numAbiFodderCount < minAbilityCount){
                this.updateViewSelectionList()
                return
            }

            for(var j = 0; j < numAbiFodderCount; j++){

                var slot = fodder.getAt(j).get("slot")

                if(slot == null) break

                if(!abilityIdMap.has(slot.code)){
                    abilityIdMap.set(slot.code, 1)
                } else {
                    abilityIdMap.set(slot.code, abilityIdMap.get(slot.code) + 1)
                }

                if(slot.tag){
                    for(var index in slot.tag){
                        if(!tagPool.has(slot.tag[index])){
                            tagPool.set(slot.tag[index], new Set())
                        }
                        tagPool.get(slot.tag[index]).add(slot)
                    }
                }

                if(slot.substitute){
                    slot.substitute.forEach((element) => substituteSet.add(element))
                }
            }
        }

        var boostTagGroup = new Map()
        var boostAbility = new Map()

        abilityIdMap.forEach(function(value, key){

            var ability = Ability_Store.findNode("code", key)

            if(key[0] == '*') return

            if(!ability.get('boost')) return
            
            if (ability.get('boost').tag){
                ability.get('boost').tag.forEach(function(target){
                    if(!boostTagGroup.has(target)){
                        boostTagGroup.set(target, new Set())
                    } 
                    boostTagGroup.get(target).add(ability.get('boost').type)
                })
            }
            
            if (ability.get('boost').ability){
                ability.get('boost').ability.forEach(function(target){
                    if(!boostAbility.has(target)){
                        boostAbility.set(target, new Set())
                    } 
                    boostAbility.get(target).add(ability.get('boost').type)
                })
            }
        })

        var abilityBoost = Ext.getStore('AbilityBoost_Store')

        var maxBoostFn = function (ability, rule){
            var finalBoost = 0
            boostTagGroup.forEach(function(value_targets, target_tag){
                if(ability.get('tag') && ability.get('tag').includes(target_tag)){
                    value_targets.forEach(function(value_target){
                        var boostTypeIndex = abilityBoost.findBy(function(record, id){
                            return record.get('type') == value_target
                        })
                        if(boostTypeIndex > -1 && abilityBoost.getAt(boostTypeIndex).get(rule) != null){
                            var boost = abilityBoost.getAt(boostTypeIndex).get(rule)[ability.get('boost_class')]
                            if(!ability.get('lvl') || boost.length > ability.get('lvl')){
                                finalBoost = Math.max(boost[ability.get('lvl') ? ability.get('lvl') : 0], finalBoost)
                            }
                        }
                    })
                }      
            })

            if (boostAbility.has(ability.get('code'))){
                var boost_type = boostAbility.get(ability.get('code'))
                boost_type.forEach(function(type){
                    var boostTypeIndex = abilityBoost.findBy(function(record, id){
                        return record.get('type') == type
                    })
                    if(boostTypeIndex > -1 && abilityBoost.getAt(boostTypeIndex).get(rule) != null){
                        var boost = abilityBoost.getAt(boostTypeIndex).get(rule)[ability.get('boost_class')]
                        if(!ability.get('lvl') || boost.length > ability.get('lvl')){
                            finalBoost = Math.max(boost[ability.get('lvl') ? ability.get('lvl') : 0], finalBoost)
                        }
                    }
                })
                
            }

            return finalBoost
        }

        var replaceIfExists = function (ability, rate){
            var previousEntry = selectionStore.getAt(selectionStore.findBy(function(record, id){
                return record.get("data").code == ability.get('code')
            }))

            if(previousEntry){
                previousEntry.set("rate", previousEntry.get("rate") > rate ? previousEntry.get("rate") : rate)
            } else {
                selectionStore.add({
                    data: ability,
                    rate: rate,
                    disable: false,
                    selected: false
                })
            }
        }

        var substitute = Ext.getStore("Substitute_Store")
        
        // Basic Transfer
        abilityIdMap.forEach(function (count, key) {
            var isSAF = key[0] == '*'
            var ability = Ability_Store.findNode("code", isSAF ? key.substring(1, key.length) : key)
            if(ability && isSAF){
                selectionStore.add({
                    data: ability,
                    factor: isSAF,
                    rate: 100,
                    disable: false,
                    selected: false
                })
            } else if(ability.get('rate')){

                if(ability.get('require') && !abilityIdMap.has(ability.get('require'))) return

                if(ability.get('tag') && ability.get('tag').some((element) => substituteSet.has(element))){
                    count += substitute.getAt(ability.get('boost_class')).get("substitute")[ability.get('lvl') ? ability.get('lvl') : 0]
                }
                
                var rate = ability.get('rate')[Math.min(Math.max(count - 1, 0), ability.get('rate').length - 1)]

                if (rate == 0) return

                rate = Math.min(rate + maxBoostFn(ability, 'transfer'), 100)
                selectionStore.add({
                    data: ability,
                    rate: rate,
                    disable: false,
                    selected: false
                })
            }
        })

        // Level Up
        abilityIdMap.forEach(function (count, key) {
            if (key[0] == '*') return

            var ability = Ability_Store.findNode("code", key)

            if(ability.get('lvlup') && count > 1){

                if (ability.get('require') && !abilityIdMap.has(ability.get('require'))) return
                
                var rate = ability.get('generate')[Math.min(Math.max(count - 2, 0), ability.get('generate').length - 1)]
                if(rate == 0) return

                rate = Math.min(rate + maxBoostFn(ability, 'create'), 100)

                var find = selectionStore.findBy(function(record, id) { 
                    return record.get("data").code == ability.get('lvlup') 
                })
                if(find != -1){
                    var found = selectionStore.getAt(find)
                    if(found.get("rate") < rate)
                        found.set("rate", rate)                      
                } else {
                    var lvlup = Ability_Store.findNode("code", ability.get('lvlup'))
                    selectionStore.add({
                        data: lvlup,
                        rate: rate,
                        disable: false,
                        selected: false
                    })
                }     
            }
        }, this)

        var synthesisList = Ext.getStore("Synthesis_Store")
        
        synthesisList.each(function(record){
            var materials = record.get("recipe")
            var abilityMapCopy = new Map(abilityIdMap)

            var created = true
            var capture = new Set()

            for(var i = 0; i < materials.length; i++){
                var material = materials[i]
                var capturing = false
                if (material[0] == '(' && material[material.length - 1] == ')'){
                    capturing = true
                    material = material.substring(1, material.length - 1)
                }

                if(material[0] == '#' && tagPool.has(material.substring(1, material.length))){ // Tag
                    if(capturing){
                        var pool = tagPool.get(material.substring(1, material.length))
                        if(pool){
                            pool.forEach(value => capture.add(value))
                        }
                    }
                } else if(abilityMapCopy.get(material) != undefined && abilityMapCopy.get(material) > 0){
                    abilityMapCopy.set(material, abilityMapCopy.get(material) - 1)
                    if(capturing){
                        capture.add(material)
                    }
                } else {
                    created = false
                    break
                }
            }

            if(created){
                var results = record.get("result")
                for(var i = 0; i < results.length; i++){
                    if(results[i] == "$$"){
                        capture.forEach(currentValue => {
                            var synthesis = Ability_Store.findNode("code", currentValue.code)
                            replaceIfExists(synthesis, record.get("success"))
                        })
                    } else {
                        var synthesis = Ability_Store.findNode("code", results[i])
                        replaceIfExists(synthesis, record.get("success"))
                    }
                }
            }
        })

        if (this.addItem){
            var ability = Ability_Store.findNode("code", this.addItem.get("code"))
            selectionStore.add({
                data: ability,
                rate: this.addItem.get("rate"),
                disable: false,
                selected: false
            })
        } 
        this.updateViewSelectionList()
    },
    updateSelectedOptions: function(newSelect, isNewSelect){
        var result = this.getStore("result")
        var selectionList = this.getStore("selection")
        result.removeAll()

        selectionList.each(function(record){
            if(record.get("selected")){
                var data = record.get('data').data
                if(isNewSelect && newSelect.get('code') != data.code && newSelect.get('gid') != null && newSelect.get('gid') == data.gid) {
                    record.set("selected", false)
                    
                } else {
                    result.add({
                        name: data.name, 
                        baserate: record.get("rate"), 
                        rate: record.get("rate"), 
                        stats: data.stats,
                        gid: data.gid
                    })
                }
                
            }
        })

        selectionList.fireEvent("SetValue", selectionList)
        this.maximumAbilitySelectedCheck()
        this.updateRates()
    },
    maximumAbilitySelectedCheck: function(){
        var maxed = this.get("panels")[0].getAbilityCount() + 1 == this.getStore("result").getCount()
        this.getStore("selection").each(function(record){
            if(!record.get("selected")){
                record.set("disable", maxed)
            }
        })
        
        this.getStore("selection").fireEvent("DisabledCheckbox", this.getStore("selection"))
    },
    changeItemSelected: function(record){
        this.addItem = record
        this.updateSelectionList()
    },
    updateRates: function(){
        var abilityList = Ext.getStore("Ability_Store")
        var itemList = Ext.getStore("Item_Store")
        var upslotRates = Ext.getStore("Upslot_Store")
        var isUpslotting = this.get("panels")[0].getAbilityCount() + 1 == this.getStore("result").getCount()
        var sameItemMultiplier = 1
        var materialUsed = 0
        var upslotMuliplier = 100

        for(var i = 1; i < this.const_MaxFodder; i++){
            if(this.get("panels")[i].getAbilityCount() != 0) {
                materialUsed += 1
            }
        }

        if(this.sameItemBonus){
            if(materialUsed >= 2){
                sameItemMultiplier = 1.15
            } else if (materialUsed >= 1){
                sameItemMultiplier = 1.1
            } else {
                sameItemMultiplier = 1
            }
        }

        if(isUpslotting) {
            upslotMuliplier = upslotRates.getAt(this.get("panels")[0].getAbilityCount()).get(materialUsed >= 2)
        }

        var totalRate = 100
        this.getStore("result").each(function(record){
            var rate = record.get("baserate")

            if(record.get("gid") == "item"){
                var item = itemList.findRecord("name", record.get("name"))
                if(item && item.get("type") == this.groupBoost.type){
                    rate = rate + this.groupBoost.boost
                }
            } else if(abilityList.findNode("name", record.get("name")).get("type") == this.groupBoost.type){
                rate = rate + this.groupBoost.boost
            }

            rate = Math.floor(rate * sameItemMultiplier)
            if(!record.get("noEx")){
                rate = rate * upslotMuliplier / 100
            }

            rate = Math.floor(rate + this.itemBoost + this.potentialboost + this.campaignBoost)
            
            rate = Math.min(100, rate)
            record.set("rate", rate)
            totalRate = totalRate * rate

        }, this)
        if(this.getStore("result").getCount() == 0) this.set("totalRate", this.const_emptyText)
        else this.set("totalRate", totalRate / Math.pow(100, this.getStore("result").getCount()) + "%")
    },
    getResultStats: function(){
        var totalStats = {}
        this.getStore("result").each(function(record){
            var stats = record.get("stats")
            var all = ["satk", "ratk", "tatk", "sdef", "rdef", "tdef"]
            var all_res = ["s_res", "r_res", "t_res", "fire_res", "ice_res", "ltn_res", "wind_res", "light_res", "dark_res"]
            for(var x in stats){
                if(x == "all") {
                    for(var y in all){
                        if(totalStats[all[y]] == null) {
                            totalStats[all[y]] = []
                        }
                    }
                } else if(x == "all_res") {
                    for(var y in all_res){
                        if(totalStats[all_res[y]] == null) {
                            totalStats[all_res[y]] = []
                        }
                    }
                } else if(totalStats[x] == null){
                    if(x == "text"){
                        totalStats[x] = []
                    } else {
                        totalStats[x] = 0
                    }
                }

                if (x == "text"){
                    totalStats[x].push(stats[x])
                } else if(x == "all"){
                    for(var y in all){
                        totalStats[all[y]] += stats[x]
                    }
                } else if(x == "all_res"){
                    for(var y in all_res){
                        totalStats[all_res[y]] += stats[x]
                    }
                } else {
                    totalStats[x] += stats[x]
                }
                
            }
        }, this)
        return totalStats
    },
    changeItemBoost: function(boost){
        this.itemBoost = boost
        this.updateRates()
    },
    changeCampaignBoost: function(boost){
        this.campaignBoost = boost
        this.updateRates()
    },
    changeGroupTypeBoost: function(group){
        this.groupBoost.type = group
        this.updateRates()
    },
    changeGroupValueBoost: function(boost){
        this.groupBoost.boost = boost
        this.updateRates()
    },
    changePotentialBoost: function(boost){
        this.potentialboost = boost
        this.updateRates()
    },
    changeSameItemBonus: function(value){
        this.sameItemBonus = value
        this.updateRates()
    }
})
