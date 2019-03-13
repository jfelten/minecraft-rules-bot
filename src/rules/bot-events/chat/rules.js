
const eventName = 'chat';

function load(durable, bot) {
  applicableBot = bot;
  //villagers.showVillagers(bot);
  durable.ruleset(eventName, function() {
      // antecedent
      //whenAll: {m.message == 'villagers commands'}
      whenAll: m.message == 'show villagers'
      run: post('trade', { action: 'showVillagers' });
      whenAll: m.message == 'show inventory'
      run: post('trade', { action: 'showInventory' });
      whenAll: m.message == '[0-9]+$/.test(message)'
      run: post('trade', { action: 'showInventory' });

      // whenAll m.subject == /^trade [0-9]+ [0-9]+( [0-9]+)?$/
      // run: trade(command[1], command[2], command[3])

      whenStart: {
          // 'post' submits events, try 'assert' instead and to see differt behavior
          post('chat', { message: 'test' });
          post('chat', { message: 'show villagers' });
          console.log('posted messages')
      }
    });
}

module.exports = exports = {
  load,
}
