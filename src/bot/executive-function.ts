import mineflayer = require('mineflayer');

import { IBlock, IEntity, IPoint, IWindow } from './types';

import { RulesEngine } from '../rules';

/*
 * Represents base actions a bot can do
 */
export class ExecutiveFunction {

  private bot: any;
  private brain: RulesEngine;

  constructor(mineflayerApi: any, rulesEngine: RulesEngine) {
    this.bot = mineflayerApi;
    this.brain = rulesEngine;
  }

  public end() {
    return this.bot.end();
  }

  public quit(reason: any) {
    this.bot.quit(reason);
  }

  public chat(message: string) {
    this.bot.chat(message);
  }

  public whisper(username: string, message: string) {
    this.bot.whisper(username, message);
  }

  public chatAddPattern(pattern: any, chatType: number, description: string) {
    this.bot.chatAddPattern(pattern, chatType, description);
  }

  public setSettings(options: any) {
    this.bot.setSettings(options);
  }

  public loadPlugin(plugin: any) {
    this.bot.loadPlugin(plugin);
  }

   public loadPlugins(plugins: any[]) {
     this.bot.loadPlugins(plugins);
   }

   public sleep(bedBlock: IBlock): Promise<any> {
     return new Promise((resolve: Function, reject: Function) => {
        try {
          this.bot.sleep(bedBlock, () => resolve());
        } catch (err) {reject(err);}
      });
   }

   public wake(): Promise<any> {
     return new Promise((resolve: Function, reject: Function) => {
        try {
          this.bot.wake(() => resolve());
        } catch (err) {reject(err);}
      });
   }

   public setControlState(control: any, state: any) {
     this.bot.setControlState(control, state)
   }

   public clearControlStates() {
     this.bot.clearControlStates();
   }

   public lookAt(point: IPoint, force?: boolean): Promise<any> {
     return new Promise((resolve: Function, reject: Function) => {
        try {
          this.bot.lookAt(point, force, () => resolve());
        } catch (err) {reject(err);}
      });
   }

   public look(yaw: number, pitch: number, force?: boolean): Promise<any> {
     return new Promise((resolve: Function, reject: Function) => {
        try {
          this.bot.look(yaw, pitch, force, () => resolve());
        } catch (err) {reject(err);}
      });
   }

   public updateSign(block: IBlock, text: string) {
     this.bot.updateSign(block, text);
   }

   public equip(item: any, destination: any): Promise<any> {
     return new Promise((resolve, reject) => {
        try {
          this.bot.equip(item, destination, () => resolve());
        } catch (err) {reject(err);}
      });
   }

   public unequip(destination: any): Promise<any> {
     return new Promise((resolve: Function, reject: Function) => {
        try {
          this.bot.unequip(destination, () => resolve());
        } catch (err) {reject(err);};
      });
   }

   public tossStack(item: any): Promise<any> {
     return new Promise((resolve, reject) => {
        try {
          this.bot.tossStack(item, () => resolve());
        } catch (err) {reject(err);};
      });
   }

   public toss(item: any, metadata: any, count: number): Promise<any> {
     return new Promise((resolve: Function, reject: Function) => {
        try {
          this.bot.tossStack(item, () => resolve());
        } catch (err) {reject(err); };
      });
   }

   public dig(block: IBlock): Promise<any> {
     return new Promise((resolve: Function, reject: Function) => {
        try {
          this.bot.dig(block, () => resolve());
        } catch (err) {reject(err); };
      });
   }

   public stopDigging() {
     this.bot.stopDigging();
   }

   public digTime(block: IBlock) {
     this.bot.digTime(block)
   };

   public placeBlock(referenceBlock: IBlock, faceVector: any): Promise<any> {
     return new Promise((resolve: Function, reject: Function) => {
        try {
        this.bot.placeBlock(referenceBlock, faceVector, () => resolve());
        } catch (err) {reject(err);}
      });
   }

