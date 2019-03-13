import { IActionSet } from '../../'
import { MineflayerBot } from '../../../bot';


export class GuardAction implements IActionSet {

  public ruleSetName: string = 'guard';
  public getActions(): Function[] {
    return [
      GuardAction.goToMaster,
    ];
  }

  public static goToMaster(bot: MineflayerBot) {

    console.log('naivigating to master');
    // const villagers = Object.keys(bot.entities).map(id => bot.entities[id]).filter(e => e.entityType === 120)
    // const closeVillagersId = villagers.filter(e => bot.entity.position.distanceTo(e.position) < 3).map(e => e.id)
    // bot.chat(`found ${villagers.length} villagers`)
    // bot.chat(`villager(s) you can trade with: ${closeVillagersId.join(', ')}`)
  }

  public static showInventory (bot: MineflayerBot) {
    const mcdata = require('minecraft-data')(bot.getVersion( ));
    bot.getInventory().slots
      .filter((item: any) => item).forEach((item: any) => {
        bot.chat(VilagersAction.stringifyItem(item, mcdata))
      })
  }

  public static hasResources (window: any, trade: any, count: number): boolean {
    const first = enough(trade.firstInput, count)
    const second = !trade.hasSecondItem || enough(trade.secondaryInput, count)
    return first && second;

    function enough (item: any, count: number): boolean {
      return window.count(item.type, item.metadata) >= item.count * count
    }
  }

  private static stringifyTrades (trades: any[], mcdata: any): string[] {
    return trades.map((trade) => {
      let text = VilagersAction.stringifyItem(trade.firstInput, mcdata);
      if (trade.secondaryInput) text += ` & ${VilagersAction.stringifyItem(trade.secondaryInput, mcdata)}`
      if (trade.disabled) text += ' x '; else text += ' » '
      text += VilagersAction.stringifyItem(trade.output, mcdata)
      return `(${trade.tooluses}/${trade.maxTradeuses}) ${text}`
    })
  }

  private static stringifyItem (item: any, mcdata: any): string {
    if (!item) return 'nothing'
    let text = `${item.count} ${item.displayName}`
    if (item.nbt && item.nbt.value) {
      const ench = item.nbt.value.ench
      const StoredEnchantments = item.nbt.value.StoredEnchantments
      const Potion = item.nbt.value.Potion
      const display = item.nbt.value.display

      if (Potion) text += ` of ${Potion.value.replace(/_/g, ' ').split(':')[1] || 'unknow type'}`
      if (display) text += ` named ${display.value.Name.value}`
      if (ench || StoredEnchantments) {
        text += ` enchanted with ${(ench || StoredEnchantments).value.value.map((e: any) => {
          const lvl = e.lvl.value
          const id = e.id.value
          return mcdata.enchantments[id].displayName + ' ' + lvl
        }).join(' ')}`
      }
    }
    return text;
  }
}
