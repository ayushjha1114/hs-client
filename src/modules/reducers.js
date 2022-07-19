import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import distributorReducer from './distributor/reducer';
import dashboardReducer from './distributor/reducers/dashboardReducer';
import loaderReducer from './loader.reducer';
import adminReducer from './admin/reducer/reducer';
import errorReducer from './distributor/reducers/errorReducer';

export default combineReducers({
  loader: loaderReducer,
  auth: authReducer,
  distributor: distributorReducer,
  dashboard: dashboardReducer,
  admin: adminReducer,
  error: errorReducer
});
