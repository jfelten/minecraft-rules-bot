
import fs = require('fs');

import * as request from 'request';

import { MineflayerBot } from '../bot'

export interface IRule {
  load(durable: any): void;
  eventName: string;
}

export interface IActionSet {
  getActions(): Function[];
  ruleSetName: string;
}

export interface IRuleSet {

}

export class RulesEngine {

  private host: string = 'localhost';
  private port: number = 5000;

  private botEventRules: string[] = ['src/rules/bot-events'];
  private actionsRules: string[] = ['src/rules/actions'];

  private bot: MineflayerBot;
  private durable: any = require('durable');

  constructor(mineflayerBot: MineflayerBot) {
    this.bot = mineflayerBot;
  }

  private loadRules(directory: string) {
    console.log(process.cwd());
    const dirItems = fs.readdirSync(directory, 'utf8');
    for (const item of dirItems) {
      const itemFullPath = `${process.cwd()}/${directory}/${item}`;
      if (fs.lstatSync(itemFullPath).isDirectory()) {
        console.log(item)
        const actions = require(`${itemFullPath}/actions`);
        const rule = require(`${itemFullPath}/rules`);
        this.loadRule(this.bot, this.durable, rule);
      }


    }
  }

  public loadAllRules() {
    for (const dir of this.botEventRules) {
      this.loadRules(dir);
    }

    for (const dir of this.actionsRules) {
      this.loadRules(dir);
    }
  }

  public start() {
    this.loadAllRules();
    this.durable.runAll();
  }

  public postData(eventName: string, type: string, data: any): Promise<any> {
      var request = require('request');
      console.log('posting to rules engine')
      return request.post(
          `http://${this.host}:${this.port}/${eventName}/${type}`,
          { json: data },
          function (error: Error, response: any, body: any) {
              if (!error && response.statusCode == 200) {
                  console.log(body)
              }
          }
      );

    }

  public getData(eventName: string, type: string): Promise<any> {
      var request = require('request');
      console.log('posting to rules engine')
      return request.get(
          `http://${this.host}:${this.port}/${eventName}/${type}`,
          function (error: Error, response: any, body: any) {
              if (!error && response.statusCode == 200) {
                  console.log(body)
              }
          }
      );
  }
  private loadRule(bot: MineflayerBot, durable: any, rule: IRule) {
    rule.load(durable);
    // bot.on(rule.eventName, function(username, message) {
    //   if (username === bot.username) return;
    //   fireRule(rule.eventName, 'event', {event: rule.eventName, username, message});
    //   getFact(rule.eventName, 'event', data,)
    // });
  }


  private loadActions(action: IActionSet) {

  }


}
