// NPM
import { combineReducers } from "redux";

// App
import { reducer as projects } from './modules/projects';
import { reducer as form } from './modules/form';
import { reducer as user } from './modules/user';

export default combineReducers({
  projects,
  form,
  user
});
