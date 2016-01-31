let Immutable = require('immutable');

module.exports = {

  CONSTRUCT: () => {
    return Immutable.fromJS({
      layout: [],
    })
  },

  PUSH_LAYOUT: (domain, action) => domain.updateIn(['layout'], layout => layout.push(action.payload)),
  REMOVE_LAYOUT: (domain, action) => domain.updateIn(['layout'], layout => layout.filter(item => item.get('identifier') != action.payload.get('identifier'))),

};
