
const eventName = 'trade';

function load(durable) {

  durable.ruleset(eventName, function() {
    // antecedent
    //whenAll: {m.message == 'villagers commands'}
    whenAll: m.action == 'showVillagers'
    run: {
      console.log('message='+m.message);
      s.eventResult.message = m.message;
      s.eventResult.action = 'showVillagers';
    }
    whenAll: m.message == 'show inventory'
    run: villagers.showInventory(bot);

    whenAll: m.message == '[0-9]+$/.test(message)'
    run: villagers.showInventory(bot);

    // whenAll m.subject == /^trade [0-9]+ [0-9]+( [0-9]+)?$/
    // run: trade(command[1], command[2], command[3])

    whenStart: {
        // 'post' submits events, try 'assert' instead and to see differt behavior
        post('trade', { message: 'test' });
        post('trade', { message: 'showVillagers' });
        console.log('posted messages')
    }
  });
}

module.exports = exports = {
  load,
}
