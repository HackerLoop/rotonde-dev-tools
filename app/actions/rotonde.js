const Immutable = require('immutable');

const newClient = require('rotonde-client/src/Client');

let client;

const connecting = () => {
  return {
    type: 'CONNECTING',
  };
}

const connected = () => {
  return {
    type: 'CONNECTED',
  };
}

const definitionAdded = (definition) => {
  return {
    type: 'DEFINITION_ADDED',
    payload: definition,
  };
}

const definitionRemoved = (definition) => {
  return {
    type: 'DEFINITION_REMOVED',
    payload: definition,
  };
}

const eventReceived = (event) => {
  return {
    type: 'EVENT_RECEIVED',
    payload: event,
  };
}

const actionSent = (action) => {
  return {
    type: 'ACTION_SENT',
    payload: action,
  };
}

export function connect(url) {
  return dispatch => {
    if (client) {
      throw "Only one connection allowed now.";
    }
    client = newClient(url);
    client.onReady(() => {
      dispatch(connected());
    });
    client.definitionHandlers.attach('*', (definition) => {
      dispatch(definitionAdded(definition));
    });
    client.unDefinitionHandlers.attach('*', (definition) => {
      dispatch(definitionRemoved(definition));
    });
    dispatch(connecting());
    client.connect();
  };
}
