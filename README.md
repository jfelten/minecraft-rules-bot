## Note - this is very much a work in progress and not releasable yet
# Minecraft rule Bot

This is a Minecraft bot based based on a rules engine.  It uses the mineflayer API to handle communications to a Minecraft server and a durable rules engine to interpret game inputs and decide on actions.  Unlike other bots all actions and reactions are defined in the rules engine.  All game events are sent into the rules engine to formulate what to do next.  Two repeating event loops occur - one to feed game state into the rules engine and another that queries the rules engine for actions that need to be taken.

The ultimate goal of this project is to create an open source framework that defines rule sets for bots.  Each ruleset can be considered a skill and put together to create bots with different functions and possibilities.  Examples would be guard bots, builder bots, hunter bots, etc..  Bots can also be created to work together and we envision future bot teams that compete in games on various Minecraft servers.

## Why a rules engine?

Procedural programming has its limits, and the complexity of actions and reactions of a bot warrant something that can handle more paths of execution.  Rules engines are a type of AI that has been around for some time now, and used primarily for complex business rules like payment processing.  They work by applying a set of rules to specific data sets.  If a rule matches a condition in the data set the rule fires and executes.  Rules can be chained and used as many times as needed.  This creates many more execution paths that allow for more sophisticated actions.

## Requirements

* A Redis server running locally - this stores state of the durable rules engine.  Since we are in dev mode the address is hardcoded to localhost.
* A Minecraft server - This must be running at an address reachable by the bot process.  We turn online mode off so that the bot can connect as any user and doesn't have to be registered with Mojang.  If connecting to a realm you will need an official Mojang account.

## Getting Started

```
redis-server #starts a redis server locally
git clone https://github.com/jfelten/minecraft-rules-bot
cd minecraft-rules-bot
npm start <SERVER> <PORT> <BOTNAME or USERNAME> <PASSWORD if required>
```

You will know if it works by seeing the bot connect in the game.

## Customizing by adding rules
