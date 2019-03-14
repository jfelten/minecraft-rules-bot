import mineflayer = require('mineflayer');

import { IBlock, IEntity, IPoint, IWindow } from './types';

import { IActionSet, RulesEngine } from '../rules';

import fs = require('fs');

/*
 * Represents base actions a bot can do
 */
export class ActionLoader {

  private bot: any;
  private brain: RulesEngine;

  constructor(mineflayerApi: any, rulesEngine: RulesEngine) {
    this.bot = mineflayerApi;
    this.brain = rulesEngine;
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
