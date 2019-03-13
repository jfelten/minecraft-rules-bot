import { MineflayerBot } from './bot'


import { RulesEngine } from './rules'

const bot = new MineflayerBot({
  host: "localhost", // optional
  port: 25565,       // optional
  username: "MyBotName", // email and password are required only for
  // password: "12345678",          // online-mode=true servers
  verbose: true
});

const brain = new RulesEngine(bot);
brain.start();
