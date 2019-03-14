import mineflayer = require('mineflayer');

import { IBlock, IEntity, IPoint, IWindow } from './types'

import { RulesEngine } from '../rules';

/*
 * Represents sensory inputs(events) that get fed into the rules RulesEngine.  Game events are wired into the rules engine as sensory inputs
 */
export class SensoryInputs {

  private bot: any;
  private brain: RulesEngine;


  private botEvents: any = {

    'chat': (username: string, message: any, translate: any, jsonMsg: any, matches: any) => this.brain.postData('chat', 'event', {username, message, translate, jsonMsg, matches}),
    'whisper':  (username: string, message: string, translate: any, jsonMsg: any, matches: any) => this.brain.postData('whisper', 'event', {username, message, translate, jsonMsg, matches}),
    'actionBar': (jsonMsg: any): any => this.brain.postData('actionBar', 'event', {jsonMsg}),
    'message': (jsonMsg: any): any => this.brain.postData('message', 'event', {jsonMsg}),
    'login': () => this.brain.postData('login', 'event', {}),
    'spawn': () => this.brain.postData('spawn', 'event', { }),
    'respawn': () => this.brain.postData('respawn', 'event', { }),
    'game': () => this.brain.postData('game', 'event', { }),
    'title': () => this.brain.postData('title', 'event', { }),
    'rain': () => this.brain.postData('rain', 'event', { }),
    'time': () => this.brain.postData('time', 'event', { }),
    'kicked': (reason: string, loggedIn: boolean) => this.brain.postData('kicked', 'event', { reason, loggedIn }),
    'end': () => this.brain.postData('end', 'event', { }),
    'spawnReset': () => this.brain.postData('spawnReset', 'event', { }),
    'death': () => this.brain.postData('death', 'event', { }),
    'health': () => this.brain.postData('health', 'event', { }),
    'move': () => this.brain.postData('move', 'event', { }),
    'forcedMove': () => this.brain.postData('forcedMove', 'event', { }),
    'mount': () => this.brain.postData('mount', 'event', { }),
    'dismount': (vehicle: any) => this.brain.postData('dismount', 'event', { }),
    'windowOpen': (window: IWindow) => this.brain.postData('windowOpen', 'event', { }),
    'windowClose': (window: IWindow) => this.brain.postData('windowClose', 'event', { }),
    'sleep': () => this.brain.postData('sleep', 'event', { }),
    'wake': () => this.brain.postData('wake', 'event', { }),
    'experience': () => this.brain.postData('experience', 'event', { }),
    'scoreboardObjective': (scoreboardName: any, displayText: string) => this.brain.postData('scoreboardObjective', 'event', { scoreboardName, displayText}),
    'scoreboardScore': (scoreboardName: any, itemName: any, value: any) => this.brain.postData('scoreboardScore', 'event', { scoreboardName, itemName, value}),
    'scoreboardDisplayObjective': (scoreboardName: any, position: number) => this.brain.postData('scoreboardDisplayObjective', 'event', {scoreboardName, position }),
    'soundEffectHeard': (soundName: string, position: IPoint, volume: number, pitch: number) => this.brain.postData('soundEffectHeard', 'event', {soundName, position, volume, pitch}),
    'hardcodedSoundEffectHeard':  (soundId: number, soundCategory: any, position: IPoint, volume: number, pitch: number) => this.brain.postData('hardcodedSoundEffectHeard', 'event', {soundId, soundCategory, position, volume, pitch}),
    'noteHeard': (block: IBlock, instrument: any, pitch: number) => this.brain.postData('noteHeard', 'event', {block, instrument, pitch}),

  };

