"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class RulesEngine {
    constructor(mineflayerBot) {
        this.botEventRules = ['./bot-events'];
        this.actionsRules = ['./actions'];
        this.durable = require('durable');
        this.bot = mineflayerBot;
    }
    loadRules(directory) {
        const dirItems = fs.readdirSync(directory, 'utf8');
        for (const item of dirItems) {
            if (fs.lstatSync(item).isDirectory()) {
                console.log(item);
                const actions = require('./${item}/actions');
                const rule = require('./${item}/rules');
                this.loadRule(this.bot, this.durable, rule);
            }
        }
    }
    loadAllRules() {
        for (const dir of this.botEventRules) {
            this.loadRules(dir);
        }
        for (const dir of this.actionsRules) {
            this.loadRules(dir);
        }
    }
    start() {
        this.loadAllRules();
        this.durable.runAll();
    }
    loadRule(bot, durable, rule) {
        rule.load(durable);
        // bot.on(rule.eventName, function(username, message) {
        //   if (username === bot.username) return;
        //   fireRule(rule.eventName, 'event', {event: rule.eventName, username, message});
        //   getFact(rule.eventName, 'event', data,)
        // });
    }
    loadActions(action) {
    }
}
exports.RulesEngine = RulesEngine;
function fireRule(eventName, type, data) {
    var request = require('request');
    console.log('posting to rules engine');
    return request.post(`http://localhost:5000/${type}`, { json: data }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    });
}
function getFact(eventName, type) {
    var request = require('request');
    console.log('posting to rules engine');
    return request.get(`http://localhost:5000/${eventName}/${type}`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    });
}
