import { combineReducers } from 'redux';
import login from './login';
import userInfo from './userInfo';
import commonStatus from './commonStatus';
import filter from './filter';
import sideNav from './sideNav';
import nav from './nav';

export default combineReducers({
  login,
  userInfo,
  commonStatus,
  filter,
  sideNav,
  nav,
});