  private entityEvents: any = {
    'entitySwingArm': (entity: IEntity) =>  this.brain.postData('entitySwingArm', 'event', {entity }),
    'entityHurt': (entity: IEntity) =>  this.brain.postData('entityHurt', 'event', {entity }),
    'entityWake': (entity: IEntity) =>  this.brain.postData('entityWake', 'event', {entity }),
    'entityEat': (entity: IEntity) =>  this.brain.postData('entityEat', 'event', {entity }),
    'entityCrouch': (entity: IEntity) =>  this.brain.postData('entityCrouch', 'event', {entity }),
    'entityUncrouch': (entity: IEntity) =>  this.brain.postData('entityUncrouch', 'event', {entity }),
    'entityEquipmentChange': (entity: IEntity) =>  this.brain.postData('entityEquipmentChange', 'event', {entity }),
    'entitySleep': (entity: IEntity) =>  this.brain.postData('entitySleep', 'event', {entity }),
    'entitySpawn': (entity: IEntity) =>  this.brain.postData('entitySpawn', 'event', {entity }),
    'entityGone': (entity: IEntity) =>  this.brain.postData('entityGone', 'event', {entity }),
    'entityMoved': (entity: IEntity) =>  this.brain.postData('entityMoved', 'event', {entity }),
    'entityDetach': (entity: IEntity) =>  this.brain.postData('entityDetach', 'event', {entity }),
    'entityAttach': (entity: IEntity) =>  this.brain.postData('entityAttach', 'event', {entity }),
    'entityUpdate': (entity: IEntity) =>  this.brain.postData('entityUpdate', 'event', {entity}),
    'entityEffect': (entity: IEntity, effect: any) =>  this.brain.postData('entityEffect', 'event', {entity }),
    'entityEffectEnd': (entity: IEntity, effect: any) =>  this.brain.postData('entityEffectEnd', 'event', {entity }),
  };

  private playerEvents: any = {
    'playerJoined': (player: IEntity) =>  this.brain.postData('playerCollect', 'event', {player}),
    'playerLeft': (player: IEntity) =>  this.brain.postData('playerCollect', 'event', {player}),
    'playerCollect': (collector: IEntity, collected: any) =>  this.brain.postData('playerCollect', 'event', {collector, collected}),
  };

  private blockEvents: any = {
    'blockUpdate': (oldBlock: IBlock, newBlock: IBlock) => this.brain.postData('blockUpdate', 'event', {oldBlock, newBlock}),
    'chunkColumnLoad': (point: IPoint) =>  this.brain.postData('chunkColumnLoad', 'event', {point}),
    'chunkColumnUnload': (point: IPoint) =>  this.brain.postData('chunkColumnLoad', 'event', {point}),
    'pistonMove': (block: IBlock, isPulling: boolean, direction: number) => this.brain.postData('pistonMove', 'event', {block, isPulling, direction}),
    'chestLidMove': (block: IBlock, isOpen: boolean) => this.brain.postData('chestLidMove', 'event', {block, isOpen}),
    'blockBreakProgressObserved': (block: IBlock, isOpen: boolean) => this.brain.postData('blockBreakProgressObserved', 'event', {block, isOpen}),
    'blockBreakProgressEnd': (block: IBlock) => this.brain.postData('blockBreakProgressEnd', 'event', {block}),
    'diggingCompleted': (block: IBlock) => this.brain.postData('diggingCompleted', 'event', {block} ),
    'diggingAborted': (block: IBlock) => this.brain.postData('diggingAborted', 'event', {block}),
  };

  constructor(mineflayerApi: any, rulesEngine: RulesEngine) {
    this.bot = mineflayerApi;
    this.brain = rulesEngine;
    this.enableEvents();
  }
  /*
   * wires up event listeners - All events are sent to the
   * brain for processing.
   */
  private enableEvents() {
    for (const eventName of Object.keys(this.botEvents)) {
      this.bot.on(eventName, this.botEvents[eventName]);
    }

  }

  public observeEntity(entity: IEntity) {
    for (const eventName of Object.keys(this.entityEvents)) {
      entity.on(eventName, this.entityEvents[eventName]);
    }
  }

  public observeBlock(block: IBlock) {
    for (const eventName of Object.keys(this.blockEvents)) {
      block.on(eventName, this.blockEvents[eventName]);
    }
  }


}
