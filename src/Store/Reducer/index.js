import { combineReducers } from 'redux';
import login from './login';
import userInfo from './userInfo';

export default combineReducers({ login, userInfo });
