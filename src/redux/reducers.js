// NPM
import { combineReducers } from "redux";

// App
import { reducer as step1 } from './modules/step1';
import { reducer as step2 } from './modules/step2';
import { reducer as step3 } from './modules/step3';
import { reducer as step4 } from './modules/step4';

export default combineReducers({
  step1,
  step2,
  step3,
  step4,
});
