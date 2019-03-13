"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mineflayer = require("mineflayer");
const botEvents = ['chat', 'whisper', 'actionBar', 'message', 'login', 'spawn', 'respawn', 'game', 'title', 'rain', 'time', 'kicked', 'end', 'spawnReset', 'death', 'health', 'move', 'forcedMove', 'mount', 'dismount', 'windowOpen', 'windowClose', 'sleep', 'wake', 'experience', 'scoreboardObjective', 'scoreboardScore', 'scoreboardDisplayObjective'];
const entityEvents = ['entitySwingArm', 'entityHurt', 'entityWake', 'entityEat', 'entityCrouch', 'entityUncrouch', 'entityEquipmentChange', 'entitySleep', 'entitySpawn', 'playerCollect', 'entityGone', 'entityMoved', 'entityDetach', 'entityAttach', 'entityUpdate', 'entityEffect', 'entityEffectEnd'];
const playerEvents = ['playerJoined', 'playerLeft'];
const blockEvents = ['blockUpdate', 'chunkColumnLoad', 'soundEffectHeard', 'hardcodedSoundEffectHeard', 'noteHeard', 'pistonMove', 'chestLidMove', 'blockBreakProgressObserved', 'blockBreakProgressEnd', 'diggingCompleted', 'diggingAborted'];
class MineflayerBot {
    constructor(config) {
        this.bot = mineflayer.createBot(config);
    }
    getVersion() {
        return this.bot.version;
    }
    getInventory() {
        return this.bot.inventory;
    }
    blockAt(point) {
        return this.bot.blockAt(point);
    }
    canSeeBlock(block) {
        return this.bot.canSeeBlock(block);
    }
    findBlock(options) {
        return this.bot.findBlock(options);
    }
    canDigBlock(block) {
        return this.bot.canDigBlock(block);
    }
    recipesFor(itemType, metadata, minResultCount, craftingTable) {
        return this.bot.recipesFor(itemType, metadata, minResultCount, craftingTable);
    }
    recipesAll(itemType, metadata, craftingTable) {
        return this.bot.recipesAll(itemType, metadata, craftingTable);
    }
    end() {
        return this.bot.end();
    }
    quit(reason) {
        this.bot.quit(reason);
    }
    chat(message) {
        this.bot.chat(message);
    }
    whisper(username, message) {
        this.bot.whisper(username, message);
    }
    chatAddPattern(pattern, chatType, description) {
        this.bot.chatAddPattern(pattern, chatType, description);
    }
    setSettings(options) {
        this.bot.setSettings(options);
    }
    loadPlugin(plugin) {
        this.bot.loadPlugin(plugin);
    }
    loadPlugins(plugins) {
        this.bot.loadPlugins(plugins);
    }
    sleep(bedBlock) {
        return new Promise((resolve, reject) => {
            try {
                this.bot.sleep(bedBlock, () => resolve());
            }
            catch (err) {
                reject(err);
            }
        });
    }
    wake() {
        return new Promise((resolve, reject) => {
            try {
                this.bot.wake(() => resolve());
            }
            catch (err) {
                reject(err);
            }
        });
    }
    setControlState(control, state) {
        this.bot.setControlState(control, state);
    }
    clearControlStates() {
        this.bot.clearControlStates();
    }
    lookAt(point, force) {
        return new Promise((resolve, reject) => {
            try {
                this.bot.lookAt(point, force, () => resolve());
            }
            catch (err) {
                reject(err);
            }
        });
    }
    look(yaw, pitch, force) {
        return new Promise((resolve, reject) => {
            try {
                this.bot.look(yaw, pitch, force, () => resolve());
            }
            catch (err) {
                reject(err);
            }
        });
    }
    updateSign(block, text) {
        this.bot.updateSign(block, text);
    }
    equip(item, destination) {
        return new Promise((resolve, reject) => {
            try {
                this.bot.equip(item, destination, () => resolve());
            }
            catch (err) {
                reject(err);
            }
        });
    }
    unequip(destination) {
        return new Promise((resolve, reject) => {
            try {
                this.bot.unequip(destination, () => resolve());
            }
            catch (err) {
                reject(err);
            }
            ;
        });
    }
    tossStack(item) {
        return new Promise((resolve, reject) => {
            try {
                this.bot.tossStack(item, () => resolve());
            }
            catch (err) {
                reject(err);
            }
            ;
        });
    }
    toss(item, metadata, count) {
        return new Promise((resolve, reject) => {
            try {
                this.bot.tossStack(item, () => resolve());
            }
            catch (err) {
                reject(err);
            }
            ;
        });
    }
    dig(block) {
        return new Promise((resolve, reject) => {
            try {
                this.bot.dig(block, () => resolve());
            }
            catch (err) {
                reject(err);
            }
            ;
        });
    }
    stopDigging() {
        this.bot.stopDigging();
    }
    digTime(block) {
        this.bot.digTime(block);
    }
    ;
    placeBlock(referenceBlock, faceVector) {
        return new Promise((resolve, reject) => {
            try {
                this.bot.placeBlock(referenceBlock, faceVector, () => resolve());
            }
            catch (err) {
                reject(err);
            }
        });
    }
    activateBlock(block) {
        return new Promise((resolve, reject) => {
            try {
                this.bot.activateBlock(block, () => resolve());
            }
            catch (err) {
                reject(err);
            }
        });
    }
    activateEntity(entity) {
        return new Promise((resolve, reject) => {
            try {
                this.bot.activateEntity(entity, () => resolve());
            }
            catch (err) {
                reject(err);
            }
        });
    }
    activateItem() {
        this.bot.activateItem();
    }
    deactivateItem() {
        this.bot.deactivateItem();
    }
    useOn(targetEntity) {
        this.bot.useOn(targetEntity);
    }
    attack(entity) {
        this.bot.attack(entity);
    }
    mount(entity) {
        this.bot.mount(entity);
    }
    dismount() {
        this.bot.dismount();
    }
    moveVehicle(left, forward) {
        this.bot.moveVehicle(left, forward);
    }
    setQuickBarSlot(slot) {
        this.bot.setQuickBarSlot(slot);
    }
    craft(recipe, count, craftingTable) {
        return new Promise((resolve, reject) => {
            try {
                this.bot.craft(recipe, count, craftingTable, () => resolve());
            }
            catch (err) {
                reject(err);
            }
        });
    }
    writeBook(slot, pages, craftingTable) {
        return new Promise((resolve, reject) => {
            try {
                this.bot.writeBook(slot, pages, craftingTable, () => resolve());
            }
            catch (err) {
                reject(err);
            }
        });
    }
    openChest(chest) {
        this.bot.openChest(chest);
    }
    openFurnace(furnaceBlock) {
        this.bot.openFurnace(furnaceBlock);
    }
    openDispenser(dispenserBlock) {
        this.bot.openDispenser(dispenserBlock);
    }
    openEnchantmentTable(enchantmentTableBlock) {
        this.bot.openEnchantmentTable(enchantmentTableBlock);
    }
    openVillager(villagerEntity) {
        this.bot.openVillager(villagerEntity);
    }
    trade(villagerInstance, tradeIndex, times) {
        return new Promise((resolve, reject) => {
            try {
                this.bot.trade(villagerInstance, tradeIndex, times, () => resolve());
            }
            catch (err) {
                reject(err);
            }
        });
    }
    setCommandBlock(pos, command, track_output) {
        this.bot.setCommandBlock(pos, command, track_output);
    }
    // Lower level inventory methods
    clickWindow(slot, mouseButton, mode) {
        return new Promise((resolve, reject) => {
            try {
                this.bot.clickWindow(slot, mouseButton, mode, () => resolve());
            }
            catch (err) {
                reject(err);
            }
        });
    }
    putSelectedItemRange(start, end, window, slot) {
        return new Promise((resolve, reject) => {
            try {
                this.bot.putSelectedItemRange(start, end, window, slot, () => resolve());
            }
            catch (err) {
                reject(err);
            }
        });
    }
    putAway(slot) {
        return new Promise((resolve, reject) => {
            try {
                this.bot.putAway(slot, () => resolve());
            }
            catch (err) {
                reject(err);
            }
        });
    }
    closeWindow(window) {
        this.bot.closeWindow(window);
    }
    transfer(options) {
        return new Promise((resolve, reject) => {
            try {
                this.bot.transfer(options, () => resolve());
            }
            catch (err) {
                reject(err);
            }
        });
    }
}
exports.MineflayerBot = MineflayerBot;
