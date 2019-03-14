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


}
