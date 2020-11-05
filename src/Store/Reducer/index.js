import { combineReducers } from 'redux';
import userInfo from './userInfo';
import user from './register';

export default combineReducers({
  userInfo,
  user,
});
