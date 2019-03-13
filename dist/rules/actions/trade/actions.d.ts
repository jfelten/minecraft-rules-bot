import { IActionSet } from '../../';
import { MineflayerBot } from '../../../bot';
export declare class VilagersAction implements IActionSet {
    ruleSetName: string;
    getActions(): Function[];
    static showVillagers(bot: MineflayerBot): void;
    static showInventory(bot: MineflayerBot): void;
    static hasResources(window: any, trade: any, count: number): boolean;
    private static stringifyTrades;
    private static stringifyItem;
}
