import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import loaderReducer from './loader.reducer';

export default combineReducers({
  loader: loaderReducer,
  auth: authReducer,
});
