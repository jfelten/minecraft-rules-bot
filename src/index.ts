import mineflayer = require('mineflayer');

import { MineflayerBot } from './bot'
import { RulesEngine } from './rules'


const brain = new RulesEngine();
brain.loadAllRules();
brain.start();


const mf = mineflayer.createBot({
  host: "keyporttech.com", // optional
  port: 25565,       // optional
  username: "diggerBot2000", // email and password are required only for
  // password: "12345678",          // online-mode=true servers
  verbose: true
});

const bot: MineflayerBot = new MineflayerBot(mf, brain);
