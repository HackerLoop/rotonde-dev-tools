const Immutable = require('immutable');

export function pushLayout(module, definition) {
  const identifier = "id" + Math.random().toString(16).slice(2);
  return {
    type: 'PUSH_LAYOUT',
    payload: Immutable.fromJS({
      identifier,
      module,
    }).set('definition', definition),
  };
}

export function removeLayout(identifier) {
  return {
    type: 'REMOVE_LAYOUT',
    payload: Immutable.fromJS({
      identifier,
    })
  };
}
