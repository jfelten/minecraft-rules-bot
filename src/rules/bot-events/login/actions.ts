import { MineflayerBot } from '../../../bot';

function annouce(bot: MineflayerBot) {
  bot.actions.chat('Hello!! I am here to help.  Command me.')
}


export const actions = {
  annouce,
};
