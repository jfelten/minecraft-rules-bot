import { MineflayerBot } from '../bot';
export interface IRule {
    load(durable: any): void;
    eventName: string;
}
export interface IActionSet {
    getActions(): Function[];
    ruleSetName: string;
}
export declare class RulesEngine {
    private botEventRules;
    private actionsRules;
    private bot;
    private durable;
    constructor(mineflayerBot: MineflayerBot);
    private loadRules;
    loadAllRules(): void;
    start(): void;
    private loadRule;
    private loadActions;
}
