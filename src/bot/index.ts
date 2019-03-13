import mineflayer = require('mineflayer');

import { IBlock, IEntity, IPoint, IWindow } from './types'

import ( RulesEngine ) from '../rules';


export class MineflayerBot {

  private bot: mineflayer;
  private executiveFunction: ExecutiveFunction;
  private sensoryInputs: SensoryInputs;
  private consciousness: Consciousness;

  private brain: RulesEngine;

  constructor(botConfig: any, rulesEngine: RulesEngine) {
    this.bot = mineflayer.createBot(botConfig);
    console.log(`connected to ${config.host}`);

    this.executiveFunction = new ExecutiveFunction(this.bot, this. brain);
    this.sensoryInputs = new SensoryInputs(this.bot, this.brain);
    this.consciousness = new Consciousness(this.bot, this.brain);

  }

  public getVersion(): number {
    return this.bot.version;
  }

  public getInventory(): IWindow {
    return this.bot.inventory;
  }

  public blockAt(point: IPoint): IBlock {
    return this.bot.blockAt(point);
  }

  public canSeeBlock(block: IBlock): boolean {
    return this.bot.canSeeBlock(block);
  }

  public findBlock(options: any): IBlock[] {
    return this.bot.findBlock(options);
  }

  public canDigBlock(block: IBlock): boolean {
    return this.bot.canDigBlock(block);
  }

  public recipesFor(itemType: string, metadata: any, minResultCount: number, craftingTable: any): any[] {
    return this.bot.recipesFor(itemType, metadata, minResultCount, craftingTable);
  }

  public recipesAll(itemType: number, metadata: any, craftingTable: any) {
    return this.bot.recipesAll(itemType, metadata, craftingTable);
  }


}
