import { combineReducers } from 'redux';
import login from './login';
import userInfo from './userInfo';
import commonStatus from './commonStatus';
import filter from './filter';

export default combineReducers({ login, userInfo, commonStatus, filter });