   public activateBlock(block: IBlock): Promise<any> {
     return new Promise((resolve: Function, reject: Function) => {
        try {
          this.bot.activateBlock(block, () => resolve());
        } catch (err) {reject(err);}
      });
   }

   public activateEntity(entity: IEntity): Promise<any> {
     return new Promise((resolve: Function, reject: Function) => {
        try {
          this.bot.activateEntity(entity, () => resolve());
        } catch (err) {reject(err);}
      });
   }

   public activateItem() {
     this.bot.activateItem();
   }

   public deactivateItem() {
     this.bot.deactivateItem();
   }

   public useOn(targetEntity: IEntity) {
     this.bot.useOn(targetEntity);
   }

   public attack(entity: IEntity) {
     this.bot.attack(entity);
   }

   public mount(entity: IEntity) {
     this.bot.mount(entity);
   }

   public dismount() {
     this.bot.dismount();
   }

   public moveVehicle(left: number,forward: number) {
     this.bot.moveVehicle(left,forward);
   }

   public setQuickBarSlot(slot: number) {
     this.bot.setQuickBarSlot(slot);
   }

   public craft(recipe: any, count: number, craftingTable: any): Promise<any> {
     return new Promise((resolve: Function, reject: Function) => {
        try {
          this.bot.craft(recipe, count, craftingTable, () => resolve());
        } catch (err) {reject(err);}
      });
   }

   public writeBook(slot: number, pages: any, craftingTable: any): Promise<any> {
     return new Promise((resolve: Function, reject: Function) => {
        try {
          this.bot.writeBook(slot, pages, craftingTable, () => resolve());
        } catch (err) {reject(err);}
      });
   }

   public openChest(chest: any) {
     this.bot.openChest(chest);
   }

   public openFurnace(furnaceBlock: IBlock) {
     this.bot.openFurnace(furnaceBlock)
   }

   public openDispenser(dispenserBlock: IBlock) {
     this.bot.openDispenser(dispenserBlock);
   }

   public openEnchantmentTable(enchantmentTableBlock: IBlock) {
     this.bot.openEnchantmentTable(enchantmentTableBlock);
   }

   public openVillager(villagerEntity: IEntity) {
     this.bot.openVillager(villagerEntity);
   }

   public trade(villagerInstance: any, tradeIndex: number, times?: number): Promise<any> {
     return new Promise((resolve: Function, reject: Function) => {
        try {
          this.bot.trade(villagerInstance, tradeIndex, times, () => resolve());
        } catch (err) {reject(err);}
      });

   }

   public setCommandBlock(pos: any, command: string, track_output: any) {
     this.bot.setCommandBlock(pos, command, track_output);
   }


  // Lower level inventory methods
  public clickWindow(slot: number, mouseButton: any, mode: any): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
       try {
         this.bot.clickWindow(slot, mouseButton, mode, () => resolve());
       } catch (err) {reject(err);}
     });
  }

  public putSelectedItemRange(start: number, end: number, window: any, slot: number): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
       try {
         this.bot.putSelectedItemRange(start, end, window, slot, () => resolve());
       } catch (err) {reject(err);}
     });
  }

  public putAway(slot: number): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
       try {
         this.bot.putAway(slot, () => resolve());
       } catch (err) {reject(err);}
     });
  }

  public closeWindow(window: IWindow) {
    this.bot.closeWindow(window);
  }

  public transfer(options: any): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
       try {
         this.bot.transfer(options, () => resolve());
       } catch (err) {reject(err); }
     });
  }


  // this.bot.openBlock(block, Class)
  // this.bot.openEntity(entity, Class)
  // this.bot.moveSlotItem(sourceSlot, destSlot, cb)
  // this.bot.updateHeldItem()
  // this.bot.creative
  // this.bot.creative.setInventorySlot(slot, item)
  // this.bot.creative.flyTo(destination, [cb])
  // this.bot.creative.startFlying()
  // this.bot.creative.stopFlying()
}
