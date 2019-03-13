

const eventName = 'login';

function load(durable) {

  durable.ruleset(eventName, function() {
    // antecedent
    //whenAll: {m.message == 'villagers commands'}
    whenAll: s.status == 'connected'
    run: {
      console.log('bot has conencted to server');
      s.status = 'connected';
      s.eventResult.event = 'login';
      s.eventResult.action = 'announce';
    }

    // whenAll m.subject == /^trade [0-9]+ [0-9]+( [0-9]+)?$/
    // run: trade(command[1], command[2], command[3])

    whenStart: {
      // modifies context state
      console.log('setting initial state disconnected.')
      patchState('login', { status: 'disconnected' })
    }
  });
}

module.exports = exports = {
  load,
}
