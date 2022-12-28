
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '../modules/auth/authSlice';
import adminReducer from '../modules/admin/adminSlice';
import { authApi } from '../services/auth';
import { adminApi } from '../services/admin';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
              getDefaultMiddleware()
              .concat([authApi.middleware,
                       adminApi.middleware
                      ]),
});

setupListeners(store.dispatch);