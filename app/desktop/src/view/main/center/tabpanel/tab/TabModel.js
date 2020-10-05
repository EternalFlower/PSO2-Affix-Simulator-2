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
            for(var entry = index; index <  slotCount; entry++){
                store.getAt(entry).set("slot", store.getAt(entry + 1).get("slot"))
                store.getAt(entry + 1).set("slot", null)
            }
        }

        this.updateSelectionList()
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

        var Ability_Store = Ext.getStore("AbilityList_Store")
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
                    abilityIdMap.set(slot.code, {
                        data: slot,
                        count: 1
                    })
                } else {
                    abilityIdMap.get(slot.code).count += 1
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

            if(!value.data.boost) return
            
            if (value.data.boost.tag){
                value.data.boost.tag.forEach(function(target){
                    if(!boostTagGroup.has(target)){
                        boostTagGroup.set(target, new Set())
                    } 
                    boostTagGroup.get(target).add(value.data.boost.type)
                })
            }
            
            if (value.data.boost.ability){
                value.data.boost.ability.forEach(function(target){
                    if(!boostAbility.has(target)){
                        boostAbility.set(target, new Set())
                    } 
                    boostAbility.get(target).add(value.data.boost.type)
                })
            }
        })

        console.log('hit me')

        var abilityBoost = Ext.getStore('abilityboost')

        var maxBoostFn = function (ability_data, rule){
            var finalBoost = 0
            boostTagGroup.forEach(function(value_targets, target_tag){
                if(ability_data.tag && ability_data.tag.includes(target_tag)){
                    value_targets.forEach(function(value_target){
                        var boostTypeIndex = abilityBoost.findBy(function(record, id){
                            return record.get('type') == value_target
                        })
                        if(boostTypeIndex > -1 && abilityBoost.getAt(boostTypeIndex).get(rule) != null){
                            var boost = abilityBoost.getAt(boostTypeIndex).get(rule)[ability_data.boost_class]
                            if(!ability_data.lvl || boost.length > ability_data.lvl){
                                finalBoost = Math.max(boost[ability_data.lvl ? ability_data.lvl : 0], finalBoost)
                            }
                        }
                    })
                }      
            })

            if (boostAbility.has(ability_data.code)){
                var boost_type = boostAbility.get(ability_data.code)
                boost_type.forEach(function(type){
                    var boostTypeIndex = abilityBoost.findBy(function(record, id){
                        return record.get('type') == type
                    })
                    if(boostTypeIndex > -1 && abilityBoost.getAt(boostTypeIndex).get(rule) != null){
                        var boost = abilityBoost.getAt(boostTypeIndex).get(rule)[ability_data.boost_class]
                        if(!ability_data.lvl || boost.length > ability_data.lvl){
                            finalBoost = Math.max(boost[ability_data.lvl ? ability_data.lvl : 0], finalBoost)
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
                    data: ability.getData(),
                    rate: rate,
                    disable: false,
                    selected: false
                })
            }
        }

        var substitute = Ext.getStore('substitute')
        
        // Basic Transfer
        abilityIdMap.forEach(function (value_ability_data, key_ability_code) {
            var data = value_ability_data.data
            var count = value_ability_data.count
            if(data.rate){

                if(data.require && !abilityIdMap.has(data.require)) return

                if(data.tag && data.tag.some((element) => substituteSet.has(element))){
                    count += substitute.getAt(data.boost_class).get("substitute")[data.lvl ? data.lvl : 0]
                }
                
                var rate = data.rate[Math.min(Math.max(count - 1, 0), data.rate.length - 1)]

                if (rate == 0) return

                rate = Math.min(rate + maxBoostFn(data, 'transfer'), 100)
                selectionStore.add({
                    data: data,
                    rate: rate,
                    disable: false,
                    selected: false
                })
            }
        })

        // Level Up
        abilityIdMap.forEach(function (tag_data, tag) {
            var data = tag_data.data
            var count = tag_data.count
            if(data.lvlup && count > 1){

                if (data.require && !abilityIdMap.has(data.require)) return
                
                var rate = data.generate[Math.min(Math.max(count - 2, 0), data.generate.length - 1)]
                if(rate == 0) return

                rate = Math.min(rate + maxBoostFn(data, 'create'), 100)

                var find = selectionStore.findBy(function(record, id) { 
                    return record.get("data").code == data.lvlup 
                })
                if(find != -1){
                    var found = selectionStore.getAt(find)
                    if(found.get("rate") < rate)
                        found.set("rate", rate)                      
                } else {
                    var lvlup = Ability_Store.findNode("code", data.lvlup)
                    selectionStore.add({
                        data: lvlup.data,
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
            var abilityMapCopy = new Map()

            abilityIdMap.forEach(function(value, key) {
                abilityMapCopy.set(key, {
                    data: value.data,
                    count: value.count
                })
            })

            var created = true
            var capture = new Set()

            for(var i = 0; i < materials.length; i++){
                var material = materials[i]
                var capturing = false
                if (material[0] == '(' && material[material.length - 1] == ')'){
                    capturing = true
                    material = material.substring(1, material.length - 1)
                }

                if(material[0] == '#'){ // Tag
                    created = tagPool.has(material.substring(1, material.length))
                    if(capturing){
                        var pool = tagPool.get(material.substring(1, material.length))
                        if(pool){
                            pool.forEach(value => capture.add(value))
                        }
                    }
                } else if(abilityMapCopy.get(material) != undefined && abilityMapCopy.get(material).count > 0){
                    abilityMapCopy.get(material).count = abilityMapCopy.get(material).count - 1
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
            selectionStore.add({
                data: this.addItem.data,
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
                var data = record.get('data')
                if(isNewSelect && newSelect.code != data.code && newSelect.gid == data.gid) {
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
        var abilityList = Ext.getStore("AbilityList_Store")
        this.addItem = abilityList.findNode("code", record.get("code"))
        
        this.updateSelectionList()
    },
    updateRates: function(){
        var abilityList = Ext.getStore("AbilityList_Store")
        var itemList = Ext.getStore('item')
        var upslotRates = Ext.getStore('upslotrates')
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

            rate = rate + this.itemBoost + this.potentialboost + this.campaignBoost 
            
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
