"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./bot");
const rules_1 = require("./rules");
const bot = new bot_1.MineflayerBot({
    host: "keyporttech.com",
    port: 25565,
    username: "diggerBot2000",
    // password: "12345678",          // online-mode=true servers
    verbose: true
});
const rulesEngine = new rules_1.RulesEngine(bot);
rulesEngine.start();
