
const eventName = 'guard';

function load(durable) {

  durable.ruleset(eventName, function() {
    // antecedent
    //whenAll: {m.message == 'villagers commands'}
    whenAll: m.action == 'come'
    run: {
      s.eventResult.action = 'go to master';
    }


    // whenAll m.subject == /^trade [0-9]+ [0-9]+( [0-9]+)?$/
    // run: trade(command[1], command[2], command[3])

    whenStart: {
        // 'post' submits events, try 'assert' instead and to see differt behavior
    }
  });
}

module.exports = exports = {
  load,
}
