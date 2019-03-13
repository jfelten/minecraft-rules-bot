import mineflayer = require('mineflayer');

import { IBlock, IEntity, IPoint, IWindow } from './types';

import ( RulesEngine ) from '../rules';

/*
 * Represents base actions a bot can do
 */
export class ActionLoader {

  private bot: mineflayer;
  private brain: rulesEngine;

  constructor(mineFlayerApi: mineflayer, rulesEngine: RulesEngine) {
    this.bot = mineflayerApi;
    this.brain = RulesEngine;
  }

  public loadActionSet(action: IActionSet) {

  }

  private loadActions(directory: string) {
    console.log(process.cwd());
    const dirItems = fs.readdirSync(directory, 'utf8');
    for (const item of dirItems) {
      const itemFullPath = `${process.cwd()}/${directory}/${item}`;
      if (fs.lstatSync(itemFullPath).isDirectory()) {
        console.log(item)
        const actions = require(`${itemFullPath}/actions`);
        this.loadActionSet(actions);
      }


    }
  }

}
