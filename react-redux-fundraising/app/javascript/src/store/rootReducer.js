import { combineReducers }          from 'redux';

import { causes } from '../modules/causes'
import { donations } from '../modules/donations'
import { alertMessage } from '../modules/alertMessage'

let rootReducer = combineReducers({
  causes,
  donations,
  alertMessage
});

export default rootReducer;
