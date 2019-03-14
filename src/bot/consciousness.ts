import mineflayer = require('mineflayer');

import { IBlock, IEntity, IPoint, IWindow } from './types'

import { RulesEngine } from '../rules';

import fs = require('fs');

/*
 * Represents awareness of game state.  Monitors blocks in field of vision. state of all blocks and entities in the bot's field of vision
 */
export class Consciousness {

  private cycleInterval: number = 1000; //ms

  private unit: IPoint[] = [
    new mineflayer.Point(-1,  0,  0),
    new mineflayer.Point( 1,  0,  0),
    new mineflayer.Point( 0,  1,  0),
    new mineflayer.Point( 0, -1,  0),
    new mineflayer.Point( 0,  0,  1),
    new mineflayer.Point( 0,  0, -1),
  ];

  private zeroed: IPoint[] = [
        new mineflayer.Point(0, 1, 1),
        new mineflayer.Point(0, 1, 1),
        new mineflayer.Point(1, 0, 1),
        new mineflayer.Point(1, 0, 1),
        new mineflayer.Point(1, 1, 0),
        new mineflayer.Point(1, 1, 0),
  ];
  private awarenessRange: number = 16;
  private bot: any;
  private brain: RulesEngine;

  constructor(mf: any, brain: RulesEngine, awarenessRange?: number) {
    this.bot = mf;
    this.brain = brain;
    if (awarenessRange) {
      this.awarenessRange = awarenessRange;
    }

    setInterval( () => {
      const currentState = this.scan();
      this.brain.postData('consciousness', 'fact', currentState);

    }, this.cycleInterval);
  }

  /**
   * gets all blocks and entities within a certain radius of the bot.
   */
  public scan(): IBlock[][][] {

    const entities: IEntity[] = this.bot.entities();
    const point: IPoint = this.bot.entity.position();

    const blockData: IBlock[][][] = new Array();
    //scan block area
    for (let apothem = 1; apothem <= this.awarenessRange; apothem++) {
        for (let side = 0; side < 6; side++) {
            const max = this.zeroed[side].scaled(2 * apothem);
            if (max.y > 127) {
                max.y = 127;
            } else if (max.y < 0) {
                max.y = 0;
            }
            const pt: any = {};
            for (pt.x = 0; pt.x <= max.x; pt.x++) {
                for (pt.y = 0; pt.y <= max.y; pt.y++) {
                    for (pt.z = 0; pt.z <= max.z; pt.z++) {
                        var offset = pt.minus(max.scaled(0.5).floored()).plus(this.unit[side].scaled(apothem));
                        var abs_coords = point.plus(offset);
                        const block: IBlock = mineflayer.blockAt(abs_coords);
                        blockData[pt.x][pt.y][pt.z] = block;
                    }
                }
            }
        }
    }

    return blockData;
  }


}
