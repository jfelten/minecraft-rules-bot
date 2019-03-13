"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VilagersAction {
    constructor() {
        this.ruleSetName = 'trade';
    }
    getActions() {
        return [
            VilagersAction.showVillagers,
            VilagersAction.showInventory,
            VilagersAction.hasResources,
        ];
    }
    static showVillagers(bot) {
        console.log('showing villagers');
        // const villagers = Object.keys(bot.entities).map(id => bot.entities[id]).filter(e => e.entityType === 120)
        // const closeVillagersId = villagers.filter(e => bot.entity.position.distanceTo(e.position) < 3).map(e => e.id)
        // bot.chat(`found ${villagers.length} villagers`)
        // bot.chat(`villager(s) you can trade with: ${closeVillagersId.join(', ')}`)
    }
    static showInventory(bot) {
        const mcdata = require('minecraft-data')(bot.getVersion());
        bot.getInventory().slots
            .filter((item) => item).forEach((item) => {
            bot.chat(VilagersAction.stringifyItem(item, mcdata));
        });
    }
    static hasResources(window, trade, count) {
        const first = enough(trade.firstInput, count);
        const second = !trade.hasSecondItem || enough(trade.secondaryInput, count);
        return first && second;
        function enough(item, count) {
            return window.count(item.type, item.metadata) >= item.count * count;
        }
    }
    static stringifyTrades(trades, mcdata) {
        return trades.map((trade) => {
            let text = VilagersAction.stringifyItem(trade.firstInput, mcdata);
            if (trade.secondaryInput)
                text += ` & ${VilagersAction.stringifyItem(trade.secondaryInput, mcdata)}`;
            if (trade.disabled)
                text += ' x ';
            else
                text += ' » ';
            text += VilagersAction.stringifyItem(trade.output, mcdata);
            return `(${trade.tooluses}/${trade.maxTradeuses}) ${text}`;
        });
    }
    static stringifyItem(item, mcdata) {
        if (!item)
            return 'nothing';
        let text = `${item.count} ${item.displayName}`;
        if (item.nbt && item.nbt.value) {
            const ench = item.nbt.value.ench;
            const StoredEnchantments = item.nbt.value.StoredEnchantments;
            const Potion = item.nbt.value.Potion;
            const display = item.nbt.value.display;
            if (Potion)
                text += ` of ${Potion.value.replace(/_/g, ' ').split(':')[1] || 'unknow type'}`;
            if (display)
                text += ` named ${display.value.Name.value}`;
            if (ench || StoredEnchantments) {
                text += ` enchanted with ${(ench || StoredEnchantments).value.value.map((e) => {
                    const lvl = e.lvl.value;
                    const id = e.id.value;
                    return mcdata.enchantments[id].displayName + ' ' + lvl;
                }).join(' ')}`;
            }
        }
        return text;
    }
}
exports.VilagersAction = VilagersAction;
