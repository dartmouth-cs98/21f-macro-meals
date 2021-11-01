import { combineReducers } from 'redux';
import foodReducer from './foodReducer';
import userReducer from './userReducer';

export default combineReducers({
  food: foodReducer,
  user: userReducer,
});
