import { combineReducers } from 'redux';
import login from './login';
import userInfo from './userInfo';
import commonStatus from './commonStatus';

export default combineReducers({
  userInfo,
});
