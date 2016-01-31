let { combineReducers } = require('redux-immutable');
import rotonde from './rotonde';
import dashboard from './dashboard';

const rootReducer = combineReducers({
  rotonde,
  dashboard,
});

export default rootReducer;
