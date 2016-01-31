let Immutable = require('immutable');

module.exports = {

  CONSTRUCT: () => {
    return Immutable.fromJS({
      connecting: false,
      connected: false,
      definitions: {'event': [], 'action': []},
      events: {},
      actions: {},
    })
  },

  CONNECTING: (domain) => domain.set('connecting', true),
  CONNECTED: (domain) => domain.set('connected', true).set('connecting', false),

  DEFINITION_ADDED: (domain, action) => domain.updateIn(['definitions', action.payload.type], (definitions) => definitions.push(action.payload).sort((a, b) => a.identifier.localeCompare(b.identifier))),
  DEFINITION_REMOVED: (domain, action) => domain.updateIn(['definitions', action.payload.type], (definitions) => definitions.filter(definition => definition.identifier == action.payload.identifier)),
};

