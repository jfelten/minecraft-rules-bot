import * as mineflayer from 'mineflayer';

import { IBlock, IEntity, IPoint, IWindow } from './types'

import {Vec3} from 'vec3';

import { RulesEngine } from '../rules';

/*
 * Represents awareness of game state.  Monitors blocks in field of vision. state of all blocks and entities in the bot's field of vision
 */
export class Consciousness {

  private cycleInterval: number = 10000; //ms

  private awarenessRange: number = 2;
  private bot: any;
  private brain: RulesEngine;

  constructor(mf: any, brain: RulesEngine, awarenessRange?: number) {
    this.bot = mf;
    this.brain = brain;
    if (awarenessRange) {
      this.awarenessRange = awarenessRange;
    }

    setInterval( () => {
      if (this.bot.entity && this.bot.entity.position) {
        const currentState = this.scan();
        this.brain.postData('consciousness', 'fact', currentState);
      } else {
        console.log(this.bot);
      }

    }, this.cycleInterval);
  }

  /**
   * gets all blocks and entities within a certain radius of the bot.
   */
  public scan(): IBlock[][][] {

    const location: any = this.bot.entity.position;

    const blockData: IBlock[][][] = new Array();
    //scan block area

    const startingX: number  = location.x-this.awarenessRange;
    const startingY: number = location.y-this.awarenessRange;
    const startingZ: number = location.z-this.awarenessRange;
    const endingX: number  = location.x+this.awarenessRange;
    const endingY: number = location.y+this.awarenessRange;
    const endingZ: number = location.z+this.awarenessRange;


    let xIndex: number = 0;
    let yIndex: number = 0;
    let zIndex: number = 0;
    for (let xPos = startingX; xPos <= endingX; xPos++) {
      blockData[xIndex] = new Array();
      yIndex = 0;
      for (let yPos = startingY; yPos <= endingY; yPos++) {
        blockData[xIndex][yIndex] = new Array();
        zIndex = 0;
        for (let zPos= startingZ; zPos<= endingZ; zPos++) {
            const blockCoord = new Vec3(xPos, yPos, zPos);
            const block: IBlock = this.bot.blockAt(blockCoord);
            blockData[xIndex][yIndex][zIndex] = block;
            zIndex++;
        }
        yIndex++
      }
      xIndex++;
    }

    return blockData;
  }


}
