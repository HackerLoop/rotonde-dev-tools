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

  DEFINITION_ADDED: (domain, action) => domain.updateIn(['definitions', action.payload.get('type')], (definitions) => definitions.push(action.payload).sort((a, b) => a.get('identifier').localeCompare(b.get('identifier')))),
  DEFINITION_REMOVED: (domain, action) => domain.updateIn(['definitions', action.payload.get('type')], (definitions) => definitions.filter(definition => definition.get('identifier') != action.payload.identifier)),
};

